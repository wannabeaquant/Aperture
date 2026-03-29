from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.domain import Business, ContactPoint, EvidencePack, Website


def build_basic_evidence_pack(db: Session, business: Business) -> EvidencePack:
    contacts = db.query(ContactPoint).filter(ContactPoint.business_id == business.id).all()
    websites = db.query(Website).filter(Website.business_id == business.id).all()

    if business.state.value == "NO_WEBSITE":
        observed_issue = "The business does not appear to have a direct website presence."
        consequence = "Customers depend on third-party listings instead of contacting the business directly."
    elif websites:
        observed_issue = websites[0].audit_summary or "The website likely creates friction for enquiries or trust."
        consequence = "Visitors may drop without converting into direct enquiries."
    else:
        observed_issue = "The digital presence is incomplete or unclear."
        consequence = "Potential customers may not find a reliable direct contact path."

    offer_match = business.segment.service_lane if business.segment else None
    if offer_match is None:
        raise ValueError("Lead segment must exist before generating evidence.")

    evidence = EvidencePack(
        business_id=business.id,
        observed_issue=observed_issue,
        consequence=consequence,
        offer_match=offer_match,
        evidence_json={
            "website_count": len(websites),
            "contact_count": len(contacts),
            "category": business.category,
            "city": business.city,
        },
        version=1,
    )
    db.add(evidence)
    db.flush()
    return evidence

