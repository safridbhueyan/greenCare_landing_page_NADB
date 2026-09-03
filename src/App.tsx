import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { DiseaseClinic } from './components/DiseaseClinic';
import { AIAssistant } from './components/AIAssistant';
import { PlantDoctors } from './components/PlantDoctors';
import { PlantLibrary } from './components/PlantLibrary';
import { PlantCommunity } from './components/PlantCommunity';
import { WhyGreenCare } from './components/WhyGreenCare';
import { AppSection } from './components/AppSection';
import { PremiumSection } from './components/PremiumSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { SubscriptionModal } from './components/SubscriptionModal';

export function App() {
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#132E1E] flex flex-col font-sans selection:bg-[#A3B18A]/30 selection:text-[#132E1E]">
      
      {/* Sticky Header Navbar */}
      <Navbar onOpenSubscription={() => setIsSubscriptionOpen(true)} />

      {/* Main Digital Garden Page Structure */}
      <main className="flex-1">
        <Hero onOpenSubscription={() => setIsSubscriptionOpen(true)} />
        <HowItWorks />
        <DiseaseClinic onOpenSubscription={() => setIsSubscriptionOpen(true)} />
        <AIAssistant onOpenSubscription={() => setIsSubscriptionOpen(true)} />
        <PlantDoctors onOpenSubscription={() => setIsSubscriptionOpen(true)} />
        <PlantLibrary onOpenSubscription={() => setIsSubscriptionOpen(true)} />
        <PlantCommunity onOpenSubscription={() => setIsSubscriptionOpen(true)} />
        <WhyGreenCare />
        <AppSection onOpenSubscription={() => setIsSubscriptionOpen(true)} />
        <PremiumSection onOpenSubscription={() => setIsSubscriptionOpen(true)} />
        <FinalCTA onOpenSubscription={() => setIsSubscriptionOpen(true)} />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Phone Number + OTP 3-step Subscription Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
      />

    </div>
  );
}

export default App;
