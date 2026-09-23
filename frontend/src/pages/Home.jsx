import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesTabs from "@/components/ServicesTabs";
import BottomCta from "@/components/BottomCta";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <ServicesTabs />
        <BottomCta />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  );
}
