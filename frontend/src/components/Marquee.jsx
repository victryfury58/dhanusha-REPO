import Marquee from "react-fast-marquee";

const WORDS = [
  "Outdoor Podcasts",
  "Multi-Cam Setups",
  "Reels & Shorts",
  "Thumbnail Design",
  "Motion Graphics",
  "YouTube SEO",
  "Brand Films",
];

export const MarqueeStrip = () => {
  return (
    <section className="relative border-y border-white/10 py-6 bg-[#080808]" data-testid="marquee">
      <Marquee speed={40} gradient={false} autoFill>
        {WORDS.map((w, i) => (
          <div key={i} className="flex items-center gap-8 px-8">
            <span className="heading-xl text-4xl md:text-6xl text-stroke-gold">{w}</span>
            <span className="h-2 w-2 rounded-full bg-gold" />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default MarqueeStrip;
