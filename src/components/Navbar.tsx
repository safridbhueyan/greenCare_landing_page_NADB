import React, { useState, useEffect } from 'react';
import { Sprout, Menu, X, ChevronRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenSubscription: () => void;
  /** True when the user has an active BDApps subscription */
  isSubscribed?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSubscription, isSubscribed }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#132E1E]/10 py-3 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#132E1E] flex items-center justify-center text-[#A3B18A] transition-transform duration-300 group-hover:scale-105 shadow-xs">
              <Sprout className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-[#132E1E] font-sans">
                GreenCare<span className="text-[#3A7D44]">.</span>
              </span>
              <span className="text-[10px] tracking-widest text-[#52796F] uppercase font-semibold -mt-1">
                Digital Garden
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#disease-detection"
              className="text-sm font-medium text-[#132E1E]/80 hover:text-[#132E1E] transition-colors"
            >
              Disease Clinic
            </a>
            <a
              href="#ai-assistant"
              className="text-sm font-medium text-[#132E1E]/80 hover:text-[#132E1E] transition-colors"
            >
              AI Assistant
            </a>
            <a
              href="#plant-doctors"
              className="text-sm font-medium text-[#132E1E]/80 hover:text-[#132E1E] transition-colors"
            >
              Plant Doctors
            </a>
            <a
              href="#plant-library"
              className="text-sm font-medium text-[#132E1E]/80 hover:text-[#132E1E] transition-colors"
            >
              Plant Library
            </a>
            <a
              href="#community"
              className="text-sm font-medium text-[#132E1E]/80 hover:text-[#132E1E] transition-colors"
            >
              Community
            </a>
            <a
              href="#subscription"
              className="text-sm font-medium text-[#2D6A4F] hover:text-[#132E1E] transition-colors font-semibold"
            >
              Subscribe
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isSubscribed ? (
              <button
                id="navbar-manage-sub-btn"
                onClick={onOpenSubscription}
                className="px-5 py-2.5 rounded-full text-sm font-medium bg-[#3A7D44]/15 text-[#2D6A4F] hover:bg-[#3A7D44]/25 transition-all border border-[#3A7D44]/30 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#3A7D44] animate-pulse" />
                🌱 Premium Active
              </button>
            ) : (
              <>
                <button
                  onClick={onOpenSubscription}
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-[#132E1E] hover:bg-[#132E1E]/5 transition-colors border border-[#132E1E]/15"
                >
                  Explore Features
                </button>
                <button
                  id="navbar-get-premium-btn"
                  onClick={onOpenSubscription}
                  className="px-5 py-2.5 rounded-full text-sm font-medium bg-[#132E1E] text-[#FAF8F5] hover:bg-[#2D6A4F] transition-all duration-300 flex items-center gap-2 shadow-xs hover:shadow-md hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4 text-[#A3B18A]" />
                  Get Premium Access
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#132E1E] hover:bg-[#132E1E]/5"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#132E1E]/10 px-4 pt-4 pb-6 mt-2 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <a
            href="#disease-detection"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#132E1E] py-2 border-b border-[#132E1E]/5"
          >
            Disease Clinic
          </a>
          <a
            href="#ai-assistant"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#132E1E] py-2 border-b border-[#132E1E]/5"
          >
            AI Assistant
          </a>
          <a
            href="#plant-doctors"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#132E1E] py-2 border-b border-[#132E1E]/5"
          >
            Plant Doctors
          </a>
          <a
            href="#plant-library"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#132E1E] py-2 border-b border-[#132E1E]/5"
          >
            Plant Library
          </a>
          <a
            href="#community"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#132E1E] py-2 border-b border-[#132E1E]/5"
          >
            Community
          </a>
          <a
            href="#subscription"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-[#2D6A4F] py-2 border-b border-[#132E1E]/5"
          >
            Subscribe
          </a>

          <div className="pt-2 flex flex-col gap-3">
            {isSubscribed ? (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenSubscription(); }}
                className="w-full py-3 rounded-xl bg-[#3A7D44]/15 border border-[#3A7D44]/30 text-[#2D6A4F] font-semibold text-center flex items-center justify-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#3A7D44] animate-pulse" />
                <span>🌱 Premium Active — Manage</span>
              </button>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenSubscription(); }}
                className="w-full py-3 rounded-xl bg-[#132E1E] text-[#FAF8F5] font-semibold text-center flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Get Premium Access</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
