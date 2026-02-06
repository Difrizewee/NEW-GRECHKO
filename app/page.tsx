import OceanBackground from "@/components/ocean-background";
import HeroSection from "@/components/hero-section";
import CategoriesSection from "@/components/categories-section";
import ProductsSection from "@/components/products-section";
import ColdChainSection from "@/components/cold-chain-section";
import DeliverySection from "@/components/delivery-section";
import DocumentsSection from "@/components/documents-section";
import ReviewsSection from "@/components/reviews-section";
import FaqSection from "@/components/faq-section";
import CtaSection from "@/components/cta-section";
import FooterSection from "@/components/footer-section";
import StickyMobileBar from "@/components/sticky-mobile-bar";
import { RequestProvider } from "@/components/request-context";
import RequestPanelWrapper from "@/components/request-panel-wrapper";

export default function Page() {
  return (
    <RequestProvider>
      <OceanBackground />
      <main className="relative z-0 pb-20 lg:pb-0">
        {/* 1. Hero (surface): value proposition + trust badges + primary CTA */}
        <HeroSection />
        {/* 2. Categories */}
        <CategoriesSection />
        {/* 3. Best sellers + curated products */}
        <ProductsSection />
        {/* 4. Hero scene: Cold chain & packaging infographic */}
        <ColdChainSection />
        {/* 5. Delivery & payment (with calculator) */}
        <DeliverySection />
        {/* 6. Documentation & traceability (proof) */}
        <DocumentsSection />
        {/* 7. Reviews (with metadata) */}
        <ReviewsSection />
        {/* 8. FAQ (full answers) */}
        <FaqSection />
        {/* 9. Final CTA: concierge request + phone block */}
        <CtaSection />
        {/* 10. Footer: legal + requisites */}
        <FooterSection />
      </main>
      <StickyMobileBar />
      <RequestPanelWrapper />
    </RequestProvider>
  );
}
