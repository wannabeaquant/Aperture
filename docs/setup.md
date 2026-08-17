# Aperture Setup

## Host prerequisites

- Python 3.12+
- PostgreSQL
- Redis
- Node 22+

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

