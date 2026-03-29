from __future__ import annotations

from fastapi import FastAPI

from app.admin.dashboard import router as admin_router
from app.api.routes.actions import router as actions_router
from app.api.routes.campaigns import router as campaigns_router
from app.api.routes.drafts import router as drafts_router
from app.api.routes.health import router as health_router
from app.api.routes.leads import router as leads_router
from app.api.routes.providers import router as providers_router
from app.api.routes.replies import router as replies_router
from app.api.routes.webhooks import router as webhooks_router
from app.core.config import get_settings
from app.core.db import engine
from app.models import Base


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(title="Aperture", version="0.1.0", debug=settings.env == "development")
    app.include_router(health_router)
    app.include_router(leads_router)
    app.include_router(actions_router)
    app.include_router(campaigns_router)
    app.include_router(drafts_router)
    app.include_router(replies_router)
    app.include_router(providers_router)
    app.include_router(webhooks_router)
    app.include_router(admin_router)

    @app.on_event("startup")
    def startup() -> None:
        if not settings.skip_db_init:
            Base.metadata.create_all(bind=engine)

    return app


app = create_app()
