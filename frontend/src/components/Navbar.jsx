import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ASSETS, CONTACT } from "@/data";

const LINKS = [
  { label: "Who We Help", href: "#who" },
  { label: "Reels", href: "#reels" },
  { label: "Clients", href: "#clients" },
  { label: "Services", href: "#services" },
  { label: "FAQ", href: "#faq" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-[90] transition-colors duration-300 ${
        scrolled ? "bg-[#050505] border-b border-gold/15" : "bg-[#050505] border-b border-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-10 h-[64px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3" data-testid="navbar-logo">
          <img src={ASSETS.logo} alt="Dhanusha Production" className="h-9 w-9 rounded object-cover ring-1 ring-gold/30" />
          <span className="font-poster uppercase leading-none text-sm tracking-wide">
            Dhanusha<br /><span className="text-gold text-[10px] tracking-[0.35em]">PRODUCTION</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} data-testid={`nav-${l.label.split(" ")[0].toLowerCase()}`}
               className="font-poster uppercase text-xs tracking-[0.2em] text-white/70 hover:text-gold transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#book" data-testid="navbar-cta"
           className="hidden md:inline-flex items-center font-poster uppercase tracking-[0.12em] text-sm bg-gold text-[#050505] px-5 py-2 rounded-full hover:scale-[1.04] transition-transform">
          Book a Shoot
        </a>

        <button className="md:hidden text-white" onClick={() => setOpen((v) => !v)} data-testid="navbar-menu-toggle" aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="md:hidden bg-[#050505]/95 backdrop-blur-md overflow-hidden border-t border-gold/15" data-testid="mobile-menu">
            <div className="px-6 py-6 flex flex-col gap-4">
              {LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-poster uppercase tracking-[0.15em] text-white/85 hover:text-gold">{l.label}</a>
              ))}
              <a href="#book" onClick={() => setOpen(false)} className="font-poster uppercase tracking-[0.12em] bg-gold text-[#050505] px-5 py-2.5 rounded-full text-center mt-2">Book a Shoot</a>
              <a href={`tel:${CONTACT.phone}`} className="text-gold text-sm">{CONTACT.phoneDisplay}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
