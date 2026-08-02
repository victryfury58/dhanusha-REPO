import { useRef } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { REELS } from "@/data";

const ReelTile = ({ src, index }) => {
  const ref = useRef(null);
  return (
    <motion.div
      data-testid={`reel-${index}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.06 }}
      onMouseEnter={() => ref.current && ref.current.play()}
      onMouseLeave={() => ref.current && ref.current.pause()}
      className="group relative shrink-0 w-[240px] md:w-[280px] aspect-[9/16] overflow-hidden rounded-2xl ring-1 ring-white/10 bg-[#0a0a0a]"
    >
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
        <span className="h-14 w-14 rounded-full glass flex items-center justify-center text-gold">
          <Play size={22} fill="currentColor" />
        </span>
      </div>
    </motion.div>
  );
};

export const VideoShowcase = () => {
  return (
    <section id="reels" className="relative py-28 md:py-36 bg-[#080808] overflow-hidden" data-testid="video-showcase">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.35em] text-gold uppercase mb-4">Reel Wall</p>
            <h2 className="heading-xl text-4xl md:text-6xl">Straight From<br /><span className="text-gold">Our Recent Shoots.</span></h2>
          </div>
          <p className="text-muted-foreground text-sm md:text-base max-w-sm leading-relaxed">
            Hover any reel to preview. This is the exact short-form style we deliver from every podcast we shoot across Delhi NCR.
          </p>
        </motion.div>
      </div>

      <div className="flex gap-5 overflow-x-auto no-scrollbar px-6 lg:px-10 pb-4">
        {REELS.map((src, i) => (
          <ReelTile key={i} src={src} index={i} />
        ))}
      </div>
    </section>
  );
};

export default VideoShowcase;
