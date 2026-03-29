from __future__ import annotations

from app.core.enums import BusinessState, ChannelType, SendEligibility, ServiceLane
from app.models.domain import Business, ContactPoint, LeadSegment


def pick_service_lane(business: Business, has_public_email: bool, has_whatsapp: bool) -> ServiceLane:
    if business.state == BusinessState.NO_WEBSITE:
        return ServiceLane.NEW_WEB_PRESENCE
    if business.state == BusinessState.HAS_WEBSITE_WEAK:
        return ServiceLane.WEBSITE_REBUILD_CRO
    if has_whatsapp:
        return ServiceLane.AI_AUTOMATION
    if has_public_email:
        return ServiceLane.LOCAL_SEO_MAPS
    return ServiceLane.LEAD_CAPTURE_BOOKING


def pick_routing_channel(business: Business, contacts: list[ContactPoint]) -> ChannelType:
    email_ok = any(
        contact.channel == ChannelType.EMAIL and contact.send_eligibility == SendEligibility.ELIGIBLE for contact in contacts
    )
    whatsapp_ok = any(
        contact.channel == ChannelType.WHATSAPP and contact.send_eligibility == SendEligibility.ELIGIBLE for contact in contacts
    )
    phone_ok = any(contact.channel == ChannelType.PHONE for contact in contacts)

    if business.state == BusinessState.NO_WEBSITE:
        if whatsapp_ok:
            return ChannelType.WHATSAPP
        return ChannelType.CALL_REVIEW if phone_ok else ChannelType.CONTACT_FORM

    if business.state == BusinessState.HAS_WEBSITE_WEAK:
        if email_ok:
            return ChannelType.EMAIL
        if whatsapp_ok:
            return ChannelType.WHATSAPP
        return ChannelType.CALL_REVIEW

    return ChannelType.CALL_REVIEW


def build_segment(business: Business, contacts: list[ContactPoint]) -> LeadSegment:
    has_public_email = any(contact.channel == ChannelType.EMAIL for contact in contacts)
    has_whatsapp = any(contact.channel == ChannelType.WHATSAPP and contact.whatsapp_likely for contact in contacts)
    return LeadSegment(
        business_id=business.id,
        state=business.state,
        service_lane=pick_service_lane(business, has_public_email=has_public_email, has_whatsapp=has_whatsapp),
        routing_channel=pick_routing_channel(business, contacts),
        routing_tier="priority" if business.priority_score >= 75 else "normal",
        rationale="Derived from website state and currently verified contact points.",
    )

