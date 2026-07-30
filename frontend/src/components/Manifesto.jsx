import { motion } from "framer-motion";
import { ASSETS, MANIFESTO, STATS } from "@/data";

export const Manifesto = () => {
  return (
    <section id="studio" className="relative py-28 md:py-36 bg-[#080808] overflow-hidden" data-testid="manifesto-section">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-28 border-y border-white/10 py-12">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              data-testid={`stat-${i}`}
            >
              <div className="heading-xl text-4xl md:text-6xl text-gold">{s.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs tracking-[0.35em] text-gold uppercase mb-8">The Studio</p>
            {MANIFESTO.map((m, i) => (
              <motion.div
                key={m.n}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex gap-6 py-8 border-b border-white/10"
                data-testid={`manifesto-${i}`}
              >
                <span className="heading-xl text-3xl text-stroke-gold shrink-0">{m.n}</span>
                <div>
                  <h3 className="font-display uppercase text-2xl md:text-3xl tracking-tight">{m.title}</h3>
                  <p className="text-muted-foreground mt-3 leading-relaxed max-w-md">{m.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="relative lg:sticky lg:top-28"
          >
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10">
              <img src={ASSETS.bts} alt="On set with Dhanusha Production" className="w-full h-[520px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[11px] tracking-[0.3em] uppercase text-gold">On Set</span>
                <p className="font-display uppercase text-2xl mt-1">Cinematic. Calm. Consistent.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
