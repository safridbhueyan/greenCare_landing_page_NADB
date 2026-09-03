import { useState, useEffect } from 'react';
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
import { SubscriptionModal, loadSubscription } from './components/SubscriptionModal';
import { checkSubscription, isSuccess } from './services/bdapps.service';
import type { SubscriptionState } from './types';

const STORAGE_KEY = 'gc_sub';

export function App() {
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);

  // Seed state from localStorage immediately (no flash)
  const [subscription, setSubscription] = useState<SubscriptionState>(loadSubscription);

  /**
   * On mount: if we have a stored mobile, call the real BDApps API to confirm
   * the subscription is still REGISTERED. This handles:
   *  - Subscriptions cancelled from the operator side
   *  - Expired subscriptions
   *  - Stale localStorage from a different device session
   */
  useEffect(() => {
    const saved = loadSubscription();
    if (!saved.isSubscribed || !saved.mobile) return; // nothing to verify

    checkSubscription(saved.mobile)
      .then((res) => {
        const active = isSuccess(res) || res.status?.toUpperCase() === 'REGISTERED';
        if (!active) {
          // Subscription no longer valid — clear local state
          localStorage.removeItem(STORAGE_KEY);
          setSubscription({ isSubscribed: false, mobile: null });
          console.info('[GreenCare] Subscription expired or not found on BDApps. Cleared local state.');
        }
        // If still active, no change needed — state is already correct
      })
      .catch(() => {
        // Network error or API unreachable — keep local state as-is (don't punish offline users)
        console.warn('[GreenCare] Could not verify subscription (network). Keeping cached state.');
      });
  }, []); // runs once on mount

  const handleSubscriptionChange = (state: SubscriptionState) => {
    setSubscription(state);
  };


  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#132E1E] flex flex-col font-sans selection:bg-[#A3B18A]/30 selection:text-[#132E1E]">

      {/* Sticky Header Navbar */}
      <Navbar
        onOpenSubscription={() => setIsSubscriptionOpen(true)}
        isSubscribed={subscription.isSubscribed}
      />

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

      {/* BDApps OTP Subscription Modal (Robi / cirkle SIM users) */}
      <SubscriptionModal
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
        onSubscriptionChange={handleSubscriptionChange}
      />

    </div>
  );
}

export default App;
