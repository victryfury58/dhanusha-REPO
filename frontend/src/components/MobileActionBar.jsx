import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, ArrowUpRight } from "lucide-react";

const WHATSAPP_HREF =
  "https://wa.me/918287738890?text=Hi%20Dhanusha%20Production!%20I'd%20like%20to%20book%20a%20shoot.%20Please%20share%20your%20availability.";

/**
 * Persistent bottom action bar shown on mobile only.
 * Gives customers one-tap Call / WhatsApp / Book access at all times.
 * Hides on scroll-up past hero to avoid double-cta noise.
 */
export default function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show once user has scrolled past the top of the page a bit
      setVisible(window.scrollY > 220);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-[70] pointer-events-none"
          data-testid="mobile-action-bar"
        >
          <div
            className="pointer-events-auto bg-[#050505]/95 backdrop-blur-md border-t border-gold/25 shadow-[0_-10px_30px_-8px_rgba(0,0,0,0.6)]"
            style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)" }}
          >
            <div className="grid grid-cols-3 gap-2 px-3 pt-2.5">
              <a
                href="tel:+918287738890"
                aria-label="Call Dhanusha Production"
                className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg bg-white/5 border border-white/10 active:scale-95 transition-transform"
              >
                <Phone size={18} className="text-gold" />
                <span className="font-poster uppercase text-[10px] tracking-[0.15em] text-white/85">Call</span>
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Dhanusha Production"
                className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg bg-[#25D366] active:scale-95 transition-transform"
              >
                <MessageCircle size={18} className="text-[#050505]" />
                <span className="font-poster uppercase text-[10px] tracking-[0.15em] text-[#050505] font-semibold">WhatsApp</span>
              </a>
              <a
                href="#book"
                aria-label="Book a Shoot"
                className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg bg-gold active:scale-95 transition-transform"
              >
                <ArrowUpRight size={18} className="text-[#050505]" />
                <span className="font-poster uppercase text-[10px] tracking-[0.15em] text-[#050505] font-semibold">Book</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
