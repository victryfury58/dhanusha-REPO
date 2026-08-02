import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/data";
import { SlateLabel, Reveal, UL } from "@/components/FilmKit";

export const Faq = () => {
  return (
    <section id="faq" className="relative kraft py-16 md:py-20 overflow-hidden" data-testid="faq-section">
      <SlateLabel side="left" tone="gold" testid="faq-slate-left">Take 09</SlateLabel>
      <SlateLabel side="right" tone="gold" testid="faq-slate-right">Q &amp; A</SlateLabel>

      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <Reveal className="text-center mb-12">
          <h2 className="font-poster uppercase text-4xl sm:text-5xl md:text-6xl leading-tight">
            Good To <UL>Know.</UL>
          </h2>
        </Reveal>

        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} data-testid={`faq-${i}`}
                           className="rounded-md border border-gold/15 bg-[#0c0a07] px-5 data-[state=open]:border-gold/45">
              <AccordionTrigger className="text-left font-poster uppercase text-base md:text-lg tracking-wide hover:no-underline hover:text-gold py-5">
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
