import { useEffect, useRef, useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { HERO } from "@/content";

// Detect mobile ONCE at module load. Used to serve the 720p @ 900kbps
// mobile hero video instead of the 1080p @ 1.8Mbps desktop version.
const isMobileDevice =
  typeof window !== "undefined" &&
  (window.matchMedia?.("(max-width: 767px)")?.matches ||
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || ""));

/**
 * Hero — BTS video looping background, high-contrast type overlay.
 * Performance:
 *  - Serves 1.8MB mobile-optimized video on phones (vs 3.5MB on desktop)
 *  - IntersectionObserver + visibility API pause video when hidden/scrolled off
 *  - Waits for real first frame before fading the poster (no black flash)
 *  - Respects prefers-reduced-motion + save-data: shows poster only, no video
 */
export const Hero = () => {
  const tagParts = HERO.tag.split("/").map((s) => s.trim());
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(true);

  // Honor Save-Data + reduced-motion — skip video entirely, poster only.
  useEffect(() => {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = !!(conn && conn.saveData);
    const slowNet = conn && (conn.effectiveType === "2g" || conn.effectiveType === "slow-2g");
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (saveData || slowNet || reducedMotion) {
      setShouldPlayVideo(false);
    }
  }, []);

  const heroVideoSrc = isMobileDevice ? "/videos/hero-bts-mobile.mp4" : HERO.video;

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Play/pause driven by visibility.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(section);

    const isSectionInView = () => {
      const rect = section.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    };
    const onVis = () => {
      if (document.hidden) video.pause();
      else if (isSectionInView()) video.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);

    // Wait for actual first frame (loadeddata) before fading the poster.
    // canplay fires too early on some browsers and causes a black flash.
    const onLoadedData = () => setVideoReady(true);
    video.addEventListener("loadeddata", onLoadedData);
    // Safety net if event was missed (cached video, etc.)
    if (video.readyState >= 2) setVideoReady(true);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      video.removeEventListener("loadeddata", onLoadedData);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative bg-[#050505] text-white overflow-hidden min-h-[100svh] flex items-center pt-24 pb-14 md:pt-28 md:pb-20"
      data-testid="hero-section"
    >
      {/* Poster fallback (fades out once video is ready) */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
          videoReady ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url(${HERO.poster})` }}
        aria-hidden="true"
      />

      {/* Looping BTS video — mobile version is 1.8MB (vs 3.5MB desktop).
          Skipped entirely on save-data / slow / reduced-motion — poster only. */}
      {shouldPlayVideo && (
        <video
          ref={videoRef}
          src={heroVideoSrc}
          poster={HERO.poster}
          muted
          loop
          playsInline
          preload={isMobileDevice ? "metadata" : "auto"}
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover"
          data-testid="hero-bts-video"
        />
      )}

      {/* Cinematic overlay — keeps BTS visible, text readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/85 via-[#050505]/45 to-[#050505]/25 md:from-[#050505]/80 md:via-[#050505]/40 md:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-[#050505]/10 to-[#050505]/60 md:bg-none" />

      {/* Handwritten script quote (desktop only) */}
      <div className="hidden md:flex absolute top-28 right-8 lg:right-16 z-10 flex-col items-end pointer-events-none">
        <span
          className="text-white/95 leading-tight text-2xl lg:text-3xl"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          {HERO.scriptLine1}
          <br />
          {HERO.scriptLine2}
          <br />
          {HERO.scriptLine3}
        </span>
        <svg width="150" height="18" viewBox="0 0 150 18" className="-mt-1" aria-hidden="true">
          <path
            d="M4 10 C 40 2, 90 2, 146 8"
            stroke="#FDFF0C"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Content column */}
      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-10">
          <div className="max-w-2xl hero-content-fade">
            {/* Breadcrumb tag */}
            <p className="font-poster uppercase tracking-[0.35em] text-[11px] sm:text-xs md:text-sm text-white/70 mb-4 md:mb-6">
              {tagParts.map((part, i) => (
                <span key={i}>
                  {part}
                  {i < tagParts.length - 1 && <span className="text-gold px-1.5">/</span>}
                </span>
              ))}
            </p>

            {/* Big title */}
            <h1 className="font-poster uppercase leading-[0.95] text-[3rem] xs:text-[3.5rem] sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
              <span className="block">{HERO.titleLine1}</span>
              <span className="block text-gold">{HERO.titleLine2}</span>
            </h1>

            {/* Description */}
            <p className="mt-5 md:mt-7 text-[15px] sm:text-base md:text-lg text-white/85 font-medium leading-relaxed max-w-md">
              {HERO.description}
            </p>

            {/* Location — clickable, opens Google Maps in a new tab */}
            <a
              href={HERO.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              title={HERO.address}
              data-testid="hero-location-link"
              className="mt-6 md:mt-8 inline-flex items-center gap-2 text-white/85 hover:text-gold transition-colors group active:scale-[0.98]"
            >
              <span className="h-9 w-9 rounded-full bg-gold/15 ring-1 ring-gold/40 flex items-center justify-center text-gold shrink-0 group-hover:bg-gold group-hover:text-[#050505] transition-colors">
                <MapPin size={16} />
              </span>
              <span className="text-sm md:text-base font-medium tracking-wide">
                {HERO.location}
              </span>
              <ExternalLink
                size={13}
                className="text-white/45 group-hover:text-gold transition-colors"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
