import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "918287738890"; // +91 82877 38890
const MESSAGE = encodeURIComponent(
  "Hi Dhanusha Production! I'd like to book a shoot. Please share your availability."
);

export default function WhatsAppFloat() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`;

  return (
    <motion.a
      data-testid="whatsapp-float-btn"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book on WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 220, damping: 18 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[80] group"
    >
      {/* Pulsing ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/60 animate-ping" aria-hidden="true" />

      {/* Button */}
      <span className="relative flex items-center gap-2 md:gap-3 pl-3 pr-4 py-3 md:pl-4 md:pr-5 md:py-3.5 rounded-full bg-[#25D366] text-[#050505] shadow-[0_10px_30px_-6px_rgba(37,211,102,0.55)] border-2 border-[#050505]/20 font-poster uppercase tracking-[0.18em] text-[10px] md:text-xs">
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.4} />
        <span className="hidden sm:inline">Book on WhatsApp</span>
        <span className="sm:hidden">Book</span>
      </span>

      {/* Corner tape sticker */}
      <span
        aria-hidden="true"
        className="absolute -top-2 -left-3 bg-gold text-[#050505] font-poster uppercase text-[9px] tracking-[0.2em] px-1.5 py-0.5 border border-[#050505]/40 hidden md:inline-block"
        style={{ transform: "rotate(-8deg)" }}
      >
        Take · 01
      </span>
    </motion.a>
  );
}
