import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ForWho from "@/components/ForWho";
import HowItWorks from "@/components/HowItWorks";
import TherapeuticApproach from "@/components/TherapeuticApproach";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream-50">
      <Header />
      <Hero />
      <About />
      <ForWho />
      <HowItWorks />
      <TherapeuticApproach />
      <Testimonials />
      <FAQ />
      <Contact />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
