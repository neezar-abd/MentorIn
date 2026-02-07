import HeroSection from "@/components/hero-section-3";
import Features from "@/components/features-3";
import HowItWorks from "@/components/how-it-works";
import StatsSection from "@/components/stats-3";
import TestimonialsTwo from "@/components/testimonials-two";
import CallToActionTwo from "@/components/call-to-action-two";
import Footer from "@/components/layouts/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Header */}
      <HeroSection />

      {/* Features */}
      <Features />

      {/* How it Works */}
      <HowItWorks />

      {/* Stats */}
      <StatsSection />

      {/* Testimonials */}
      <TestimonialsTwo />

      {/* Call to Action */}
      <CallToActionTwo />

      {/* Footer */}
      <Footer />
    </div>
  );
}
