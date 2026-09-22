import { motion } from "framer-motion";
import { Play, MapPin } from "lucide-react";
import { CONTACT } from "@/data";

const HERO_VIDEO = "/videos/hero-bts.mp4";
const HERO_POSTER = "/posters/hero-bts.jpg";

/**
 * New Hero — BTS video loops as the background, high-contrast type overlay.
 * Mobile-first: taller vertical rhythm, big touch targets, script quote hidden
 * on small screens (shows on md+) so the hero stays clean.
 */
export const Hero = () => {
  return (
    <section
      id="top"
      className="relative bg-[#050505] text-white overflow-hidden min-h-[100svh] flex items-center pt-24 pb-14 md:pt-28 md:pb-20"
      data-testid="hero-section"
    >
      {/* Poster fallback */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_POSTER})` }}
        aria-hidden="true"
      />

      {/* Looping BTS video */}
      <video
        src={HERO_VIDEO}
        poster={HERO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        data-testid="hero-bts-video"
      />

      {/* Cinematic overlays — kept light so BTS remains visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/85 via-[#050505]/45 to-[#050505]/30 md:from-[#050505]/80 md:via-[#050505]/40 md:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-[#050505]/10 to-[#050505]/60 md:bg-none" />

      {/* Handwritten script quote (desktop only) */}
      <div className="hidden md:flex absolute top-24 right-8 lg:right-16 z-10 flex-col items-end pointer-events-none">
        <span
          className="text-white/95 leading-tight text-2xl lg:text-3xl"
          style={{ fontFamily: "'Caveat', 'Kalam', 'Comic Sans MS', cursive" }}
        >
          Real People
          <br />
          Real Stories
          <br />
          Real Impact
        </span>
        <svg width="140" height="18" viewBox="0 0 140 18" className="-mt-1 lg:w-40" aria-hidden="true">
          <path
            d="M2 10 C 30 2, 70 2, 138 8"
            stroke="#F5B841"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Content column */}
      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-10">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.5 }}
              className="font-poster uppercase tracking-[0.35em] text-[11px] sm:text-xs md:text-sm text-white/70 mb-4 md:mb-6"
            >
              Stories <span className="text-gold px-1">/</span> Brands{" "}
              <span className="text-gold px-1">/</span> Impact
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-poster uppercase leading-[0.95] text-[3rem] xs:text-[3.5rem] sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
            >
              <span className="block">Dhanusha</span>
              <span className="block text-gold">Production.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
              className="mt-5 md:mt-7 text-[15px] sm:text-base md:text-lg text-white/85 font-medium leading-relaxed max-w-md"
            >
              We create powerful visual stories through video, design, and digital
              solutions. From concept to content, we help brands, creators and
              businesses grow.
            </motion.p>

            {/* Watch Our BTS button */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.55 }}
              className="mt-6 md:mt-8"
            >
              <a
                href="#reels"
                data-testid="hero-watch-bts"
                className="inline-flex items-center gap-3 group active:scale-[0.98] transition-transform"
                aria-label="Watch our BTS"
              >
                <span className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gold text-[#050505] flex items-center justify-center shadow-[0_8px_28px_-6px_rgba(245,184,65,0.7)] group-hover:scale-[1.06] transition-transform">
                  <Play size={22} fill="currentColor" className="ml-0.5" />
                </span>
                <span className="font-poster uppercase tracking-[0.18em] text-sm md:text-base text-white">
                  Watch Our BTS
                </span>
              </a>
            </motion.div>

            {/* Delhi based studio */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-6 md:mt-8 flex items-center gap-2 text-white/80"
            >
              <MapPin size={16} className="text-gold shrink-0" />
              <span className="text-sm md:text-base font-medium tracking-wide">
                Delhi based studio · Serving {CONTACT.region}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
