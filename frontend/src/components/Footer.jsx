import { Instagram, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { ASSETS, CONTACT } from "@/data";
import { HL } from "@/components/FilmKit";

export const Footer = () => {
  return (
    <footer className="relative bg-[#050505] border-t border-gold/15 pt-14 pb-9 overflow-hidden" data-testid="footer">
      <span className="absolute top-5 right-4 md:right-8 font-poster uppercase text-[10px] tracking-[0.25em] text-gold/60 border border-gold/25 px-2 py-1">That&apos;s A Wrap</span>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-dashed border-white/15">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src={ASSETS.logo} alt="Dhanusha Production" className="h-11 w-11 rounded object-cover ring-1 ring-gold/30" />
              <span className="font-poster uppercase leading-none">Dhanusha<br /><span className="text-gold text-[10px] tracking-[0.35em]">PRODUCTION</span></span>
            </div>
            <p className="font-poster uppercase text-2xl md:text-4xl leading-tight max-w-xl">Your Complete <HL onGold>Content Creation</HL> Partner.</p>
          </div>
          <a href="#book" data-testid="footer-cta" className="inline-flex w-fit items-center font-poster uppercase tracking-[0.12em] bg-gold text-[#050505] px-7 py-3 rounded-full hover:scale-[1.04] transition-transform">Book a Shoot</a>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-5 pt-8 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Dhanusha Production · Serving {CONTACT.region} · <Link to="/admin" data-testid="footer-admin-link" className="hover:text-gold transition-colors">Site Controls</Link></p>
          <div className="flex flex-wrap items-center gap-6">
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-gold transition-colors"><Mail size={15} /> {CONTACT.email}</a>
            <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-2 hover:text-gold transition-colors"><Phone size={15} /> {CONTACT.phoneDisplay}</a>
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors"><Instagram size={15} /> Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
