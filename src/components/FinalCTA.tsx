import React from 'react';
import { ArrowRight, Download, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onOpenSubscription: () => void;
  onOpenDownload?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenSubscription, onOpenDownload }) => {
  return (
    <section className="relative py-28 bg-[#132E1E] text-white overflow-hidden">
      {/* Background Macro Foliage Photography */}
      <img
        src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1600"
        alt="Macro Green Leaves"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-overlay"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#132E1E] via-[#132E1E]/80 to-[#132E1E]/90 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#A3B18A] uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-[#A3B18A]" />
          <span>Begin Your Plant Health Journey</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">
          Grow something{' '}
          <span className="font-serif-editorial italic font-normal text-[#A3B18A]">
            beautiful.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
          Your plants are growing every day. Give them the right care, diagnosis, and community guidance.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenDownload || onOpenSubscription}
            className="px-8 py-4 rounded-full bg-[#FAF8F5] text-[#132E1E] font-bold text-base hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:scale-105"
          >
            <span>Start with GreenCare</span>
            <ArrowRight className="w-5 h-5 text-[#2D6A4F]" />
          </button>

          <button
            onClick={onOpenDownload || onOpenSubscription}
            className="px-8 py-4 rounded-full border border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-[#A3B18A]" />
            <span>Download the App</span>
          </button>
        </div>
      </div>
    </section>
  );
};
