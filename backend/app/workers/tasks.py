from __future__ import annotations

import dramatiq
from sqlalchemy.orm import joinedload

from app.core.db import session_scope
from app.core.enums import AIRunJobType
from app.models.domain import Business
from app.services.openclaw_jobs import run_openclaw_job
from app.services.provider_health import sync_openclaw_health
from app.workers.broker import broker


@dramatiq.actor(broker=broker)
def refresh_openclaw_status() -> None:
    with session_scope() as db:
        sync_openclaw_health(db)


@dramatiq.actor(broker=broker)
def run_lead_enrichment(business_id: str) -> None:
    with session_scope() as db:
        business = (
            db.query(Business)
            .options(joinedload(Business.sources), joinedload(Business.contacts), joinedload(Business.websites))
            .filter(Business.id == business_id)
            .one()
        )
        run_openclaw_job(
            db,
            business=business,
            job_type=AIRunJobType.LEAD_ENRICHMENT,
            model_alias="cheap_fast",
            message_payload={
                "business": business.name,
                "city": business.city,
                "category": business.category,
                "sources": [source.raw_payload for source in business.sources],
            },
        )

