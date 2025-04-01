import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import HowItWorks from '..//components/sections/HowItWorks';
import PricingSection from '../components/sections/PricingSection';
// import Testimonials from '@/components/sections/Testimonials';
import CtaSection from '../components/sections/CtaSection';
import { useAuth0 } from '@auth0/auth0-react';
import ValidatorCard from '../components/sections/ValidatorCard';
import NetworkMap from '../components/sections/NetworkMap';

export default function Home() {
  const { user } = useAuth0();
  console.log("The user is:", user);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <NetworkMap />
      <HowItWorks />
      <ValidatorCard />
      <PricingSection />
      {/* <Testimonials /> */}
      <CtaSection />
    </>
  );
}