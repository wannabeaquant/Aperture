from types import SimpleNamespace

from app.core.enums import BusinessState, ChannelType, SendEligibility
from app.services.routing import pick_routing_channel


def test_pick_routing_channel_prefers_whatsapp_for_no_website() -> None:
    business = SimpleNamespace(state=BusinessState.NO_WEBSITE)
    contacts = [
        SimpleNamespace(channel=ChannelType.WHATSAPP, send_eligibility=SendEligibility.ELIGIBLE),
        SimpleNamespace(channel=ChannelType.PHONE, send_eligibility=SendEligibility.HOLD),
    ]
    assert pick_routing_channel(business, contacts) == ChannelType.WHATSAPP

