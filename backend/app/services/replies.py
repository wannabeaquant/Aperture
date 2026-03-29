from __future__ import annotations

from sqlalchemy.orm import Session

from app.core.enums import ReplyIntent, SuppressionReason
from app.models.domain import Business, ReplyEvent, SalesTask
from app.services.suppression import suppress_business


def apply_reply_outcome(db: Session, *, business: Business, reply: ReplyEvent) -> None:
    if reply.intent == ReplyIntent.INTERESTED:
        db.add(
            SalesTask(
                business_id=business.id,
                reply_event_id=reply.id,
                title=f"Follow up with {business.name}",
                notes=reply.normalized_text,
            )
        )
    elif reply.intent == ReplyIntent.UNSUBSCRIBE:
        suppress_business(db, business=business, reason=SuppressionReason.UNSUBSCRIBE)

