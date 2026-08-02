import { motion } from "framer-motion";
import { Youtube, ArrowUpRight } from "lucide-react";
import { CHANNELS, FEATURED_VIDEO_ID } from "@/data";

export const YouTubeChannels = () => {
  return (
    <section id="clients" className="relative py-28 md:py-36 bg-background overflow-hidden" data-testid="youtube-channels">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-xs tracking-[0.35em] text-gold uppercase mb-4">Channels We Produce For</p>
          <h2 className="heading-xl text-4xl md:text-6xl">Real Creators.<br /><span className="text-gold">Real Channels.</span></h2>
          <p className="text-muted-foreground text-base md:text-lg mt-6 leading-relaxed">
            We don't just talk about results — here are the YouTube channels we shoot, edit and grow. Tap any to watch.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Featured embed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/10 aspect-video bg-black">
              <iframe
                data-testid="featured-video"
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${FEATURED_VIDEO_ID}`}
                title="Featured podcast episode"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4">Featured episode — produced end-to-end by Dhanusha Production.</p>
          </motion.div>

          {/* Channel list */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CHANNELS.map((c, i) => (
              <motion.a
                key={c.handle}
                href={c.url}
                target="_blank"
                rel="noreferrer"
                data-testid={`channel-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                whileHover={{ y: -4 }}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-[#0c0c0c] p-4 hover:border-[rgba(245,184,65,0.5)] transition-colors duration-300"
              >
                <span className="h-9 w-9 shrink-0 rounded-lg bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-gold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Youtube size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold truncate">{c.name}</span>
                  <span className="block text-xs text-muted-foreground truncate">{c.handle}</span>
                </span>
                <ArrowUpRight size={16} className="ml-auto text-muted-foreground group-hover:text-gold group-hover:rotate-45 transition-all duration-300" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeChannels;
