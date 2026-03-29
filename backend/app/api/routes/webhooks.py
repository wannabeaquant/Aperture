from __future__ import annotations

from fastapi import APIRouter, Request

from app.schemas.api import GenericMessage


router = APIRouter(prefix="/webhooks", tags=["webhooks"])


@router.post("/email", response_model=GenericMessage)
async def email_webhook(_: Request) -> GenericMessage:
    return GenericMessage(message="Email webhook received.")


@router.post("/whatsapp", response_model=GenericMessage)
async def whatsapp_webhook(_: Request) -> GenericMessage:
    return GenericMessage(message="WhatsApp webhook received.")

