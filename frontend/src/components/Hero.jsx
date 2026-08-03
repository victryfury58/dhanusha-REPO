import { motion } from "framer-motion";
import { MapPin, Camera, Users, Scissors, ArrowDownRight } from "lucide-react";
import { ASSETS, CONTACT } from "@/data";
import { SlateLabel, HL, UL, Sticker, Cta, Sparkle } from "@/components/FilmKit";

const SLATE_ROWS = [
  { icon: MapPin, k: "Location", v: `Anywhere in ${CONTACT.region}` },
  { icon: Camera, k: "Setup", v: "Multi-Camera + Lighting" },
  { icon: Users, k: "Crew", v: "Full Team On Ground" },
  { icon: Scissors, k: "Delivery", v: "Edit + Reels + Thumbnails" },
];

const word = {
  hidden: { y: "115%" },
  show: (i) => ({ y: "0%", transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] } }),
};
const Line = ({ children, i }) => (
  <span className="block overflow-hidden">
    <motion.span variants={word} custom={i} initial="hidden" animate="show" className="block">{children}</motion.span>
  </span>
);

export const Hero = () => {
  return (
    <section id="top" className="relative bg-[#050505] text-white overflow-hidden min-h-screen flex items-center pt-28 pb-16 md:pt-32 md:pb-20" data-testid="hero-section">
      {/* Poster fallback layer (always fills, every device) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.heroPoster})` }}
        aria-hidden="true"
      />
      {/* Animated video background */}
      <video
        src={ASSETS.heroVideo}
        poster={ASSETS.heroPoster}
        autoPlay muted loop playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        data-testid="hero-video"
      />
      {/* cinematic overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/85 via-[#050505]/55 to-[#050505]/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(245,184,65,0.12),transparent_60%)]" />

      <SlateLabel side="left" tone="gold" testid="hero-slate-left">Take 01</SlateLabel>
      <SlateLabel side="right" tone="gold" testid="hero-slate-right">Scene · Intro</SlateLabel>
      <Sparkle className="absolute top-28 left-[12%] opacity-70 hidden md:block" size={18} />
      <Sparkle className="absolute bottom-28 right-[14%] opacity-70 hidden md:block" size={22} />

      <div className="max-w-5xl mx-auto px-6 md:px-10 text-center relative z-10">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
                  className="font-poster uppercase tracking-[0.35em] text-xs md:text-sm text-gold mb-5">
          Dhanusha Production
        </motion.p>

        <h1 className="font-poster uppercase leading-[0.92] text-5xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
          <Line i={0}>Your Complete</Line>
          <Line i={1}><HL>Content Creation</HL></Line>
          <Line i={2}><UL>Partner.</UL></Line>
        </h1>

        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.6 }}
                  className="mt-6 text-base md:text-xl max-w-2xl mx-auto text-white/85 font-medium">
          Outdoor & multi-camera podcast production, editing, reels and thumbnails — we bring the entire studio and crew to your location, anywhere in {CONTACT.region}.
        </motion.p>

        {/* Slate info card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: 0.6 }}
                    className="mt-9 max-w-xl mx-auto text-left rounded-lg overflow-hidden bg-[#050505]/90 backdrop-blur-sm ring-1 ring-gold/25 text-white shadow-2xl" data-testid="hero-slate-card">
          <div className="clapper-stripe h-5" />
          <div className="p-5 md:p-6">
            {SLATE_ROWS.map((r, i) => {
              const Icon = r.icon;
              return (
                <div key={r.k} className={`flex items-center gap-4 py-3 ${i !== SLATE_ROWS.length - 1 ? "border-b border-dashed border-white/15" : ""}`}>
                  <Icon size={18} className="text-gold shrink-0" />
                  <span className="font-poster uppercase tracking-[0.2em] text-xs text-white/55 w-24 shrink-0">{r.k}</span>
                  <span className="font-poster uppercase tracking-wide text-sm md:text-base text-gold">{r.v}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.6 }}
                    className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Cta href="#book" testid="hero-cta">Book a Shoot <ArrowDownRight size={20} /></Cta>
          <a href="#reels" data-testid="hero-secondary" className="font-poster uppercase tracking-[0.12em] text-sm border-2 border-white/70 text-white px-6 py-3 rounded-full hover:bg-white hover:text-[#050505] transition-colors">
            Watch Our Work
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                    className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Sticker rotate={-3} testid="hero-sticker-1">250+ Episodes Shot</Sticker>
          <Sticker rotate={2} testid="hero-sticker-2">40M+ Views</Sticker>
          <Sticker rotate={-2} testid="hero-sticker-3">80+ Creators</Sticker>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
