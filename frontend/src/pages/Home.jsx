import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Personas from "@/components/Personas";
import VideoShowcase from "@/components/VideoShowcase";
import ThumbnailGallery from "@/components/ThumbnailGallery";
import PodcastTeasers from "@/components/PodcastTeasers";
import YouTubeChannels from "@/components/YouTubeChannels";
import Services from "@/components/Services";
import Takeaways from "@/components/Takeaways";
import Manifesto from "@/components/Manifesto";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Personas />
        <VideoShowcase />
        <ThumbnailGallery />
        <PodcastTeasers />
        <YouTubeChannels />
        <Services />
        <Takeaways />
        <Manifesto />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
