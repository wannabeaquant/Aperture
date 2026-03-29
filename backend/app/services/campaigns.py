from __future__ import annotations

from sqlalchemy.orm import Session

from app.core.enums import CampaignStatus, ChannelType
from app.models.domain import Business, Campaign, CampaignMember, LeadSegment, SuppressionEntry


def materialize_campaign_members(db: Session, campaign: Campaign) -> int:
    query = db.query(Business).join(LeadSegment, LeadSegment.business_id == Business.id)
    city = campaign.filters.get("city")
    category = campaign.filters.get("category")
    if city:
        query = query.filter(Business.city.ilike(f"%{city}%"))
    if category:
        query = query.filter(Business.category.ilike(f"%{category}%"))

    if campaign.channel.value == "email":
        query = query.filter(LeadSegment.routing_channel == ChannelType.EMAIL)
    else:
        query = query.filter(LeadSegment.routing_channel == ChannelType.WHATSAPP)

    businesses = query.all()
    count = 0
    for business in businesses:
        suppressed = db.query(SuppressionEntry).filter(SuppressionEntry.business_id == business.id).count()
        if suppressed:
            continue
        existing = (
            db.query(CampaignMember)
            .filter(CampaignMember.campaign_id == campaign.id, CampaignMember.business_id == business.id)
            .one_or_none()
        )
        if existing:
            continue
        db.add(CampaignMember(campaign_id=campaign.id, business_id=business.id, sequence_step=0, state="queued"))
        count += 1

    campaign.status = CampaignStatus.READY
    db.flush()
    return count

