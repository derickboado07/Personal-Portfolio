# DBCreates brand assets

The supplied artwork was not present when this integration was prepared. Copy
the following original files into this folder, using these exact filenames:

- `dbcreates-primary.svg` — horizontal logo for desktop navigation
- `dbcreates-monogram.svg` — compact DB mark for mobile navigation and About
- `dbcreates-wordmark.svg` — alternative horizontal wordmark for the footer
- `dbcreates-favicon.png` — square browser icon (32×32 or larger)
- `favicon.ico` — alternative browser icon (ideally includes 16×16 and 32×32)

SVGs should retain their transparent backgrounds, correct viewBox, and original
proportions. Use artwork designed for a dark navy (#0B1220) background. Convert
any logo lettering to vector outlines so it does not depend on installed fonts.
Do not put an opaque background behind the artwork or use screenshots of it.

## Activation

Restart `npm run dev` after copying files. For production, rebuild with
`npm run build` and redeploy. Availability is resolved on the server during
rendering/static generation; assets are not polled in the browser.

Desktop navigation prefers primary → wordmark → monogram. Mobile navigation uses
the monogram when available. The footer prefers wordmark → primary → monogram.
The About card uses the monogram, unless a personal portrait is configured.
PNG and ICO favicons are declared when available; either favicon can be used.

Until files are supplied, the previous marks and browser icon remain visible.
They are fallbacks, not recreations of the DBCreates logo. No missing artwork is
requested. Final logo contrast, intrinsic whitespace, visual sizing, and favicon
appearance must be checked with the actual supplied assets before publication.
