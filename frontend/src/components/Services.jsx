import { motion } from "framer-motion";
import {
  Tent, Video, Clapperboard, Youtube, Zap, Image, PenTool,
  Sparkles, Fingerprint, TrendingUp, FileText, Search, Building2,
} from "lucide-react";
import { SERVICES } from "@/data";
import { SlateLabel, Reveal, UL, Cta } from "@/components/FilmKit";

const ICONS = { Tent, Video, Clapperboard, Youtube, Zap, Image, PenTool, Sparkles, Fingerprint, TrendingUp, FileText, Search, Building2 };

export const Services = () => {
  return (
    <section id="services" className="relative kraft py-14 md:py-20 overflow-hidden" data-testid="services-section">
      <SlateLabel side="left" tone="gold" testid="services-slate-left">Take 01–13</SlateLabel>
      <SlateLabel side="right" tone="gold" testid="services-slate-right">Scene · The Setup</SlateLabel>

      <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-10">
        <Reveal className="text-center mb-10 md:mb-12">
          <h2 className="font-poster uppercase text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-tight">
            Thirteen Services. <br /> <UL>One Roof.</UL>
          </h2>
          <p className="text-muted-foreground mt-3 md:mt-4 max-w-2xl mx-auto text-[15px] sm:text-base leading-relaxed">
            From the first light on set to the final upload — everything your channel needs, produced in-house.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] || Sparkles;
            const take = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.05}>
                <motion.div whileHover={{ y: -5 }} data-testid={`service-card-${i}`}
                            className="relative h-full rounded-md overflow-hidden bg-[#0c0a07] border border-gold/15 hover:border-gold/45 transition-colors group">
                  <div className="clapper-stripe h-2.5 sm:h-3" />
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <span className="h-10 w-10 sm:h-11 sm:w-11 rounded-lg bg-gold/10 ring-1 ring-gold/25 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-[#050505] transition-colors"><Icon size={20} className="sm:hidden" /><Icon size={22} className="hidden sm:block" /></span>
                      <span className="font-poster uppercase text-[11px] sm:text-xs tracking-[0.2em] text-gold/60">Take {take}</span>
                    </div>
                    <h3 className="font-poster uppercase text-base sm:text-lg tracking-wide mt-3 sm:mt-4 leading-tight">{s.title}</h3>
                    <p className="text-[13px] sm:text-sm text-muted-foreground mt-1.5 sm:mt-2 leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="text-center mt-10 md:mt-12" delay={0.1}>
          <Cta href="#book" testid="services-cta">Book a Shoot</Cta>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
