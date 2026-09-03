import React, { useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, HeartPulse, Bot, Users, ScanLine } from 'lucide-react';

interface HeroProps {
  onOpenSubscription: () => void;
  onOpenDownload?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSubscription, onOpenDownload }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Pollen/floating particles effect canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      alpha: number;
    }> = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'rgba(163, 177, 138, ' : 'rgba(82, 121, 111, ',
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.1,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4F1EA] to-[#FAF8F5]">
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-70"
      />

      {/* Decorative Organic Leaf Gradients */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#8DAA91]/15 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#2D6A4F]/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Small Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#132E1E]/5 border border-[#132E1E]/10 text-xs font-semibold tracking-wider text-[#2D6A4F] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#3A7D44] animate-ping" />
              <span>AI-POWERED PLANT CARE</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#132E1E] leading-[1.12]">
              Give your plants the{' '}
              <span className="font-serif-editorial italic font-normal text-[#2D6A4F] underline decoration-[#8DAA91]/40 decoration-wavy underline-offset-4">
                care
              </span>{' '}
              they deserve.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#132E1E]/75 leading-relaxed max-w-xl font-normal">
              GreenCare helps you detect plant diseases, understand plant health, get personalized AI guidance, and connect with a community that loves plants as much as you do.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenDownload || onOpenSubscription}
                className="px-8 py-4 rounded-full bg-[#132E1E] text-[#FAF8F5] font-semibold text-base hover:bg-[#2D6A4F] transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-xl hover:-translate-y-0.5 group"
              >
                <span>Get GreenCare</span>
                <ArrowRight className="w-5 h-5 text-[#A3B18A] transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#disease-detection"
                className="px-8 py-4 rounded-full border border-[#132E1E]/20 text-[#132E1E] font-semibold text-base hover:bg-[#132E1E]/5 transition-all text-center"
              >
                Explore GreenCare
              </a>
            </div>

            {/* Social Proof Mini Bar */}
            <div className="pt-6 border-t border-[#132E1E]/10 flex items-center gap-6 text-xs text-[#132E1E]/70">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                <span>98.4% AI Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#2D6A4F]" />
                <span>50,000+ Plant Enthusiasts</span>
              </div>
            </div>

          </div>

          {/* Right Column: Botanical Composition with Floating Physical Tags */}
          <div className="lg:col-span-6 relative flex justify-center">
            
            {/* Main Botanical Canvas Box */}
            <div className="relative w-full max-w-lg aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden border border-[#132E1E]/15 shadow-2xl bg-[#E8ECE5] group">
              <img
                src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=1000"
                alt="GreenCare Botanical Plant"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#132E1E]/40 via-transparent to-transparent pointer-events-none" />

              {/* Integrated GreenCare Emblem */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#FAF8F5]/80 backdrop-blur-md border border-white/60 text-xs font-semibold text-[#132E1E] flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#3A7D44]" />
                <span>GreenCare Botanical Lab</span>
              </div>
            </div>

            {/* Floating Botanical Label Tag 1: Plant Health */}
            <div className="absolute -top-4 -left-2 sm:left-4 animate-float card-organic p-3.5 flex items-center gap-3 bg-white/95 backdrop-blur-md z-20 shadow-lg border border-[#132E1E]/10">
              <div className="w-9 h-9 rounded-full bg-[#A3B18A]/20 flex items-center justify-center text-[#2D6A4F]">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-wider text-[#52796F] uppercase">Plant Health Status</p>
                <p className="text-sm font-bold text-[#132E1E]">98% Optimal Vitality</p>
              </div>
            </div>

            {/* Floating Botanical Label Tag 2: AI Disease Detection */}
            <div className="absolute top-1/2 -right-4 sm:-right-6 transform -translate-y-1/2 animate-float-reverse card-organic p-3.5 flex items-center gap-3 bg-white/95 backdrop-blur-md z-20 shadow-lg border border-[#132E1E]/10">
              <div className="w-9 h-9 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center text-[#2D6A4F]">
                <ScanLine className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-wider text-[#52796F] uppercase">AI Diagnostics</p>
                <p className="text-sm font-bold text-[#132E1E]">Leaf Spot Detected</p>
              </div>
            </div>

            {/* Floating Botanical Label Tag 3: AI Assistant */}
            <div className="absolute -bottom-6 left-6 animate-float card-organic p-3.5 flex items-center gap-3 bg-white/95 backdrop-blur-md z-20 shadow-lg border border-[#132E1E]/10">
              <div className="w-9 h-9 rounded-full bg-[#3A7D44]/15 flex items-center justify-center text-[#132E1E]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-wider text-[#52796F] uppercase">AI Assistant</p>
                <p className="text-sm font-bold text-[#132E1E]">"Water in 2 days 💧"</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
