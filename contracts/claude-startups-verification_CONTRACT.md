# Task Contract: Public Company and Aperture Ops Verification

## 1) Task

- Title: Make Aperture's public website easy to verify
- Owner: Atharva Singh
- Date: 2026-10-07
- Scope: Add a focused Aperture Ops product page and homepage section, link it from the existing site navigation, publish confirmed founder/company/contact/deployment facts, and reconcile public operating dates.
- Out of scope: Backend changes, fabricated legal registration, unsupported integrations or capabilities, deployment, commits, and pushes.

## 2) Implementation Decisions

- Final approach: Keep the static HTML/CSS site; add `ops.html`, use original supervisor screenshots without editing, add a homepage product section, and update the shared site navigation/contact/date copy.
- Alternatives considered: Reworking the full services site; rejected because a focused Ops page directly supplies product and company verification.
- Dependencies impacted: Static site output under `website/`; Vercel clean URL routing.

## 3) Acceptance Criteria

- [ ] `/ops` is reachable from desktop and mobile navigation and from the homepage.
- [ ] Product page describes only confirmed calling, recording/transcript, QA, supervisor, ERP, and reporting workflows.
- [ ] Public company facts name both founders, operating start date (15 June 2026), company-domain email, and the public founder profile.
- [ ] Live deployment statement is bounded to one paying BPO customer and seven starter seats since 15 September 2026.
- [ ] Site no longer says “Est. 2025” or exposes personal/old Gmail contact addresses.
- [ ] Organization structured data and canonical metadata are present.
- [ ] Screenshots remain pixel-identical to the source files.

## 4) Verification Commands

### Website

- [x] Manual HTML/CSS inspection and `git diff --check`.
- [ ] Real browser check of `/`, `/ops`, and mobile navigation at desktop and 375px widths.
- [ ] Screenshot evidence captured and inspected.

## 5) Completion Record

- Summary of changes: Added the Aperture Ops product page and homepage entry, updated navigation/contact/date copy, added organization metadata and sitemap entries, and copied two original UI screenshots byte-for-byte.
- Known risks: Real-browser verification remains with the parent agent; no Claude integration claim was made because repository evidence identifies Groq as the current default AI provider.
- Follow-ups: Parent handles final deployment and application submission.
