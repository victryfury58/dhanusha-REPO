import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data";
import { useSettings } from "@/hooks/useSettings";

export const Testimonials = () => {
  const { settings } = useSettings();
  if (!settings.show_testimonials) return null;

  return (
    <section id="testimonials" className="relative py-28 md:py-36 bg-background overflow-hidden" data-testid="testimonials-section">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-xs tracking-[0.35em] text-gold uppercase mb-4">Kind Words</p>
          <h2 className="heading-xl text-4xl md:text-6xl">What Creators<br /><span className="text-gold">Say About Us.</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              data-testid={`testimonial-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-[#0c0c0c] p-8"
            >
              <Quote size={28} className="text-gold mb-5" />
              <p className="text-foreground/90 leading-relaxed">{t.quote}</p>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
