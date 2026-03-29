from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.core.enums import CampaignStatus
from app.models.domain import Campaign
from app.schemas.api import GenericMessage
from app.schemas.domain import CampaignCreate, CampaignRead


router = APIRouter(prefix="/campaigns", tags=["campaigns"])


@router.get("", response_model=list[CampaignRead])
def list_campaigns(db: Session = Depends(get_db)) -> list[CampaignRead]:
    return db.query(Campaign).order_by(Campaign.created_at.desc()).all()


@router.post("", response_model=CampaignRead)
def create_campaign(payload: CampaignCreate, db: Session = Depends(get_db)) -> CampaignRead:
    campaign = Campaign(
        name=payload.name,
        channel=payload.channel,
        template_version=payload.template_version,
        daily_cap=payload.daily_cap,
        filters=payload.filters,
    )
    db.add(campaign)
    db.commit()
    db.refresh(campaign)
    return campaign


@router.post("/{campaign_id}/launch", response_model=GenericMessage)
def launch_campaign(campaign_id: str, db: Session = Depends(get_db)) -> GenericMessage:
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).one_or_none()
    if campaign is None:
        raise HTTPException(status_code=404, detail="Campaign not found.")
    campaign.status = CampaignStatus.READY
    db.commit()
    return GenericMessage(message=f"Campaign {campaign.name} queued for launch.")

