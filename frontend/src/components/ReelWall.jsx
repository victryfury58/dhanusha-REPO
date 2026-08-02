import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { REELS, ASSETS } from "@/data";
import { SlateLabel, PlayCircle, Reveal, HL } from "@/components/FilmKit";

const ALL = [...REELS, ASSETS.teaser];

const Tile = ({ src, index }) => {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      data-testid={`reel-${index}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
      className="group relative aspect-[9/16] overflow-hidden rounded-md ring-1 ring-gold/20 bg-black"
    >
      <video ref={ref} src={src} muted loop playsInline preload="metadata"
             onMouseEnter={(e) => e.currentTarget.play()}
             onMouseLeave={(e) => { if (!playing) e.currentTarget.pause(); }}
             className="w-full h-full object-cover" />
      <div className={`absolute inset-0 transition-opacity duration-300 ${playing ? "opacity-0" : "opacity-100"}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="group-hover:scale-110 transition-transform"><PlayCircle size={52} /></span>
        </div>
        <span className="absolute bottom-3 left-3 font-poster uppercase text-[10px] tracking-[0.2em] text-white/80">Reel {String(index + 1).padStart(2, "0")}</span>
      </div>
    </motion.button>
  );
};

export const ReelWall = () => {
  return (
    <section id="reels" className="relative bg-[#050505] py-16 md:py-20 overflow-hidden" data-testid="reel-wall">
      <SlateLabel side="left" tone="dark" testid="reels-slate-left">Reel 03</SlateLabel>
      <SlateLabel side="right" tone="dark" testid="reels-slate-right">Featured · Cuts</SlateLabel>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal className="text-center mb-12">
          <h2 className="font-poster uppercase text-4xl sm:text-5xl md:text-6xl leading-tight">
            Straight From <HL onGold>Our Shoots.</HL>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Tap any reel to play. This is the exact short-form style we deliver from every podcast we produce.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {ALL.map((src, i) => <Tile key={i} src={src} index={i} />)}
        </div>
      </div>
    </section>
  );
};

export default ReelWall;
