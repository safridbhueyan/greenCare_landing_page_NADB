import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Check,
  Sparkles,
  Smartphone,
  ArrowRight,
  CheckCircle2,
  RotateCw,
  Apple,
  Play,
  AlertCircle,
  PhoneOff,
  Wifi,
} from 'lucide-react';
import {
  sendOtp,
  verifyOtp,
  unsubscribe,
  normalizeMobile,
  isSuccess,
} from '../services/bdapps.service';
import type { SubscriptionState } from '../types';

// ─── localStorage helpers ──────────────────────────────────────────────────
const STORAGE_KEY = 'gc_sub';

export function loadSubscription(): SubscriptionState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as SubscriptionState;
  } catch {/* ignore */}
  return { isSubscribed: false, mobile: null };
}

function saveSubscription(state: SubscriptionState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clearSubscription() {
  localStorage.removeItem(STORAGE_KEY);
}

// ─── Props ─────────────────────────────────────────────────────────────────

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Called with the new state after a successful subscribe or unsubscribe */
  onSubscriptionChange?: (state: SubscriptionState) => void;
}

// ─── Component ─────────────────────────────────────────────────────────────

type Step = 'phone' | 'otp' | 'success' | 'unsubscribe' | 'unsubscribed';

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSubscriptionChange,
}) => {
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [referenceNo, setReferenceNo] = useState('');
  const [countdown, setCountdown] = useState(45);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Restore state from localStorage on open
  useEffect(() => {
    if (isOpen) {
      const saved = loadSubscription();
      if (saved.isSubscribed && saved.mobile) {
        setPhone(saved.mobile);
        setStep('success');
      } else {
        setStep('phone');
        setPhone('');
        setOtp(['', '', '', '', '', '']);
        setReferenceNo('');
        setErrorMsg('');
      }
    }
  }, [isOpen]);

  // OTP countdown timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  if (!isOpen) return null;

  // ── Helpers ──────────────────────────────────────────────────────────────

  const normalizedPhone = normalizeMobile(phone);

  const friendlyPhone = phone.startsWith('0')
    ? `+880 ${phone}`
    : phone.startsWith('8801')
    ? `+${phone}`
    : phone;

  // ── Step 1: Send OTP ─────────────────────────────────────────────────────

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setErrorMsg('Please enter a valid Bangladeshi mobile number.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await sendOtp(normalizedPhone);
      if (res.referenceNo) {
        setReferenceNo(res.referenceNo);
        setOtp(['', '', '', '', '', '']);
        setCountdown(45);
        setStep('otp');
      } else if (isSuccess(res)) {
        // Some BDApps responses embed referenceNo differently
        setReferenceNo((res as unknown as { referenceNo?: string }).referenceNo ?? '');
        setOtp(['', '', '', '', '', '']);
        setCountdown(45);
        setStep('otp');
      } else {
        setErrorMsg(res.message ?? 'Could not send OTP. Please check your number and try again.');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('Invalid mobile')) {
        setErrorMsg('Invalid mobile number. Please use your Robi or cirkle number.');
      } else {
        setErrorMsg('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ── Step 2: Verify OTP ───────────────────────────────────────────────────

  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return; // digits only
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    if (val && index < 5) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`)?.focus();
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = otp.join('');
    if (code.length !== 6) {
      setErrorMsg('Please enter all 6 digits of the OTP.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    try {
      const res = await verifyOtp(code, referenceNo);
      if (isSuccess(res)) {
        const state: SubscriptionState = { isSubscribed: true, mobile: normalizedPhone };
        saveSubscription(state);
        onSubscriptionChange?.(state);
        setStep('success');
        try {
          confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.55 },
            colors: ['#132E1E', '#2D6A4F', '#A3B18A', '#3A7D44'],
          });
        } catch {/* ignore */}
      } else {
        setErrorMsg(res.message ?? 'Incorrect OTP. Please double-check and try again.');
      }
    } catch (err) {
      setErrorMsg('Verification failed. Please try again or resend the OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setErrorMsg('');
    setIsLoading(true);
    try {
      const res = await sendOtp(normalizedPhone);
      if (res.referenceNo) {
        setReferenceNo(res.referenceNo);
        setOtp(['', '', '', '', '', '']);
        setCountdown(45);
      } else {
        setErrorMsg(res.message ?? 'Could not resend OTP.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Unsubscribe ───────────────────────────────────────────────────────────

  const handleUnsubscribe = async () => {
    setErrorMsg('');
    setIsLoading(true);
    try {
      const res = await unsubscribe(normalizedPhone);
      const ok = isSuccess(res) || (res.message ?? '').toLowerCase().includes('unsubscribed');
      if (ok) {
        clearSubscription();
        const state: SubscriptionState = { isSubscribed: false, mobile: null };
        onSubscriptionChange?.(state);
        setStep('unsubscribed');
      } else {
        setErrorMsg(res.message ?? 'Unsubscribe failed. Please try again.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] max-w-md w-full rounded-3xl p-6 sm:p-8 border border-[#132E1E]/20 shadow-2xl relative space-y-6 animate-in zoom-in-95 duration-200">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#132E1E]/60 hover:text-[#132E1E] hover:bg-[#132E1E]/5 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ── STEP: PHONE NUMBER ───────────────────────────────────────── */}
        {step === 'phone' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#132E1E] text-[#A3B18A] flex items-center justify-center mx-auto shadow-xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#132E1E]">Start growing smarter. 🌱</h3>
              <p className="text-xs text-[#132E1E]/70 max-w-xs mx-auto">
                Enter your <strong>Robi</strong> or <strong>cirkle</strong> number to activate instant GreenCare Premium access.
              </p>
            </div>

            {/* Operator eligibility badge */}
            <div className="flex items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-[11px] font-bold text-red-700">
                <Wifi className="w-3 h-3" /> Robi
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-[11px] font-bold text-purple-700">
                <Wifi className="w-3 h-3" /> cirkle
              </span>
              <span className="text-[10px] text-[#132E1E]/40 font-medium">SIM users only</span>
            </div>

            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#52796F]">
                  Mobile Number (Bangladesh)
                </label>
                <div className="flex items-center gap-2">
                  {/* Fixed country code */}
                  <div className="px-3 py-3.5 rounded-xl bg-white border border-[#132E1E]/15 text-xs font-bold text-[#132E1E] shrink-0 select-none">
                    +880
                  </div>
                  <input
                    id="phone-input"
                    type="tel"
                    required
                    inputMode="numeric"
                    placeholder="1XXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 px-4 py-3.5 rounded-xl bg-white border border-[#132E1E]/15 text-sm font-semibold text-[#132E1E] focus:outline-none focus:border-[#2D6A4F] placeholder-[#132E1E]/30"
                  />
                </div>
                {errorMsg && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {errorMsg}
                  </p>
                )}
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
                id="send-otp-btn"
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-full bg-[#132E1E] hover:bg-[#2D6A4F] disabled:opacity-60 text-[#FAF8F5] font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin text-[#A3B18A]" />
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Send OTP</span>
                    <ArrowRight className="w-4 h-4 text-[#A3B18A]" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* ── STEP: OTP VERIFICATION ───────────────────────────────────── */}
        {step === 'otp' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#2D6A4F] text-white flex items-center justify-center mx-auto shadow-xs">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#132E1E]">Check your SMS</h3>
              <p className="text-xs text-[#132E1E]/70">
                We sent a 6-digit code to <br />
                <span className="font-bold text-[#132E1E]">{friendlyPhone}</span>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-center gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-11 h-12 rounded-xl bg-white border-2 border-[#132E1E]/20 text-center text-lg font-bold text-[#132E1E] focus:outline-none focus:border-[#2D6A4F] transition-colors"
                  />
                ))}
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-600 text-center flex items-center justify-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errorMsg}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-[#132E1E]/70 pt-1">
                <span>
                  {countdown > 0 ? (
                    `Resend code in ${countdown}s`
                  ) : (
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={handleResendOtp}
                      className="font-bold text-[#2D6A4F] hover:underline disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => { setStep('phone'); setErrorMsg(''); }}
                  className="text-[#132E1E]/60 hover:text-[#132E1E] underline"
                >
                  Change Number
                </button>
              </div>

              <button
                id="verify-otp-btn"
                type="submit"
                disabled={isLoading || otp.join('').length !== 6}
                className="w-full py-4 rounded-full bg-[#132E1E] hover:bg-[#2D6A4F] disabled:opacity-60 text-[#FAF8F5] font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin text-[#A3B18A]" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-[#A3B18A]" />
                    <span>Verify &amp; Activate Premium</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* ── STEP: SUCCESS ─────────────────────────────────────────────── */}
        {step === 'success' && (
          <div className="text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#3A7D44]/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-[#3A7D44]" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3A7D44]/15 text-xs font-bold text-[#2D6A4F]">
                🌱 Premium Active
              </div>
              <h3 className="text-2xl font-bold text-[#132E1E]">Welcome to GreenCare Premium!</h3>
              <p className="text-xs text-[#132E1E]/75 max-w-xs mx-auto">
                Your number <span className="font-bold text-[#132E1E]">{friendlyPhone}</span> is now linked to unlimited AI scans and doctor access.
              </p>
            </div>

            <div className="pt-2 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#52796F]">
                Download GreenCare App
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
              <p className="text-[11px] text-[#132E1E]/60 italic">
                Sign in with your phone number to unlock Premium in the app.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-full border border-[#132E1E]/20 text-[#132E1E] font-semibold text-xs hover:bg-[#132E1E]/5 transition-colors"
            >
              Continue Browsing
            </button>

            {/* Unsubscribe link */}
            <button
              id="manage-subscription-btn"
              type="button"
              onClick={() => setStep('unsubscribe')}
              className="text-[10px] text-[#132E1E]/40 hover:text-rose-600 underline transition-colors"
            >
              Manage / Unsubscribe
            </button>
          </div>
        )}

        {/* ── STEP: UNSUBSCRIBE CONFIRM ─────────────────────────────────── */}
        {step === 'unsubscribe' && (
          <div className="text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto">
              <PhoneOff className="w-7 h-7 text-rose-500" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#132E1E]">Cancel Premium?</h3>
              <p className="text-xs text-[#132E1E]/70 max-w-xs mx-auto">
                Unsubscribing will remove Premium access from{' '}
                <strong>{friendlyPhone}</strong>. You can re-subscribe anytime.
              </p>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-600 flex items-center justify-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" /> {errorMsg}
              </p>
            )}

            <div className="flex flex-col gap-3">
              <button
                id="confirm-unsubscribe-btn"
                type="button"
                disabled={isLoading}
                onClick={handleUnsubscribe}
                className="w-full py-3.5 rounded-full bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Unsubscribing...</span>
                  </>
                ) : (
                  <span>Yes, Unsubscribe</span>
                )}
              </button>
              <button
                type="button"
                onClick={() => { setStep('success'); setErrorMsg(''); }}
                className="w-full py-3.5 rounded-full border border-[#132E1E]/20 text-[#132E1E] font-semibold text-sm hover:bg-[#132E1E]/5 transition-colors"
              >
                Keep My Premium
              </button>
            </div>
          </div>
        )}

        {/* ── STEP: UNSUBSCRIBED CONFIRMATION ─────────────────────────── */}
        {step === 'unsubscribed' && (
          <div className="text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-[#E8ECE5] flex items-center justify-center mx-auto">
              <PhoneOff className="w-7 h-7 text-[#52796F]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#132E1E]">You've been unsubscribed</h3>
              <p className="text-xs text-[#132E1E]/70 max-w-xs mx-auto">
                Your Premium access has been removed. We hope to see you back soon! 🌿
              </p>
            </div>
            <button
              onClick={() => { setStep('phone'); setPhone(''); setErrorMsg(''); onClose(); }}
              className="w-full py-3.5 rounded-full bg-[#132E1E] hover:bg-[#2D6A4F] text-[#FAF8F5] font-semibold text-sm transition-all"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
