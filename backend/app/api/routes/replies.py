from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.core.enums import AIRunJobType, ReplyIntent, SuppressionReason
from app.models.domain import Business, ReplyEvent
from app.schemas.workflows import AIJobResponse, ReplyClassifyRequest
from app.services.openclaw_jobs import run_openclaw_job
from app.services.suppression import suppress_business


router = APIRouter(prefix="/replies", tags=["replies"])


@router.post("/classify", response_model=AIJobResponse)
def classify_reply(payload: ReplyClassifyRequest, db: Session = Depends(get_db)) -> AIJobResponse:
    reply = db.query(ReplyEvent).filter(ReplyEvent.id == payload.reply_event_id).one_or_none()
    if reply is None:
        raise HTTPException(status_code=404, detail="Reply event not found.")

    business = db.query(Business).filter(Business.id == reply.business_id).one()
    run = run_openclaw_job(
        db,
        business=business,
        job_type=AIRunJobType.REPLY_CLASSIFIER,
        model_alias="quality_draft",
        message_payload={"reply_text": reply.normalized_text or "", "payload": reply.payload},
    )
    lowered = str(run.output_json).lower()
    if "unsubscribe" in lowered:
        reply.intent = ReplyIntent.UNSUBSCRIBE
        suppress_business(db, business=business, reason=SuppressionReason.UNSUBSCRIBE)
    elif "interested" in lowered:
        reply.intent = ReplyIntent.INTERESTED
    elif "not_now" in lowered or "not now" in lowered:
        reply.intent = ReplyIntent.NOT_NOW
    else:
        reply.intent = ReplyIntent.UNKNOWN
    reply.recommended_action = run.output_json.get("reply") if isinstance(run.output_json, dict) else None
    db.commit()
    return AIJobResponse(ai_run_id=str(run.id), status=run.status.value, payload=run.output_json)

