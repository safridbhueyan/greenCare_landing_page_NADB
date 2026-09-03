import React from 'react';
import { Globe, Share2, MessageSquare, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF8F5] text-[#132E1E] border-t border-[#132E1E]/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Logo & Info */}
          <div className="md:col-span-4 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <img
                src="./logo.png"
                alt="GreenCare Logo"
                className="w-10 h-10 rounded-xl object-contain shadow-xs"
              />
              <span className="font-bold text-xl tracking-tight text-[#132E1E]">
                GreenCare<span className="text-[#3A7D44]">.</span>
              </span>
            </a>

            <p className="text-xs text-[#132E1E]/70 max-w-sm leading-relaxed">
              AI-powered plant health diagnostics, botanical encyclopedia, expert agronomist consultations, and a global community for plant lovers.
            </p>

            <div className="pt-2 flex items-center gap-3 text-[#132E1E]/70">
              <a href="#" className="p-2 rounded-full hover:bg-[#132E1E]/10 transition-colors" title="Global Community">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-[#132E1E]/10 transition-colors" title="Social Feed">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-[#132E1E]/10 transition-colors" title="Botanical Forum">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#52796F]">Navigation</h4>
            <ul className="space-y-2 text-xs font-medium text-[#132E1E]/80">
              <li><a href="#" className="hover:text-[#2D6A4F] transition-colors">Home</a></li>
              <li><a href="#why-greencare" className="hover:text-[#2D6A4F] transition-colors">Why GreenCare</a></li>
              <li><a href="#ai-assistant" className="hover:text-[#2D6A4F] transition-colors">AI Assistant</a></li>
              <li><a href="#plant-doctors" className="hover:text-[#2D6A4F] transition-colors">Plant Doctors</a></li>
              <li><a href="#plant-library" className="hover:text-[#2D6A4F] transition-colors">Plant Library</a></li>
              <li><a href="#community" className="hover:text-[#2D6A4F] transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#52796F]">Support</h4>
            <ul className="space-y-2 text-xs font-medium text-[#132E1E]/80">
              <li><a href="#" className="hover:text-[#2D6A4F] transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#2D6A4F] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#2D6A4F] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#2D6A4F] transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-[#2D6A4F] transition-colors">Botanical API</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#52796F]">Digital Garden Digest</h4>
            <p className="text-xs text-[#132E1E]/70">Receive weekly seasonal care tips and plant health alerts.</p>
            
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 pt-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-full bg-white border border-[#132E1E]/15 text-xs text-[#132E1E] focus:outline-none focus:border-[#2D6A4F]"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full bg-[#132E1E] text-white hover:bg-[#2D6A4F] transition-colors"
                title="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Footer Tagline */}
        <div className="pt-8 border-t border-[#132E1E]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#132E1E]/60 gap-4">
          <p>
            © {new Date().getFullYear()} GreenCare Inc. All rights reserved. Powered by{' '}
            <a
              href="https://safrid.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2D6A4F] font-bold hover:underline transition-colors"
            >
              safrid.com
            </a>
          </p>
          <div className="font-serif-editorial italic text-base text-[#2D6A4F]">
            Grow. Care. Connect. 🌱
          </div>
        </div>

      </div>
    </footer>
  );
};
