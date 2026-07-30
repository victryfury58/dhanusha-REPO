import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDownRight, Play } from "lucide-react";
import { ASSETS } from "@/data";

const line = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const MaskLine = ({ children, i }) => (
  <span className="block overflow-hidden">
    <motion.span variants={line} custom={i} initial="hidden" animate="show" className="block">
      {children}
    </motion.span>
  </span>
);

const Floating = ({ style, src, className, alt, tid, reduce }) => (
  <motion.div
    style={reduce ? {} : style}
    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
    data-testid={tid}
  >
    <img src={src} alt={alt} className="w-full h-full object-cover rounded-xl shadow-2xl ring-1 ring-white/10" />
  </motion.div>
);

export const Hero = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Unpacking motion — items fly out from the "bag" centre
  const micX = useTransform(scrollYProgress, [0, 0.7], ["0%", "-160%"]);
  const micY = useTransform(scrollYProgress, [0, 0.7], ["0%", "40%"]);
  const micRot = useTransform(scrollYProgress, [0, 0.7], [0, -18]);
  const micScale = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);

  const lensX = useTransform(scrollYProgress, [0, 0.7], ["0%", "150%"]);
  const lensY = useTransform(scrollYProgress, [0, 0.7], ["0%", "-30%"]);
  const lensRot = useTransform(scrollYProgress, [0, 0.7], [0, 22]);
  const lensScale = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);

  const btsX = useTransform(scrollYProgress, [0, 0.7], ["0%", "120%"]);
  const btsY = useTransform(scrollYProgress, [0, 0.7], ["0%", "55%"]);
  const btsScale = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.95]);

  const thumbX = useTransform(scrollYProgress, [0, 0.7], ["0%", "-130%"]);
  const thumbY = useTransform(scrollYProgress, [0, 0.7], ["0%", "-40%"]);
  const thumbScale = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.9]);

  const bagScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.6]);
  const bagOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], ["0%", "-30%"]);

  return (
    <section id="top" ref={ref} className="relative h-[240vh]" data-testid="hero-section">
      <div className="sticky top-0 h-screen w-full overflow-hidden spotlight flex items-center justify-center">
        {/* faint backdrop image */}
        <div className="absolute inset-0 opacity-[0.10]">
          <img src={ASSETS.mic} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />

        {/* Unpacking layer */}
        <div className="absolute inset-0">
          {/* the bag / core glow */}
          <motion.div
            style={reduce ? {} : { scale: bagScale, opacity: bagOpacity }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(245,184,65,0.35),transparent_70%)] blur-2xl"
          />
          <Floating reduce={reduce} tid="hero-float-mic" style={{ x: micX, y: micY, rotate: micRot, scale: micScale }} src={ASSETS.mic} alt="Podcast microphone" className="h-52 w-40" />
          <Floating reduce={reduce} tid="hero-float-lens" style={{ x: lensX, y: lensY, rotate: lensRot, scale: lensScale }} src={ASSETS.lens} alt="Camera lens" className="h-44 w-44 !rounded-full" />
          <Floating reduce={reduce} tid="hero-float-bts" style={{ x: btsX, y: btsY, scale: btsScale }} src={ASSETS.bts} alt="Behind the scenes" className="h-40 w-56" />
          <Floating reduce={reduce} tid="hero-float-thumb" style={{ x: thumbX, y: thumbY, scale: thumbScale }} src={ASSETS.thumb2} alt="Thumbnail" className="h-36 w-60" />
        </div>

        {/* Headline */}
        <motion.div
          style={reduce ? {} : { opacity: textOpacity, y: textY }}
          className="relative z-10 text-center px-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-xs md:text-sm tracking-[0.4em] text-gold uppercase"
          >
            Your Complete Content Creation Partner
          </motion.p>
          <h1 className="heading-xl text-5xl sm:text-7xl lg:text-8xl text-foreground">
            <MaskLine i={0}>We Unpack The</MaskLine>
            <MaskLine i={1}><span className="text-gold">Entire Studio.</span></MaskLine>
            <MaskLine i={2}>You Just Press Record.</MaskLine>
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#contact" data-testid="hero-cta" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:scale-[1.04] transition-transform duration-200">
              Book a Shoot <ArrowDownRight size={18} className="group-hover:rotate-45 transition-transform" />
            </a>
            <a href="#teasers" data-testid="hero-secondary" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-foreground/90 hover:border-gold hover:text-gold transition-colors">
              <Play size={16} /> Watch Teasers
            </a>
          </motion.div>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] text-muted-foreground uppercase"
        >
          Scroll to unpack
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
