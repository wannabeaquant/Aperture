"""add google maps web source type"""

from alembic import op


revision = "20260331_04"
down_revision = "20260329_03"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute("ALTER TYPE sourcetype ADD VALUE IF NOT EXISTS 'google_maps_web'")


def downgrade() -> None:
    pass
