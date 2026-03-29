from __future__ import annotations

from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.core.enums import ProviderHealth, ProviderKind
from app.integrations.ai.openclaw import OpenClawRuntime
from app.models.domain import ProviderAccount


def sync_openclaw_health(db: Session, runtime: OpenClawRuntime | None = None) -> ProviderAccount:
    runtime = runtime or OpenClawRuntime()
    probe = runtime.probe()
    account = (
        db.query(ProviderAccount)
        .filter(
            ProviderAccount.provider_kind == ProviderKind.OPENCLAW,
            ProviderAccount.provider_name == probe.provider_name,
        )
        .one_or_none()
    )
    if account is None:
        account = ProviderAccount(provider_kind=ProviderKind.OPENCLAW, provider_name=probe.provider_name)
        db.add(account)

    account.health = probe.health
    account.default_model = probe.default_model
    account.status_payload = probe.payload
    account.last_probe_at = datetime.now(timezone.utc)
    account.last_error = probe.error
    db.flush()
    return account


def is_ai_available(db: Session) -> bool:
    account = (
        db.query(ProviderAccount)
        .filter(ProviderAccount.provider_kind == ProviderKind.OPENCLAW, ProviderAccount.health != ProviderHealth.OFFLINE)
        .one_or_none()
    )
    return account is not None

