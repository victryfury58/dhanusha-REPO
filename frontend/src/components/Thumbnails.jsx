import { motion } from "framer-motion";
import { ASSETS } from "@/data";
import { SlateLabel, CornerBrackets, Reveal, UL } from "@/components/FilmKit";

const THUMBS = [
  { src: ASSETS.thumb1, tag: "Business" },
  { src: ASSETS.thumb3, tag: "Spiritual" },
  { src: ASSETS.thumb2, tag: "Education" },
  { src: ASSETS.bts, tag: "On Set" },
];

export const Thumbnails = () => {
  return (
    <section className="relative kraft py-16 md:py-20 overflow-hidden" data-testid="thumbnails-section">
      <SlateLabel side="left" tone="gold" testid="thumbs-slate-left">Reel 04</SlateLabel>
      <SlateLabel side="right" tone="gold" testid="thumbs-slate-right">Scene · The Click</SlateLabel>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal className="text-center mb-12">
          <h2 className="font-poster uppercase text-4xl sm:text-5xl md:text-6xl leading-tight">
            Thumbnails That <UL>Get The Click.</UL>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            CTR-tested designs built to stop the scroll and win the click on every upload.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {THUMBS.map((t, i) => (
            <Reveal key={i} delay={(i % 4) * 0.06}>
              <motion.div whileHover={{ y: -6 }} data-testid={`thumb-${i}`}
                          className="relative rounded-md overflow-hidden ring-1 ring-gold/20 bg-black group">
                <CornerBrackets color="rgba(245,184,65,0.4)" />
                <div className="aspect-video overflow-hidden">
                  <img src={t.src} alt={`${t.tag} thumbnail`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="absolute bottom-2 left-2 font-poster uppercase text-[10px] tracking-[0.2em] bg-[#050505]/80 text-gold px-2 py-1">{t.tag}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Thumbnails;
