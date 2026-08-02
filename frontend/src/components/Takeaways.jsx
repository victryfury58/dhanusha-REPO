import { motion } from "framer-motion";
import { TAKEAWAYS } from "@/data";
import { SlateLabel, Reveal, HL, Cta } from "@/components/FilmKit";

export const Takeaways = () => {
  return (
    <section id="what-you-get" className="relative bg-[#050505] py-16 md:py-20 overflow-hidden" data-testid="takeaways-section">
      <SlateLabel side="left" tone="dark" testid="get-slate-left">Take 06</SlateLabel>
      <SlateLabel side="right" tone="dark" testid="get-slate-right">Scene · The Edit</SlateLabel>

      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <Reveal className="text-center mb-12">
          <h2 className="font-poster uppercase text-4xl sm:text-5xl md:text-6xl leading-tight">
            Book One Shoot. <HL onGold>Get Everything.</HL>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            One booking, one calm crew, one predictable outcome — a channel-ready episode and a month of content.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4">
          {TAKEAWAYS.map((t, i) => (
            <Reveal key={t.title} delay={(i % 2) * 0.06}>
              <motion.div whileHover={{ y: -4 }} data-testid={`takeaway-${i}`}
                          className="relative h-full rounded-md overflow-hidden bg-[#0c0a07] border border-gold/15 hover:border-gold/40 transition-colors">
                <div className="clapper-stripe h-3" />
                <div className="p-5 flex gap-4">
                  <span className="font-poster text-gold text-3xl leading-none shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-poster uppercase text-lg tracking-wide leading-tight">{t.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-12" delay={0.1}>
          <Cta href="#book" testid="get-cta">Book a Shoot</Cta>
        </Reveal>
      </div>
    </section>
  );
};

export default Takeaways;
