import "@/App.css";
import { ReactLenis } from "lenis/react";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ThumbnailGallery from "@/components/ThumbnailGallery";
import PodcastTeasers from "@/components/PodcastTeasers";
import Services from "@/components/Services";
import Manifesto from "@/components/Manifesto";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      <div className="App relative bg-background text-foreground min-h-screen overflow-x-hidden">
        <div className="grain-overlay" aria-hidden="true" />
        <Toaster position="top-center" theme="dark" richColors />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <ThumbnailGallery />
          <PodcastTeasers />
          <Services />
          <Manifesto />
          <Contact />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}

export default App;
