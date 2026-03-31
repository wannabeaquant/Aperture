from app.integrations.discovery.google_maps_web import GoogleMapsCard, parse_card_text


def test_parse_card_text_extracts_subcategory_address_and_phone() -> None:
    text = "\n".join(
        [
            "Smile Studio",
            "4.8(123)",
            "Dental clinic · Sector 15, Noida",
            "Open · +91 9876543210",
        ]
    )
    parsed = parse_card_text(text)
    assert parsed["subcategory"] == "Dental clinic"
    assert parsed["address"] == "Sector 15, Noida"
    assert parsed["phone"] == "+91 9876543210"


def test_google_maps_card_dataclass_keeps_query_context() -> None:
    card = GoogleMapsCard(
        query="dentist Noida",
        name="Smile Studio",
        text="",
        website="https://smilestudio.example",
        place_url="https://maps.google.com/example",
        phone="+91 9876543210",
    )
    assert card.query == "dentist Noida"
