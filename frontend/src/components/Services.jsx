import { motion } from "framer-motion";
import {
  Tent, Video, Clapperboard, Youtube, Zap, Image, PenTool,
  Sparkles, Fingerprint, TrendingUp, FileText, Search, Building2, ArrowUpRight,
} from "lucide-react";
import { SERVICES } from "@/data";

const ICONS = {
  Tent, Video, Clapperboard, Youtube, Zap, Image, PenTool,
  Sparkles, Fingerprint, TrendingUp, FileText, Search, Building2,
};

// Bento spans for visual rhythm across 13 cards
const SPANS = [
  "md:col-span-2", "", "", "",
  "", "md:col-span-2", "", "",
  "", "", "md:col-span-2", "",
  "md:col-span-2 lg:col-span-1",
];

export const Services = () => {
  return (
    <section id="services" className="relative py-28 md:py-36 bg-background" data-testid="services-section">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-xs tracking-[0.35em] text-gold uppercase mb-4">What We Do</p>
          <h2 className="heading-xl text-4xl md:text-6xl">Thirteen Services.<br /><span className="text-gold">One Roof.</span></h2>
          <p className="text-muted-foreground text-base md:text-lg mt-6 leading-relaxed">
            From the first light on set to the final upload — everything your channel needs to look world-class and grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] || Sparkles;
            return (
              <motion.div
                key={s.title}
                data-testid={`service-card-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
                whileHover={{ y: -6 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] p-6 hover:border-[rgba(245,184,65,0.5)] transition-colors duration-300 ${SPANS[i] || ""}`}
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(245,184,65,0.14),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-xl bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-gold group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon size={22} />
                  </div>
                  <ArrowUpRight size={18} className="text-muted-foreground group-hover:text-gold group-hover:rotate-45 transition-all duration-300" />
                </div>
                <h3 className="font-display uppercase text-lg mt-6 tracking-tight leading-tight">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
