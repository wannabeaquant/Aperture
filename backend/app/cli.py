from __future__ import annotations

import asyncio

import typer

from app.core.db import session_scope
from app.integrations.discovery.google_maps_web import GoogleMapsWebClient
from app.integrations.discovery.google_places import GooglePlacesClient
from app.models.domain import Business, Campaign
from app.services.campaigns import materialize_campaign_members
from app.services.discovery import ingest_maps_web_payload, ingest_maps_web_payload_detailed, ingest_places_payload, ingest_places_payload_detailed
from app.services.drafts import generate_initial_draft_for_routing
from app.services.evidence import build_basic_evidence_pack
from app.services.scoring import compute_score
from app.services.discovery import enrich_business_by_id
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


@cli.command("ingest-maps-web")
def ingest_maps_web(text_query: str, max_cards: int = 10) -> None:
    async def _run() -> None:
        client = GoogleMapsWebClient()
        cards = await client.search(text_query=text_query, max_cards=max_cards)
        with session_scope() as db:
            imported, updated = ingest_maps_web_payload(db, cards)
        typer.echo(f"Imported={imported} Updated={updated} Cards={len(cards)}")

    asyncio.run(_run())


@cli.command("ingest-maps-web-pipeline")
def ingest_maps_web_pipeline(text_query: str, max_cards: int = 10, template_version: str = "v1") -> None:
    async def _run() -> None:
        client = GoogleMapsWebClient()
        cards = await client.search(text_query=text_query, max_cards=max_cards)
        with session_scope() as db:
            outcome = ingest_maps_web_payload_detailed(db, cards)
            drafted = 0
            for business_id in outcome.business_ids:
                await enrich_business_by_id(db, business_id)
                business = (
                    db.query(Business)
                    .filter(Business.id == business_id)
                    .one()
                )
                compute_score(db, business)
                evidence = build_basic_evidence_pack(db, business)
                db.refresh(business)
                draft = generate_initial_draft_for_routing(db, business=business, evidence=evidence, template_version=template_version)
                if draft is not None:
                    drafted += 1
            typer.echo(
                f"Imported={outcome.imported} Updated={outcome.updated} Cards={len(cards)} Businesses={len(outcome.business_ids)} Drafted={drafted}"
            )

    asyncio.run(_run())


@cli.command("ingest-matrix")
def ingest_matrix(cities: str, categories: str, page_size: int = 10) -> None:
    city_list = [city.strip() for city in cities.split(",") if city.strip()]
    category_list = [category.strip() for category in categories.split(",") if category.strip()]

    async def _run() -> None:
        client = GooglePlacesClient()
        total_imported = 0
        total_updated = 0
        for city in city_list:
            for category in category_list:
                payload = await client.search_text(text_query=f"{category} in {city}", page_size=page_size)
                with session_scope() as db:
                    imported, updated = ingest_places_payload(db, payload.get("places", []))
                total_imported += imported
                total_updated += updated
                typer.echo(f"{category} in {city}: imported={imported} updated={updated}")
        typer.echo(f"Total imported={total_imported} updated={total_updated}")

    asyncio.run(_run())


@cli.command("ingest-maps-web-matrix")
def ingest_maps_web_matrix(cities: str, categories: str, max_cards: int = 10) -> None:
    city_list = [city.strip() for city in cities.split(",") if city.strip()]
    category_list = [category.strip() for category in categories.split(",") if category.strip()]

    async def _run() -> None:
        client = GoogleMapsWebClient()
        total_imported = 0
        total_updated = 0
        for city in city_list:
            for category in category_list:
                text_query = f"{category} {city}"
                cards = await client.search(text_query=text_query, max_cards=max_cards)
                with session_scope() as db:
                    imported, updated = ingest_maps_web_payload(db, cards)
                total_imported += imported
                total_updated += updated
                typer.echo(f"{text_query}: imported={imported} updated={updated} cards={len(cards)}")
        typer.echo(f"Total imported={total_imported} updated={total_updated}")

    asyncio.run(_run())


@cli.command("ingest-maps-web-pipeline-matrix")
def ingest_maps_web_pipeline_matrix(cities: str, categories: str, max_cards: int = 10, template_version: str = "v1") -> None:
    city_list = [city.strip() for city in cities.split(",") if city.strip()]
    category_list = [category.strip() for category in categories.split(",") if category.strip()]

    async def _run() -> None:
        client = GoogleMapsWebClient()
        total_imported = 0
        total_updated = 0
        total_drafted = 0
        total_businesses = 0
        for city in city_list:
            for category in category_list:
                text_query = f"{category} {city}"
                cards = await client.search(text_query=text_query, max_cards=max_cards)
                with session_scope() as db:
                    outcome = ingest_maps_web_payload_detailed(db, cards)
                    drafted = 0
                    for business_id in outcome.business_ids:
                        await enrich_business_by_id(db, business_id)
                        business = db.query(Business).filter(Business.id == business_id).one()
                        compute_score(db, business)
                        evidence = build_basic_evidence_pack(db, business)
                        db.refresh(business)
                        draft = generate_initial_draft_for_routing(
                            db,
                            business=business,
                            evidence=evidence,
                            template_version=template_version,
                        )
                        if draft is not None:
                            drafted += 1
                    total_imported += outcome.imported
                    total_updated += outcome.updated
                    total_businesses += len(outcome.business_ids)
                    total_drafted += drafted
                typer.echo(
                    f"{text_query}: imported={outcome.imported} updated={outcome.updated} businesses={len(outcome.business_ids)} drafted={drafted}"
                )
        typer.echo(
            f"Total imported={total_imported} updated={total_updated} businesses={total_businesses} drafted={total_drafted}"
        )

    asyncio.run(_run())


@cli.command("launch-campaign")
def launch_campaign(campaign_id: str) -> None:
    with session_scope() as db:
        campaign = db.query(Campaign).filter(Campaign.id == campaign_id).one()
        count = materialize_campaign_members(db, campaign)
        typer.echo(f"Materialized {count} members for {campaign.name}")


if __name__ == "__main__":
    cli()
