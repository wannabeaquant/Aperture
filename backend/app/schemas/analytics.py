from __future__ import annotations

from pydantic import BaseModel


class AnalyticsSummary(BaseModel):
    businesses: int
    campaigns: int
    drafts: int
    sends: int
    replies: int
    interested_replies: int
    sales_tasks_open: int

