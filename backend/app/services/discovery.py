from __future__ import annotations

from collections.abc import Iterable

from sqlalchemy.orm import Session

from app.core.enums import BusinessState, ChannelType, SendEligibility, SourceType, VerificationStatus
from app.models.domain import Business, BusinessLocation, ContactPoint, LeadSegment, SourceRecord, Website
from app.services.normalization import normalize_domain, normalize_name, normalize_phone
from app.services.routing import build_segment


def _coerce_state(place: dict) -> BusinessState:
    if place.get("websiteUri"):
        return BusinessState.HAS_WEBSITE_WEAK
    return BusinessState.NO_WEBSITE


def _upsert_contact(
    db: Session,
    *,
    business: Business,
    channel: ChannelType,
    value: str,
    source_url: str | None,
    whatsapp_likely: bool = False,
) -> ContactPoint:
    existing = (
        db.query(ContactPoint)
        .filter(ContactPoint.business_id == business.id, ContactPoint.channel == channel, ContactPoint.value == value)
        .one_or_none()
    )
    if existing is not None:
        existing.confidence = max(existing.confidence, 0.8)
        existing.source_url = source_url or existing.source_url
        existing.whatsapp_likely = existing.whatsapp_likely or whatsapp_likely
        existing.verification_status = VerificationStatus.OBSERVED_PUBLIC
        if channel in {ChannelType.EMAIL, ChannelType.WHATSAPP}:
            existing.send_eligibility = SendEligibility.ELIGIBLE
        return existing

    contact = ContactPoint(
        business_id=business.id,
        channel=channel,
        value=value,
        public_business_contact=True,
        verification_status=VerificationStatus.OBSERVED_PUBLIC,
        confidence=0.8,
        source_url=source_url,
        whatsapp_likely=whatsapp_likely,
        send_eligibility=SendEligibility.ELIGIBLE if channel in {ChannelType.EMAIL, ChannelType.WHATSAPP} else SendEligibility.HOLD,
    )
    db.add(contact)
    db.flush()
    return contact


def ingest_places_payload(db: Session, places: Iterable[dict]) -> tuple[int, int]:
    imported = 0
    updated = 0

    for place in places:
        place_id = place.get("id")
        display = place.get("displayName") or {}
        name = display.get("text") or "Unknown business"
        formatted_address = place.get("formattedAddress")
        primary_type = place.get("primaryType")
        website_url = place.get("websiteUri")
        national_phone = place.get("nationalPhoneNumber")
        international_phone = place.get("internationalPhoneNumber")
        location = place.get("location") or {}

        business = db.query(Business).filter(Business.google_place_id == place_id).one_or_none()
        if business is None:
            business = Business(
                name=name,
                normalized_name=normalize_name(name),
                google_place_id=place_id,
                normalized_domain=normalize_domain(website_url) if website_url else None,
                normalized_phone=normalize_phone(international_phone or national_phone) if (international_phone or national_phone) else None,
                state=_coerce_state(place),
                city=formatted_address,
                category=primary_type,
                priority_score=45.0,
            )
            db.add(business)
            db.flush()
            imported += 1
        else:
            business.name = name
            business.normalized_name = normalize_name(name)
            business.state = _coerce_state(place)
            business.category = primary_type
            business.city = formatted_address
            if website_url:
                business.normalized_domain = normalize_domain(website_url)
            if international_phone or national_phone:
                business.normalized_phone = normalize_phone(international_phone or national_phone)
            updated += 1

        source = SourceRecord(
            business_id=business.id,
            source_type=SourceType.GOOGLE_PLACES,
            source_id=place_id,
            source_url=None,
            raw_payload=place,
            parser_version="places-v1",
        )
        db.add(source)

        if formatted_address:
            location_row = (
                db.query(BusinessLocation).filter(BusinessLocation.business_id == business.id, BusinessLocation.address == formatted_address).one_or_none()
            )
            if location_row is None:
                location_row = BusinessLocation(
                    business_id=business.id,
                    address=formatted_address,
                    city=formatted_address,
                    latitude=location.get("latitude"),
                    longitude=location.get("longitude"),
                )
                db.add(location_row)

        if website_url:
            website = db.query(Website).filter(Website.business_id == business.id, Website.url == website_url).one_or_none()
            if website is None:
                db.add(
                    Website(
                        business_id=business.id,
                        url=website_url,
                        normalized_domain=normalize_domain(website_url),
                        crawl_state="pending",
                        is_weak=True,
                    )
                )

        phone_value = normalize_phone(international_phone or national_phone) if (international_phone or national_phone) else None
        if phone_value:
            _upsert_contact(db, business=business, channel=ChannelType.PHONE, value=phone_value, source_url=None)
            _upsert_contact(
                db,
                business=business,
                channel=ChannelType.WHATSAPP,
                value=phone_value,
                source_url=None,
                whatsapp_likely=True,
            )

        contacts = db.query(ContactPoint).filter(ContactPoint.business_id == business.id).all()
        segment = db.query(LeadSegment).filter(LeadSegment.business_id == business.id).one_or_none()
        computed = build_segment(business, contacts)
        if segment is None:
            db.add(computed)
        else:
            segment.state = computed.state
            segment.service_lane = computed.service_lane
            segment.routing_channel = computed.routing_channel
            segment.routing_tier = computed.routing_tier
            segment.rationale = computed.rationale

    db.flush()
    return imported, updated
