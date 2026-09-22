import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { ASSETS, CONTACT } from "@/data";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Clients", href: "#clients" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#book" },
];

const WHATSAPP_HREF =
  "https://wa.me/918287738890?text=Hi%20Dhanusha%20Production!%20I'd%20like%20to%20book%20a%20shoot.%20Please%20share%20your%20availability.";

const WhatsAppIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.02 0C5.44 0 .1 5.34.1 11.92c0 2.1.55 4.15 1.6 5.96L0 24l6.29-1.65a11.9 11.9 0 0 0 5.72 1.46h.01c6.58 0 11.92-5.34 11.92-11.92 0-3.18-1.24-6.17-3.42-8.41ZM12.02 21.3h-.01a9.36 9.36 0 0 1-4.77-1.31l-.34-.2-3.73.98 1-3.64-.22-.37a9.35 9.35 0 0 1-1.43-4.94c0-5.17 4.21-9.38 9.4-9.38 2.51 0 4.87.98 6.64 2.75a9.32 9.32 0 0 1 2.75 6.64c-.01 5.18-4.22 9.38-9.4 9.38Zm5.43-7.03c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01a1.1 1.1 0 0 0-.8.37c-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
  </svg>
);

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-[90] transition-colors duration-300 ${
        scrolled ? "bg-[#050505]/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-8 h-[62px] md:h-[72px] flex items-center justify-between gap-3">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2 sm:gap-3 min-w-0" data-testid="navbar-logo">
          <img
            src={ASSETS.logo}
            alt="Dhanusha Production"
            className="h-8 w-8 sm:h-10 sm:w-10 rounded object-cover ring-1 ring-gold/30 shrink-0"
          />
          <span className="font-poster uppercase leading-none text-[13px] sm:text-[15px] tracking-wide">
            Dhanusha
            <br />
            <span className="text-gold text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em]">
              PRODUCTION
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className="relative font-poster uppercase text-[13px] tracking-[0.15em] text-white/80 hover:text-gold transition-colors py-2 group"
            >
              {l.label}
              <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
            </a>
          ))}
        </nav>

        {/* Right-side actions */}
        <div className="flex items-center gap-2">
          {/* Book a Shoot — green WhatsApp pill (matches reference) */}
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="navbar-book-shoot"
            className="inline-flex items-center gap-2 bg-[#25D366] text-[#050505] font-poster uppercase tracking-[0.1em] text-[11px] sm:text-[13px] px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full active:scale-95 hover:brightness-110 transition-all shadow-[0_6px_20px_-6px_rgba(37,211,102,0.55)]"
          >
            <WhatsAppIcon size={16} />
            <span>Book a Shoot</span>
          </a>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white h-10 w-10 flex items-center justify-center -mr-1"
            onClick={() => setOpen((v) => !v)}
            data-testid="navbar-menu-toggle"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#050505]/98 backdrop-blur-md overflow-hidden border-t border-white/5"
            data-testid="mobile-menu"
          >
            <div className="px-5 py-5 flex flex-col divide-y divide-white/5">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-poster uppercase tracking-[0.15em] text-white/85 hover:text-gold py-3.5 text-[15px]"
                >
                  {l.label}
                </a>
              ))}
              <div className="pt-4 grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${CONTACT.phone}`}
                  onClick={() => setOpen(false)}
                  className="font-poster uppercase tracking-[0.1em] text-[12px] border border-gold/40 text-gold rounded-full py-3 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <Phone size={14} /> Call
                </a>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="font-poster uppercase tracking-[0.1em] text-[12px] bg-[#25D366] text-[#050505] rounded-full py-3 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
