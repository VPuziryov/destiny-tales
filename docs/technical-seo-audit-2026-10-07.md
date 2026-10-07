# Destiny Tales: technical SEO audit — 7 October 2026

## Scope and architecture

Repository: `VPuziryov/destiny-tales`, original main commit `df6f721738b84ca0db91e5f634dcb626e1547ff1`.
A small static HTML/CSS/JavaScript site served by Netlify behind Cloudflare. No build framework or package-based test suite. `/` chooses a language in JavaScript. RU/EN home and library pages coexist with a Vietnamese book page. Book and story readers swap a single image in JavaScript. Stripe thank-you pages are intentionally noindex. No AGENTS.md or deployment configuration was present in the checkout.

## Priorities before changes

### Critical to the stated goal

- The full text of «Самая прекрасная сказка о настоящей любви» was absent from HTML. Only its heading, author/year, controls and links were available. Its seven pages were images; only the first was present in initial HTML. The downloadable story PDF also had no extractable text. Rendering JavaScript does not turn pixels into a dependable HTML literary text. Search engines may perform image recognition, but full-text indexing cannot be assumed.

### Desirable

- `/robots.txt` and `/sitemap.xml` both returned HTTP 404. Missing robots.txt alone does not block indexing; a sitemap helps discover this small site's public pages.
- RU library lacked a description and canonical; the story reader lacked a canonical. `/ru/library.html` and `/ru/library` both returned 200. Canonical hints consolidate equivalent URLs without forcing new routing.
- Existing hreflang incorrectly grouped the Vietnamese book with home, library and letters pages. It should connect equivalent translations, not arbitrary pages with the same language.
- Root was empty without JavaScript and marked noindex,nofollow. Language storage access could throw, and an arbitrary saved language could produce an invalid redirect.
- Letters pages existed but were not linked from their libraries. RU book and letters pages needed simple return links; the story's return link was only revealed after the final image.

### Leave unchanged

- Existing editorial titles, descriptions and the deliberate Facebook story teaser «Бывает, он думает о ней…». Its blank OG description is an editorial social-preview choice, not a Google crawling blocker. Open Graph is for previews, not a replacement for literary text.
- The image reader layout, assets, authored literary wording, checkout links and existing reader analytics.
- Thank-you pages remain noindex and are excluded from sitemap. They have legacy missing decorative image paths and a `LINK_TO_ZIP_FILE` placeholder on thanks-women-art.html; these are separate fulfillment issues, not organic-indexing work. They were not changed.
- No new SEO landing pages, keyword stuffing, fake ratings, invented publication dates, automatic lastmod refreshes, ranking promises, or broad redesign.

## Changes

- Added one public HTML reading alternative, `/ru/samaya-prekrasnaya-skazka-text.html`, linked visibly from the original reader. Full text is visible to everyone, with no CSS hiding, bot detection or dependence on JavaScript. It uses existing site styles and a readable mobile text width. Each reading representation has its own canonical; Google can choose to consolidate equivalent content. The text URL is the dependable full-text entry point; the illustrated URL's HTML still does not contain the full story.
- Text comes from pages labelled 15–21 of the supplied text-bearing trilogy PDF. Removed printed title duplication, page numbers, separator line and layout whitespace only; preserved words, punctuation and author timestamp, including existing spelling. Compared the story images visually with this source. Automated comparison confirms HTML text equals source after whitespace normalization.
- Added canonical/description where absent and basic OG previews to both libraries. Existing metadata on other pages retained.
- Corrected reciprocal hreflang pairs: RU/EN home, RU/EN library, RU/EN letters, RU/VI Asia book. Ordinary language-navigation links remain available even when destinations are not translations.
- Added robots.txt allowing crawling and referencing sitemap.xml. Sitemap contains ten canonical public HTML URLs, no payment pages and no fabricated lastmod dates.
- Root retains noindex but permits following links, includes ordinary language links, guards localStorage access and validates the saved language. Its normal language-selection behavior remains intact.
- Added minimal internal links for existing letters and return-to-library navigation. Story image alt now names the work plus current page; it does not pretend to transcribe the story.
- Added truthful ShortStory schema for the story and Book schema for RU/VI Asia editions. Story uses dateCreated (the author timestamp), not an invented web publication date. Schema is descriptive, optional, and does not guarantee a Google rich result or supply missing text.

## Other books

«Азия. Женщины» RU and VI readers also use image pages. Unlike the story PDF, their already-linked PDFs contain extractable Russian/Vietnamese text (roughly 40 KB and 35 KB respectively). The reader HTML contains introductory/excerpt text but not the full book. No additional full-text pages were added. Indexing of the PDFs remains a Search Console check, not an assumption.

## Live observations and validation

- Story, RU library, RU Asia book, EN home, VI book and root returned HTTP 200 using curl. A deliberately nonexistent path returned 404 (no observed soft-404 fallback).
- `/ru/index.html` and `/ru/library` also returned 200: canonical hints are needed for duplicate routes.
- Deployed source differs from repository only in inspected rewritten HTML links (Netlify-style pretty URLs), not literary content.
- HTTP-only and www variants could not be independently verified through the execution network; do not interpret transport restrictions as a site failure. Verify their redirect to the chosen HTTPS non-www host in Search Console or an ordinary browser.
- All public HTML pages have a language attribute, viewport, title, description and canonical after changes. Local public href/src paths and OG image paths were checked. Sitemap XML and JSON-LD parse successfully; text/source equality and JavaScript syntax were checked.
- Existing reader has responsive CSS and viewport; the text version uses a fluid width and type. Browser rendering tests could not run because this environment lacks the Playwright Chromium executable. No claim of device-based layout verification is made.
- Public web search surfaced RU/EN homes, EN library and the Vietnamese page. Exact story URL/title searches returned no result. This is evidence of public discoverability, not proof of complete Google index coverage or proof the story is absent from Google's index.

## One-time owner actions in Google Search Console

1. Use the Domain property for destiny-tales.ru; if not verified, add Google's supplied DNS TXT record in the actual DNS account.
2. After deployment, submit `https://destiny-tales.ru/sitemap.xml`.
3. Inspect both story URLs, RU library and RU/VI book URLs. Run the live test, inspect rendered HTML, HTTP/indexing status, robots/noindex and Google's selected canonical. Request indexing for the new text page and changed key pages once.
4. Inspect the already-linked RU/VI book PDFs if full-book discovery is desired; confirm they are not blocked by response headers.
5. Verify HTTP/www host redirection and HTTPS canonical consistency; changes at Cloudflare/Netlify require their actual configuration, not speculative repository rewrites.
6. Review Page indexing after Google recrawls. Check blocked/noindex/duplicate reasons in context; expected thank-you/root exclusions are normal. Sitemap submission and successful live tests do not guarantee indexing or rankings.
7. No recurring SEO production is needed. Keep real new works linked from the library and add their canonical URLs to sitemap when actually published.

## References

- Google JavaScript SEO: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google spam policies: https://developers.google.com/search/docs/essentials/spam-policies
- Schema.org ShortStory: https://schema.org/ShortStory

The public text alternative provides genuine reading/accessibility value and preserves the image reader. It is not hidden text for search engines.
