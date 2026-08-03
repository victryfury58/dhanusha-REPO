import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CredMarquee from "@/components/Marquee";
import ReelWall from "@/components/ReelWall";
import Thumbnails from "@/components/Thumbnails";
import YouTubeChannels from "@/components/YouTubeChannels";
import Services from "@/components/Services";
import Takeaways from "@/components/Takeaways";
import Comparison from "@/components/Comparison";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative">
      {/* Film-strip poster frame */}
      <div className="film-strip hidden md:block fixed left-0 top-0 bottom-0 w-[22px] z-[70] pointer-events-none" aria-hidden="true" />
      <div className="film-strip hidden md:block fixed right-0 top-0 bottom-0 w-[22px] z-[70] pointer-events-none" aria-hidden="true" />

      <Navbar />
      <main className="md:px-[22px]">
        <Hero />
        <CredMarquee />
        <ReelWall />
        <Thumbnails />
        <YouTubeChannels />
        <Services />
        <Takeaways />
        <Comparison />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
