import Marquee from "react-fast-marquee";
import { CHANNELS, STATS } from "@/data";
import { Reveal, HL } from "@/components/FilmKit";

export const CredMarquee = () => {
  return (
    <section className="relative bg-[#050505] py-14 md:py-16 overflow-hidden" data-testid="cred-marquee">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="font-poster uppercase text-3xl sm:text-4xl md:text-5xl leading-tight">
            Real Creators. <HL onGold>Real Channels.</HL> Real Growth.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            We don&apos;t just talk about results — these are the channels we shoot, edit and grow across Delhi NCR.
          </p>
        </Reveal>

        {/* stat stickers */}
        <div className="mt-9 grid grid-cols-2 md:grid-cols-4 gap-3">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="border border-gold/20 bg-[#0c0c0c] rounded-md py-4">
                <div className="font-poster text-gold text-3xl md:text-4xl">{s.value}</div>
                <div className="text-[11px] md:text-xs text-muted-foreground uppercase tracking-[0.15em] mt-1">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-10 border-y border-gold/15 py-5">
        <Marquee speed={45} gradient={false} autoFill>
          {CHANNELS.map((c) => (
            <span key={c.handle} className="mx-8 font-poster uppercase text-xl md:text-2xl text-white/35 hover:text-gold transition-colors">
              {c.name} <span className="text-gold">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default CredMarquee;
