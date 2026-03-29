from __future__ import annotations

from fastapi import APIRouter, Depends
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.models.domain import Campaign, ProviderAccount, ReplyEvent, SalesTask, SendAttempt


router = APIRouter(tags=["admin"])


@router.get("/admin", response_class=HTMLResponse)
def dashboard(db: Session = Depends(get_db)) -> str:
    campaign_count = db.query(Campaign).count()
    send_count = db.query(SendAttempt).count()
    reply_count = db.query(ReplyEvent).count()
    task_count = db.query(SalesTask).filter(SalesTask.status == "open").count()
    provider_rows = db.query(ProviderAccount).order_by(ProviderAccount.provider_name.asc()).all()
    providers = "".join(
        f"<li><strong>{row.provider_name}</strong>: {row.health.value} ({row.default_model or 'n/a'})</li>"
        for row in provider_rows
    ) or "<li>No provider health rows yet.</li>"
    return f"""
    <html>
      <head><title>Aperture Admin</title></head>
      <body>
        <h1>Aperture</h1>
        <p>Campaigns: {campaign_count}</p>
        <p>Sends: {send_count}</p>
        <p>Replies: {reply_count}</p>
        <p>Open sales tasks: {task_count}</p>
        <h2>Provider Health</h2>
        <ul>{providers}</ul>
      </body>
    </html>
    """
