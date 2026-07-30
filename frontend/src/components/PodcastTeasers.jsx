import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Hand } from "lucide-react";
import { ASSETS, TEASERS } from "@/data";

export const PodcastTeasers = () => {
  const [index, setIndex] = useState(0);
  const current = TEASERS[index % TEASERS.length];

  const next = () => setIndex((i) => (i + 1) % TEASERS.length);

  return (
    <section id="teasers" className="relative py-28 md:py-36 bg-[#080808] overflow-hidden" data-testid="podcast-teasers">
      <div className="spotlight absolute inset-0" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.35em] text-gold uppercase mb-4">Podcast Teasers</p>
          <h2 className="heading-xl text-4xl md:text-6xl mb-6">Swipe Through<br />The Highlights.</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed mb-8">
            Vertical teasers cut for reels & shorts — the exact format that turns viewers into subscribers. Drag the phone to the right to see the next drop.
          </p>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Hand size={18} className="text-gold" /> Drag or tap the arrow to swipe
          </div>

          <div className="mt-10 flex gap-2" data-testid="teaser-dots">
            {TEASERS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to teaser ${i + 1}`}
                onClick={() => setIndex(i)}
                data-testid={`teaser-dot-${i}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === index % TEASERS.length ? "w-10 bg-gold" : "w-4 bg-white/20"}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Phone deck */}
        <div className="relative flex justify-center items-center h-[620px]" data-testid="phone-deck">
          {/* back stacked cards */}
          <div className="absolute h-[560px] w-[280px] rounded-[2.6rem] bg-[#141414] ring-1 ring-white/5 rotate-6 translate-x-8" />
          <div className="absolute h-[560px] w-[280px] rounded-[2.6rem] bg-[#101010] ring-1 ring-white/5 -rotate-6 -translate-x-8" />

          <AnimatePresence mode="popLayout">
            <motion.div
              key={index}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(e, info) => { if (info.offset.x > 90) next(); }}
              initial={{ x: -60, opacity: 0, rotate: -4 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: 320, opacity: 0, rotate: 12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[560px] w-[280px] rounded-[2.6rem] bg-black p-3 ring-1 ring-white/15 shadow-2xl cursor-grab active:cursor-grabbing z-10"
              data-testid="teaser-phone"
            >
              <div className="absolute top-3 left-1/2 -translate-x-1/2 h-5 w-24 rounded-full bg-black z-20 ring-1 ring-white/10" />
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-[#0a0a0a]">
                <video
                  src={ASSETS.teaser}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                  data-testid="teaser-video"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <span className="text-[10px] tracking-widest uppercase text-gold">{current.tag}</span>
                  <h3 className="font-display text-lg leading-tight text-white mt-1">{current.title}</h3>
                  <p className="text-xs text-white/60">{current.guest}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={next}
            data-testid="teaser-next"
            aria-label="Next teaser"
            className="absolute -right-1 bottom-4 z-20 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PodcastTeasers;
