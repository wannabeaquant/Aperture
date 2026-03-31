from __future__ import annotations

from enum import Enum


class BusinessState(str, Enum):
    NO_WEBSITE = "NO_WEBSITE"
    HAS_WEBSITE_WEAK = "HAS_WEBSITE_WEAK"
    HAS_WEBSITE_OK = "HAS_WEBSITE_OK"


class ServiceLane(str, Enum):
    NEW_WEB_PRESENCE = "new_web_presence"
    WEBSITE_REBUILD_CRO = "website_rebuild_cro"
    LOCAL_SEO_MAPS = "local_seo_maps"
    AI_AUTOMATION = "ai_automation"
    LEAD_CAPTURE_BOOKING = "lead_capture_booking"


class ChannelType(str, Enum):
    EMAIL = "email"
    PHONE = "phone"
    WHATSAPP = "whatsapp"
    CONTACT_FORM = "contact_form"
    SOCIAL_DM = "social_dm"
    CALL_REVIEW = "call_review"


class VerificationStatus(str, Enum):
    UNVERIFIED = "unverified"
    OBSERVED_PUBLIC = "observed_public"
    VERIFIED_LIVE = "verified_live"
    INVALID = "invalid"


class SendEligibility(str, Enum):
    ELIGIBLE = "eligible"
    HOLD = "hold"
    BLOCKED = "blocked"


class SourceType(str, Enum):
    GOOGLE_PLACES = "google_places"
    GOOGLE_MAPS_WEB = "google_maps_web"
    WEBSITE = "website"
    JUSTDIAL = "justdial"
    INDIAMART = "indiamart"
    SOCIAL = "social"
    SEARCH = "search"


class CampaignChannel(str, Enum):
    EMAIL = "email"
    WHATSAPP = "whatsapp"


class CampaignStatus(str, Enum):
    DRAFT = "draft"
    READY = "ready"
    RUNNING = "running"
    PAUSED = "paused"
    COMPLETED = "completed"


class ProviderKind(str, Enum):
    OPENCLAW = "openclaw"
    SES = "ses"
    TWILIO = "twilio"


class ProviderHealth(str, Enum):
    HEALTHY = "healthy"
    DEGRADED = "degraded"
    OFFLINE = "offline"


class AIRunJobType(str, Enum):
    LEAD_ENRICHMENT = "lead_enrichment"
    CONTACT_DISCOVERY = "contact_discovery"
    SITE_AUDIT = "site_audit"
    DRAFT_EMAIL = "draft_email"
    DRAFT_WHATSAPP = "draft_whatsapp"
    REPLY_CLASSIFIER = "reply_classifier"
    OPPORTUNITY_SCORING = "opportunity_scoring"


class AIRunStatus(str, Enum):
    PENDING = "pending"
    SUCCEEDED = "succeeded"
    FAILED = "failed"


class MessageDirection(str, Enum):
    OUTBOUND = "outbound"
    INBOUND = "inbound"


class ReplyIntent(str, Enum):
    INTERESTED = "interested"
    NOT_NOW = "not_now"
    NOT_RELEVANT = "not_relevant"
    WRONG_CONTACT = "wrong_contact"
    UNSUBSCRIBE = "unsubscribe"
    HOSTILE = "hostile"
    SPAM_SIGNAL = "spam_signal"
    UNKNOWN = "unknown"


class SuppressionReason(str, Enum):
    UNSUBSCRIBE = "unsubscribe"
    COMPLAINT = "complaint"
    GLOBAL_BLOCK = "global_block"
    CHANNEL_BLOCK = "channel_block"
    COOLDOWN = "cooldown"
