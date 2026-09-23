import { Instagram, Mail, Phone } from "lucide-react";
import { ASSETS } from "@/data";
import { FOOTER } from "@/content";

export const Footer = () => {
  return (
    <footer className="relative bg-[#050505] border-t border-white/5 py-10 md:py-12" data-testid="footer">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
          <div className="flex items-center gap-3">
            <img
              src={ASSETS.logo}
              alt="Dhanusha Production"
              className="h-10 w-10 rounded object-cover ring-1 ring-gold/30"
            />
            <div>
              <p className="font-poster uppercase leading-none text-[15px]">
                Dhanusha
                <br />
                <span className="text-gold text-[10px] tracking-[0.35em]">PRODUCTION</span>
              </p>
            </div>
          </div>

          <p className="font-poster uppercase text-white/85 text-base sm:text-lg md:text-xl leading-tight max-w-md">
            {FOOTER.tagline}
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-dashed border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-white/60">
          <p className="text-[13px]">
            © {new Date().getFullYear()} Dhanusha Production · Serving {FOOTER.region}
          </p>
          <div className="flex flex-wrap items-center gap-4 md:gap-5 text-[13px]">
            <a
              href={`mailto:${FOOTER.email}`}
              className="flex items-center gap-1.5 hover:text-gold transition-colors"
            >
              <Mail size={14} /> <span className="hidden sm:inline">{FOOTER.email}</span>
              <span className="sm:hidden">Email</span>
            </a>
            <a
              href={`tel:${FOOTER.phone}`}
              className="flex items-center gap-1.5 hover:text-gold transition-colors"
            >
              <Phone size={14} /> {FOOTER.phoneDisplay}
            </a>
            <a
              href={FOOTER.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-gold transition-colors"
            >
              <Instagram size={14} /> Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
