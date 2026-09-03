import React, { useState } from 'react';
import { Smartphone, ScanLine, Bot, Users, BookOpen, Stethoscope, Download } from 'lucide-react';

interface AppSectionProps {
  onOpenSubscription: () => void;
}

export const AppSection: React.FC<AppSectionProps> = ({ onOpenSubscription }) => {
  const [activeAppTab, setActiveAppTab] = useState<'scan' | 'ai' | 'community' | 'library' | 'doctor'>('scan');

  return (
    <section className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#132E1E]/5 text-xs font-semibold text-[#2D6A4F] uppercase tracking-wider">
            <Smartphone className="w-4 h-4 text-[#3A7D44]" />
            <span>Mobile Companion Application</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-[#132E1E]">
            Your plant companion,{' '}
            <span className="font-serif-editorial italic font-normal text-[#2D6A4F]">
              wherever you grow.
            </span>
          </h2>

          <p className="text-base text-[#132E1E]/75 max-w-xl mx-auto">
            Take instant leaf scans on the go, receive watering push reminders, chat with AI, and consult doctors from your pocket.
          </p>
        </div>

        {/* Interactive App Screen Switcher Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: 'scan', label: 'Disease Scanner', icon: ScanLine },
            { id: 'ai', label: 'AI Assistant', icon: Bot },
            { id: 'community', label: 'Plant Feed', icon: Users },
            { id: 'library', label: 'Encyclopedia', icon: BookOpen },
            { id: 'doctor', label: 'Doctor Call', icon: Stethoscope },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAppTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                  activeAppTab === tab.id
                    ? 'bg-[#132E1E] text-white shadow-md scale-105'
                    : 'bg-white text-[#132E1E] hover:bg-[#132E1E]/10 border border-[#132E1E]/10'
                }`}
              >
                <Icon className="w-4 h-4 text-[#3A7D44]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Phone Frame Viewport */}
        <div className="relative max-w-sm mx-auto">
          
          {/* Smartphone Frame Outer shell */}
          <div className="relative rounded-[40px] border-[10px] border-[#132E1E] bg-[#132E1E] shadow-2xl overflow-hidden aspect-9/19">
            
            {/* Camera Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-[#132E1E] rounded-b-2xl z-30 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-black/60" />
            </div>

            {/* Screen Content Window */}
            <div className="w-full h-full bg-[#FAF8F5] pt-8 pb-4 px-4 flex flex-col justify-between overflow-hidden relative">
              
              {/* Top Header inside App */}
              <div className="flex items-center justify-between pb-3 border-b border-[#132E1E]/10">
                <span className="text-xs font-bold text-[#132E1E]">GreenCare Mobile</span>
                <span className="w-2 h-2 rounded-full bg-[#3A7D44] animate-pulse" />
              </div>

              {/* Dynamic Screen View */}
              <div className="flex-1 py-4 space-y-3 overflow-y-auto">
                
                {activeAppTab === 'scan' && (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="relative rounded-2xl overflow-hidden aspect-square border border-[#132E1E]/10">
                      <img
                        src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=400"
                        alt="Scanner"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[#2D6A4F]/20 flex items-center justify-center">
                        <ScanLine className="w-12 h-12 text-white animate-pulse" />
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-[#132E1E]/10 text-xs">
                      <div className="font-bold text-[#132E1E]">Scan Complete: 98% Match</div>
                      <div className="text-[11px] text-[#2D6A4F]">Cercospora Leaf Spot Detected</div>
                    </div>
                  </div>
                )}

                {activeAppTab === 'ai' && (
                  <div className="space-y-2 animate-in fade-in duration-300">
                    <div className="p-2.5 rounded-xl bg-[#132E1E] text-white text-[11px] ml-6">
                      Why are my leaves yellowing?
                    </div>
                    <div className="p-2.5 rounded-xl bg-white text-[#132E1E] text-[11px] mr-6 border border-[#132E1E]/10">
                      Yellowing leaves often indicate overwatering or direct sun scorch! 💧
                    </div>
                  </div>
                )}

                {activeAppTab === 'community' && (
                  <div className="space-y-2 animate-in fade-in duration-300">
                    <div className="rounded-xl overflow-hidden aspect-4/3">
                      <img
                        src="https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=400"
                        alt="Community"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-[11px] font-bold text-[#132E1E]">Aria: "Look at my new Pothos leaf! 🌿"</div>
                  </div>
                )}

                {activeAppTab === 'library' && (
                  <div className="space-y-2 animate-in fade-in duration-300">
                    <div className="p-3 rounded-xl bg-white border border-[#132E1E]/10 space-y-1">
                      <div className="font-bold text-xs text-[#132E1E]">Monstera Deliciosa</div>
                      <div className="text-[10px] text-[#52796F]">Bright Indirect Light • Water Weekly</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-[#132E1E]/10 space-y-1">
                      <div className="font-bold text-xs text-[#132E1E]">Snake Plant</div>
                      <div className="text-[10px] text-[#52796F]">Low Light • Water every 3 weeks</div>
                    </div>
                  </div>
                )}

                {activeAppTab === 'doctor' && (
                  <div className="space-y-2 animate-in fade-in duration-300 text-center py-4">
                    <div className="w-12 h-12 rounded-full bg-[#3A7D44]/20 text-[#2D6A4F] flex items-center justify-center mx-auto">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-xs text-[#132E1E]">Dr. Sarah Green</div>
                    <div className="text-[10px] text-[#2D6A4F]">Connected • Live Consultation</div>
                  </div>
                )}

              </div>

              {/* Bottom Nav Bar inside App Frame */}
              <div className="pt-2 border-t border-[#132E1E]/10 flex items-center justify-around text-[#132E1E]/60 text-[10px]">
                <span className="font-bold text-[#2D6A4F]">Home</span>
                <span>Scan</span>
                <span>Doctors</span>
                <span>Profile</span>
              </div>

            </div>

          </div>

          {/* Download App Action */}
          <div className="mt-8 text-center">
            <button
              onClick={onOpenSubscription}
              className="px-8 py-4 rounded-full bg-[#132E1E] hover:bg-[#2D6A4F] text-[#FAF8F5] font-semibold text-sm transition-all shadow-md inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-[#A3B18A]" />
              <span>Get the GreenCare App</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
