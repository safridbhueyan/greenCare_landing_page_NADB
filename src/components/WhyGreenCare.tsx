import React from 'react';
import { Leaf, Cpu, Heart, Sparkles, Feather } from 'lucide-react';

export const WhyGreenCare: React.FC = () => {
  return (
    <section className="py-28 bg-[#132E1E] text-[#FAF8F5] relative overflow-hidden">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#2D6A4F]/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Deep Editorial Copy */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-[#A3B18A] uppercase tracking-widest">
              <Feather className="w-4 h-4 text-[#A3B18A]" />
              <span>Our Philosophy</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.12]">
              Technology should{' '}
              <span className="font-serif-editorial italic font-normal text-[#A3B18A]">
                help nature,
              </span>{' '}
              not replace it.
            </h2>

            <p className="text-lg text-[#FAF8F5]/80 font-normal leading-relaxed max-w-2xl">
              We built GreenCare on a simple belief: artificial intelligence shouldn’t distance us from the natural world — it should give us the eyes, knowledge, and community to care for it deeper than ever before.
            </p>

            {/* Triad Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/15">
              
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#A3B18A]">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">1. Precision AI</h4>
                <p className="text-xs text-[#FAF8F5]/70 leading-relaxed">
                  Real-time micro-pathogen detection with 98.4% diagnostic accuracy.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#A3B18A]">
                  <Leaf className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">2. Botanical Science</h4>
                <p className="text-xs text-[#FAF8F5]/70 leading-relaxed">
                  Grounded in peer-reviewed plant pathology and organic soil agronomy.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#A3B18A]">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">3. Shared Community</h4>
                <p className="text-xs text-[#FAF8F5]/70 leading-relaxed">
                  Connecting over 50,000 passionate plant parents across the globe.
                </p>
              </div>

            </div>

          </div>

          {/* Right Column: Macro Botanical Photography Gallery */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black aspect-4/5 group">
              <img
                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800"
                alt="Macro Plant Leaves Dew Drops"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#132E1E] via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A3B18A]">
                  <Sparkles className="w-4 h-4" />
                  <span>GreenCare Manifesto</span>
                </div>
                <blockquote className="text-sm font-serif-editorial italic text-white/95">
                  "To cultivate a plant is to enter into a quiet dialogue with time, sunlight, and moisture."
                </blockquote>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
