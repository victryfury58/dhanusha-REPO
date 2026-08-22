# Dhanusha Production — Cinematic 3D Animated Marketing Site

## Original Problem Statement
3D animated website for "Dhanusha Production – Your Complete Content Creation Partner". Hero with a bag opening / camera equipment unpacking for a podcast shoot, interactive side-scrolling thumbnails, podcast teasers as phones with right-swipe, and animated service cards for 13 services.

## Stack
- Frontend: React 19, Tailwind, framer-motion, lenis (smooth scroll), react-fast-marquee, lucide-react, shadcn/ui, sonner
- Backend: FastAPI + MongoDB (lead capture)

## User Choices
- Framer motion, dark cinematic but attractive & user-friendly
- Gold (#F5B841) on near-black; Oswald (display) + Manrope (body)
- Contact: dhanusha.production@gmail.com, 8287738890, IG @dhanusha_production
- Real assets: logo, 3 thumbnails, teaser video, BTS photo

## Implemented (2026-07-30)
- Hero: masked line-by-line headline reveal + scroll-driven "unpack" of mic/lens/BTS/thumbnail from a central glow
- Slow editorial marquee (text-stroke gold)
- Horizontal side-scrolling thumbnail gallery (scroll-jacked)
- Podcast teasers: draggable phone mockup deck (right-swipe) playing teaser video
- Services: 13 interactive bento cards with hover lift + glow
- Studio: stats + numbered manifesto chapters + BTS image
- Contact: lead form -> POST /api/leads (verified saving to Mongo); footer with socials
- Backend: POST/GET /api/leads (tested via curl)

## Backlog / Next
- P1: Admin dashboard to view captured leads
- P1: Email notification on new lead (Resend)
- P2: Real Instagram feed embed / portfolio detail pages
- P2: WhatsApp click-to-chat button

## Update (Landing-page rebuild, funnel style)
- Rebuilt homepage as a conversion funnel (inspired by devangsingh workshop page) keeping gold/dark theme.
- New sections: Persona grid ("This is for you if…"), Reel Wall (5 uploaded videos, hover-to-play), Client YouTube channels (9 cards + featured embed ZAqmEKc_7CA), "What You Get" takeaways, FAQ accordion, Testimonials (placeholder, hidden by default).
- "Book a Shoot" CTAs throughout; "anywhere in Delhi NCR" messaging; NO pricing section.
- Backend: SiteSettings singleton + GET/PUT /api/settings.
- /admin page (open access) with a toggle to show/hide Testimonials so no blank spaces appear. Discreet "Site Controls" link in footer.
- Tested: 100% backend + frontend (iteration_1.json).

## Update (Vintage film-poster redesign)
- Full art-direction overhaul to a "vintage film-production poster" theme in brand gold (#F5B841) on near-black, inspired by a film-workshop reference but using Dhanusha's own content/assets.
- Design system (FilmKit.jsx): Anton display font, film-strip sprocket side borders, corner "slate" labels (TAKE/REEL/SCENE), clapperboard striped card tops, marker highlight/underline, sticker tags, sparkles, doodle arrows, grain overlay.
- New tightly-packed section flow (no scroll gaps): Hero(gold slate card) -> credibility marquee -> Personas SCENE cards -> Reel Wall video grid -> Thumbnails grid -> Client YouTube channels + featured embed -> 13 Services clapper cards -> What You Get -> Before/After Comparison table -> Testimonials(toggle) -> FAQ -> Book-a-Shoot form(gold call-sheet) -> Footer.
- Lenis `anchors` enabled so navbar/CTA links smooth-scroll.
- Tested 100% backend + frontend (iteration_2.json). Awaiting more user assets to expand reels/thumbnails/personas.

## Update (2026-07 — WhatsApp CTA)
- Added floating WhatsApp "Book on WhatsApp" button (bottom-right, brand green with vintage TAKE·01 tape sticker, pulse animation) linking to wa.me/918287738890 with a pre-filled booking message.
- Component: /app/frontend/src/components/WhatsAppFloat.jsx, mounted from Home.jsx.
- Verified live on preview: button visible, correct href, no console errors.
