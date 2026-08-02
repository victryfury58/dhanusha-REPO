import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { TAKEAWAYS } from "@/data";

export const Takeaways = () => {
  return (
    <section id="what-you-get" className="relative py-28 md:py-36 bg-[#080808] overflow-hidden" data-testid="takeaways-section">
      <div className="spotlight absolute inset-0" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative grid lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-28 self-start"
        >
          <p className="text-xs tracking-[0.35em] text-gold uppercase mb-4">What You Get</p>
          <h2 className="heading-xl text-4xl md:text-6xl">Book One Shoot.<br /><span className="text-gold">Get Everything.</span></h2>
          <p className="text-muted-foreground text-base md:text-lg mt-6 leading-relaxed max-w-md">
            One booking, one calm crew, one predictable outcome — a channel-ready episode and a month of content, shot anywhere in Delhi NCR.
          </p>
        </motion.div>

        <div className="space-y-4">
          {TAKEAWAYS.map((t, i) => (
            <motion.div
              key={t.title}
              data-testid={`takeaway-${i}`}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex gap-5 rounded-2xl border border-white/10 bg-[#0c0c0c] p-6 hover:border-[rgba(245,184,65,0.4)] transition-colors duration-300"
            >
              <span className="h-9 w-9 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <Check size={18} strokeWidth={3} />
              </span>
              <div>
                <h3 className="font-display uppercase text-xl tracking-tight leading-tight">{t.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Takeaways;
