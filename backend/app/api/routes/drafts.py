from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.core.enums import AIRunJobType, CampaignChannel
from app.models.domain import Business, DraftMessage, EvidencePack
from app.schemas.workflows import AIJobResponse, DraftEmailRequest, DraftWhatsAppRequest
from app.services.openclaw_jobs import run_openclaw_job


router = APIRouter(prefix="/drafts", tags=["drafts"])


def _load_business_and_evidence(db: Session, business_id: str, evidence_pack_id: str) -> tuple[Business, EvidencePack]:
    business = db.query(Business).filter(Business.id == business_id).one_or_none()
    if business is None:
        raise HTTPException(status_code=404, detail="Business not found.")
    evidence = db.query(EvidencePack).filter(EvidencePack.id == evidence_pack_id, EvidencePack.business_id == business_id).one_or_none()
    if evidence is None:
        raise HTTPException(status_code=404, detail="Evidence pack not found.")
    return business, evidence


@router.post("/email", response_model=AIJobResponse)
def generate_email_draft(payload: DraftEmailRequest, db: Session = Depends(get_db)) -> AIJobResponse:
    business, evidence = _load_business_and_evidence(db, payload.business_id, payload.evidence_pack_id)
    run = run_openclaw_job(
        db,
        business=business,
        job_type=AIRunJobType.DRAFT_EMAIL,
        model_alias="quality_draft",
        message_payload={
            "business_name": business.name,
            "city": business.city,
            "issue": evidence.observed_issue,
            "consequence": evidence.consequence,
            "service_lane": evidence.offer_match.value,
        },
    )
    body = run.output_json.get("reply") or run.output_json.get("text") or str(run.output_json)
    draft = DraftMessage(
        business_id=business.id,
        evidence_pack_id=evidence.id,
        ai_run_id=run.id,
        channel=CampaignChannel.EMAIL,
        subject=f"Quick idea for {business.name}",
        body=body,
        template_version=payload.template_version,
        approved=False,
    )
    db.add(draft)
    db.commit()
    return AIJobResponse(ai_run_id=str(run.id), status=run.status.value, payload=run.output_json)


@router.post("/whatsapp", response_model=AIJobResponse)
def generate_whatsapp_draft(payload: DraftWhatsAppRequest, db: Session = Depends(get_db)) -> AIJobResponse:
    business, evidence = _load_business_and_evidence(db, payload.business_id, payload.evidence_pack_id)
    run = run_openclaw_job(
        db,
        business=business,
        job_type=AIRunJobType.DRAFT_WHATSAPP,
        model_alias="cheap_fast",
        message_payload={
            "business_name": business.name,
            "city": business.city,
            "issue": evidence.observed_issue,
            "consequence": evidence.consequence,
            "service_lane": evidence.offer_match.value,
        },
    )
    body = run.output_json.get("reply") or run.output_json.get("text") or str(run.output_json)
    draft = DraftMessage(
        business_id=business.id,
        evidence_pack_id=evidence.id,
        ai_run_id=run.id,
        channel=CampaignChannel.WHATSAPP,
        body=body,
        template_version=payload.template_version,
        approved=False,
    )
    db.add(draft)
    db.commit()
    return AIJobResponse(ai_run_id=str(run.id), status=run.status.value, payload=run.output_json)

