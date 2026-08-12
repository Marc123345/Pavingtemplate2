# Patrick Seal Coating

Lead-gen site for **Patrick Seal Coating** — asphalt seal coating, crack filling and
line striping, residential + commercial, Spokane Valley WA and North Idaho.

Built from the [Pavingtemplate](https://github.com/Marc123345/Pavingtemplate) repo
(Vite + React 18 + TypeScript + Tailwind + framer-motion), fully rebranded off
Cumberland Tar & Chip.

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

Four things were deliberately left as placeholders rather than invented. They are
all marked `⚠ CONFIRM` in `src/config/businessInfo.ts`.

| # | What | Where | Why it's blocked |
|---|------|-------|------------------|
| 1 | **Domain** | `contact.website` | Currently `https://patricksealcoating.com`. This feeds every canonical URL, the JSON-LD `@id`, and the generated `sitemap.xml` — fix it before submitting to Google. |
| 2 | **Lead form** | `forms.jotformId` | Empty on purpose. The template shipped with the previous client's Jotform ID (`252982641154460`); leaving it would have delivered Patrick's leads to a different company. Drop in a new Jotform ID and the embed switches on automatically — otherwise the contact page shows call / text / pre-filled-email buttons. |
| 3 | **Trust badges** | `trustPoints` | Only claims that are true by construction (locally owned, free estimates, both service types, two-state coverage). **"Licensed & Insured", years in business, and job counts were NOT added** — add them only once Patrick confirms. |
| 4 | **Hours** | `hours` | Trade-standard Mon–Fri 7–6, Sat 8–4. Seal coating is seasonal (the `season` field says Apr–Oct) so confirm what he actually wants shown. |

### Address vs. service area

The intake gave a **Washington** address (`22751 E Appleway Ave`) and an **Idaho**
service ZIP (`83815`). Those are ~14 miles apart across the state line, so the site
treats them as what they are:

- **NAP address** = 22751 E Appleway Ave, **Liberty Lake, WA 99019** — this is what
  goes on the Google Business Profile, and the footer/schema match it exactly.
- **Primary campaign target** = **83815** (north Coeur d'Alene, ID), called out
  explicitly on the Coeur d'Alene page.
- **Service area** = ~35-mile radius spanning Spokane County WA + Kootenai County ID.

If the business is actually based in Idaho, correct `address` and `location` in
`businessInfo.ts` and the whole site follows.

---

## Where things live

```
src/config/businessInfo.ts   NAP, services, service area, trust claims, form ID
src/config/media.ts          every photo on the site, with attribution + captions
src/data/locations.ts        the 13 service-area landing pages
src/types.ts                 Page / NavigateFn
vite.config.ts               emits sitemap.xml + robots.txt at build time
public/logo*.svg             logo set (see below)
```

Change a phone number, a city, or a service in those config files and it propagates
everywhere — nothing client-specific is hardcoded in a component.

## Logo

Hand-built SVG. Asphalt badge with a driveway in perspective, safety-amber seal
border and centre dashes.

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
| `primary-500` | `#B45309` | Burnt sealer amber. Chosen because it clears WCAG AA **both** as `bg-primary-500 + text-white` (5.0:1) and as `text-primary-500` on white (5.0:1) — so the template's existing white-on-primary buttons stayed valid. |
| `amber-400/500` | `#FBBF24` / `#F5A524` | Bright safety amber. Accents on dark backgrounds only (9:1 on asphalt) — too pale to read on white. |
| `charcoal-950` | `#16161A` | Asphalt. Matches the logo badge. |

## Routes

`/` · `/services` · `/gallery` · `/about` · `/contact` · `/sitemap`
plus `/seal-coating/<city>` for each of the 13 cities in `locations.ts`.

Client-side routed via `history.pushState` (no router dependency). `public/_redirects`
sends every non-file path to `index.html`, which is what makes the deep
`/seal-coating/...` URLs work on Netlify. **On Vercel you need the equivalent
rewrite** — add a `vercel.json` containing
`{"rewrites":[{"source":"/(.*)","destination":"/index.html"}]}`
or those pages will 404 on direct load.

## Photography

**No photo on this site is presented as Patrick's own completed work.** The template
came with the previous client's real job photos and videos hosted on their ImageKit
account; all of those were removed rather than passed off as someone else's.

Everything in `src/config/media.ts` is free-to-use Pexels stock that was visually
checked to actually show what its caption says — sealer application, hot rubber crack
sealing, striping, worn asphalt. The gallery page states plainly that the images
illustrate the trade rather than being completed jobs.

To switch to real work: fill in `REAL_PROJECT_PHOTOS` in `media.ts`. The gallery
detects it, drops the disclaimer, and retitles itself "Our Recent Work".

## SEO

- `sitemap.xml` and `robots.txt` are **generated at build time** from
  `businessInfo.ts` + `locations.ts` (see the `seoFiles` plugin in `vite.config.ts`),
  so the URL list can't drift from the routes that exist. 19 URLs currently.
- JSON-LD: `HouseholdServices` org + `LocalBusiness` + per-city `Service` +
  `BreadcrumbList` + `FAQPage` (the services-page FAQs are marked up for rich results).
- `areaServed` labels each city with its own state, so the cross-border WA/ID
  coverage is machine-readable.
- The previous client's Google Search Console verification file
  (`google65e4eba86e82f0a1.html`) was deleted — add Patrick's own once the domain is set.
- Still to add: an `og-image.jpg` at the site root (referenced by `SEOHead` and schema).
