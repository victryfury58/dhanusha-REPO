import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/data";

export const Faq = () => {
  return (
    <section id="faq" className="relative py-28 md:py-36 bg-[#080808]" data-testid="faq-section">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.35em] text-gold uppercase mb-4">Questions</p>
          <h2 className="heading-xl text-4xl md:text-6xl">Good To Know.</h2>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              data-testid={`faq-${i}`}
              className="rounded-2xl border border-white/10 bg-[#0c0c0c] px-6 data-[state=open]:border-[rgba(245,184,65,0.4)]"
            >
              <AccordionTrigger className="text-left font-display uppercase text-lg tracking-tight hover:no-underline hover:text-gold py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
