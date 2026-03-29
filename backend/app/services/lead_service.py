from __future__ import annotations

from sqlalchemy.orm import Session, joinedload

from app.models.domain import Business


def list_businesses(db: Session) -> list[Business]:
    return (
        db.query(Business)
        .options(joinedload(Business.contacts), joinedload(Business.segment))
        .order_by(Business.created_at.desc())
        .limit(200)
        .all()
    )


def get_business(db: Session, business_id: str) -> Business | None:
    return (
        db.query(Business)
        .options(joinedload(Business.contacts), joinedload(Business.segment), joinedload(Business.websites))
        .filter(Business.id == business_id)
        .one_or_none()
    )

