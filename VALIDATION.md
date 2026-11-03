# Validation record

## Theme script hydration warning — 2026-11-04

Moved the synchronous theme initializer to the start of the body, before rendered page content. This prevents a script inserted into the document head by a browser extension from being mistaken for the theme script during React hydration, while retaining early theme initialization.

Reproduced the warning in an isolated Next.js development copy by inserting a non-async script into the head before hydration. The warning was absent after the change in both the running development site and the production build with the same simulated insertion. Lint and production build passed. Chrome checks covered saved and system themes, theme selection before page content, storage failures, toggling and persistence, project routes, and no-JavaScript content. The actual browser extension was not available to the automated test. Scripts are in `.qa`.

## About content and mobile navigation — 2026-11-04

Updated the About and Journey text for fourth-year BSIT studies and added the GRC Connect team capstone, the documented contribution, and its revision status. Added More About Me and Journey categories in the About section and navigation. Mobile About and Projects groups now start collapsed and open when their row is selected.

Lint and the production build passed. Chrome checks covered About category links and tabs, direct links, browser history, mobile disclosure behavior and keyboard focus, project navigation after a disclosure, responsive layouts in both themes from 320 to 1920 pixels, the no-JavaScript content fallback, and client errors. Mobile menus were additionally checked at widths from 320 to 1079 pixels in both themes. Local audit scripts and screenshots are in `.qa`.

## Three project categories and video row — 2026-11-03

Projects now groups web development, mobile application, and video work under matching navigation links and category tabs. The Flutter/Firebase student project appears under Mobile Application; the other three projects appear under Web Development. Video cards form one horizontally scrollable row while retaining all existing filters and dialogs. Project category links preserve browser history when returning from a case study.

Lint and the production build passed. Chrome checks covered direct category links, the desktop and mobile navigation, keyboard controls, Back and Forward, returning from a project case study, video filters and dialogs, scrolling to the last video, and layouts from 320 to 1920 pixels in both themes. The no-JavaScript fallback and absence of client errors were checked. The local audit is in `.qa/three-project-categories-check.mjs`.

## Project categories and single-row collection — 2026-11-03

Web Development and Video Works now switch between their collections inside Projects. The four web projects share one horizontal, keyboard-scrollable row. Existing video filters, dialogs, and the Video Work navigation link remain available. The video entries still use coming-soon placeholders because no video files or links are configured.

Lint and the optimized production build passed. Chrome checks covered desktop and mobile category navigation, direct links, browser history, keyboard controls, video filters and dialogs, reduced viewport widths from 320 to 1920 pixels in both themes, access to the last project card, no document overflow, and the no-JavaScript content fallback. The local audit and screenshots are in `.qa`.

## Scroll text entrances and distinct logo colors — 2026-11-03

Text now slides upward with a staggered fade and brief blur on entering the viewport, and replays after leaving and returning. The home-page text waits for the startup splash to dismiss. Shared section and project text uses the same behavior. Reduced-motion preferences disable these effects, and server-rendered text remains visible without JavaScript. The logo again uses separate bright lavender, periwinkle, and cyan colors, with darker colors for light mode.

Lint, strict TypeScript checking, and the production build passed. Production Chrome verified splash coordination, all seven home sections, repeat entrances, direct section opening, distinct colors in both themes, no horizontal overflow at 320/390/768/1080/1440px, reduced-motion behavior, no-JavaScript visibility, project-page entrances, and no client errors. Settled screenshots were visually reviewed; the audit is in `.qa/text-animation-check.mjs`.

## db.creates branding and readability — 2026-11-03

Changed the navigation, footer, and project-page wordmarks to `db.creates`. The DB marks in navigation, About, and the splash use the hero's violet-to-cyan gradient, with a darker light-theme gradient. Removed C# from the displayed skills. Video cards, the featured reel, and the toolkit now have distinct surfaces, stronger borders/shadows, and larger labels. Body copy, facts, navigation, contact fields, captions, and footer text use larger readable sizes.

Lint, strict TypeScript checking, and production build passed. Production Chrome checks confirmed branding, gradient marks, C# removal, text-size minimums, card shadows, no page/header/skills overflow at 320/360/390/560/768/1080/1200/1360/1440/1920px in both themes and all three skill tabs, video category filtering, media dialog dismissal, keyboard tab navigation, play-icon hover contrast, responsive project branding, and no client errors. Desktop and mobile screenshots of branding, skills, the featured reel, and video cards were visually reviewed. The audit script and screenshots are in `.qa`.

## Loading animation and color themes — 2026-11-03

Added a shared logo loading screen for opening, refreshing, and route loading, navigation icons, and light/dark controls on the home and project pages. Theme selection follows the device preference until a manual choice is saved. The loader supports reduced motion, keyboard dismissal, a maximum wait, and a no-JavaScript fallback.

Lint, strict TypeScript checking, and the production build passed. Eleven production Chrome checks passed for initial/refresh loading, theme colors and persistence, browser theme metadata, responsive layout and navigation at 320/360/375/390/768/1080/1200/1360/1440/1920px in both themes, mobile menu/icons, project-page theme controls, system preference and cross-tab updates, reduced motion, delayed-resource dismissal, no-JavaScript content visibility, unavailable storage, and no client runtime errors. Desktop/mobile loading and light/dark screenshots were reviewed; scripts and screenshots are in the ignored `.qa` directory.

The splash uses the site's existing fallback mark because custom DBCreates artwork is absent from `public/branding`. It will use the supplied monogram, primary logo, or wordmark when the documented branding files are added and the app is rebuilt. Contrast with that future artwork still needs visual verification.

## Personal identity, analytics, and experience update

After the supplied personal profile was incorporated, lint, strict TypeScript checking, and the optimized production build passed. The public identity now emphasizes development first, then business analytics and creative work. The capstone is a team academic project under revision, and ARAT Coffee is the first featured business project.

Twelve production browser checks passed: the exact preferred branding statement, full name and Caloocan location, eight working section anchors, career priorities, project order, confirmed personal interests/professional background, academic Power BI context, three skill tabs with bidirectional Arrow/Home/End navigation, video filtering and dialog focus restoration, contact validation and copied drafts, no document overflow at 320/390/768/1080/1440/1920px in all skill-tab states, mobile menu/Escape, ARAT capability/contribution content, capstone role/revisions/planned-service context and preserved 13-image gallery, personalized Open Graph PNG, and no unexpected client runtime errors.

An independent visual pass reviewed hero, navigation, footer, and the longest rotating role at 320/390/768/1080/1440px. About and Analytics screenshots were also reviewed. The final source change after those browser checks only corrected a project-context sentence to include business projects; lint, TypeScript, and production build were run again afterward.

Remaining content and publication details are listed in `PERSONALIZATION.md`. Actual email delivery and unpublished media/report examples remain outside this verification.

## Enrollment capstone update

GRC Connect now uses 13 supplied system screenshots and the user-provided URL `https://www.grc-enrollment.tech/`. Originals remain in `src/Projects/screenshots-grc-enrollment`; web copies are served from `public/assets/projects/grc-enrollment`.

After this update, `npm run lint`, `npm run typecheck`, and `npm run build` all passed. Production Chrome checks verified the actual homepage cover, live-link destination, case-study route/metadata, all 13 optimized gallery image responses, six gallery category counts, previous/next navigation, expanded-view keyboard controls/Escape/focus restoration, no horizontal overflow at 320/390/768/1440px, and no client runtime errors. Desktop and mobile gallery screenshots were visually reviewed. The external live website could not be fetched from this environment, so its reachability and authenticated workflows remain unverified.

The following record describes the original portfolio validation before these assets were supplied.

Validated locally against the optimized production build on 2026-11-02.

## Passed

- `npm run lint` — no errors or warnings.
- `npm run typecheck` — TypeScript strict checking passes.
- `npm run build` — Next.js production build passes cleanly, with all four project pages statically generated.
- `npm ls --depth=0` — installed dependency tree is consistent.
- Windows and Linux x64 glibc `npm ci --dry-run` — dependency resolution passes; this is not an actual Linux installation.

## Production browser audit

18 checks passed, 0 failed, using Playwright Core with installed Google Chrome:

- All seven home-section anchors exist and match navigation.
- All six video category filters produce the expected gallery contents.
- Media dialog keeps background content inert, supports Escape and backdrop closing, and restores trigger focus.
- Empty contact submission presents four accessible errors and focuses the first field.
- Clipboard and downloaded unsent `.eml` drafts preserve Unicode message content.
- Timeline play, pause, range scrub, and restart work.
- Skills tabs support Arrow keys, Home, and End.
- Mobile navigation exposes all links, wraps keyboard focus, closes with Escape, and closes after choosing an anchor.
- No document overflow at 320, 390, 768, 1024, 1440, or 1920px widths.
- Reduced-motion preference stops ambient CSS animation.
- All four project routes return 200, display the correct content/metadata, and fit a 320px viewport.
- Unknown project slugs return HTTP 404.
- No unexpected console or client runtime errors. The intentional unknown-project request produced the expected 404 console entry.

Desktop and mobile screenshots were also visually reviewed. Local audit scripts/screenshots are in the ignored `.qa` directory.

## HTTP checks

- `POST /api/contact` without service configuration returns 503 with an honest configuration message; `GET` returns 405.
- `/opengraph-image` returns 200 and a valid PNG.
- `/sitemap.xml` returns 200 and lists all five pages, each returning 200.
- `/robots.txt` returns 200 and excludes the API from crawling.
- Favicon and all six original SVG assets return 200 with SVG content types.
- Homepage contains canonical and Open Graph metadata.

## Verification limits

- No email address, credentials, or real media were supplied. Actual email delivery, externally hosted video playback, and replacement assets were not tested. The configured-service branch requires provider credentials and a verified sender domain.
- No Vercel deployment, actual Linux installation, screen-reader session, or physical-device test was performed.
- Network access to npm was blocked. Cached compatible versions were used, including Next.js 16.2.12 rather than the latest stable release. See README dependency notes and update/validate on a connected machine before public deployment.
- `NEXT_PUBLIC_SITE_URL` must be set to the real domain for production canonical URLs, sitemap, and Open Graph metadata.
