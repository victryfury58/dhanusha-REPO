import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { SHOWREEL } from "@/data";
import { SlateLabel, Reveal, HL } from "@/components/FilmKit";

const Tile = ({ item, index, aspect }) => {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const inView = useInView(ref, { margin: "-8% 0px -8% 0px" });
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) v.play().catch(() => {}); else v.pause();
  }, [inView]);

  const toggleSound = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  const aspectClass = aspect === "16/9" ? "aspect-video" : "aspect-[9/16]";

  return (
    <motion.div
      ref={ref}
      data-testid={`reel-${index}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
      className={`group relative ${aspectClass} overflow-hidden rounded-md ring-1 ring-gold/20 bg-black`}
    >
      <video
        ref={videoRef}
        src={`${item.src}#t=0.1`}
        poster={item.poster}
        muted loop playsInline preload="none"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />
      {item.title && (
        <span className="absolute bottom-2 left-2 right-12 font-poster uppercase text-[11px] tracking-[0.15em] text-white/90 truncate">{item.title}</span>
      )}
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

const Category = ({ cat, startIndex, cols }) => (
  <div className="mb-14 last:mb-0">
    <Reveal className="flex items-center gap-4 mb-6">
      <h3 className="font-poster uppercase text-2xl md:text-3xl tracking-wide">{cat.label}</h3>
      <span className="flex-1 h-px bg-gold/20" />
      <span className="font-poster uppercase text-[11px] tracking-[0.25em] text-gold/70">{cat.scene}</span>
    </Reveal>
    <div className={`grid gap-3 md:gap-4 ${cols}`}>
      {cat.items.map((item, i) => (
        <Tile key={i} item={item} index={startIndex + i} aspect={cat.aspect} />
      ))}
    </div>
  </div>
);

export const ReelWall = () => {
  return (
    <section id="reels" className="relative bg-[#050505] py-16 md:py-20 overflow-hidden" data-testid="reel-wall">
      <SlateLabel side="left" tone="dark" testid="reels-slate-left">Reel 03</SlateLabel>
      <SlateLabel side="right" tone="dark" testid="reels-slate-right">The Showreel</SlateLabel>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal className="text-center mb-14">
          <h2 className="font-poster uppercase text-4xl sm:text-5xl md:text-6xl leading-tight">
            Straight From <HL onGold>Our Shoots.</HL>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Reels, event shoots and behind-the-scenes — all playing live. Tap the speaker on any clip to hear it.
          </p>
        </Reveal>

        <Category cat={SHOWREEL.reels} startIndex={0} cols="grid-cols-2 md:grid-cols-3 lg:grid-cols-6" />
        <Category cat={SHOWREEL.events} startIndex={10} cols="grid-cols-2 md:grid-cols-3 max-w-3xl mx-auto" />
        <Category cat={SHOWREEL.bts} startIndex={20} cols="grid-cols-1 md:grid-cols-2" />
      </div>
    </section>
  );
};

export default ReelWall;
