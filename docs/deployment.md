# Deployment

## Recommended v1 topology

- 1 VPS
- PostgreSQL and Redis on the same box or managed externally
- Aperture API and workers as Python services
- OpenClaw Gateway as a separate service on the same host

## Services

- `aperture-api`
- `aperture-worker`
- `aperture-openclaw`
- `postgres`
- `redis`

## Boot order

1. PostgreSQL
2. Redis
3. OpenClaw
4. Aperture API
5. Aperture worker

## Health checks

- `GET /health`
- `GET /providers/openclaw`
- `openclaw models status --check`

## Initial host checklist

- authenticate OpenClaw with Codex and Copilot on the host
- verify Twilio WhatsApp sender setup
- verify SES domain auth
- set `.env`
- run Alembic migrations

