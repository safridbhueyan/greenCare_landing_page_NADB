import React from 'react';
import { X, Download, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { triggerAppDownload } from '../services/bdapps.service';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribeClick: () => void;
  isSubscribed?: boolean;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  onSubscribeClick,
  isSubscribed,
}) => {
  if (!isOpen) return null;

  const handleSubscribeAndDownload = () => {
    onClose();
    onSubscribeClick();
  };

  const handleDirectDownload = () => {
    onClose();
    triggerAppDownload();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] max-w-md w-full rounded-3xl p-6 sm:p-8 border border-[#132E1E]/20 shadow-2xl relative space-y-6 animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#132E1E]/60 hover:text-[#132E1E] hover:bg-[#132E1E]/5 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#132E1E] text-[#A3B18A] flex items-center justify-center mx-auto shadow-md">
            <Download className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-xs font-bold text-[#2D6A4F]">
            <Sparkles className="w-3.5 h-3.5" /> GreenCare Android App
          </div>

          <h3 className="text-2xl font-bold text-[#132E1E]">Download GreenCare</h3>

          {isSubscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-2">
              <div className="flex items-center justify-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>You have an Active Premium Subscription!</span>
              </div>
              <p className="text-xs text-emerald-700">
                You can download the APK now and sign in with your subscribed phone number.
              </p>
            </div>
          ) : (
            <p className="text-xs text-[#132E1E]/75 leading-relaxed max-w-xs mx-auto">
              Get 24/7 AI disease detection, botanical doctor advice, and smart plant care reminders.
            </p>
          )}
        </div>

        {/* Subscription Alert Prompt */}
        {!isSubscribed && (
          <div className="p-4 rounded-2xl bg-[#E8ECE5] border border-[#132E1E]/10 space-y-2 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#132E1E] uppercase tracking-wider">
                🌱 GreenCare Premium
              </span>
              <span className="text-xs font-bold text-[#2D6A4F] bg-[#2D6A4F]/10 px-2 py-0.5 rounded-md">
                2.78 tk/day
              </span>
            </div>
            <p className="text-xs text-[#132E1E]/80 leading-normal">
              Would you like to subscribe via your <strong>Robi</strong> or <strong>cirkle</strong> SIM before downloading? We will automatically start your download right after subscription!
            </p>
            <div className="text-[10px] text-[#132E1E]/60 flex items-center gap-1 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>Cancel anytime via SMS/USSD</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-1">
          {!isSubscribed ? (
            <>
              {/* Option A: Subscribe then download */}
              <button
                onClick={handleSubscribeAndDownload}
                className="w-full py-4 rounded-full bg-[#132E1E] hover:bg-[#2D6A4F] text-[#FAF8F5] font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Subscribe & Download</span>
                <ArrowRight className="w-4 h-4 text-[#A3B18A] transition-transform group-hover:translate-x-1" />
              </button>

              {/* Option B: Download directly without subscribing */}
              <button
                onClick={handleDirectDownload}
                className="w-full py-3.5 rounded-full border border-[#132E1E]/20 hover:bg-[#132E1E]/5 text-[#132E1E] font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-[#52796F]" />
                <span>Download Without Subscribing</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleDirectDownload}
              className="w-full py-4 rounded-full bg-[#132E1E] hover:bg-[#2D6A4F] text-[#FAF8F5] font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5 text-[#A3B18A]" />
              <span>Start Download Now</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
