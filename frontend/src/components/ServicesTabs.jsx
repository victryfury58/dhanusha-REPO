import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clapperboard, Camera, Mic, Users, TrendingUp } from "lucide-react";

/**
 * ServicesTabs — the pill of 5 icon tabs + the featured-card / grid pattern
 * from the design reference. Mobile-first: tabs horizontally scroll, featured
 * card stacks image below text, small cards go 2 per row.
 */

const SERVICE_ITEMS = [
  {
    key: "motion",
    num: "01",
    icon: Clapperboard,
    label: "Motion Graphics & Editing",
    labelShort: "Motion Graphics",
    desc:
      "From eye-catching motion graphics to cinematic edits, we bring your ideas to life with creativity and precision.",
    image: "/posters/bts6.jpg",
    ctaHref: "#services",
  },
  {
    key: "outdoor",
    num: "02",
    icon: Camera,
    label: "Outdoor Shoot & Event Shoots",
    labelShort: "Outdoor Shoot",
    desc:
      "On-location shoots, brand events and coverage across Delhi NCR — full crew, lighting and multi-camera setup.",
    image: "/posters/ev_marathon.jpg",
    ctaHref: "#reels",
  },
  {
    key: "podcast",
    num: "03",
    icon: Mic,
    label: "Podcast Shoot",
    labelShort: "Podcast Shoot",
    desc:
      "Broadcast-grade multi-camera podcast sets with synced audio, dynamic lighting and a full production crew.",
    image: "/posters/studio_intro.jpg",
    ctaHref: "#reels",
  },
  {
    key: "clients",
    num: "04",
    icon: Users,
    label: "Clients",
    labelShort: "Clients",
    desc:
      "80+ creators, brands and businesses trust us — 250+ episodes shot and 40M+ views delivered.",
    image: "/bts/bts3.jpg",
    ctaHref: "#clients",
  },
  {
    key: "seo",
    num: "05",
    icon: TrendingUp,
    label: "SEO & Social Media Management",
    labelShort: "SEO & SMM",
    desc:
      "Titles, tags, thumbnails and content calendars tuned to grow reach, watch-time and revenue.",
    image: "/posters/teaser.jpg",
    ctaHref: "#services",
  },
];

const TabButton = ({ item, active, onClick, index }) => {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={`tab-${item.key}`}
      aria-pressed={active}
      className={`relative flex-none snap-start flex flex-col items-center justify-center gap-1.5 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl min-w-[96px] sm:min-w-[112px] lg:min-w-0 lg:flex-1 lg:min-h-[76px] transition-colors ${
        active
          ? "bg-gold/10 text-gold"
          : "text-white/70 hover:text-white hover:bg-white/[0.04]"
      }`}
    >
      <Icon
        size={22}
        strokeWidth={active ? 2.4 : 1.9}
        className={active ? "text-gold" : "text-white/80"}
      />
      <span
        className={`font-poster uppercase tracking-[0.08em] text-[10.5px] sm:text-[11px] leading-tight text-center max-w-[110px] ${
          active ? "text-gold" : "text-white/80"
        }`}
      >
        <span className="sm:hidden">{item.labelShort}</span>
        <span className="hidden sm:block">{item.label}</span>
      </span>
      {active && (
        <motion.span
          layoutId="tab-underline"
          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-8 bg-gold rounded-full"
        />
      )}
    </button>
  );
};

const FeaturedCard = ({ item }) => (
  <motion.article
    key={item.key}
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="relative overflow-hidden rounded-2xl bg-[#0c0a07] border border-gold/15 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]"
    data-testid={`featured-${item.key}`}
  >
    {/* Background image on right (desktop) / bottom (mobile) */}
    <div className="relative flex flex-col md:flex-row min-h-[440px] md:min-h-[300px]">
      {/* Text side */}
      <div className="relative z-10 flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
        <span className="font-poster uppercase text-gold text-4xl sm:text-5xl md:text-6xl leading-none tracking-tight">
          {item.num}
        </span>
        <h3 className="font-poster uppercase text-2xl sm:text-3xl md:text-4xl leading-tight mt-3 sm:mt-4 max-w-md">
          {item.label}
        </h3>
        <p className="text-white/70 text-[15px] sm:text-base leading-relaxed mt-3 sm:mt-4 max-w-md">
          {item.desc}
        </p>
        <a
          href={item.ctaHref}
          className="mt-5 md:mt-6 inline-flex items-center gap-2 font-poster uppercase tracking-[0.14em] text-gold text-sm hover:gap-3 transition-all w-fit"
          data-testid={`featured-cta-${item.key}`}
        >
          Learn More <ArrowUpRight size={16} />
        </a>
      </div>

      {/* Image side */}
      <div className="relative md:w-[55%] lg:w-[52%] md:min-h-full h-56 md:h-auto overflow-hidden">
        <img
          src={item.image}
          alt={item.label}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-[#0c0a07] via-[#0c0a07]/40 to-transparent" />
      </div>
    </div>
  </motion.article>
);

const MiniCard = ({ item, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    data-testid={`mini-${item.key}`}
    className="group relative text-left overflow-hidden rounded-xl bg-[#0c0a07] border border-white/10 hover:border-gold/40 transition-colors active:scale-[0.98]"
  >
    <div className="relative h-40 sm:h-44 md:h-48">
      <img
        src={item.image}
        alt={item.label}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/10" />
      <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between">
        <span className="font-poster uppercase text-gold text-2xl sm:text-3xl leading-none">
          {item.num}
        </span>
        <div>
          <h4 className="font-poster uppercase text-white text-sm sm:text-base leading-tight max-w-[90%]">
            {item.label}
          </h4>
          <span className="mt-2 inline-flex items-center gap-1.5 font-poster uppercase tracking-[0.1em] text-gold text-[11px]">
            Learn More <ArrowUpRight size={12} />
          </span>
        </div>
      </div>
    </div>
  </button>
);

export const ServicesTabs = () => {
  const [activeKey, setActiveKey] = useState(SERVICE_ITEMS[0].key);
  const active = SERVICE_ITEMS.find((s) => s.key === activeKey) || SERVICE_ITEMS[0];
  const others = SERVICE_ITEMS.filter((s) => s.key !== activeKey);

  const tabsRef = useRef(null);

  // Auto-scroll the active tab into view on mobile
  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const activeEl = container.querySelector(`[data-testid="tab-${activeKey}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeKey]);

  return (
    <section
      id="services"
      className="relative bg-[#050505] py-10 md:py-14 lg:py-16"
      data-testid="services-tabs-section"
    >
      {/* Tab strip — centered pill on desktop, horizontally scrollable on mobile */}
      <div className="relative -mt-10 md:-mt-14 lg:-mt-16 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-8">
          <div className="bg-[#0b0908]/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_18px_50px_-18px_rgba(0,0,0,0.8)]">
            <div
              ref={tabsRef}
              className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-1 sm:gap-2 lg:gap-0 p-2 lg:justify-between"
              role="tablist"
              aria-label="Services"
            >
              {SERVICE_ITEMS.map((item, i) => (
                <TabButton
                  key={item.key}
                  item={item}
                  index={i}
                  active={activeKey === item.key}
                  onClick={() => setActiveKey(item.key)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-8 mt-8 md:mt-10">
        <AnimatePresence mode="wait">
          <FeaturedCard key={active.key} item={active} />
        </AnimatePresence>

        {/* Mini cards row (the other 4) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-5">
          {others.map((item) => (
            <MiniCard key={item.key} item={item} onClick={() => setActiveKey(item.key)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesTabs;
