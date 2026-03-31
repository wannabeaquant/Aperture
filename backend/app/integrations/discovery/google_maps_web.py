from __future__ import annotations

import re
from dataclasses import dataclass

from playwright.async_api import async_playwright


RATING_RE = re.compile(r"^(\d\.\d)\(([\d,]+)\)$")
PHONE_RE = re.compile(r"(?:\+91[\s-]?)?(?:0)?[6-9]\d{9}|\b0\d{2,4}[\s-]?\d{6,8}\b")


@dataclass(slots=True)
class GoogleMapsCard:
    query: str
    name: str
    text: str
    website: str
    place_url: str
    phone: str
    category: str | None = None
    city: str | None = None
    subcategory: str | None = None
    address: str | None = None
    rating: str | None = None
    reviews: str | None = None


def _clean_text(value: str) -> str:
    return re.sub(r"\s+", " ", (value or "")).strip()


def _normalize_phone(phone: str) -> str:
    digits = re.sub(r"\D", "", phone)
    if len(digits) == 12 and digits.startswith("91"):
        digits = digits[2:]
    if len(digits) == 10 and digits[0] in "6789":
        return f"+91 {digits}"
    if digits.startswith("0") and len(digits) >= 10:
        return digits
    return _clean_text(phone)


def parse_card_text(text: str) -> dict[str, str]:
    lines = [line.strip() for line in (text or "").splitlines() if line.strip()]
    rating = ""
    reviews = ""
    subcategory = ""
    address = ""
    phone = ""

    if len(lines) > 1:
        match = RATING_RE.match(lines[1])
        if match:
            rating = match.group(1)
            reviews = match.group(2)

    if len(lines) > 2:
        parts = [part.strip() for part in lines[2].replace("Â·", "·").split("·") if part.strip()]
        if parts:
            subcategory = parts[0]
            if len(parts) > 1:
                address = parts[-1]

    for line in lines[3:7]:
        match = PHONE_RE.search(line)
        if match:
            phone = _normalize_phone(match.group(0))
            break

    return {
        "rating": rating,
        "reviews": reviews,
        "subcategory": subcategory,
        "address": address,
        "phone": phone,
    }


class GoogleMapsWebClient:
    async def search(self, *, text_query: str, max_cards: int = 10) -> list[GoogleMapsCard]:
        async with async_playwright() as playwright:
            browser = await playwright.chromium.launch(headless=True)
            page = await browser.new_page()
            try:
                await page.goto(f"https://www.google.com/maps/search/{text_query.replace(' ', '+')}")
                await page.wait_for_timeout(3500)
                try:
                    for _ in range(2):
                        await page.mouse.wheel(0, 5000)
                        await page.wait_for_timeout(1200)
                except Exception:
                    pass

                cards = await page.evaluate(
                    """({ query, maxCards }) => {
                        const phoneRe = /(\\+?91[\\s-]?)?(?:0)?[6-9]\\d{9}|\\b0\\d{2,4}[\\s-]?\\d{6,8}\\b/;
                        return Array.from(document.querySelectorAll('div[role="article"]')).slice(0, maxCards).map(card => {
                            const text = (card.innerText || '').trim();
                            const websiteLink = Array.from(card.querySelectorAll('a')).find(a => /Website/i.test(a.textContent || ''));
                            const placeLink = card.querySelector('a[href*="/maps/place/"]');
                            const match = text.match(phoneRe);
                            return {
                                query,
                                name: card.querySelector('.qBF1Pd')?.textContent?.trim() || card.getAttribute('aria-label') || '',
                                text,
                                website: websiteLink ? websiteLink.href : '',
                                place_url: placeLink ? placeLink.href : '',
                                phone: match ? match[0].trim() : ''
                            };
                        });
                    }""",
                    {"query": text_query, "maxCards": max_cards},
                )
            finally:
                await browser.close()

        results: list[GoogleMapsCard] = []
        for card in cards:
            parsed = parse_card_text(card.get("text", ""))
            results.append(
                GoogleMapsCard(
                    query=text_query,
                    name=_clean_text(card.get("name", "")),
                    text=card.get("text", ""),
                    website=card.get("website", ""),
                    place_url=card.get("place_url", ""),
                    phone=parsed["phone"] or _normalize_phone(card.get("phone", "")),
                    subcategory=parsed["subcategory"] or None,
                    address=parsed["address"] or None,
                    rating=parsed["rating"] or None,
                    reviews=parsed["reviews"] or None,
                )
            )
        return results
