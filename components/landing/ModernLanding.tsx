import LandingHeader from "./LandingHeader";
import HeroSection from "./HeroSection";
import ProblemSection from "./sections/ProblemSection";
import WorkflowSection from "./sections/WorkflowSection";
import FeatureGridSection from "./sections/FeatureGridSection";
import WorkflowEngineSection from "./sections/WorkflowEngineSection";

export default function ModernLanding() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-950">
      <LandingHeader />

      <HeroSection />

      <ProblemSection />

      <WorkflowSection />

      <FeatureGridSection />

      <WorkflowEngineSection />
    </main>
  );
}