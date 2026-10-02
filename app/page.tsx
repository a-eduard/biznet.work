import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Why } from "@/components/Why";
import { Steps } from "@/components/Steps";
import { Calculator } from "@/components/Calculator";
import { Safety } from "@/components/Safety";
import { Dashboard } from "@/components/Dashboard";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { BookingDialog } from "@/components/BookingDialog";
import { StickyCta } from "@/components/StickyCta";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="page">
        <Hero />
        <Why />
        <Steps />
        <Calculator />
        <Safety />
        <Dashboard />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
      <BookingDialog />
    </>
  );
}
