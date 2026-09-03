import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Check, Sparkles, Smartphone, ArrowRight, CheckCircle2, RotateCw, Apple, Play } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [countryCode, setCountryCode] = useState('+880');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(45);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  if (!isOpen) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 6) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }
    setErrorMsg('');
    setStep(2);
    setCountdown(45);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[0];
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setIsVerifying(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsVerifying(false);
      setStep(3);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#132E1E', '#2D6A4F', '#A3B18A', '#3A7D44'],
        });
      } catch (err) {
        console.log(err);
      }
    }, 1000);
  };

  const fillTestOtp = () => {
    setOtp(['1', '2', '3', '4', '5', '6']);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] max-w-md w-full rounded-3xl p-6 sm:p-8 border border-[#132E1E]/20 shadow-2xl relative space-y-6 animate-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#132E1E]/60 hover:text-[#132E1E] hover:bg-[#132E1E]/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: ENTER PHONE NUMBER */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#132E1E] text-[#A3B18A] flex items-center justify-center mx-auto shadow-xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#132E1E]">Start growing smarter. 🌱</h3>
              <p className="text-xs text-[#132E1E]/70 max-w-xs mx-auto">
                Enter your mobile phone number to activate instant GreenCare Premium access across all your devices.
              </p>
            </div>

            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#52796F]">
                  Mobile Phone Number
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="px-3 py-3.5 rounded-xl bg-white border border-[#132E1E]/15 text-xs font-bold text-[#132E1E] focus:outline-none focus:border-[#2D6A4F]"
                  >
                    <option value="+880">+880 (BD)</option>
                    <option value="+1">+1 (US/CA)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+91">+91 (IN)</option>
                    <option value="+61">+61 (AU)</option>
                    <option value="+49">+49 (DE)</option>
                  </select>

                  <input
                    type="tel"
                    required
                    placeholder="1712345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 px-4 py-3.5 rounded-xl bg-white border border-[#132E1E]/15 text-sm font-semibold text-[#132E1E] focus:outline-none focus:border-[#2D6A4F] placeholder-[#132E1E]/30"
                  />
                </div>
                {errorMsg && <p className="text-xs text-rose-600 mt-1">{errorMsg}</p>}
              </div>

              <div className="p-3.5 rounded-2xl bg-[#E8ECE5] border border-[#132E1E]/10 space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A4F]">
                  Included in Premium:
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px] text-[#132E1E]/80 font-medium">
                  <span>✓ Unlimited AI Scans</span>
                  <span>✓ 24/7 AI Assistant</span>
                  <span>✓ Plant Doctors</span>
                  <span>✓ Disease Reports</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#132E1E] hover:bg-[#2D6A4F] text-[#FAF8F5] font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 text-[#A3B18A]" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: OTP VERIFICATION */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#2D6A4F] text-white flex items-center justify-center mx-auto shadow-xs">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#132E1E]">Verify your phone number</h3>
              <p className="text-xs text-[#132E1E]/70">
                We sent a 6-digit verification code to <br />
                <span className="font-bold text-[#132E1E]">{countryCode} {phone || 'XXXXXXX'}</span>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-center gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-11 h-12 rounded-xl bg-white border-2 border-[#132E1E]/20 text-center text-lg font-bold text-[#132E1E] focus:outline-none focus:border-[#2D6A4F]"
                  />
                ))}
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={fillTestOtp}
                  className="px-3 py-1 rounded-full bg-[#A3B18A]/20 text-[#2D6A4F] text-[11px] font-bold hover:bg-[#A3B18A]/40 transition-colors"
                >
                  ⚡ Auto-fill Test Code: 123456
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-[#132E1E]/70 pt-2">
                <span>
                  {countdown > 0 ? (
                    `Resend code in ${countdown}s`
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCountdown(45)}
                      className="font-bold text-[#2D6A4F] hover:underline"
                    >
                      Resend OTP Code
                    </button>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[#132E1E]/60 hover:text-[#132E1E] underline"
                >
                  Change Number
                </button>
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-4 rounded-full bg-[#132E1E] hover:bg-[#2D6A4F] text-[#FAF8F5] font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin text-[#A3B18A]" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-[#A3B18A]" />
                    <span>Verify & Activate Access</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: SUCCESS STATE & APP DOWNLOAD */}
        {step === 3 && (
          <div className="text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#3A7D44]/20 text-[#2D6A4F] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-[#3A7D44]" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3A7D44]/15 text-xs font-bold text-[#2D6A4F]">
                🌱 Premium Activated
              </div>
              <h3 className="text-2xl font-bold text-[#132E1E]">Welcome to GreenCare Premium!</h3>
              <p className="text-xs text-[#132E1E]/75 max-w-xs mx-auto">
                Your mobile phone number <span className="font-bold text-[#132E1E]">{countryCode} {phone}</span> is now linked to unlimited AI scans and doctor access.
              </p>
            </div>

            <div className="pt-2 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#52796F]">
                Download GreenCare App Below
              </p>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="#download"
                  onClick={onClose}
                  className="p-3.5 rounded-2xl bg-[#132E1E] text-white hover:bg-[#2D6A4F] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Apple className="w-5 h-5 text-white" />
                  <div className="text-left">
                    <div className="text-[9px] uppercase tracking-wider opacity-75">Download on</div>
                    <div className="text-xs font-bold leading-none">App Store</div>
                  </div>
                </a>

                <a
                  href="#download"
                  onClick={onClose}
                  className="p-3.5 rounded-2xl bg-[#132E1E] text-white hover:bg-[#2D6A4F] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Play className="w-5 h-5 text-white fill-white" />
                  <div className="text-left">
                    <div className="text-[9px] uppercase tracking-wider opacity-75">GET IT ON</div>
                    <div className="text-xs font-bold leading-none">Google Play</div>
                  </div>
                </a>
              </div>

              <p className="text-[11px] text-[#132E1E]/60 pt-2 italic">
                Your premium account will be automatically recognized when you sign in to the app with your phone number.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-full border border-[#132E1E]/20 text-[#132E1E] font-semibold text-xs hover:bg-[#132E1E]/5 transition-colors"
            >
              Continue Browsing Digital Garden
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
