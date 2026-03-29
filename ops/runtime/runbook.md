# Runtime Runbook

## OpenClaw

- confirm the binary is installed
- confirm `openclaw models status --json` succeeds on the host
- if it hangs or degrades, Aperture should still accept discovery data but pause AI-dependent queues

## API

- `uvicorn app.main:app --host 0.0.0.0 --port 8080`

## Workers

- `python -m dramatiq app.workers.tasks`

