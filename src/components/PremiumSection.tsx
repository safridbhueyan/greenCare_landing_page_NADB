import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface PremiumSectionProps {
  onOpenSubscription: () => void;
}

export const PremiumSection: React.FC<PremiumSectionProps> = ({ onOpenSubscription }) => {
  const benefits = [
    'Advanced plant disease detection',
    'AI Plant Assistant 24/7 access',
    'Detailed disease reports & action plans',
    'Personalized plant-care guidance',
    'Premium plant library with 5,000+ species',
    'Direct plant doctor consultation access',
    'Exclusive plant community features',
    'Future premium features & early updates',
  ];

  return (
    <section className="py-24 bg-[#F4F1EA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto card-organic bg-white p-8 sm:p-12 border border-[#132E1E]/15 shadow-2xl space-y-8 relative overflow-hidden">
          
          {/* Subtle Background Accent */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#A3B18A]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Section Header */}
          <div className="text-center space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#132E1E]/5 text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#3A7D44]" />
              <span>GreenCare Premium Membership</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold text-[#132E1E]">
              Unlock the full{' '}
              <span className="font-serif-editorial italic font-normal text-[#2D6A4F]">
                GreenCare experience.
              </span>
            </h2>

            <p className="text-base text-[#132E1E]/75 max-w-lg mx-auto">
              Empower your indoor jungle and outdoor garden with unlimited AI vision scans, instant agronomist advice, and expert consultations.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 pt-2">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#132E1E]/5 flex items-center gap-3"
              >
                <div className="w-7 h-7 rounded-full bg-[#3A7D44]/15 text-[#2D6A4F] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#3A7D44]" />
                </div>
                <span className="text-xs font-semibold text-[#132E1E]/85">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="pt-4 text-center space-y-4 relative z-10 border-t border-[#132E1E]/10">
            <button
              onClick={onOpenSubscription}
              className="px-10 py-5 rounded-full bg-[#132E1E] hover:bg-[#2D6A4F] text-[#FAF8F5] font-bold text-base transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-0.5 inline-flex items-center gap-3 group"
            >
              <Sparkles className="w-5 h-5 text-[#A3B18A]" />
              <span>Get Premium Access</span>
              <ArrowRight className="w-5 h-5 text-[#A3B18A] transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-[#132E1E]/60 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
              <span>Simple 30-second mobile phone OTP verification • No credit card required</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
