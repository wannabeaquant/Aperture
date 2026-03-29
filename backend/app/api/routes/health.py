from __future__ import annotations

from fastapi import APIRouter

from app.core.config import get_settings
from app.integrations.ai.openclaw import OpenClawRuntime
from app.schemas.api import HealthResponse


router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
def healthcheck() -> HealthResponse:
    settings = get_settings()
    probe = OpenClawRuntime(settings).probe()
    return HealthResponse(status="ok", environment=settings.env, openclaw=probe.health.value)

