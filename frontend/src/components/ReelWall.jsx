import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { REELS, ASSETS } from "@/data";
import { SlateLabel, Reveal, HL } from "@/components/FilmKit";

const ALL = [...REELS, ASSETS.teaser];

const Tile = ({ src, index }) => {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) { v.play().catch(() => {}); } else { v.pause(); }
  }, [inView]);

  const toggleSound = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  return (
    <motion.div
      ref={ref}
      data-testid={`reel-${index}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
      className="group relative aspect-[9/16] overflow-hidden rounded-md ring-1 ring-gold/20 bg-black"
    >
      <video ref={videoRef} src={`${src}#t=0.1`} muted loop playsInline preload="auto" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />
      <span className="absolute top-2 left-2 font-poster uppercase text-[10px] tracking-[0.2em] text-white/85">Reel {String(index + 1).padStart(2, "0")}</span>
      <button
        type="button"
        onClick={toggleSound}
        data-testid={`reel-sound-${index}`}
        aria-label={muted ? "Unmute" : "Mute"}
        className="absolute bottom-2 right-2 h-9 w-9 rounded-full bg-[#050505]/80 text-gold flex items-center justify-center ring-1 ring-gold/30 hover:bg-gold hover:text-[#050505] transition-colors"
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </motion.div>
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
            Short reels, BTS and outdoor shoots — playing live. Tap the speaker on any reel to hear it.
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
