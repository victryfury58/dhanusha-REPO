import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ASSETS } from "@/data";

const CARDS = [
  { src: ASSETS.thumb1, ratio: "aspect-video", tag: "Business Podcast" },
  { src: ASSETS.thumb3, ratio: "aspect-[9/16]", tag: "Spiritual Reel" },
  { src: ASSETS.thumb2, ratio: "aspect-video", tag: "Education" },
  { src: ASSETS.bts, ratio: "aspect-[4/3]", tag: "Behind The Scenes" },
  { src: ASSETS.thumb1, ratio: "aspect-video", tag: "Thumbnail Design" },
  { src: ASSETS.thumb2, ratio: "aspect-video", tag: "YouTube Edit" },
];

export const ThumbnailGallery = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);

  return (
    <section id="work" ref={ref} className="relative h-[280vh] bg-background" data-testid="thumbnail-gallery">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-10 mb-10">
          <p className="text-xs tracking-[0.35em] text-gold uppercase mb-3">Selected Work</p>
          <h2 className="heading-xl text-4xl md:text-6xl">Thumbnails That<br /><span className="text-muted-foreground">Get The Click.</span></h2>
        </div>

        <motion.div style={reduce ? {} : { x }} className="flex gap-6 pl-6 lg:pl-10 will-change-transform">
          {CARDS.map((c, i) => (
            <div
              key={i}
              data-testid={`thumb-card-${i}`}
              className="group relative shrink-0 h-[52vh] overflow-hidden rounded-2xl ring-1 ring-white/10 bg-[#0d0d0d]"
            >
              <img src={c.src} alt={c.tag} className={`h-full w-auto ${c.ratio} object-cover transition-transform duration-700 group-hover:scale-105`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-sm font-medium text-white/90 border border-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                {c.tag}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ThumbnailGallery;
