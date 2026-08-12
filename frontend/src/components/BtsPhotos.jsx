import { motion } from "framer-motion";
import { BTS_PHOTOS } from "@/data";
import { SlateLabel, CornerBrackets, Reveal, HL } from "@/components/FilmKit";

export const BtsPhotos = () => {
  return (
    <section className="relative kraft py-16 md:py-20 overflow-hidden" data-testid="bts-photos-section">
      <SlateLabel side="left" tone="gold" testid="bts-photo-slate-left">Reel 06</SlateLabel>
      <SlateLabel side="right" tone="gold" testid="bts-photo-slate-right">Behind The Lens</SlateLabel>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal className="text-center mb-12">
          <h2 className="font-poster uppercase text-4xl sm:text-5xl md:text-6xl leading-tight">
            The <HL>Set</HL>. The <HL>Story</HL>.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A look inside our studio and location shoots — lights, crew and the calm chaos that makes every episode.
          </p>
        </Reveal>

        {/* Masonry via CSS columns — respects each photo's natural aspect */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 [column-fill:_balance]" style={{ imageOrientation: "from-image" }}>
          {BTS_PHOTOS.map((src, i) => (
            <motion.figure
              key={i}
              data-testid={`bts-photo-${i}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.06 }}
              className="relative mb-3 md:mb-4 break-inside-avoid overflow-hidden rounded-md ring-1 ring-gold/20 bg-black group"
            >
              <CornerBrackets color="rgba(245,184,65,0.35)" />
              <img
                src={src}
                alt={`Behind the scenes ${i + 1}`}
                loading="lazy"
                style={{ imageOrientation: "from-image" }}
                className="w-full h-auto object-contain group-hover:scale-[1.03] transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-2 left-2 font-poster uppercase text-[10px] tracking-[0.2em] text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                On Set · {String(i + 1).padStart(2, "0")}
              </span>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BtsPhotos;
