$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$python = Join-Path $repoRoot "backend\.venv\Scripts\python.exe"
$logDir = Join-Path $repoRoot "data"
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$logPath = Join-Path $logDir "pipeline_loop_$timestamp.log"

$cities = @(
  "Gurugram",
  "Delhi",
  "Noida",
  "Greater Noida",
  "Faridabad",
  "Ghaziabad",
  "Mumbai",
  "Navi Mumbai",
  "Thane",
  "Pune",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad"
) -join ","

$categories = @(
  "dentist",
  "salon",
  "coaching centre",
  "skin clinic",
  "interior designer",
  "law firm",
  "chartered accountant"
) -join ","

$maxCards = 3
$sleepSeconds = 900

New-Item -ItemType Directory -Force -Path $logDir | Out-Null

Write-Host "Aperture continuous pipeline loop"
Write-Host "Log:" $logPath
Write-Host "Cities:" $cities
Write-Host "Categories:" $categories
Write-Host "Max cards/query:" $maxCards
Write-Host "Sleep between passes:" $sleepSeconds "seconds"

Set-Location $repoRoot

while ($true) {
  $started = Get-Date
  Add-Content -Path $logPath -Value ("=== PASS START {0} ===" -f $started.ToString("s"))
  & $python -m app.cli ingest-maps-web-pipeline-matrix $cities $categories --max-cards $maxCards *>> $logPath
  $exitCode = $LASTEXITCODE
  $finished = Get-Date
  Add-Content -Path $logPath -Value ("=== PASS END {0} exit={1} ===" -f $finished.ToString("s"), $exitCode)
  Start-Sleep -Seconds $sleepSeconds
}
