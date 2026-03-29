# Aperture Setup

## Host prerequisites

- Python 3.12+
- PostgreSQL
- Redis
- Node 22+
- `openclaw` installed on the host

## OpenClaw

Run the OpenClaw onboarding flows on the host machine:

```bash
openclaw onboard --auth-choice openai-codex
openclaw models auth login --provider openai-codex
openclaw models auth login --provider github-copilot
openclaw models status --json
```

Store the resulting OpenClaw config path in `APERTURE_OPENCLAW_CONFIG` if you keep it outside the default host location.

## Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -e ..[dev]
uvicorn app.main:app --reload --host 0.0.0.0 --port 8080
```

## Workers

```bash
python -m dramatiq app.workers.tasks
```

## Docker dependencies

```bash
docker compose -f ops/docker/docker-compose.yml up -d
```

