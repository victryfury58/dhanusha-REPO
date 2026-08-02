import { motion } from "framer-motion";
import { Play } from "lucide-react";

// L-shaped corner brackets around a box
export const CornerBrackets = ({ color = "#F5B841", size = "16px", thickness = "2px" }) => {
  const base = { position: "absolute", width: size, height: size, borderColor: color, pointerEvents: "none" };
  return (
    <>
      <span style={{ ...base, top: -1, left: -1, borderLeft: `${thickness} solid ${color}`, borderTop: `${thickness} solid ${color}` }} />
      <span style={{ ...base, top: -1, right: -1, borderRight: `${thickness} solid ${color}`, borderTop: `${thickness} solid ${color}` }} />
      <span style={{ ...base, bottom: -1, left: -1, borderLeft: `${thickness} solid ${color}`, borderBottom: `${thickness} solid ${color}` }} />
      <span style={{ ...base, bottom: -1, right: -1, borderRight: `${thickness} solid ${color}`, borderBottom: `${thickness} solid ${color}` }} />
    </>
  );
};

// Corner slate label like "TAKE 01 · SCENE - CASTING"
export const SlateLabel = ({ children, side = "left", tone = "gold", testid }) => {
  const pos = side === "left" ? "left-4 md:left-8" : "right-4 md:right-8";
  const colors = tone === "dark"
    ? "bg-[#050505] text-gold border-gold/30"
    : "bg-gold text-[#050505] border-[#050505]/30";
  return (
    <span
      data-testid={testid}
      className={`absolute top-4 md:top-6 ${pos} z-20 font-poster uppercase text-[10px] md:text-xs tracking-[0.25em] px-2.5 py-1 border ${colors}`}
    >
      {children}
    </span>
  );
};

// Rotated sticker / tape tag
export const Sticker = ({ children, rotate = -3, className = "", onGold = false, testid }) => (
  <span
    data-testid={testid}
    style={{ transform: `rotate(${rotate}deg)` }}
    className={`sticker font-poster uppercase text-xs md:text-sm tracking-[0.15em] px-3 py-1.5 rounded-sm ${onGold ? "!bg-[#050505] !text-gold" : ""} ${className}`}
  >
    {children}
  </span>
);

// Highlighted word (marker behind)
export const HL = ({ children, onGold = false }) => (
  <span className={`hl-marker ${onGold ? "on-gold" : ""} ${onGold ? "text-gold" : "text-[#050505]"}`}>{children}</span>
);

// Underlined word (hand-drawn)
export const UL = ({ children }) => <span className="u-marker">{children}</span>;

// Circular play button
export const PlayCircle = ({ size = 56 }) => (
  <span
    className="rounded-full bg-gold text-[#050505] flex items-center justify-center shadow-xl ring-4 ring-[#050505]/20"
    style={{ width: size, height: size }}
  >
    <Play size={size * 0.4} fill="currentColor" className="ml-0.5" />
  </span>
);

// Primary CTA button — "Book a Shoot"
export const Cta = ({ children = "Book a Shoot", href = "#book", onGold = false, testid, className = "" }) => (
  <motion.a
    href={href}
    data-testid={testid}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.97 }}
    className={`relative inline-flex items-center gap-2 font-poster uppercase tracking-[0.12em] text-lg md:text-xl px-8 py-3.5 rounded-full transition-colors ${
      onGold ? "bg-[#050505] text-gold" : "bg-gold text-[#050505]"
    } ${className}`}
  >
    {children}
  </motion.a>
);

// Scroll reveal wrapper
export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Scattered sparkle / asterisk
export const Sparkle = ({ className = "", size = 22, color = "#F5B841" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 0 L13.6 9.2 L24 12 L13.6 14.8 L12 24 L10.4 14.8 L0 12 L10.4 9.2 Z" fill={color} />
  </svg>
);

// Hand-drawn curved arrow
export const DoodleArrow = ({ className = "", size = 60, color = "#F5B841", flip = false }) => (
  <svg className={className} width={size} height={size * 0.7} viewBox="0 0 80 56" fill="none" aria-hidden="true" style={flip ? { transform: "scaleX(-1)" } : {}}>
    <path d="M4 8 C 24 2, 52 8, 66 34" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M52 30 L 68 36 L 60 20" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);
