from __future__ import annotations

from dataclasses import dataclass

from app.core.config import get_settings


@dataclass(slots=True)
class TwilioWhatsAppDispatchRequest:
    to_number: str
    body: str


class TwilioWhatsAppClient:
    def send_whatsapp(self, request: TwilioWhatsAppDispatchRequest) -> dict[str, str]:
        settings = get_settings()
        if not settings.twilio_account_sid or not settings.twilio_auth_token or not settings.twilio_whatsapp_from:
            return {"status": "queued", "provider_message_id": "twilio-stub", "to": request.to_number}

        from twilio.rest import Client

        client = Client(settings.twilio_account_sid, settings.twilio_auth_token)
        message = client.messages.create(
            from_=settings.twilio_whatsapp_from,
            to=request.to_number,
            body=request.body,
        )
        return {"status": message.status or "queued", "provider_message_id": message.sid, "to": request.to_number}
