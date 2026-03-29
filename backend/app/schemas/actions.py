from __future__ import annotations

from pydantic import BaseModel


class BusinessActionRequest(BaseModel):
    business_id: str


class DraftSendRequest(BaseModel):
    draft_message_id: str
    approve: bool = True

