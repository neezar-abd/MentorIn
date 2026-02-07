import HeroSection from "@/components/hero-section-3";
import Features from "@/components/features-3";
import StatsSection from "@/components/stats-3";
import Footer from "@/components/layouts/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Header */}
      <HeroSection />

      {/* Features */}
      <Features />

      {/* Stats */}
      <StatsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
