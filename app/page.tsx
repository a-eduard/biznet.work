import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Why } from "@/components/Why";
import { Steps } from "@/components/Steps";
import { Safety } from "@/components/Safety";
import { Dashboard } from "@/components/Dashboard";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="page">
        <Hero />
        <Why />
        <Steps />
        <Safety />
        <Dashboard />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
