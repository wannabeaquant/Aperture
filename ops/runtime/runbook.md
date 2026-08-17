# Runtime Runbook

## API

- `uvicorn app.main:app --host 0.0.0.0 --port 8080`

## Workers

- `python -m dramatiq app.workers.tasks`

