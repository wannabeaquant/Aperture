from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.schemas.domain import ProviderStatusRead
from app.services.provider_health import sync_openclaw_health


router = APIRouter(prefix="/providers", tags=["providers"])


@router.get("/openclaw", response_model=ProviderStatusRead)
def openclaw_status(db: Session = Depends(get_db)) -> ProviderStatusRead:
    account = sync_openclaw_health(db)
    db.commit()
    db.refresh(account)
    return account

