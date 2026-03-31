$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$env:OPENCLAW_CONFIG_PATH = Join-Path $repoRoot "openclaw\\local\\aperture.local.json5"
$env:OPENCLAW_STATE_DIR = Join-Path $repoRoot "openclaw\\state\\local"

New-Item -ItemType Directory -Force -Path $env:OPENCLAW_STATE_DIR | Out-Null
Write-Host "Using OpenClaw config:" $env:OPENCLAW_CONFIG_PATH
Write-Host "Using OpenClaw state dir:" $env:OPENCLAW_STATE_DIR
openclaw models status --json
