import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data";
import { useSettings } from "@/hooks/useSettings";
import { SlateLabel, CornerBrackets, Reveal, HL } from "@/components/FilmKit";

export const Testimonials = () => {
  const { settings } = useSettings();
  if (!settings.show_testimonials) return null;

  return (
    <section id="testimonials" className="relative bg-[#050505] py-16 md:py-20 overflow-hidden" data-testid="testimonials-section">
      <SlateLabel side="left" tone="dark" testid="test-slate-left">Take 08</SlateLabel>
      <SlateLabel side="right" tone="dark" testid="test-slate-right">Scene · Kind Words</SlateLabel>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal className="text-center mb-12">
          <h2 className="font-poster uppercase text-4xl sm:text-5xl md:text-6xl leading-tight">
            What Creators <HL onGold>Say.</HL>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <motion.div whileHover={{ y: -4 }} data-testid={`testimonial-${i}`}
                          className="relative h-full rounded-md bg-[#0c0a07] border border-gold/15 p-7">
                <CornerBrackets color="rgba(245,184,65,0.35)" />
                <Quote size={26} className="text-gold mb-4" />
                <p className="text-white/85 leading-relaxed">{t.quote}</p>
                <div className="mt-5 pt-5 border-t border-dashed border-white/15">
                  <p className="font-poster uppercase tracking-wide text-gold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
