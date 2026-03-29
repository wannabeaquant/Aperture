from __future__ import annotations

from datetime import datetime, timedelta, timezone

from sqlalchemy.orm import Session

from app.core.enums import ChannelType, SuppressionReason
from app.models.domain import Business, SuppressionEntry


def suppress_business(
    db: Session,
    *,
    business: Business,
    reason: SuppressionReason,
    channel: ChannelType | None = None,
    expires_in_days: int | None = None,
) -> SuppressionEntry:
    expires_at = None
    if expires_in_days is not None:
        expires_at = datetime.now(timezone.utc) + timedelta(days=expires_in_days)
    entry = SuppressionEntry(business_id=business.id, channel=channel, reason=reason, expires_at=expires_at)
    db.add(entry)
    db.flush()
    return entry

