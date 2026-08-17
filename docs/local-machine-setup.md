# Local Machine Setup

## Goal

Run Aperture on your laptop for early validation while keeping it separate from your normal work.

## What is separated

- Aperture has its own project `.env`
- Aperture has its own startup scripts under [ops/windows](C:\CS\Agency\Aperture\ops\windows)

## Files created for local use

- [\.env](C:\CS\Agency\Aperture\.env)
- [bootstrap-local.ps1](C:\CS\Agency\Aperture\ops\windows\bootstrap-local.ps1)
- [start-api.ps1](C:\CS\Agency\Aperture\ops\windows\start-api.ps1)
- [start-worker.ps1](C:\CS\Agency\Aperture\ops\windows\start-worker.ps1)

## First run

From PowerShell in the repo root:

```powershell
powershell -ExecutionPolicy Bypass -File .\ops\windows\bootstrap-local.ps1
```

This will:
- start Postgres and Redis in Docker
- bind them to local ports `5433` and `6380` so they do not collide with existing services on your machine
- create a Python virtual environment under `backend\.venv`
- install Aperture and dev dependencies
- run Alembic migrations

## Start the stack

Open two terminals.

Terminal 1:

```powershell
powershell -ExecutionPolicy Bypass -File .\ops\windows\start-api.ps1
```

Terminal 2:

```powershell
powershell -ExecutionPolicy Bypass -File .\ops\windows\start-worker.ps1
```

Optional Terminal 3 for continuous discovery + enrichment + draft generation:

```powershell
powershell -ExecutionPolicy Bypass -File .\ops\windows\start-pipeline-loop.ps1
```

## Important laptop settings

If you want Aperture to keep running:
- keep the laptop plugged in
- disable sleep while plugged in
- keep Docker Desktop running
- keep the API and worker terminals open

## What you still need to fill in

Before real provider usage, add only the provider values you actually plan to use to [\.env](C:\CS\Agency\Aperture\.env):
- SES credentials when production email sending is enabled
- WhatsApp provider credentials only after explicit compliance checks
- outreach domain
- Google Places API key only if you revive local SMB/place sourcing later

The full variable list is documented in [provider-setup.md](C:\CS\Agency\Aperture\docs\provider-setup.md).