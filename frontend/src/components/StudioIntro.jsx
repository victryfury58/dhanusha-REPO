import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Volume2, VolumeX, MapPin } from "lucide-react";
import { STUDIO_INTRO, CONTACT } from "@/data";
import { SlateLabel, CornerBrackets, Reveal, HL, Cta, Sticker } from "@/components/FilmKit";

export const StudioIntro = () => {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) v.play().catch(() => {}); else v.pause();
  }, [inView]);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  return (
    <section id="studio" className="relative kraft py-16 md:py-20 overflow-hidden" data-testid="studio-intro-section">
      <SlateLabel side="left" tone="gold" testid="studio-slate-left">Reel 02.5</SlateLabel>
      <SlateLabel side="right" tone="gold" testid="studio-slate-right">Studio Tour</SlateLabel>

      <div className="max-w-6xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <Sticker rotate={-3} className="mb-5" onGold>On Location</Sticker>
          <h2 className="font-poster uppercase text-4xl sm:text-5xl md:text-6xl leading-[0.95]">
            Step Inside <HL>Our Studio.</HL>
          </h2>
          <p className="text-muted-foreground mt-5 text-base md:text-lg max-w-md leading-relaxed">
            A quick walk‑through of our multi‑camera setup — lights, mics, sound treatment and every bit of gear we bring to your shoot in {CONTACT.region}.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-white/80">
            <MapPin size={16} className="text-gold" />
            <span className="font-poster uppercase tracking-[0.15em]">Dhanusha Studio · {CONTACT.region}</span>
          </div>
          <div className="mt-8">
            <Cta href="#book" testid="studio-cta">Book a Shoot</Cta>
          </div>
        </Reveal>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto w-full max-w-[320px]"
          data-testid="studio-player"
        >
          <div className="relative aspect-[9/16] overflow-hidden rounded-2xl ring-1 ring-gold/25 bg-black shadow-2xl">
            <CornerBrackets color="rgba(245,184,65,0.5)" />
            <video
              ref={videoRef}
              src={`${STUDIO_INTRO.src}#t=0.1`}
              poster={STUDIO_INTRO.poster}
              muted loop playsInline preload="none"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            <span className="absolute top-3 left-3 font-poster uppercase text-[10px] tracking-[0.2em] bg-gold text-[#050505] px-2 py-1">Studio Walk‑Through</span>
            <button
              type="button"
              onClick={toggleSound}
              data-testid="studio-sound"
              aria-label={muted ? "Unmute" : "Mute"}
              className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-[#050505]/80 text-gold flex items-center justify-center ring-1 ring-gold/30 hover:bg-gold hover:text-[#050505] transition-colors"
            >
              {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudioIntro;
