import OceanBackground from "@/components/ocean-background";
import HeroSection from "@/components/hero-section";
import CategoriesSection from "@/components/categories-section";
import ProductsSection from "@/components/products-section";
import ColdChainSection from "@/components/cold-chain-section";
import DocumentsSection from "@/components/documents-section";
import ReviewsSection from "@/components/reviews-section";
import DeliverySection from "@/components/delivery-section";
import FAQSection from "@/components/faq-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import RequestPanelWrapper from "@/components/request-panel-wrapper";
import StickyMobileBar from "@/components/sticky-mobile-bar";
import PremiumHeader from "@/components/premium-header";
import SceneManager from "@/components/scene-manager";
import { RequestProvider } from "@/components/request-context";

export default function Home() {
  return (
    <RequestProvider>
      <SceneManager />
      <OceanBackground />
      <PremiumHeader />

      <main className="relative">
        <HeroSection />
        <CategoriesSection />
        <ProductsSection />
        <ColdChainSection />
        <DocumentsSection />
        <ReviewsSection />
        <DeliverySection />
        <FAQSection />
        <CTASection />
        <Footer />

        {/* Request panel */}
        <RequestPanelWrapper />

        {/* Mobile quick actions */}
        <StickyMobileBar />
      </main>
    </RequestProvider>
  );
}
