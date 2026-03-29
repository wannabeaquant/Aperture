from __future__ import annotations

import asyncio

import typer

from app.core.db import session_scope
from app.integrations.discovery.google_places import GooglePlacesClient
from app.models.domain import Campaign
from app.services.campaigns import materialize_campaign_members
from app.services.discovery import ingest_places_payload
from app.services.provider_health import sync_openclaw_health


cli = typer.Typer(help="Aperture management CLI")


@cli.command("sync-openclaw")
def sync_openclaw() -> None:
    with session_scope() as db:
        account = sync_openclaw_health(db)
        typer.echo(f"{account.provider_name}: {account.health.value} ({account.default_model or 'n/a'})")


@cli.command("ingest-places")
def ingest_places(text_query: str, page_size: int = 10) -> None:
    async def _run() -> None:
        client = GooglePlacesClient()
        payload = await client.search_text(text_query=text_query, page_size=page_size)
        with session_scope() as db:
            imported, updated = ingest_places_payload(db, payload.get("places", []))
        typer.echo(f"Imported={imported} Updated={updated}")

    asyncio.run(_run())


@cli.command("launch-campaign")
def launch_campaign(campaign_id: str) -> None:
    with session_scope() as db:
        campaign = db.query(Campaign).filter(Campaign.id == campaign_id).one()
        count = materialize_campaign_members(db, campaign)
        typer.echo(f"Materialized {count} members for {campaign.name}")


if __name__ == "__main__":
    cli()

