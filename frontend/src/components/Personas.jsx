import { motion } from "framer-motion";
import { Mic, Youtube, GraduationCap, Rocket, Sparkles, Building2 } from "lucide-react";
import { PERSONAS } from "@/data";

const ICONS = { Mic, Youtube, GraduationCap, Rocket, Sparkles, Building2 };

export const Personas = () => {
  return (
    <section id="who" className="relative py-28 md:py-36 bg-background" data-testid="personas-section">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-xs tracking-[0.35em] text-gold uppercase mb-4">Who We Help</p>
          <h2 className="heading-xl text-4xl md:text-6xl">This Is For You<br /><span className="text-gold">If You're A…</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PERSONAS.map((p, i) => {
            const Icon = ICONS[p.icon] || Sparkles;
            return (
              <motion.div
                key={p.title}
                data-testid={`persona-card-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] p-8 hover:border-[rgba(245,184,65,0.5)] transition-colors duration-300"
              >
                <div className="h-14 w-14 rounded-2xl bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-gold group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon size={26} />
                </div>
                <h3 className="font-display uppercase text-2xl mt-6 tracking-tight leading-tight">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Personas;
