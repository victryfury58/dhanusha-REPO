// ============================================================
//  EDITABLE CONTENT FILE
//  All homepage text/images/links come from this file.
// ============================================================

// Old asset artifact base — kept so we can reuse existing hosted media.
const ART =
  "https://customer-assets-rejwkqb3.emergentagent.net/job_visual-create-40/artifacts";

// ============================================================
//  HERO
// ============================================================
export const HERO = {
  tag: "Stories / Brands / Impact",
  titleLine1: "Dhanusha",
  titleLine2: "Production.",
  description:
    "We create powerful visual stories through video, design, and digital solutions. From concept to content, we help brands, creators and businesses grow.",
  location: "Delhi based studio",
  // Full address — shown as hover tooltip on location link
  address:
    "2nd Floor, B-94/4, near Church, Joshi Colony, I.P. Extension, New Delhi, Delhi 110092",
  // Google Maps URL — clicking the location line opens Google Maps
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Dhanusha+Production+2nd+Floor+B-94%2F4+Joshi+Colony+IP+Extension+New+Delhi+110092",
  scriptLine1: "Real People",
  scriptLine2: "Real Stories",
  scriptLine3: "Real Impact",
  video: "/videos/hero-bts.mp4",
  poster: "/posters/hero-bts.jpg",
};

// ============================================================
//  THE 5 CLICKABLE TABS
//  Each tab has "rich" content that unlocks under the intro card:
//   - videos[] (autoplay-on-scroll clips)
//   - photos[] (image tiles)
//   - youtube[] (embeddable YouTube ids)
//   - channels[] (client channels)
//   - thumbnails[] (portfolio images)
//   - stats[]
// ============================================================

export const TABS = [
  // ── 01 · MOTION GRAPHICS & EDITING ────────────────────────────
  {
    key: "motion",
    num: "01",
    icon: "Clapperboard",
    label: "Motion Graphics & Editing",
    shortLabel: "Motion Graphics",
    title: "Motion Graphics & Editing",
    description:
      "From eye-catching motion graphics to cinematic edits, we bring your ideas to life with creativity and precision.",
    bullets: [
      "Story-first video editing with color grade & sound design",
      "Kinetic titles, lower-thirds and animated brand moments",
      "Thumbnail design tested for maximum click-through rate",
      "Reels and shorts engineered for watch-time",
    ],
    ctaLabel: "Book an Edit",
    ctaHref: "#book",

    // Motion graphics edit reel (16:9 landscape)
    videosHeading: "Motion Graphics Reel",
    videosAspect: "16/9",
    videos: [
      { src: "/videos/motion/mg-6-map.mp4", poster: "/posters/motion/mg-6-map.jpg", title: "Map Animation" },
      { src: "/videos/motion/mg-1.mp4", poster: "/posters/motion/mg-1.jpg", title: "Edit · Take 01" },
      { src: "/videos/motion/mg-2.mp4", poster: "/posters/motion/mg-2.jpg", title: "Edit · Take 02" },
      { src: "/videos/motion/mg-3.mp4", poster: "/posters/motion/mg-3.jpg", title: "Edit · Take 03" },
      { src: "/videos/motion/mg-4.mp4", poster: "/posters/motion/mg-4.jpg", title: "Edit · Take 04" },
      { src: "/videos/motion/mg-5.mp4", poster: "/posters/motion/mg-5.jpg", title: "Edit · Take 05" },
    ],

    // Rich content
    thumbnailsHeading: "Thumbnail Design Portfolio",
    thumbnails: [
      { src: `${ART}/3koyzlji_91.png`, tag: "Exclusive" },
      { src: `${ART}/zyg94gs3_141.png`, tag: "Travel" },
      { src: `${ART}/5d1n1hg0_280.png`, tag: "News" },
      { src: `${ART}/jlohf5jo_278.png`, tag: "Society" },
      { src: `${ART}/zk4e6ebb_225.png`, tag: "Spiritual" },
      { src: `${ART}/ekiznxzx_98.png`, tag: "Business" },
      { src: `${ART}/qwj32ney_58.png`, tag: "Education" },
      { src: `${ART}/qrq0jz5e_16.png`, tag: "Long-Form" },
      { src: `${ART}/0doxtbsa_13.png`, tag: "Podcast" },
      { src: `${ART}/kycyzlv3_10.png`, tag: "Interview" },
      { src: `${ART}/gvpjgujm_8.png`, tag: "Story" },
      { src: `${ART}/pce60he6_7.webp`, tag: "YouTube" },
    ],
  },

  // ── 02 · OUTDOOR SHOOT & EVENT SHOOTS ─────────────────────────
  {
    key: "outdoor",
    num: "02",
    icon: "Camera",
    label: "Outdoor Shoot & Event Shoots",
    shortLabel: "Outdoor Shoot",
    title: "Outdoor Shoot & Event Shoots",
    description:
      "On-location shoots, brand events and coverage across Delhi NCR — full crew, lighting and multi-camera setup delivered end-to-end.",
    bullets: [
      "Multi-camera coverage with synchronised audio",
      "Full crew, lighting and grip on the ground",
      "Same-day highlights, teasers and social cutdowns",
      "Aftermovies, marathons, sports events, CM-level coverage",
    ],
    ctaLabel: "Plan Your Shoot",
    ctaHref: "#book",

    videosHeading: "Event & Outdoor Reel",
    videosAspect: "9/16",
    videos: [
      { src: "/videos/superyou.mp4", poster: "/posters/events/superyou.jpg", title: "Superyou · Brand Reel" },
      { src: "/videos/baby-feme-nest.mp4", poster: "/posters/events/baby-feme-nest.jpg", title: "Baby Feme Nest" },
      { src: "/videos/coworkzen.mp4", poster: "/posters/events/coworkzen.jpg", title: "Coworkzen" },
      { src: "/videos/event-draft-1.mp4", poster: "/posters/events/event-draft-1.jpg", title: "Event Highlight" },
      { src: `${ART}/dhqgfa0n_CM%20Event%20Highlight%20Short%2013%20April%20Part%201.mp4`, poster: "/posters/ev_cm.jpg", title: "CM Event Highlight" },
      { src: `${ART}/zfp98fub_Marathon%201st%20Short%2020%20April%202nd%20Draft.mp4`, poster: "/posters/ev_marathon.jpg", title: "Marathon Coverage" },
      { src: `${ART}/fy6w529u_CRICKET.mp4`, poster: "/posters/ev_cricket.jpg", title: "Cricket Highlights" },
    ],
  },

  // ── 03 · PODCAST SHOOT ────────────────────────────────────────
  {
    key: "podcast",
    num: "03",
    icon: "Mic",
    label: "Podcast Shoot",
    shortLabel: "Podcast Shoot",
    title: "Podcast Shoot",
    description:
      "Broadcast-grade multi-camera podcast production. We bring the entire studio and crew to your location, anywhere in Delhi NCR.",
    bullets: [
      "3–4 camera setup with professional lighting",
      "Broadcast mics, synced audio, isolation blankets",
      "Delivery: full episode + 5–10 reels + thumbnails",
      "Same setup available for outdoor / on-location shoots",
    ],
    ctaLabel: "Book a Podcast Shoot",
    ctaHref: "#book",

    // Studio walk-through video (16:9 landscape)
    studioVideo: {
      src: `${ART}/2efvv372_VID_20260728_112300_858_bsl.mp4`,
      poster: "/posters/studio_intro.jpg",
    },

    // Featured YouTube podcast episodes (from old data)
    youtubeHeading: "Featured Podcast Episodes",
    youtube: [
      { id: "ZAqmEKc_7CA", channel: "Featured Episode" },
      { id: "M1AenqIKtcw", channel: "Podcast with Anchal" },
      { id: "81o1W-Tavi4", channel: "Abhishek Kar" },
      { id: "u-tnWNEyazw", channel: "TED Shark Labs" },
      { id: "H6Ght2wlsnA", channel: "Jitendra Vaswani" },
    ],

    // BTS reel (16:9 clips from on-set)
    btsHeading: "Behind The Scenes",
    btsVideos: [
      { src: `${ART}/urfyplxs_20260123_140651.mp4`, poster: "/posters/bts1.jpg", title: "On Set — Take 1" },
      { src: `${ART}/gzqqzp0w_20260204_130205.mp4`, poster: "/posters/bts2.jpg", title: "On Set — Take 2" },
      { src: `${ART}/ks2erc88_20260607_201436.mp4`, poster: "/posters/bts3.jpg", title: "On Set — Take 3" },
      { src: `${ART}/ou9ekmpr_20260620_141958.mp4`, poster: "/posters/bts4.jpg", title: "On Set — Take 4" },
      { src: `${ART}/54bwrbyv_20260629_111023.mp4`, poster: "/posters/bts5.jpg", title: "On Set — Take 5" },
      { src: `${ART}/f2q8wnuf_20260707_125946.mp4`, poster: "/posters/bts6.jpg", title: "On Set — Take 6" },
    ],

    // BTS photo wall
    btsPhotosHeading: "From The Set",
    btsPhotos: [
      "/bts/bts1.jpg",
      "/bts/bts2.jpg",
      "/bts/bts3.jpg",
      "/bts/bts4.jpg",
      "/bts/bts5.jpg",
      "/bts/bts6.jpg",
      "/bts/bts7.jpg",
      "/bts/bts8.jpg",
    ],
  },

  // ── 04 · CLIENTS ──────────────────────────────────────────────
  {
    key: "clients",
    num: "04",
    icon: "Users",
    label: "Clients",
    shortLabel: "Clients",
    title: "Clients & Creators We've Shot",
    description:
      "80+ creators, brands and businesses trust us. From founders and educators to podcasters and channels — 250+ episodes shot and 40M+ views delivered.",
    bullets: [
      "Podcasters, YouTubers, coaches, brands and founders",
      "Ongoing partnerships with 9+ named channels",
      "Reels, shorts and long-form delivered every week",
    ],
    ctaLabel: "Become a Client",
    ctaHref: "#book",

    stats: [
      { value: "250+", label: "Episodes Produced" },
      { value: "40M+", label: "Views Generated" },
      { value: "80+", label: "Creators Served" },
      { value: "13", label: "Services Under One Roof" },
    ],

    // Client brand logos wall (interactive: hover/tap = glow)
    logosHeading: "Brands & Businesses We've Worked With",
    logos: [
      { name: "Gaur Yamuna City", src: "/clients/gaur-yamuna-city.png" },
      { name: "Gaurs", src: "/clients/gaurs.png" },
      { name: "Bharat Ki Soch", src: "/clients/bharat-ki-soch.png" },
      { name: "Brain Infinity", src: "/clients/brain-infinity.png" },
      { name: "VVIP", src: "/clients/vvip.png" },
      { name: "NorthWind Sanctuary", src: "/clients/northwind-sanctuary.png" },
      { name: "CoWorkZen", src: "/clients/coworkzen.png" },
      { name: "Femme Nest", src: "/clients/femme-nest.png" },
      { name: "TKBS · The Rajdhesh Show", src: "/clients/tkbs.png" },
      { name: "Hierank Business School", src: "/clients/hierank.png" },
      { name: "Prayaag Hospital", src: "/clients/prayaag-hospital.png" },
      { name: "Smart Infovision", src: "/clients/smart-infovision.png" },
      { name: "Lloyd Business School", src: "/clients/lloyd-business-school.png" },
      { name: "Orange Advisors", src: "/clients/orange-advisors.png" },
      { name: "Param Amrit", src: "/clients/param-amrit.png" },
      { name: "Red Hot Media House", src: "/clients/red-hot-media.png" },
      { name: "Hastakshep", src: "/clients/hastakshep.png" },
      { name: "Zee Delhi NCR Haryana", src: "/clients/zee-delhi-ncr.png" },
    ],

    channelsHeading: "Client YouTube Channels",
    channels: [
      { name: "Podcast With Anchal", handle: "@podcastwithanchal", url: "https://youtube.com/@podcastwithanchal" },
      { name: "The Asad Talk", handle: "@theasadtalk", url: "https://youtube.com/@theasadtalk" },
      { name: "Abhishek Kar", handle: "@abhishekkar", url: "https://youtube.com/@abhishekkar" },
      { name: "Naagru Vikaas", handle: "@naagruvikaas6474", url: "https://youtube.com/@naagruvikaas6474" },
      { name: "Podcast By Dhananjay", handle: "@podcastbydhananjay", url: "https://youtube.com/@podcastbydhananjay" },
      { name: "FYI by Aditya Goel", handle: "@fyibyadityagoel", url: "https://youtube.com/@fyibyadityagoel" },
      { name: "Jitendra Vaswani", handle: "@jitendravaswani", url: "https://youtube.com/@jitendravaswani" },
      { name: "The Yogesh Pranav Show", handle: "@theyogeshpranavshow", url: "https://youtube.com/@theyogeshpranavshow" },
      { name: "TED Shark Labs", handle: "@tedsharklabs", url: "https://youtube.com/@tedsharklabs" },
    ],

  },

  // ── 05 · SEO & SOCIAL MEDIA MANAGEMENT ────────────────────────
  {
    key: "seo",
    num: "05",
    icon: "TrendingUp",
    label: "SEO & Social Media Management",
    shortLabel: "SEO & SMM",
    title: "SEO & Social Media Management",
    description:
      "Titles, tags, thumbnails and content calendars tuned to grow reach, watch-time and revenue. Full-service YouTube SEO + social media management.",
    bullets: [
      "YouTube SEO — titles, tags, descriptions & thumbnails",
      "Reels & shorts strategy across Instagram + YouTube",
      "Content calendars, hooks and posting cadence",
      "Monthly reporting and iterative optimisation",
    ],
    ctaLabel: "Get a Free Audit",
    ctaHref: "#book",

    stats: [
      { value: "40M+", label: "Views Generated" },
      { value: "250+", label: "Videos Optimised" },
      { value: "CTR", label: "Tested Thumbnails" },
    ],

    thumbnailsHeading: "Click-Magnet Thumbnails",
    thumbnails: [
      { src: `${ART}/3koyzlji_91.png`, tag: "Exclusive" },
      { src: `${ART}/zyg94gs3_141.png`, tag: "Travel" },
      { src: `${ART}/5d1n1hg0_280.png`, tag: "News" },
      { src: `${ART}/jlohf5jo_278.png`, tag: "Society" },
      { src: `${ART}/zk4e6ebb_225.png`, tag: "Spiritual" },
      { src: `${ART}/ekiznxzx_98.png`, tag: "Business" },
      { src: `${ART}/qwj32ney_58.png`, tag: "Education" },
      { src: `${ART}/qrq0jz5e_16.png`, tag: "Long-Form" },
    ],

    // A reels teaser showing short-form content the team produces
    reelsHeading: "Short-Form Content",
    reelsAspect: "9/16",
    reels: [
      { src: `${ART}/ou49ja78_AQMF1nmO0Edl5vzGAzjqSiV0icq3ce1w3csJzPIfMlcM-evIGnOx5HlBu90wXf8melCbZ7RL23pFOnRM6T6y2VjZFxivFXMS.mp4`, poster: "/posters/r1.jpg" },
      { src: `${ART}/67trtnes_AQMiYrcEYcLL5xwvDYtDxk9-PYlQZm1jN7ACNrscLOHfFjNsGYdM7CewMzDbT7nQHmk2Pi6GXyZCxHFpVrChuMVw2oWxAt-D.mp4`, poster: "/posters/r2.jpg" },
      { src: `${ART}/ns93i0cn_AQMtLYEDyvouoTGZugnb8z9hMFEM5tvYYdXaQBwgshvmcxpc0afJ3BLTx7w6hqXGp9QMEglgSlhrKzR_4C8F4g2fINVeBsbm.mp4`, poster: "/posters/r3.jpg" },
      { src: `${ART}/e7uz7dsd_AQNXoO7j5cr3moD7ZFKnr--lqCTVCEbVR5gIeQSibIXb262-0_igMBAzDvuH4Ktymone_Ol9L_sdzA4vsUBybnadD80Y_1Wv.mp4`, poster: "/posters/r4.jpg" },
      { src: `${ART}/ivg94qrq_AQOlIBb2abv3vsk79QKw0xFxHocVQETQ-5SVqtUWFdIE1DaM1HptXL1V92MVu_Qh_lbMTROZV_9DR5Uo5Ae4PU-SjHbcGHap.mp4`, poster: "/posters/r5.jpg" },
      { src: `${ART}/g982fezv_AQMOuV83Rpo8XoI9AbFyBmKR8wXmlmPAWIo29cycOUwv57mVaamxdCwxHsfkdI4LyXncGbQqGnVjjKHmFquZqXqUjLt2c9fZ.mp4`, poster: "/posters/teaser.jpg" },
    ],
  },
];

// ============================================================
//  BOTTOM CTA
// ============================================================
export const BOTTOM_CTA = {
  title: "Let's Create Something Amazing Together",
  tagline: "Video / Design / Digital / Growth",
  bookLabel: "Book a Shoot",
  bookHref:
    "https://wa.me/918287738890?text=Hi%20Dhanusha%20Production!%20I'd%20like%20to%20book%20a%20shoot.%20Please%20share%20your%20availability.",
  infoLabel: "More Information",
  infoHref: "#book",
};

// ============================================================
//  NAVBAR
// ============================================================
export const NAV = {
  links: [
    { label: "Home", href: "#top" },
    { label: "Services", href: "#services" },
    { label: "Clients", href: "#services" }, // opens tabs area
    { label: "About", href: "#services" },
    { label: "Contact", href: "#book" },
  ],
  bookLabel: "Book a Shoot",
  bookHref:
    "https://wa.me/918287738890?text=Hi%20Dhanusha%20Production!%20I'd%20like%20to%20book%20a%20shoot.%20Please%20share%20your%20availability.",
};

// ============================================================
//  FOOTER
// ============================================================
export const FOOTER = {
  tagline: "Your Complete Content Creation Partner.",
  region: "Delhi NCR",
  email: "dhanusha.production@gmail.com",
  phone: "8287738890",
  phoneDisplay: "+91 82877 38890",
  instagram: "https://www.instagram.com/dhanusha_production",
};
