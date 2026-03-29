from app.services.normalization import normalize_domain, normalize_name, normalize_phone


def test_normalize_name() -> None:
    assert normalize_name("Sharma & Sons!") == "sharma and sons"


def test_normalize_phone() -> None:
    assert normalize_phone("+91 98765 43210") == "+919876543210"


def test_normalize_domain() -> None:
    assert normalize_domain("https://www.example.com/contact") == "example.com"

