# Derick Boado — Code, Data & Creativity

A complete cinematic portfolio for Mark Frederick “Derick” Boado, an aspiring developer, business analytics practitioner, and creative based in Caloocan City, Philippines. Built with Next.js App Router, TypeScript, Tailwind CSS, Motion for React, Lucide, `next/image`, and locally hosted IBM Plex Sans through `next/font`.

## Run locally

Use Node.js 22 or 24 LTS and npm.

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). This is a Next.js app; XAMPP/Apache is not required, even though the source lives under `htdocs`.

For a production preview:

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

Copy `.env.example` to `.env.local` only when configuring deployment or email. The site works without any environment variables. Do not use the example domain as your real deployment URL.

## What is included

- Responsive eight-section portfolio, fixed navigation with active-section tracking, keyboard-accessible mobile menu, skip link, and footer.
- Masked hero reveal, rotating identity, atmospheric artwork, restrained parallax, magnetic pointer CTAs, and a genuinely interactive visual editing timeline. The timeline is a silent design demonstration.
- Two larger development project cards, two compact cards, and four statically generated case-study pages at `/projects/[slug]`.
- Filtered film gallery, original SVG placeholder artwork, and a native accessible media dialog. Videos/embeds load only after opening; reduced-motion preferences are respected.
- A dedicated business analytics section, three skill tracks with keyboard-operated tabs, confirmed professional background, personal interests and values, and an accessible validated contact form.
- Page metadata, generated Open Graph artwork, favicon, sitemap, robots, and loading/error/not-found routes.

## Edit content

`src/data/portfolio.ts` is the main content source. It contains typed `profile`, `disciplines`, `personalDetails`, `personalValues`, `analytics`, `creativePractice`, `navigation`, `projects`, `showreel`, `videos`, `skillGroups`, `journey`, `professionalExperience`, and `site` configuration. See `PERSONALIZATION.md` for the confirmed content and remaining details to supply.

### Profile, social links, and CV

1. Replace the biography or other profile fields as desired.
2. Set `profile.email` to Derick’s confirmed email. Empty GitHub, LinkedIn, and video portfolio URLs are intentionally omitted from the interface. Add real HTTPS URLs to `profile.links` to display them.
3. Add a real portrait under `public/assets/`, set `profile.portrait` to `/assets/your-portrait.webp`, and update `portraitAlt`. Until then, an intentional monogram with “Portrait to come” is displayed.
4. Add a **real PDF** under `public/assets/`, then set `profile.cvPath` to e.g. `/assets/derick-boado-cv.pdf`. The navigation displays “Let’s talk” while the path is empty. Do not configure the path until the real file exists.

No experience durations, numerical accomplishments, clients, awards, or testimonials have been invented. The journey includes confirmed education, the October 2026 capstone defense and ongoing revisions, business experience, and community leadership. Professional background includes Remotasks, Seanderg Realty, and AIA Philippines. Missing employment dates and unconfirmed role titles are omitted.

### Development projects

Add or edit typed `Project` entries in `projects`. Each entry includes its role, current status, problem, approach, technology/focus tags, and optional external links. The case-study routes and sitemap are generated automatically.

The enrollment project is a **team academic capstone undergoing major revisions**, following its October 2026 final defense. GRC Connect is treated as a working name; Derick’s documented contributions are analysis, planning/requirements, system diagrams, and work with the development environment. The planned FastAPI service is clearly labelled. Its preview and gallery use 13 supplied screenshots from `src/Projects/screenshots-grc-enrollment`, copied into `public/assets/projects/grc-enrollment`; originals are preserved. The supplied project URL is `https://www.grc-enrollment.tech/`. This link does not establish a completed production deployment, and external access could not be verified here.

**ARAT Coffee is the first featured project**, a business website and Smart Ordering and Inventory System Derick developed with PHP, JavaScript, HTML/CSS, MySQL, and Chart.js. Real-time inventory management and sales reporting receive emphasis. Its preview remains illustrative until actual screenshots arrive. SmartLoad is a prototype; Flutter/Firebase represents student applications. Their previews are also clearly labelled **illustrative concepts**, not screenshots or measured results. Add a verified screenshot to `public/assets/` and populate `image` plus `imageAlt` to use it through `next/image`. Images should be local, optimized WebP/AVIF/JPEG/PNG. `github` and `liveUrl` only render when supplied. Optional `context`, `contribution`, and `capabilities` populate the fuller case-study story.

For a browsable case-study gallery, add a `screenshots` array to the project. Each typed `ProjectScreenshot` entry provides `src`, `alt`, `title`, `description`, `group`, `width`, and `height`. Category filters derive from the groups automatically. Images retain their original aspect ratio; thumbnails, previous/next navigation, and an accessible expanded-view dialog support both desktop and mobile screenshots. Optional `caseStudyNote` replaces the default concept-artwork explanation with project-specific context.

### Video work

Edit `showreel` and `videos`. All initial videos are labelled Coming soon; no unrelated stock footage is presented as Derick’s work. Original SVG posters in `public/assets/film-*.svg` are illustrative artwork.

Supported playback URL examples (replace these example IDs with real work):

```ts
url: "/assets/my-showreel.mp4"       // local MP4/WebM, native controls
url: "https://youtu.be/VIDEO_ID"      // a real 11-character YouTube video ID
url: "https://www.youtube.com/watch?v=VIDEO_ID"
url: "https://vimeo.com/123456789"
```

Provide the real poster path and set the video `status` to `Available`. YouTube and Vimeo embeds are restricted to their known hosts and only mounted when a user opens the dialog. Add captions to actual local videos where appropriate using a `<track>` in `src/components/ui/media-dialog.tsx`; provide captions on the original platform for embedded films. Remote image hosts are not enabled by default; configure `images.remotePatterns` in `next.config.ts` if you intentionally need one.

Adobe Photoshop is confirmed and listed. Video-editing application names remain unclaimed until supplied. Add only tools and experience you can support.

### Business analytics

Edit the `analytics` object for Power BI coursework, preparation/analysis/reporting workflow, and tool descriptions. `reportImage`, `reportImageAlt`, and `reportUrl` are intentionally blank. Add an actual report image and verified public URL to replace the current process blueprint. The blueprint contains no invented dataset, results, client work, or numerical achievements. Skills include confirmed Power Query, DAX measures, data visualization, and interactive report filters.

## Contact behavior

### No email service

The form validates name, email, subject, and message, then prepares a `mailto:` draft. The visitor reviews and sends it in their own email app. It **never claims a message was sent**. Copy-message and downloadable `.eml` draft alternatives are available.

**No recipient email was supplied for this build.** Until `profile.email` or `CONTACT_TO_EMAIL` is set, the page explicitly explains that the visitor must add a confirmed recipient. A draft can be prepared, copied, or downloaded, but direct contact with Derick cannot be completed without his real address. Add it before publishing for enquiries.

### Optional Resend delivery

Set these server-only environment variables, locally or in Vercel:

```dotenv
RESEND_API_KEY=your-real-api-key
CONTACT_TO_EMAIL=your-real-recipient
CONTACT_FROM_EMAIL=Portfolio <hello@your-verified-domain>
```

The sender must use a domain verified in Resend. With all three values configured at build/deploy time, the form uses `POST /api/contact`. The endpoint checks origin, validates and bounds input, applies a honeypot and per-instance rate limit, uses the visitor’s email as `reply_to`, and reports success only after the provider accepts the request. Provider errors show an honest error with an email-app fallback. Credentials never reach the browser. Delivery still depends on provider/domain configuration. The rate limit is memory-based and resets between serverless instances; use a shared rate limiter for a public site receiving abuse.

No real email delivery was tested because no credentials or recipient were supplied.

## Deploy to Vercel

1. Push this project to your Git repository, excluding `node_modules`, `.next`, `.npm-cache`, `.qa`, and secrets (already ignored).
2. Import it into Vercel and select the **Next.js** preset; use this directory as the project root.
3. Use `npm ci` to install, `npm run build` to build, and leave the output directory at the framework default.
4. Set `NEXT_PUBLIC_SITE_URL` to the actual HTTPS domain, with no trailing slash. Optionally set the three email variables above. Add confirmed contact details, media, and social links before publishing.
5. Deploy. When public URL or server email configuration changes, redeploy so prerendered metadata and contact configuration are refreshed.

No Vercel deployment was initiated by this workspace build.

## Design and source structure

```text
src/app/                  App Router pages, metadata, styles, API
src/app/projects/[slug]/   Statically generated project case studies
src/app/fonts/             Local variable font and OFL license
src/components/sections/   Hero, About, Projects, Video Work, Skills, Journey, Contact
src/components/ui/         Motion wrappers, magnetic CTA, previews, media dialog
src/data/portfolio.ts      Centralized, typed content
public/assets/             Original artwork; add real portrait, media, CV here
```

Global design tokens, responsive layout, and shared components live in `src/app/globals.css`. Project and media/contact styles are scoped in their corresponding section CSS files. Motion is isolated to components that require it; the page, About, Journey, project content, and detail routes use Server Components.

The brief’s reference URL could not be retrieved. The identity, vector artwork, copy, composition, and implementation were created for this portfolio; no reference source or imagery was copied.

## Dependency and verification notes

Package downloads were blocked in the build environment (`EACCES`), so the app was installed from an existing package cache. Versions are pinned and locked: Next.js **16.2.12**, React **19.2.8**, Tailwind **4.3.3**, Motion **12.43.0**, Lucide **1.27.0**, TypeScript **5.9.3**. These are compatible stable cached releases. **Next 16.2.12 is not the current latest stable release** (16.4.3 was identified during the task); a connected upgrade to the current stable Next/React versions and another validation pass is recommended before public deployment.

PostCSS 8.5.23 and Sharp 0.35.3 overrides allow compatible cached dependencies. The ESLint flat config includes TypeScript and React Hooks rules; `eslint-config-next` was unavailable offline. The local font avoids build-time requests to Google. IBM Plex Sans is licensed under the bundled SIL Open Font License.

On this machine only, if the ignored `.npm-cache` remains available:

```sh
npm ci --offline --cache .npm-cache
```

The committed lock includes cross-platform optional native dependencies. A Linux install dry-run was validated; actual Linux downloads and Vercel deployment were not performed. Browser QA uses `playwright-core` and an already installed Chrome; it does not download a bundled browser.
