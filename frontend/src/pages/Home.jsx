import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesTabs from "@/components/ServicesTabs";
import BottomCta from "@/components/BottomCta";
import CredMarquee from "@/components/Marquee";
import StudioIntro from "@/components/StudioIntro";
import ReelWall from "@/components/ReelWall";
import BtsPhotos from "@/components/BtsPhotos";
import Thumbnails from "@/components/Thumbnails";
import YouTubeChannels from "@/components/YouTubeChannels";
import Services from "@/components/Services";
import Takeaways from "@/components/Takeaways";
import Comparison from "@/components/Comparison";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileActionBar from "@/components/MobileActionBar";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        {/* New design — hero + 5-tab services block + supporting CTA */}
        <Hero />
        <ServicesTabs />
        <BottomCta />

        {/* Anchor for "Clients" nav link */}
        <div id="clients" />
        <CredMarquee />

        {/* Existing rich sections kept below — reels, thumbnails, portfolio */}
        <StudioIntro />
        <ReelWall />
        <BtsPhotos />
        <Thumbnails />
        <YouTubeChannels />

        {/* Anchor for "About" nav link */}
        <div id="about" />
        <Takeaways />
        <Comparison />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileActionBar />
    </div>
  );
}
