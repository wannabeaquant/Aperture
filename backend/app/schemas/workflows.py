from __future__ import annotations

from pydantic import BaseModel


class DraftEmailRequest(BaseModel):
    business_id: str
    evidence_pack_id: str
    template_version: str = "v1"


class DraftWhatsAppRequest(BaseModel):
    business_id: str
    evidence_pack_id: str
    template_version: str = "v1"


class ReplyClassifyRequest(BaseModel):
    reply_event_id: str


class AIJobResponse(BaseModel):
    ai_run_id: str
    status: str
    payload: dict

