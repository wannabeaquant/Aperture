from unittest.mock import MagicMock

from app.services.analytics import build_summary


class QueryStub:
    def __init__(self, value: int):
        self.value = value

    def scalar(self) -> int:
        return self.value

    def filter(self, *args, **kwargs):  # type: ignore[no-untyped-def]
        return self


def test_build_summary_counts() -> None:
    db = MagicMock()
    db.query.side_effect = [
        QueryStub(5),
        QueryStub(2),
        QueryStub(3),
        QueryStub(4),
        QueryStub(6),
        QueryStub(1),
        QueryStub(2),
    ]
    summary = build_summary(db)
    assert summary.businesses == 5
    assert summary.sales_tasks_open == 2

