# Lightsail Setup

## Goal

Deploy a separate agency runtime for Aperture on one AWS Lightsail VPS.

## Step 1: Create the Lightsail instance

1. Sign in to AWS and open Lightsail.
2. Click `Create instance`.
3. Choose a region close to India users. `Mumbai` is the default choice.
4. Platform: `Linux/Unix`.
5. Blueprint: `OS Only` and pick `Ubuntu 24.04 LTS` if available.
6. Pick the smallest bundle you are comfortable with.

Recommended:
- testing: `2 GB RAM` bundle
- absolute minimum: `1 GB RAM`, but expect tighter limits

7. Name the instance `aperture-vps`.
8. Create the instance.

## Step 2: Attach a static IP

1. In Lightsail, open `Networking`.
2. Create a static IP.
3. Attach it to `aperture-vps`.

Do this early so you do not have to change DNS later.

## Step 3: Open the firewall

In the Lightsail networking tab, allow:
- `22` for SSH
- `80` for HTTP
- `443` for HTTPS
- `8080` temporarily for raw API testing if needed

Later, put the API behind Nginx or Caddy and close direct public access to `8080`.

## Step 4: Connect to the box

From the Lightsail browser terminal or your local shell:

```bash
ssh ubuntu@YOUR_STATIC_IP
```

If Lightsail created a default key pair, use that.

## Step 5: Install base packages

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y git curl unzip build-essential pkg-config libpq-dev redis-server postgresql postgresql-contrib
```

## Step 6: Install Python 3.12

If Ubuntu already includes Python `3.12`, use it. Then install:

```bash
sudo apt install -y python3 python3-venv python3-pip
python3 --version
```

## Step 7: Install Node 22

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node --version
npm --version
```

## Step 8: Create the PostgreSQL database

```bash
sudo -u postgres psql
```

Inside `psql`:

```sql
CREATE USER aperture WITH PASSWORD 'CHANGE_ME';
CREATE DATABASE aperture OWNER aperture;
\q
```

## Step 9: Clone the repo

```bash
cd /opt
sudo git clone https://github.com/wannabeaquant/Aperture.git
sudo chown -R $USER:$USER /opt/Aperture
cd /opt/Aperture
```

## Step 10: Create the Python environment

```bash
cd /opt/Aperture/backend
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -e ..[dev]
```

## Step 11: Create `.env`

```bash
cd /opt/Aperture
cp ops/.env.example .env
```

Then fill in the provider values. Use the provider setup guide in [provider-setup.md](C:\CS\Agency\Aperture\docs\provider-setup.md).

## Step 12: Run migrations

```bash
cd /opt/Aperture/backend
source .venv/bin/activate
alembic upgrade head
```

## Step 13: Smoke test the API

```bash
cd /opt/Aperture/backend
source .venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8080
```

From your machine:

```bash
curl http://YOUR_STATIC_IP:8080/health
```

## Step 14: Start the worker

In a second shell:

```bash
cd /opt/Aperture/backend
source .venv/bin/activate
python -m dramatiq app.workers.tasks
```

## Step 15: Make it persistent

After the app works manually, add systemd services for:
- `aperture-api`
- `aperture-worker`

## Recommended first smoke tests

1. `GET /health`
2. small Places ingest for one city and one category
3. one enrichment run
4. one SES sandbox email send
5. one Twilio WhatsApp sandbox send
