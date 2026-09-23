import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "918287738890";
const MESSAGE = encodeURIComponent(
  "Hi Dhanusha Production! I'd like to book a shoot. Please share your availability."
);

/**
 * Desktop-only floating WhatsApp button. On mobile the MobileActionBar
 * handles this. Plain CSS transitions — no framer motion.
 */
export default function WhatsAppFloat() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book on WhatsApp"
      className="hidden md:flex fixed bottom-8 right-8 z-[80] group active:scale-95 transition-transform"
    >
      <span
        className="absolute inset-0 rounded-full bg-[#25D366]/60 animate-ping pointer-events-none"
        aria-hidden="true"
      />
      <span className="relative flex items-center gap-3 pl-4 pr-5 py-3.5 rounded-full bg-[#25D366] text-[#050505] shadow-[0_10px_30px_-6px_rgba(37,211,102,0.55)] border-2 border-[#050505]/20 font-poster uppercase tracking-[0.18em] text-xs">
        <MessageCircle className="w-6 h-6" strokeWidth={2.4} />
        <span>Book on WhatsApp</span>
      </span>
    </a>
  );
}
