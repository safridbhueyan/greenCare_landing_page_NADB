import React from 'react';
import { Camera, Cpu, HeartHandshake, Leaf, Droplets, Sun } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      stepNumber: '01',
      title: 'Snap',
      subtitle: 'Take a photo of your plant.',
      description: 'Capture any leaf, root, or stem issue using your smartphone or upload an existing photo.',
      icon: Camera,
      badgeIcon: Leaf,
      color: 'bg-[#A3B18A]/20 text-[#132E1E]',
    },
    {
      stepNumber: '02',
      title: 'Understand',
      subtitle: 'AI analyzes & identifies problems.',
      description: "GreenCare's neural vision model compares your leaf against over 10,000 botanical conditions in under 2 seconds.",
      icon: Cpu,
      badgeIcon: Sun,
      color: 'bg-[#52796F]/20 text-[#132E1E]',
    },
    {
      stepNumber: '03',
      title: 'Care',
      subtitle: 'Get actionable treatment & guidance.',
      description: 'Receive immediate action steps, organic home care recipes, moisture schedules, and doctor consultations.',
      icon: HeartHandshake,
      badgeIcon: Droplets,
      color: 'bg-[#2D6A4F]/20 text-[#132E1E]',
    },
  ];

  return (
    <section className="py-20 bg-[#FAF8F5] border-y border-[#132E1E]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#132E1E]/5 text-xs font-semibold text-[#2D6A4F] uppercase tracking-wider">
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#132E1E]">
            How <span className="font-serif-editorial italic font-normal text-[#2D6A4F]">GreenCare</span> Works
          </h2>
          <p className="text-[#132E1E]/70 text-base">
            From diagnosis to daily thriving — empowering your green space with artificial intelligence.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Subtle Connecting Line on Desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 border-t-2 border-dashed border-[#132E1E]/15 -translate-y-6 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const BadgeIcon = step.badgeIcon;
            return (
              <div
                key={idx}
                className="relative z-10 card-organic p-8 bg-white flex flex-col items-start space-y-5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-serif-editorial text-4xl font-normal text-[#2D6A4F]">
                    {step.stepNumber}
                  </span>
                  <div className={`p-3.5 rounded-2xl ${step.color} shadow-xs`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <BadgeIcon className="w-4 h-4 text-[#3A7D44]" />
                    <h3 className="text-xl font-bold text-[#132E1E]">{step.title}</h3>
                  </div>
                  <p className="text-sm font-semibold text-[#2D6A4F]">{step.subtitle}</p>
                </div>

                <p className="text-sm text-[#132E1E]/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
