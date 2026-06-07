"use client";

import AnimatedBackground from "./AnimatedBackground";
import DemoSection from "./DemoSection";
import FeaturesSection from "./FeaturesSection";
import FinalCTA from "./FinalCTA";
import HeroSection from "./HeroSection";
import LandingFooter from "./LandingFooter";
import LandingHeader from "./LandingHeader";
import PricingSection from "./PricingSection";
import WorkflowMarquee from "./WorkflowMarquee";
import WorkflowSection from "./WorkflowSection";

export default function ModernLanding() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050712] font-sans text-white antialiased">
      <AnimatedBackground />
      <LandingHeader />
      <HeroSection />
      <WorkflowMarquee />
      <FeaturesSection />
      <WorkflowSection />
      <DemoSection />
      <PricingSection />
      <FinalCTA />
      <LandingFooter />
    </main>
  );
}
