from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.integrations.discovery.google_places import GooglePlacesClient
from app.schemas.domain import BusinessRead, PlacesIngestRequest, PlacesIngestResponse
from app.services.discovery import ingest_places_payload
from app.services.lead_service import get_business, list_businesses


router = APIRouter(prefix="/leads", tags=["leads"])


@router.get("", response_model=list[BusinessRead])
def list_leads(db: Session = Depends(get_db)) -> list[BusinessRead]:
    return list_businesses(db)


@router.get("/{business_id}", response_model=BusinessRead)
def get_lead(business_id: str, db: Session = Depends(get_db)) -> BusinessRead:
    business = get_business(db, business_id)
    if business is None:
        raise HTTPException(status_code=404, detail="Lead not found.")
    return business


@router.post("/ingest/places", response_model=PlacesIngestResponse)
async def ingest_places(payload: PlacesIngestRequest, db: Session = Depends(get_db)) -> PlacesIngestResponse:
    client = GooglePlacesClient()
    response = await client.search_text(text_query=payload.text_query, page_size=payload.page_size)
    places = response.get("places", [])
    imported, updated = ingest_places_payload(db, places)
    db.commit()
    return PlacesIngestResponse(imported=imported, updated=updated, total_places=len(places))
