import { motion } from "framer-motion";
import { Youtube, ArrowUpRight } from "lucide-react";
import { CHANNELS, FEATURED_EPISODES } from "@/data";
import { SlateLabel, CornerBrackets, Reveal, HL } from "@/components/FilmKit";

export const YouTubeChannels = () => {
  return (
    <section id="clients" className="relative bg-[#050505] py-16 md:py-20 overflow-hidden" data-testid="youtube-channels">
      <SlateLabel side="left" tone="dark" testid="clients-slate-left">Reel 07</SlateLabel>
      <SlateLabel side="right" tone="dark" testid="clients-slate-right">Director&apos;s Chair</SlateLabel>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal className="text-center mb-12">
          <h2 className="font-poster uppercase text-4xl sm:text-5xl md:text-6xl leading-tight">
            Channels We <HL onGold>Produce For.</HL>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Play any featured episode below, or tap a channel to open it on YouTube.</p>
        </Reveal>

        {/* Featured episode embeds grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-5 mb-12">
          {FEATURED_EPISODES.map((ep, i) => (
            <motion.div
              key={ep.id}
              data-testid={`featured-episode-${i}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className={`relative rounded-md overflow-hidden ring-1 ring-gold/20 bg-black aspect-video ${i === 0 ? "md:col-span-2" : ""}`}
            >
              <CornerBrackets color="rgba(245,184,65,0.4)" />
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${ep.id}`}
                title={ep.channel}
                loading="lazy"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <span className="absolute top-2 left-2 font-poster uppercase text-[10px] tracking-[0.2em] bg-gold text-[#050505] px-2 py-1 pointer-events-none">{ep.channel}</span>
            </motion.div>
          ))}
        </div>

        {/* Channel cards */}
        <Reveal className="mb-6">
          <p className="font-poster uppercase text-xs tracking-[0.25em] text-gold/70">More Client Channels</p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CHANNELS.map((c, i) => (
            <motion.a
              key={c.handle}
              href={c.url}
              target="_blank"
              rel="noreferrer"
              data-testid={`channel-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              whileHover={{ y: -4 }}
              className="group flex items-center gap-3 rounded-md border border-gold/15 bg-[#0c0c0c] p-3 hover:border-gold/50 transition-colors"
            >
              <span className="h-9 w-9 shrink-0 rounded bg-gold/10 ring-1 ring-gold/25 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-[#050505] transition-colors">
                <Youtube size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold truncate">{c.name}</span>
                <span className="block text-xs text-muted-foreground truncate">{c.handle}</span>
              </span>
              <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-gold group-hover:rotate-45 transition-all duration-300" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouTubeChannels;
