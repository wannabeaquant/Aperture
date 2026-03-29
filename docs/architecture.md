# Architecture

Aperture keeps state and campaign safety in deterministic backend code and delegates agentic tasks to OpenClaw.

## Deterministic layer

- persistence
- dedupe
- campaign lifecycle
- suppression and cooldown
- provider webhooks
- send caps
- analytics

## Agentic layer

- lead enrichment
- contact discovery
- site audit
- draft generation
- reply classification

## OpenClaw integration

- Health is probed via `openclaw models status --json`
- Agent turns are executed via `openclaw agent --json`
- Provider fallback is managed by OpenClaw model aliases, not by the backend assuming hardcoded model names

