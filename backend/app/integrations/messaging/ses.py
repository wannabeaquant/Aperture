from __future__ import annotations

from dataclasses import dataclass

from app.core.config import get_settings


@dataclass(slots=True)
class SESDispatchRequest:
    to_email: str
    subject: str
    body: str


class SESClient:
    def send_email(self, request: SESDispatchRequest) -> dict[str, str]:
        settings = get_settings()
        if not settings.aws_access_key_id or not settings.aws_secret_access_key:
            return {"status": "queued", "provider_message_id": "ses-stub", "to": request.to_email}

        import boto3

        client = boto3.client(
            "sesv2",
            region_name=settings.ses_region,
            aws_access_key_id=settings.aws_access_key_id,
            aws_secret_access_key=settings.aws_secret_access_key,
            aws_session_token=settings.aws_session_token or None,
        )
        response = client.send_email(
            FromEmailAddress=f"hello@{settings.outreach_domain}",
            Destination={"ToAddresses": [request.to_email]},
            Content={"Simple": {"Subject": {"Data": request.subject}, "Body": {"Text": {"Data": request.body}}}},
        )
        return {
            "status": "queued",
            "provider_message_id": response.get("MessageId", "unknown"),
            "to": request.to_email,
        }
