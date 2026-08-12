# A1 Paving

Lead-gen site for **A1 Paving** — asphalt paving, tar and chip, resurfacing, milling
and sealcoating. Residential, commercial and industrial, across a 40-mile radius of
Grand Rapids, Michigan.

Owner: Bill Cooper. Vite + React 18 + TypeScript + Tailwind + framer-motion, built
from the paving template.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build
npm run typecheck
npm run lint
```

> **Local dev gotcha:** the `marc-portfolio-nextjs` project has registered a service
> worker on `http://localhost:5173`, and it will serve *its* cached shell for any
> other project on that port. If you load the dev server and see the portfolio,
> run on a different port: `npm run dev -- --port 5250`.

---

## Before this goes live

Everything below is marked `⚠ CONFIRM` in `src/config/businessInfo.ts`.

| # | What | Where | Why it's blocked |
|---|------|-------|------------------|
| 1 | **Grand Rapids address** | `address` | The discovery form gave a Lebanon, **Tennessee** street address, then said the business is "now in Grand Rapids, Michigan" with a 40-mile Grand Rapids service radius. See below. |
| 2 | **Domain** | `contact.website` | Currently the deployment URL. It feeds every canonical, the JSON-LD `@id`, and the generated `sitemap.xml`. Fix before submitting to Google. |
| 3 | **Lead form** | `forms.jotformId` | Empty on purpose. The template shipped with a previous client's Jotform ID; leaving it would deliver A1's leads to another company. Drop in a new ID and the embed switches on — until then the contact page shows call / text / pre-filled-email buttons. |
| 4 | **Phone number** | `contact.phone` | `(615)` is a Nashville area code on a site targeting Grand Rapids. It works, but a local `616` number converts better once ads are running. |
| 5 | **Hours** | `hours` | Trade-standard Mon–Fri 7–6, Sat 8–4. Not supplied. Paving is seasonal here (`season` says Apr–Oct), so confirm what he wants shown. |

### Two things deliberately left off the site

**Job count.** The form says 15 years in business and roughly 10 jobs completed.
Those do not agree, and "10 jobs" reads as a company that started last month. No job
count appears anywhere — worth asking Bill what he meant before adding one.

**BBB.** The form explicitly says they are not a member. No badge, no mention.

### Address vs. service area

The form gave a **Tennessee** street address (`2748 SE Tater Peeler Rd, Lebanon TN`)
and a **Michigan** service area (40-mile radius of Grand Rapids). Those are ~600
miles apart, so the site is set up as a **service-area business**, which is what
Google recommends for a contractor who travels to the customer:

- **No street address published.** Schema carries `addressLocality: Grand Rapids`,
  `addressRegion: MI` and a `GeoCircle` service radius. A `PostalAddress` with a
  blank street is worse than none, so the address block drops the field entirely
  rather than emitting an empty string.
- **Primary campaign ZIP** = `49503` (downtown Grand Rapids), called out on the
  Grand Rapids page.
- **Service area** = 40-mile radius, 45-mile maximum travel, spanning Kent, Ottawa,
  Allegan, Ionia and Montcalm counties.

If Bill has a Grand Rapids yard or office address, add it to `address` and it flows
through the footer, schema and Google Business Profile. If the business is genuinely
still run from Tennessee, the entire geographic target of the site needs changing —
say so before launch, not after.

---

## Where things live

```
src/config/businessInfo.ts   NAP, services, service area, warranty, trust claims, form ID
src/config/media.ts          every photo on the site, with attribution + captions
src/data/locations.ts        the 18 service-area landing pages
src/types.ts                 Page / NavigateFn
vite.config.ts               emits sitemap.xml + robots.txt at build time
public/logo*.svg             logo set (see below)
```

Change a phone number, a city, or a service in those config files and it propagates
everywhere — nothing client-specific is hardcoded in a component.

## Logo

Hand-built SVG. Asphalt badge with a driveway in perspective, safety-amber border
and centre dashes.

| File | Use |
|------|-----|
| `logo.svg` | Primary horizontal lockup, light backgrounds |
| `logo-dark.svg` | Same lockup for dark backgrounds (used in the footer) |
| `logo-stacked.svg` | Centred stacked version — trucks, shirts, square placements |
| `logo-mark.svg` | Mark only — used in the header next to live HTML type |
| `favicon.svg` | Simplified, heavier mark that survives 16px |

**Caveat for print/signage:** the lockups set the wordmark as SVG `<text>` with a
`font-family` stack (Anton + Inter). That renders correctly on the site because both
fonts are loaded, but a sign shop will want the text converted to outlines. Ask and
that can be produced.

### Colours

| Token | Hex | Notes |
|-------|-----|-------|
| `primary-500` | `#B45309` | Burnt amber. Clears WCAG AA **both** as `bg-primary-500 + text-white` (5.0:1) and as `text-primary-500` on white (5.0:1), so white-on-primary buttons stay valid. |
| `amber-400/500` | `#FBBF24` / `#F5A524` | Bright safety amber. Accents on dark backgrounds only (9:1 on asphalt) — too pale to read on white. |
| `charcoal-950` | `#16161A` | Asphalt. Matches the logo badge. |

## Routes

`/` · `/services` · `/gallery` · `/about` · `/contact` · `/sitemap`
plus `/asphalt-paving/<city>` for each of the 18 cities in `locations.ts`.

Client-side routed via `history.pushState` (no router dependency). `vercel.json`
rewrites every non-asset path to `index.html`, which is what makes the deep
`/asphalt-paving/...` URLs work on direct load. `public/_redirects` does the same on
Netlify.

The location URL prefix is defined in **two** places that must agree:
`LOCATION_PREFIX` in `src/App.tsx`, and the sitemap entry in `vite.config.ts`. If
they drift, the sitemap advertises URLs that 404.

## Photography

**No photo on this site is presented as A1's own completed work.** Everything in
`src/config/media.ts` is free-to-use stock, visually checked to actually show what
its caption says. The gallery page states plainly that the images illustrate the
trade rather than being completed jobs.

To switch to real work: fill in `REAL_PROJECT_PHOTOS` in `media.ts`. The gallery
detects it, drops the disclaimer, and retitles itself "Our Recent Work". Getting
photos of Bill's actual jobs is the single highest-value upgrade to this site.

## SEO

- `sitemap.xml` and `robots.txt` are **generated at build time** from
  `businessInfo.ts` + `locations.ts` (see the `seoFiles` plugin in `vite.config.ts`),
  so the URL list cannot drift from the routes that exist. 24 URLs currently.
- JSON-LD: `GeneralContractor` org + `LocalBusiness` + per-city `Service` +
  `BreadcrumbList` + `FAQPage` (the services-page FAQs are marked up for rich results).
- `serviceArea` is a `GeoCircle` around Grand Rapids rather than a postal address,
  matching how the business actually operates.
- Add a Google Search Console verification file once the domain is set.
- Still to add: an `og-image.jpg` at the site root (referenced by `SEOHead` and schema).
