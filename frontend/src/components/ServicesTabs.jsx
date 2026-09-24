import { useState, useRef, useEffect, useCallback, memo } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Clapperboard,
  Camera,
  Mic,
  Users,
  TrendingUp,
  Check,
  Play,
  Volume2,
  VolumeX,
  Youtube as YoutubeIcon,
  ExternalLink,
} from "lucide-react";
import { TABS } from "@/content";

const ICONS = { Clapperboard, Camera, Mic, Users, TrendingUp };

// ─────────────────────────────────────────────────────────────
//  GLOBAL VIDEO PLAYBACK CONTROLLER
//  On mobile only 1 video can play at a time; desktop allows 2.
//  This is the single biggest smoothness win on phones.
// ─────────────────────────────────────────────────────────────
const isMobile =
  typeof window !== "undefined" &&
  (window.matchMedia?.("(max-width: 767px)")?.matches ||
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || ""));
const MAX_CONCURRENT_VIDEOS = isMobile ? 1 : 2;
const registeredVideos = new Map(); // videoEl -> { visibleRatio, wrapper }
let scheduleHandle = null;

const scheduleVideoUpdate = () => {
  if (scheduleHandle) return;
  scheduleHandle = requestAnimationFrame(() => {
    scheduleHandle = null;
    updateActiveVideos();
  });
};

const updateActiveVideos = () => {
  // Sort videos by how visible they are, play top N, pause the rest.
  const entries = Array.from(registeredVideos.entries())
    .filter(([, info]) => info.visibleRatio > 0.15)
    .sort((a, b) => b[1].visibleRatio - a[1].visibleRatio)
    .slice(0, MAX_CONCURRENT_VIDEOS);

  const playing = new Set(entries.map(([el]) => el));

  registeredVideos.forEach((info, el) => {
    if (playing.has(el)) {
      if (el.paused) el.play().catch(() => {});
    } else {
      if (!el.paused) el.pause();
    }
  });
};

let sharedIO = null;
const getSharedIO = () => {
  if (sharedIO) return sharedIO;
  sharedIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const info = registeredVideos.get(entry.target);
        if (info) {
          info.visibleRatio = entry.intersectionRatio;
        }
      });
      scheduleVideoUpdate();
    },
    { threshold: [0, 0.15, 0.35, 0.55, 0.75, 0.95] }
  );
  return sharedIO;
};

const registerVideo = (videoEl) => {
  if (!videoEl) return () => {};
  registeredVideos.set(videoEl, { visibleRatio: 0 });
  getSharedIO().observe(videoEl);
  return () => {
    getSharedIO().unobserve(videoEl);
    registeredVideos.delete(videoEl);
    scheduleVideoUpdate();
  };
};

// Pause everything when tab is hidden — big battery + jank saver
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      registeredVideos.forEach((_, el) => el.pause());
    } else {
      scheduleVideoUpdate();
    }
  });
}

// ─────────────────────────────────────────────────────────────
//  Small heading atom
// ─────────────────────────────────────────────────────────────
const SectionHeading = memo(function SectionHeading({ children }) {
  return (
    <h4 className="font-poster uppercase tracking-[0.18em] text-[11px] sm:text-xs text-gold mb-3 sm:mb-4">
      {children}
    </h4>
  );
});

// ─────────────────────────────────────────────────────────────
//  Autoplay-on-scroll video tile
//  - Poster shown until video is ready
//  - Only plays if globally selected as "most visible"
//  - preload="none" — nothing loads until near viewport
// ─────────────────────────────────────────────────────────────
const VideoTile = memo(function VideoTile({ item, aspect = "9/16" }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    return registerVideo(v);
  }, []);

  const toggleSound = useCallback((e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  }, []);

  const aspectClass = aspect === "16/9" ? "aspect-video" : "aspect-[9/16]";

  return (
    <div
      className={`group relative ${aspectClass} overflow-hidden rounded-lg ring-1 ring-gold/20 bg-black cv-auto`}
      style={{ contain: "layout paint" }}
    >
      {/* Poster — always visible until first frame; keeps something on screen without decoder work */}
      {item.poster && (
        <img
          src={item.poster}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            ready ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
        onLoadedData={() => setReady(true)}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />
      {item.title && (
        <span className="absolute bottom-2 left-2 right-11 font-poster uppercase text-[10.5px] tracking-[0.15em] text-white/90 truncate">
          {item.title}
        </span>
      )}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Unmute" : "Mute"}
        className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-[#050505]/85 text-gold flex items-center justify-center ring-1 ring-gold/30 hover:bg-gold hover:text-[#050505] transition-colors"
      >
        {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
//  YouTube card — iframe only mounted on click
// ─────────────────────────────────────────────────────────────
const YouTubeCard = memo(function YouTubeCard({ item }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-lg ring-1 ring-gold/20 bg-black cv-auto">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={item.channel}
          className="absolute inset-0 w-full h-full"
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block w-full aspect-video overflow-hidden rounded-lg ring-1 ring-gold/20 bg-black cursor-pointer text-left cv-auto"
      aria-label={`Play ${item.channel}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`}
        alt={item.channel}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="h-14 w-14 rounded-full bg-gold text-[#050505] flex items-center justify-center shadow-[0_8px_24px_-4px_rgba(253,255,12,0.55)] group-active:scale-95 transition-transform">
          <Play size={24} fill="currentColor" className="ml-0.5" />
        </span>
      </span>
      <span className="absolute bottom-2 left-2 right-2 font-poster uppercase text-[11px] tracking-[0.15em] text-white/95 truncate flex items-center gap-1.5">
        <YoutubeIcon size={12} className="text-gold" /> {item.channel}
      </span>
    </button>
  );
});

// ─────────────────────────────────────────────────────────────
//  Client channel row
// ─────────────────────────────────────────────────────────────
const ChannelRow = memo(function ChannelRow({ channel }) {
  return (
    <a
      href={channel.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-3 rounded-lg bg-white/[0.04] hover:bg-gold/10 border border-white/10 hover:border-gold/40 px-3.5 py-3 transition-colors"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="h-9 w-9 shrink-0 rounded-full bg-gold/10 ring-1 ring-gold/30 flex items-center justify-center text-gold">
          <YoutubeIcon size={16} />
        </span>
        <div className="min-w-0">
          <p className="font-poster uppercase tracking-wide text-[13px] text-white truncate">
            {channel.name}
          </p>
          <p className="text-[11px] text-white/50 truncate">{channel.handle}</p>
        </div>
      </div>
      <ExternalLink
        size={14}
        className="text-white/40 group-hover:text-gold transition-colors shrink-0"
      />
    </a>
  );
});

// ─────────────────────────────────────────────────────────────
//  Thumbnail tile
// ─────────────────────────────────────────────────────────────
const ThumbTile = memo(function ThumbTile({ item }) {
  return (
    <div className="group relative aspect-video overflow-hidden rounded-lg ring-1 ring-white/10 bg-black cv-auto">
      <img
        src={item.src}
        alt={item.tag}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
      <span className="absolute top-2 left-2 bg-gold text-[#050505] font-poster uppercase text-[9.5px] tracking-[0.15em] px-2 py-0.5">
        {item.tag}
      </span>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
//  BTS photo (masonry)
// ─────────────────────────────────────────────────────────────
const BtsPhoto = memo(function BtsPhoto({ src }) {
  return (
    <div className="mb-3 sm:mb-4 break-inside-avoid rounded-lg overflow-hidden ring-1 ring-white/10 cv-auto">
      <img
        src={src}
        alt="BTS"
        loading="lazy"
        decoding="async"
        className="w-full h-auto block"
      />
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
//  Client logo tile — circular white pill with subtle glow on tap/hover
// ─────────────────────────────────────────────────────────────
const LogoTile = memo(function LogoTile({ logo }) {
  return (
    <div
      className="group relative flex items-center justify-center aspect-square rounded-full bg-white ring-1 ring-white/10 hover:ring-gold/50 transition-all p-2 sm:p-3 cv-auto"
      title={logo.name}
    >
      {/* Yellow glow on hover — kept subtle, GPU-cheap */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: "0 0 30px -6px rgba(253, 255, 12, 0.45)" }}
      />
      <img
        src={logo.src}
        alt={logo.name}
        loading="lazy"
        decoding="async"
        className="relative w-full h-full object-contain scale-90 group-hover:scale-100 transition-transform duration-300"
      />
      {/* Tooltip label — appears below on hover, hidden on mobile to save space */}
      <span className="hidden md:block absolute -bottom-7 left-1/2 -translate-x-1/2 font-poster uppercase text-[9.5px] tracking-[0.12em] text-white/70 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {logo.name}
      </span>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
//  Tab pill button
// ─────────────────────────────────────────────────────────────
const TabButton = memo(function TabButton({ item, active, onClick }) {
  const Icon = ICONS[item.icon] || Clapperboard;
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={`tab-${item.key}`}
      aria-pressed={active}
      aria-controls={`section-${item.key}`}
      className={`relative flex-none snap-start flex flex-col items-center justify-center gap-1.5 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl min-w-[96px] sm:min-w-[112px] lg:min-w-0 lg:flex-1 lg:min-h-[80px] transition-colors ${
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
        <span className="sm:hidden">{item.shortLabel}</span>
        <span className="hidden sm:block">{item.label}</span>
      </span>
      {active && (
        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-8 bg-gold rounded-full" />
      )}
    </button>
  );
});

// ─────────────────────────────────────────────────────────────
//  Section panel — rendered ONLY when active
// ─────────────────────────────────────────────────────────────
const SectionPanel = memo(function SectionPanel({ item, onClose }) {
  const Icon = ICONS[item.icon] || Clapperboard;

  return (
    <article
      id={`section-${item.key}`}
      role="region"
      aria-label={item.label}
      className="overflow-hidden panel-fade-in"
      data-testid={`panel-${item.key}`}
    >
      <div className="rounded-2xl bg-[#0c0c0c] border border-gold/15 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-7">
          <span className="font-poster uppercase text-gold text-4xl sm:text-5xl md:text-6xl leading-none tracking-tight">
            {item.num}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-white/50 hover:text-gold text-[11px] font-poster uppercase tracking-[0.15em] inline-flex items-center gap-1 py-1"
            aria-label="Hide section"
          >
            Hide <ChevronDown size={14} />
          </button>
        </div>

        {/* Intro row: text + icon badge */}
        <div className="flex flex-col md:flex-row min-h-[280px]">
          <div className="relative z-10 flex-1 px-5 pb-6 pt-3 sm:px-8 sm:pb-8 md:px-10 md:pb-10 md:pt-4 flex flex-col justify-center">
            <h3 className="font-poster uppercase text-2xl sm:text-3xl md:text-4xl leading-tight max-w-md">
              {item.title}
            </h3>
            <p className="text-white/70 text-[15px] sm:text-base leading-relaxed mt-3 sm:mt-4 max-w-md">
              {item.description}
            </p>

            {item.bullets && item.bullets.length > 0 && (
              <ul className="mt-4 sm:mt-5 space-y-2 sm:space-y-2.5 max-w-md">
                {item.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-white/80 text-[14px] sm:text-[15px] leading-relaxed"
                  >
                    <span className="mt-1 h-4 w-4 rounded-full bg-gold/15 ring-1 ring-gold/40 flex items-center justify-center shrink-0">
                      <Check size={10} className="text-gold" />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            <a
              href={item.ctaHref}
              data-testid={`panel-cta-${item.key}`}
              className="mt-6 md:mt-7 inline-flex items-center gap-2 font-poster uppercase tracking-[0.14em] text-[#050505] bg-gold hover:brightness-110 px-5 py-2.5 rounded-full text-sm w-fit active:scale-95 transition-all shadow-[0_6px_20px_-6px_rgba(253,255,12,0.55)]"
            >
              {item.ctaLabel} <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Icon badge — no more cropped images */}
          <div className="relative md:w-[42%] lg:w-[38%] md:min-h-full flex items-center justify-center p-6 sm:p-8 md:p-10">
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-gold/10 scale-125"
                style={{ filter: "blur(24px)" }}
              />
              <span className="relative flex items-center justify-center h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-full bg-gold/10 ring-2 ring-gold/40 text-gold shadow-[0_20px_60px_-15px_rgba(253,255,12,0.35)]">
                <Icon size={60} strokeWidth={1.6} />
              </span>
              <span className="absolute -top-2 -right-2 font-poster uppercase text-[10px] tracking-[0.2em] bg-gold text-[#050505] px-2 py-0.5 rounded shadow-[0_4px_12px_-4px_rgba(0,0,0,0.6)]">
                {item.num}
              </span>
            </div>
          </div>
        </div>

        {/* Rich content */}
        <div className="px-5 pb-8 sm:px-8 sm:pb-10 md:px-10 md:pb-12 space-y-8 sm:space-y-10">
          {/* Stats */}
          {item.stats && item.stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-2">
              {item.stats.map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-white/[0.04] border border-white/10 px-4 py-4 sm:py-5 text-center"
                >
                  <p className="font-poster uppercase text-gold text-3xl sm:text-4xl leading-none">
                    {s.value}
                  </p>
                  <p className="mt-2 text-[11px] sm:text-xs text-white/60 font-poster uppercase tracking-[0.15em]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Videos */}
          {item.videos && item.videos.length > 0 && (
            <div>
              {item.videosHeading && <SectionHeading>{item.videosHeading}</SectionHeading>}
              <div
                className={`grid gap-3 sm:gap-4 ${
                  item.videosAspect === "16/9"
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                }`}
              >
                {item.videos.map((v, i) => (
                  <VideoTile key={v.src + i} item={v} aspect={item.videosAspect || "9/16"} />
                ))}
              </div>
            </div>
          )}

          {/* Studio video */}
          {item.studioVideo && (
            <div>
              <SectionHeading>Inside The Studio</SectionHeading>
              <div className="max-w-xs sm:max-w-sm mx-auto rounded-xl overflow-hidden ring-1 ring-gold/20 bg-black">
                <VideoTile item={item.studioVideo} aspect="9/16" />
              </div>
            </div>
          )}

          {/* YouTube */}
          {item.youtube && item.youtube.length > 0 && (
            <div>
              {item.youtubeHeading && <SectionHeading>{item.youtubeHeading}</SectionHeading>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {item.youtube.map((y) => (
                  <YouTubeCard key={y.id} item={y} />
                ))}
              </div>
            </div>
          )}

          {/* BTS videos */}
          {item.btsVideos && item.btsVideos.length > 0 && (
            <div>
              {item.btsHeading && <SectionHeading>{item.btsHeading}</SectionHeading>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {item.btsVideos.map((v, i) => (
                  <VideoTile key={v.src + i} item={v} aspect="16/9" />
                ))}
              </div>
            </div>
          )}

          {/* BTS photos */}
          {item.btsPhotos && item.btsPhotos.length > 0 && (
            <div>
              {item.btsPhotosHeading && <SectionHeading>{item.btsPhotosHeading}</SectionHeading>}
              <div className="columns-2 sm:columns-3 md:columns-4 gap-3 sm:gap-4">
                {item.btsPhotos.map((src) => (
                  <BtsPhoto key={src} src={src} />
                ))}
              </div>
            </div>
          )}

          {/* Reels */}
          {item.reels && item.reels.length > 0 && (
            <div>
              {item.reelsHeading && <SectionHeading>{item.reelsHeading}</SectionHeading>}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {item.reels.map((r, i) => (
                  <VideoTile key={r.src + i} item={r} aspect="9/16" />
                ))}
              </div>
            </div>
          )}

          {/* Thumbnails */}
          {item.thumbnails && item.thumbnails.length > 0 && (
            <div>
              {item.thumbnailsHeading && (
                <SectionHeading>{item.thumbnailsHeading}</SectionHeading>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {item.thumbnails.map((t) => (
                  <ThumbTile key={t.src} item={t} />
                ))}
              </div>
            </div>
          )}

          {/* Client brand logos wall */}
          {item.logos && item.logos.length > 0 && (
            <div>
              {item.logosHeading && <SectionHeading>{item.logosHeading}</SectionHeading>}
              <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
                {item.logos.map((logo) => (
                  <LogoTile key={logo.src} logo={logo} />
                ))}
              </div>
              <p className="mt-6 md:mt-8 text-center font-poster uppercase tracking-[0.18em] text-[10.5px] text-white/45">
                & many more brands / channels / creators
              </p>
            </div>
          )}

          {/* Client channels */}
          {item.channels && item.channels.length > 0 && (
            <div>
              {item.channelsHeading && <SectionHeading>{item.channelsHeading}</SectionHeading>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                {item.channels.map((c) => (
                  <ChannelRow key={c.url} channel={c} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
});

// ─────────────────────────────────────────────────────────────
//  Main component
// ─────────────────────────────────────────────────────────────
export const ServicesTabs = () => {
  const [activeKey, setActiveKey] = useState("podcast");
  const [userInteracted, setUserInteracted] = useState(false);
  const active = TABS.find((t) => t.key === activeKey) || null;

  const tabsRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!activeKey) return;
    const container = tabsRef.current;
    if (container) {
      const activeEl = container.querySelector(`[data-testid="tab-${activeKey}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
    if (!userInteracted) return;
    const t = setTimeout(() => {
      if (panelRef.current) {
        panelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
    return () => clearTimeout(t);
  }, [activeKey, userInteracted]);

  const handleTabClick = useCallback((key) => {
    setUserInteracted(true);
    setActiveKey((prev) => (prev === key ? null : key));
  }, []);

  return (
    <section
      id="services"
      className="relative bg-[#050505] py-8 md:py-12 lg:py-14"
      data-testid="services-tabs-section"
    >
      <div className="relative -mt-10 md:-mt-14 lg:-mt-16 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-8">
          {/* Removed backdrop-blur on mobile — very expensive */}
          <div className="bg-[#0b0b0b]/98 md:backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_18px_50px_-18px_rgba(0,0,0,0.8)]">
            <div
              ref={tabsRef}
              className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-1 sm:gap-2 lg:gap-0 p-2 lg:justify-between"
              role="tablist"
              aria-label="Services"
            >
              {TABS.map((item) => (
                <TabButton
                  key={item.key}
                  item={item}
                  active={activeKey === item.key}
                  onClick={() => handleTabClick(item.key)}
                />
              ))}
            </div>
          </div>

          {!activeKey && (
            <p className="mt-4 text-center font-poster uppercase tracking-[0.2em] text-[10.5px] sm:text-xs text-white/45">
              ↑ Tap any button above to reveal a section
            </p>
          )}
        </div>
      </div>

      <div ref={panelRef} className="max-w-6xl mx-auto px-4 sm:px-5 md:px-8 mt-6 md:mt-8">
        {active && <SectionPanel key={active.key} item={active} onClose={() => setActiveKey(null)} />}
      </div>
    </section>
  );
};

export default ServicesTabs;
