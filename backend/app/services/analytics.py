from __future__ import annotations

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.enums import ReplyIntent
from app.models.domain import Business, Campaign, DraftMessage, ReplyEvent, SalesTask, SendAttempt
from app.schemas.analytics import AnalyticsSummary


def build_summary(db: Session) -> AnalyticsSummary:
    return AnalyticsSummary(
        businesses=db.query(func.count(Business.id)).scalar() or 0,
        campaigns=db.query(func.count(Campaign.id)).scalar() or 0,
        drafts=db.query(func.count(DraftMessage.id)).scalar() or 0,
        sends=db.query(func.count(SendAttempt.id)).scalar() or 0,
        replies=db.query(func.count(ReplyEvent.id)).scalar() or 0,
        interested_replies=db.query(func.count(ReplyEvent.id)).filter(ReplyEvent.intent == ReplyIntent.INTERESTED).scalar() or 0,
        sales_tasks_open=db.query(func.count(SalesTask.id)).filter(SalesTask.status == "open").scalar() or 0,
    )

