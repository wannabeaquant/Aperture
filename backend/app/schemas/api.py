from __future__ import annotations

from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str
    environment: str
    openclaw: str


class GenericMessage(BaseModel):
    message: str

