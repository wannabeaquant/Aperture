from __future__ import annotations

from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.core.enums import ProviderKind, ReplyIntent
from app.models.domain import ReplyEvent
from app.schemas.api import GenericMessage


router = APIRouter(prefix="/webhooks", tags=["webhooks"])


@router.post("/email", response_model=GenericMessage)
async def email_webhook(request: Request, db: Session = Depends(get_db)) -> GenericMessage:
    payload = await request.json()
    business_id = payload.get("business_id")
    if business_id:
        db.add(
            ReplyEvent(
                business_id=business_id,
                provider_kind=ProviderKind.SES,
                payload=payload,
                normalized_text=payload.get("text") or payload.get("body"),
                intent=ReplyIntent.UNKNOWN,
            )
        )
        db.commit()
    return GenericMessage(message="Email webhook received.")


@router.post("/whatsapp", response_model=GenericMessage)
async def whatsapp_webhook(request: Request, db: Session = Depends(get_db)) -> GenericMessage:
    payload = await request.json()
    business_id = payload.get("business_id")
    if business_id:
        db.add(
            ReplyEvent(
                business_id=business_id,
                provider_kind=ProviderKind.TWILIO,
                payload=payload,
                normalized_text=payload.get("Body") or payload.get("body"),
                intent=ReplyIntent.UNKNOWN,
            )
        )
        db.commit()
    return GenericMessage(message="WhatsApp webhook received.")
