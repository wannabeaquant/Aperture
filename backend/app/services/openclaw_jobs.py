from __future__ import annotations

import json
import time
from typing import Any

from sqlalchemy.orm import Session

from app.core.enums import AIRunJobType, AIRunStatus
from app.integrations.ai.openclaw import OpenClawRuntime
from app.models.domain import AIRun, Business


JOB_TO_AGENT_SETTING = {
    AIRunJobType.LEAD_ENRICHMENT: "openclaw_agent_enrichment",
    AIRunJobType.CONTACT_DISCOVERY: "openclaw_agent_contact_discovery",
    AIRunJobType.SITE_AUDIT: "openclaw_agent_site_audit",
    AIRunJobType.DRAFT_EMAIL: "openclaw_agent_draft_email",
    AIRunJobType.DRAFT_WHATSAPP: "openclaw_agent_draft_whatsapp",
    AIRunJobType.REPLY_CLASSIFIER: "openclaw_agent_reply_classifier",
}


def run_openclaw_job(
    db: Session,
    *,
    business: Business | None,
    job_type: AIRunJobType,
    model_alias: str,
    message_payload: dict[str, Any],
    runtime: OpenClawRuntime | None = None,
) -> AIRun:
    runtime = runtime or OpenClawRuntime()
    run = AIRun(
        business_id=business.id if business else None,
        provider_name="openclaw",
        model_alias=model_alias,
        job_type=job_type,
        status=AIRunStatus.PENDING,
    )
    db.add(run)
    db.flush()

    started = time.perf_counter()
    try:
        agent = getattr(runtime.settings, JOB_TO_AGENT_SETTING[job_type])
        response = runtime.invoke_agent(
            agent=agent,
            session_id=f"{job_type.value}:{run.id}",
            message=json.dumps(message_payload, ensure_ascii=False),
        )
        run.status = AIRunStatus.SUCCEEDED
        run.output_json = response
    except Exception as exc:  # pragma: no cover - exercised in integration tests with monkeypatching
        run.status = AIRunStatus.FAILED
        run.error_text = str(exc)
    finally:
        run.duration_ms = int((time.perf_counter() - started) * 1000)
        db.flush()
    return run

