from __future__ import annotations

import dramatiq
from sqlalchemy.orm import joinedload

from app.core.db import session_scope
from app.models.domain import Business, Campaign, DraftMessage, ReplyEvent
from app.services.campaigns import materialize_campaign_members
from app.services.campaign_execution import process_campaign
from app.services.discovery import enrich_business_by_id
from app.services.dispatch import dispatch_draft
from app.services.evidence import build_basic_evidence_pack
from app.services.replies import apply_reply_outcome
from app.services.scoring import compute_score
from app.workers.broker import broker


@dramatiq.actor(broker=broker)
def enrich_secondary_sources(business_id: str) -> None:
    with session_scope() as db:
        import asyncio

        asyncio.run(enrich_business_by_id(db, business_id))


@dramatiq.actor(broker=broker)
def compute_business_score(business_id: str) -> None:
    with session_scope() as db:
        business = db.query(Business).filter(Business.id == business_id).one()
        compute_score(db, business)


@dramatiq.actor(broker=broker)
def create_evidence_pack(business_id: str) -> None:
    with session_scope() as db:
        business = (
            db.query(Business)
            .options(joinedload(Business.segment), joinedload(Business.contacts), joinedload(Business.websites))
            .filter(Business.id == business_id)
            .one()
        )
        build_basic_evidence_pack(db, business)


@dramatiq.actor(broker=broker)
def run_full_lead_pipeline(business_id: str) -> None:
    with session_scope() as db:
        import asyncio

        business = (
            db.query(Business)
            .options(joinedload(Business.segment), joinedload(Business.contacts), joinedload(Business.websites))
            .filter(Business.id == business_id)
.one()
        )
        asyncio.run(enrich_business_by_id(db, business_id))
        compute_score(db, business)
        evidence = build_basic_evidence_pack(db, business)
        db.refresh(business)


@dramatiq.actor(broker=broker)
def launch_campaign_members(campaign_id: str) -> None:
    with session_scope() as db:
        campaign = db.query(Campaign).filter(Campaign.id == campaign_id).one()
        materialize_campaign_members(db, campaign)


@dramatiq.actor(broker=broker)
def process_campaign_queue(campaign_id: str) -> None:
    with session_scope() as db:
        campaign = db.query(Campaign).filter(Campaign.id == campaign_id).one()
        process_campaign(db, campaign)


@dramatiq.actor(broker=broker)
def send_draft_message(draft_message_id: str) -> None:
    with session_scope() as db:
        draft = db.query(DraftMessage).filter(DraftMessage.id == draft_message_id).one()
        business = db.query(Business).options(joinedload(Business.contacts)).filter(Business.id == draft.business_id).one()
        attempt = dispatch_draft(business, draft)
        db.add(attempt)


@dramatiq.actor(broker=broker)
def apply_reply(reply_event_id: str) -> None:
    with session_scope() as db:
        reply = db.query(ReplyEvent).filter(ReplyEvent.id == reply_event_id).one()
        business = db.query(Business).filter(Business.id == reply.business_id).one()
        apply_reply_outcome(db, business=business, reply=reply)
