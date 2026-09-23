import { ArrowUpRight, Leaf } from "lucide-react";
import { BOTTOM_CTA } from "@/content";

const WhatsAppIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.02 0C5.44 0 .1 5.34.1 11.92c0 2.1.55 4.15 1.6 5.96L0 24l6.29-1.65a11.9 11.9 0 0 0 5.72 1.46h.01c6.58 0 11.92-5.34 11.92-11.92 0-3.18-1.24-6.17-3.42-8.41ZM12.02 21.3h-.01a9.36 9.36 0 0 1-4.77-1.31l-.34-.2-3.73.98 1-3.64-.22-.37a9.35 9.35 0 0 1-1.43-4.94c0-5.17 4.21-9.38 9.4-9.38 2.51 0 4.87.98 6.64 2.75a9.32 9.32 0 0 1 2.75 6.64c-.01 5.18-4.22 9.38-9.4 9.38Zm5.43-7.03c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01a1.1 1.1 0 0 0-.8.37c-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
  </svg>
);

export const BottomCta = () => {
  const taglineParts = BOTTOM_CTA.tagline.split("/").map((s) => s.trim());
  return (
    <section id="book" className="bg-[#050505] py-8 md:py-12" data-testid="bottom-cta">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#0e0b07] to-[#120c05] border border-gold/20 p-5 md:p-6 lg:p-7 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div className="flex items-start md:items-center gap-3 md:gap-4 flex-1 min-w-0">
            <span className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-full bg-gold/10 ring-1 ring-gold/30 flex items-center justify-center text-gold">
              <Leaf size={18} />
            </span>
            <div className="min-w-0">
              <p className="font-poster uppercase text-white text-lg sm:text-xl md:text-2xl leading-tight">
                {BOTTOM_CTA.title}
              </p>
              <p className="font-poster uppercase tracking-[0.2em] text-[10px] sm:text-[11px] text-gold/70 mt-1">
                {taglineParts.map((part, i) => (
                  <span key={i}>
                    {part}
                    {i < taglineParts.length - 1 && (
                      <span className="text-gold/50 px-1.5">/</span>
                    )}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            <a
              href={BOTTOM_CTA.bookHref}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="bottom-cta-book"
              className="inline-flex items-center gap-2 bg-[#25D366] text-[#050505] font-poster uppercase tracking-[0.1em] text-[12px] sm:text-[13px] px-4 sm:px-5 py-2.5 sm:py-3 rounded-full active:scale-95 hover:brightness-110 transition-all"
            >
              <WhatsAppIcon size={15} />
              {BOTTOM_CTA.bookLabel}
            </a>
            <a
              href={BOTTOM_CTA.infoHref}
              className="hidden sm:inline-flex items-center gap-1.5 font-poster uppercase tracking-[0.12em] text-[12px] sm:text-[13px] text-white/80 hover:text-gold transition-colors"
            >
              {BOTTOM_CTA.infoLabel} <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomCta;
