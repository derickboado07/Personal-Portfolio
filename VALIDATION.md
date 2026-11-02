# Validation record

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
