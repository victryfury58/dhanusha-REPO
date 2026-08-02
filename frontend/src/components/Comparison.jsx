import { motion } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import { COMPARISON } from "@/data";
import { SlateLabel, Reveal, UL } from "@/components/FilmKit";

export const Comparison = () => {
  return (
    <section className="relative kraft py-16 md:py-20 overflow-hidden" data-testid="comparison-section">
      <SlateLabel side="left" tone="gold" testid="comp-slate-left">Take 07</SlateLabel>
      <SlateLabel side="right" tone="gold" testid="comp-slate-right">Before · After</SlateLabel>

      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <Reveal className="text-center mb-12">
          <h2 className="font-poster uppercase text-4xl sm:text-5xl md:text-6xl leading-tight">
            Go From <span className="text-white/40 line-through decoration-2">Doing It All Alone</span> <br /> To A <UL>Real Production Team.</UL>
          </h2>
        </Reveal>

        <div className="rounded-lg overflow-hidden border border-gold/20">
          <div className="grid grid-cols-2 font-poster uppercase text-sm md:text-base tracking-[0.15em]">
            <div className="bg-[#100b06] text-white/50 px-5 py-4 border-r border-gold/15">Without Dhanusha</div>
            <div className="bg-gold text-[#050505] px-5 py-4">With Dhanusha</div>
          </div>
          {COMPARISON.map((row, i) => (
            <motion.div key={i} data-testid={`comparison-row-${i}`}
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className={`grid grid-cols-2 ${i !== COMPARISON.length - 1 ? "border-b border-gold/12" : ""}`}>
              <div className="flex items-start gap-3 px-5 py-5 border-r border-gold/12 bg-[#0c0a07]">
                <X size={18} className="text-red-500/70 shrink-0 mt-0.5" />
                <span className="text-sm md:text-base text-white/60">{row.before}</span>
              </div>
              <div className="relative flex items-start gap-3 px-5 py-5 bg-[#100b06]">
                <ArrowRight size={16} className="absolute -left-3 top-1/2 -translate-y-1/2 text-gold hidden md:block" />
                <Check size={18} className="text-gold shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-sm md:text-base text-white">{row.after}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Comparison;
