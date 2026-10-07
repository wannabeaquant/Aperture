# Task Contract: Public Company and Aperture Ops Verification

## 1) Task

- Title: Make Aperture's public website easy to verify
- Owner: Atharva Singh
- Date: 2026-10-07
- Scope: Add a focused Aperture Ops product page and homepage section, link it from the existing site navigation, publish confirmed founder/company/contact/deployment facts, and reconcile public operating dates.
- Out of scope: Backend changes, fabricated legal registration, unsupported integrations or capabilities. Atharva explicitly authorized the website push and production deployment.

## 2) Implementation Decisions

- Final approach: Keep the static HTML/CSS site; add `ops.html`, use original supervisor screenshots without editing, add a homepage product section, and update the shared site navigation/contact/date copy.
- Alternatives considered: Reworking the full services site; rejected because a focused Ops page directly supplies product and company verification.
- Dependencies impacted: Static site output under `website/`; Vercel clean URL routing.

## 3) Acceptance Criteria

- [x] `/ops` is reachable from desktop and mobile navigation and from the homepage.
- [x] Product page describes only confirmed calling, recording/transcript, QA, supervisor, ERP, and reporting workflows.
- [x] Public company facts name both founders, operating start date (15 June 2026), company-domain email, and the public founder profile.
- [x] Live deployment statement is bounded to one paying BPO customer and seven starter seats since 15 September 2026.
- [x] Site no longer says “Est. 2025” or exposes personal/old Gmail contact addresses.
- [x] Organization structured data and canonical metadata are present.
- [x] Screenshots remain pixel-identical to the source files.

## 4) Verification Commands

### Website

- [x] Manual HTML/CSS inspection and `git diff --check`.
- [x] Real browser check of `/`, `/ops`, and mobile navigation at desktop and 375px widths.
- [x] Screenshot evidence captured and inspected. No warning/error logs on the checked pages. HTTP 200 verified for all six pages, robots, sitemap and both screenshot assets.

## 5) Completion Record

- Summary of changes: Added the Aperture Ops product page and homepage entry, updated navigation/contact/date copy, added organization metadata and sitemap entries, and copied two original UI screenshots byte-for-byte.
- Production: https://www.aperturecm.in/ops; Vercel deployment dpl_BMvb6oFVTFeZgbQQM54eKz4pahSH is READY and aliased to the production domain. Source commit 4e1608e pushed to origin/main.
- Evidence: C:/CS/Agency/outputs/aperture-funding-2026-10-04/ops-live-desktop-2026-10-07.jpg and ops-mobile-preview-2026-10-07.jpg.
- Known risks: Anthropic acceptance remains discretionary. The operating date does not represent legal incorporation. No Claude production integration claim was made because repository evidence identifies Groq as the current default AI provider.
- Follow-ups: Corrected Claude application and any subsequent verification request.

## Retro

- What worked: A static product page supplied direct product and founder evidence without replacing the site's services pages; original screenshots were copied with matching hashes.
- What failed: The prior application narrative had no corresponding public product page and conflicted with the site's establishment year.
- Root cause: Application evidence and public website identity were not reconciled before applying.
- Repeatable rule candidate: Check public product, founder, contact and operating-date consistency before submitting a startup application.
- Promote to skill candidate: No.
