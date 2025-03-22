import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import HowItWorks from '..//components/sections/HowItWorks';
import PricingSection from '../components/sections/PricingSection';
// import Testimonials from '@/components/sections/Testimonials';
import CtaSection from '../components/sections/CtaSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <PricingSection />
      {/* <Testimonials /> */}
      <CtaSection />
    </>
  );
}