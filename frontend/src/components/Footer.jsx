import { Instagram, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { ASSETS, CONTACT } from "@/data";

export const Footer = () => {
  return (
    <footer className="relative bg-[#050505] border-t border-white/10 pt-16 pb-10" data-testid="footer">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src={ASSETS.logo} alt="Dhanusha Production" className="h-12 w-12 rounded-md object-cover ring-1 ring-white/10" />
              <span className="font-display uppercase tracking-tight leading-none">
                Dhanusha<br /><span className="text-gold text-[11px] tracking-[0.3em]">PRODUCTION</span>
              </span>
            </div>
            <p className="heading-xl text-3xl md:text-5xl max-w-xl">Your Complete<br /><span className="text-gold">Content Creation Partner.</span></p>
          </div>
          <a href="#contact" data-testid="footer-cta" className="inline-flex w-fit items-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:scale-[1.03] transition-transform">
            Book a Shoot
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6 pt-8 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Dhanusha Production. Serving {CONTACT.region}. All rights reserved. <Link to="/admin" data-testid="footer-admin-link" className="hover:text-gold transition-colors">· Site Controls</Link></p>
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
