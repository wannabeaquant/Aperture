from __future__ import annotations

from typing import Any

import httpx

from app.core.config import Settings, get_settings


class GooglePlacesClient:
    BASE_URL = "https://places.googleapis.com/v1/places:searchText"

    def __init__(self, settings: Settings | None = None) -> None:
        self.settings = settings or get_settings()

    async def search_text(self, *, text_query: str, page_size: int = 10) -> dict[str, Any]:
        if not self.settings.google_places_api_key:
            raise RuntimeError("APERTURE_GOOGLE_PLACES_API_KEY is not configured.")

        headers = {
            "X-Goog-Api-Key": self.settings.google_places_api_key,
            "X-Goog-FieldMask": ",".join(
                [
                    "places.id",
                    "places.displayName",
                    "places.formattedAddress",
                    "places.primaryType",
                    "places.websiteUri",
                    "places.nationalPhoneNumber",
                    "places.internationalPhoneNumber",
                    "places.location",
                ]
            ),
        }
        payload = {"textQuery": text_query, "pageSize": page_size}
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(self.BASE_URL, headers=headers, json=payload)
            response.raise_for_status()
            return response.json()

