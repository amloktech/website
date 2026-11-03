# Mobile responsiveness review, 2 November 2026

Reviewed the local website using the in-app browser with viewport emulation. The route sweep includes 90 indexed pages plus the brand page, at widths of 320, 390, 430 and 768 CSS pixels. All 364 final layout checks had a main heading and no page-wide horizontal overflow. Results are recorded in mobile-responsive-checks.json.

## Fixes

- Enforced 16px mobile text-entry and select text, including research filters, contact fields, search and language selectors. This addresses the small input text associated with focus zoom on iPhones; physical-device behavior remains to be tested.
- Enlarged research search, search clearing, blog clearing and pagination, simulation sliders and reset actions, publication print and figure-data controls to at least 44px touch areas.
- Replaced the tiny one-line footer legal list with a readable two-column arrangement. Copyright has its own row. Footer navigation and language controls have 44px targets.
- Wrapped module section navigation on small phones, keeping every anchor visible and tappable.
- Gave expanded publication figure-data tables their own labeled, keyboard-focusable horizontal scrolling regions. Existing long research tables already scroll within their containers.

## Interaction checks

- Opened mobile navigation, expanded Resources, navigated to Research, and confirmed the menu visually closed.
- Expanded Solutions and verified the long menu has independent vertical scrolling.
- Opened search, searched for mortgage, reviewed results, dismissed with Escape and checked body scrolling was restored.
- Searched research for mortgage, cleared the search and filtered to Whitepaper; verified the matching results.
- Searched blog posts for cash and verified the matching results.
- Changed simulation inputs, verified recalculated output, reset values and switched to the consumer example.
- Selected the Mortgage industry tab and checked the matching content and layout.
- Expanded publication figure data and verified the labeled scrolling container.
- Inspected mobile contact field sizing and footer link sizing.

## Validation and limits

Production build, TypeScript checks, internal links, anchors, sitemap URLs, assets, canonical URLs, headings and publication evidence checks pass. A viewport sweep measures page layout, not every possible interactive state. Representative templates and interactions received focused visual review. This is not physical-device Safari/Chrome, assistive-technology, virtual-keyboard, Cal.com booking-completion, or performance testing. No bookings, emails or external form submissions were made. Changes are local.

The follow-up copy review renames the footer Brand guidelines link to Brand Kit and removes em dashes from website text and cover metadata. Source URLs and numeric date ranges are preserved.
