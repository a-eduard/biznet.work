import { Nav } from "@/components/Nav";
import { AnchorRail } from "@/components/AnchorRail";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Summary } from "@/components/Summary";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { Value } from "@/components/Value";
import { Security } from "@/components/Security";
import { TwinDashboard } from "@/components/TwinDashboard";
import { Investors, Market } from "@/components/Investors";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <AnchorRail />
      <main className="page">
        <Hero />
        <Marquee />
        <Summary />
        <Problem />
        <HowItWorks />
        <Value />
        <Security />
        <TwinDashboard />
        <Investors />
        <Market />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
