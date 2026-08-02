import { motion } from "framer-motion";
import { Mic, Youtube, GraduationCap, Rocket, Sparkles, Building2 } from "lucide-react";
import { PERSONAS } from "@/data";
import { SlateLabel, CornerBrackets, Reveal, UL, Cta } from "@/components/FilmKit";

const ICONS = { Mic, Youtube, GraduationCap, Rocket, Sparkles, Building2 };

export const Personas = () => {
  return (
    <section id="who" className="relative kraft py-16 md:py-20 overflow-hidden" data-testid="personas-section">
      <SlateLabel side="left" tone="gold" testid="who-slate-left">Reel 02</SlateLabel>
      <SlateLabel side="right" tone="gold" testid="who-slate-right">Scene · Casting</SlateLabel>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal className="text-center mb-12">
          <h2 className="font-poster uppercase text-4xl sm:text-5xl md:text-6xl leading-tight">
            This Is For You <br /> If You&apos;re A <UL>Creator</UL> Who…
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PERSONAS.map((p, i) => {
            const Icon = ICONS[p.icon] || Sparkles;
            const scene = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={p.title} delay={(i % 3) * 0.08}>
                <motion.div whileHover={{ y: -6 }} data-testid={`persona-card-${i}`}
                            className="relative bg-[#0c0a07] border border-gold/15 rounded-md overflow-hidden group">
                  <div className="relative h-44 overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover grayscale-[0.35] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a07] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 font-poster uppercase text-[11px] tracking-[0.2em] bg-gold text-[#050505] px-2.5 py-1">Scene {scene}</span>
                  </div>
                  <div className="relative p-6">
                    <CornerBrackets color="rgba(245,184,65,0.35)" />
                    <div className="flex items-center gap-3">
                      <span className="h-10 w-10 rounded-lg bg-gold/10 ring-1 ring-gold/25 flex items-center justify-center text-gold"><Icon size={20} /></span>
                      <h3 className="font-poster uppercase text-xl tracking-wide leading-tight">{p.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="text-center mt-12" delay={0.1}>
          <Cta href="#book" testid="who-cta">Book a Shoot</Cta>
        </Reveal>
      </div>
    </section>
  );
};

export default Personas;
