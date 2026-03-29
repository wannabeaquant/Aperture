"""sales tasks"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision = "20260329_02"
down_revision = "20260329_01"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "sales_tasks",
        sa.Column("business_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("reply_event_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("status", sa.String(length=64), nullable=False),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(["business_id"], ["businesses.id"], name="fk_sales_tasks_business_id_businesses", ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["reply_event_id"], ["reply_events.id"], name="fk_sales_tasks_reply_event_id_reply_events", ondelete="SET NULL"),
        sa.PrimaryKeyConstraint("id", name="pk_sales_tasks"),
    )


def downgrade() -> None:
    op.drop_table("sales_tasks")

