import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ASSETS, CONTACT } from "@/data";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Teasers", href: "#teasers" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
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
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass" : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group" data-testid="navbar-logo">
          <img src={ASSETS.logo} alt="Dhanusha Production" className="h-10 w-10 rounded-md object-cover ring-1 ring-white/10" />
          <span className="font-display uppercase tracking-tight text-sm leading-none">
            Dhanusha<br /><span className="text-gold text-[11px] tracking-[0.3em]">PRODUCTION</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-gold transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-testid="navbar-cta"
          className="hidden md:inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 hover:scale-[1.03] transition-transform duration-200"
        >
          Start a Project
        </a>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen((v) => !v)}
          data-testid="navbar-menu-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass overflow-hidden"
            data-testid="mobile-menu"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-base text-foreground/90 hover:text-gold">
                  {l.label}
                </a>
              ))}
              <a href={`tel:${CONTACT.phone}`} className="text-gold font-semibold">{CONTACT.phoneDisplay}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
