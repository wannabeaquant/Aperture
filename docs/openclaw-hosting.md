# Dedicated OpenClaw Hosting

Do not point Aperture at a personal desktop OpenClaw runtime. Run a dedicated OpenClaw host for the agency.

## Recommended shape

- one VPS for the Aperture app stack
- OpenClaw installed on that same VPS as a separate service user
- separate OpenClaw config, auth state, channels, and logs from any personal setup

## Why

- isolates customer outreach from personal sessions and channels
- makes provider health and auth state predictable
- lets you rotate Copilot or Codex auth without touching your personal assistant
- keeps WhatsApp and other outreach channels scoped to the agency runtime

## Host setup

1. Create a dedicated UNIX user such as `aperture`.
2. Install Node 22+ and `openclaw`.
3. Store runtime config under `/home/aperture/.openclaw/`.
4. Run:

```bash
openclaw onboard --auth-choice openai-codex
openclaw models auth login --provider openai-codex
openclaw models auth login --provider github-copilot
```

5. Install the Gateway daemon or run it under `systemd`.

## Aperture app config

Set:

- `APERTURE_OPENCLAW_COMMAND=openclaw`
- `APERTURE_OPENCLAW_CONFIG=/home/aperture/.openclaw/openclaw.json`
- `APERTURE_OPENCLAW_HOST_LABEL=agency-openclaw-vps`

The backend will treat this host runtime as the agency OpenClaw instance.

