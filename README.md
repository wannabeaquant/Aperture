# Aperture

Aperture is an India-focused outbound agency engine that discovers SMB leads, enriches them with evidence-backed digital opportunities, routes them into compliant campaigns, and uses OpenClaw as the primary agent runtime for enrichment, drafting, and browser-assisted audits.

## Stack

- FastAPI
- PostgreSQL
- Redis + Dramatiq
- OpenClaw
- Amazon SES
- Twilio WhatsApp
- Google Places API (New)

## Quick start

1. Copy `ops/.env.example` to `.env`.
2. Update the provider credentials you actually have.
3. Start the local services with Docker Compose.
4. Run `openclaw` onboarding on the host.
5. Start the API and worker processes.

Detailed setup is in [docs/setup.md](docs/setup.md).

