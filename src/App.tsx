import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { AIAssistant } from './components/AIAssistant';
import { PlantDoctors } from './components/PlantDoctors';
import { PlantLibrary } from './components/PlantLibrary';
import { PlantCommunity } from './components/PlantCommunity';
import { WhyGreenCare } from './components/WhyGreenCare';
import { AppSection } from './components/AppSection';
import { PremiumSection } from './components/PremiumSection';
import { SubscriptionSection, loadSubscription } from './components/SubscriptionSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { checkSubscription, isSuccess } from './services/bdapps.service';
import type { SubscriptionState } from './types';

const STORAGE_KEY = 'gc_sub';

/** Smooth-scroll to the inline subscription section */
function scrollToSubscription() {
  document.getElementById('subscription')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function App() {
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
    if (!saved.isSubscribed || !saved.mobile) return;

    checkSubscription(saved.mobile)
      .then((res) => {
        const active = isSuccess(res) || res.status?.toUpperCase() === 'REGISTERED';
        if (!active) {
          localStorage.removeItem(STORAGE_KEY);
          setSubscription({ isSubscribed: false, mobile: null });
          console.info('[GreenCare] Subscription expired or not found on BDApps. Cleared local state.');
        }
      })
      .catch(() => {
        console.warn('[GreenCare] Could not verify subscription (network). Keeping cached state.');
      });
  }, []);

  const handleSubscriptionChange = (state: SubscriptionState) => {
    setSubscription(state);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#132E1E] flex flex-col font-sans selection:bg-[#A3B18A]/30 selection:text-[#132E1E]">

      {/* Sticky Header Navbar — all Subscribe buttons scroll to inline section */}
      <Navbar
        onOpenSubscription={scrollToSubscription}
        isSubscribed={subscription.isSubscribed}
      />

      {/* Main Digital Garden Page Structure */}
      <main className="flex-1">
        <Hero onOpenSubscription={scrollToSubscription} />
        <HowItWorks />
        <AIAssistant onOpenSubscription={scrollToSubscription} />
        <PlantDoctors onOpenSubscription={scrollToSubscription} />
        <PlantLibrary onOpenSubscription={scrollToSubscription} />
        <PlantCommunity onOpenSubscription={scrollToSubscription} />
        <WhyGreenCare />
        <AppSection onOpenSubscription={scrollToSubscription} />
        <PremiumSection onOpenSubscription={scrollToSubscription} />

        {/* Inline subscription section — full OTP flow, no modal */}
        <SubscriptionSection onSubscriptionChange={handleSubscriptionChange} />

        <FinalCTA onOpenSubscription={scrollToSubscription} />
      </main>

      {/* Minimal Footer */}
      <Footer />

    </div>
  );
}

export default App;
