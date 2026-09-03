import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Smartphone,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Hash,
  XCircle,
  CheckCircle2,
  Search,
  RotateCw,
  AlertCircle,
  BadgeCheck,
  BadgeX,
  Check,
  Apple,
  Play,
  PhoneOff,
  Wifi,
} from 'lucide-react';
import {
  sendOtp,
  verifyOtp,
  unsubscribe,
  checkSubscription,
  normalizeMobile,
  isSuccess,
} from '../services/bdapps.service';
import type { SubscriptionState } from '../types';

// ─── localStorage helpers ────────────────────────────────────────────────────
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

// ─── Types ───────────────────────────────────────────────────────────────────
interface SubscriptionSectionProps {
  onSubscriptionChange?: (state: SubscriptionState) => void;
}

type Operator = 'robi' | 'cirkle';
type Step = 'phone' | 'otp' | 'success' | 'unsubscribe' | 'unsubscribed';
type CheckStatus = 'idle' | 'loading' | 'subscribed' | 'not_subscribed' | 'error';

const OPERATOR_CONFIG: Record<
  Operator,
  { label: string; prefix: string; placeholder: string; hint: string; gradient: string }
> = {
  robi: {
    label: 'Robi',
    prefix: '018',
    placeholder: '018XXXXXXXX',
    hint: 'Robi SIM · starts with 018 or +88018',
    gradient: 'from-red-500 to-red-600',
  },
  cirkle: {
    label: 'cirkle',
    prefix: '016',
    placeholder: '016XXXXXXXX',
    hint: 'cirkle SIM · starts with 016 or +88016',
    gradient: 'from-purple-500 to-purple-600',
  },
};

const INFO_ITEMS = [
  { icon: <Sparkles className="w-4 h-4" />, text: 'Only 2.78 tk (VAT + SD + SC)/day' },
  { icon: <RefreshCw className="w-4 h-4" />, text: 'Auto-renewal via USSD/SMS' },
  { icon: <Hash className="w-4 h-4" />, text: 'Dial *213*36906# to subscribe directly' },
  { icon: <XCircle className="w-4 h-4" />, text: 'Cancel anytime by typing STOP' },
];

// ─── Component ───────────────────────────────────────────────────────────────
export const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({
  onSubscriptionChange,
}) => {
  const [operator, setOperator] = useState<Operator>('robi');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<Step>('phone');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [referenceNo, setReferenceNo] = useState('');
  const [countdown, setCountdown] = useState(45);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [checkStatus, setCheckStatus] = useState<CheckStatus>('idle');
  const [checkMessage, setCheckMessage] = useState('');

  // Restore session from localStorage
  useEffect(() => {
    const saved = loadSubscription();
    if (saved.isSubscribed && saved.mobile) {
      setPhone(saved.mobile);
      setStep('success');
    }
  }, []);

  // OTP countdown
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const cfg = OPERATOR_CONFIG[operator];

  const normalizedPhone = normalizeMobile(phone);

  const friendlyPhone = phone.startsWith('0')
    ? `+880 ${phone}`
    : phone.startsWith('8801')
    ? `+${phone}`
    : phone;

  // ── Helpers ─────────────────────────────────────────────────────────────
  const validatePhone = (): string | null => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) return 'Please enter a valid mobile number.';

    // Normalise to local 01X... format to check operator prefix
    const local = digits.startsWith('880')
      ? '0' + digits.slice(3)
      : digits.startsWith('0')
      ? digits
      : '0' + digits;

    if (!local.startsWith(cfg.prefix)) {
      return `${cfg.label} numbers must start with ${cfg.prefix} or +880${cfg.prefix.slice(1)}.`;
    }

    // After normalization a valid BD number must be exactly 13 digits (880 + 10)
    const normalized = normalizeMobile(phone);
    if (normalized.length !== 13) {
      return `Please enter a valid 11-digit BD number (e.g. ${cfg.prefix}12345678).`;
    }

    return null;
  };

  const handleOperatorChange = (op: Operator) => {
    setOperator(op);
    setPhone('');
    setErrorMsg('');
    setCheckStatus('idle');
    setCheckMessage('');
  };

  // ── Step 1: Send OTP ────────────────────────────────────────────────────
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const err = validatePhone();
    if (err) { setErrorMsg(err); return; }

    setIsLoading(true);
    try {
      const res = await sendOtp(normalizedPhone);
      if (res.referenceNo || isSuccess(res)) {
        setReferenceNo(res.referenceNo ?? '');
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

  // ── Step 2: Verify OTP ──────────────────────────────────────────────────
  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    if (val && index < 5) {
      document.getElementById(`inline-otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`inline-otp-${index - 1}`)?.focus();
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = otp.join('');
    if (code.length !== 6) { setErrorMsg('Please enter all 6 digits.'); return; }
    setErrorMsg('');
    setIsLoading(true);

    const activateSuccess = () => {
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
    };

    try {
      const res = await verifyOtp(code, referenceNo);
      if (isSuccess(res)) {
        activateSuccess();
      } else {
        // BDApps sometimes subscribes the user silently while returning a
        // confusing error code. Double-check the real state before showing error.
        try {
          const check = await checkSubscription(normalizedPhone);
          const alreadyActive =
            isSuccess(check) || (check.status ?? '').toUpperCase() === 'REGISTERED';
          if (alreadyActive) {
            activateSuccess();
            return;
          }
        } catch {/* network issue — fall through to show original error */}

        setErrorMsg(res.message ?? 'Incorrect OTP. Please double-check and try again.');
      }
    } catch {
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

  // ── Unsubscribe ─────────────────────────────────────────────────────────
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

  // ── Check Subscription ──────────────────────────────────────────────────
  const handleCheckSubscription = async () => {
    setCheckStatus('idle');
    const err = validatePhone();
    if (err) { setCheckStatus('error'); setCheckMessage(err); return; }

    setCheckStatus('loading');
    setCheckMessage('');
    try {
      const res = await checkSubscription(normalizeMobile(phone));
      const status = (res.status ?? res.statusCode ?? '').toUpperCase();
      if (status === 'REGISTERED' || status === 'S' || status === '0' || status === 'SUCCESS') {
        setCheckStatus('subscribed');
        setCheckMessage('This number has an active GreenCare Premium subscription.');
      } else {
        setCheckStatus('not_subscribed');
        setCheckMessage(res.message ?? 'This number is not currently subscribed to GreenCare Premium.');
      }
    } catch {
      setCheckStatus('error');
      setCheckMessage('Could not check subscription. Please try again.');
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <section
      id="subscription"
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0d2518 0%, #132E1E 40%, #1a3d28 70%, #0d2518 100%)',
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#2D6A4F]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#A3B18A]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#A3B18A]/30 bg-[#A3B18A]/10 text-xs font-bold text-[#A3B18A] uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            BDApps Subscription
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white">
            Unlock{' '}
            <span className="font-serif-editorial italic font-normal text-[#A3B18A]">
              GreenCare Premium
            </span>
          </h2>
          <p className="mt-3 text-[#A3B18A]/80 text-base max-w-xl mx-auto">
            Subscribe via your mobile account for instant, unlimited plant AI access — no credit card needed.
          </p>
        </div>

        {/* Main two-column card */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* LEFT — benefits */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex flex-col justify-between gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Unlock Premium Diagnostics</h3>
              <p className="text-sm text-[#A3B18A]/70 mb-6">
                Get instant access to advanced diagnosis reports, symptoms tracking, and detailed medicine recommendations.
              </p>
              <ul className="space-y-4">
                {INFO_ITEMS.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#A3B18A]/15 text-[#A3B18A] flex items-center justify-center shrink-0">
                      {item.icon}
                    </span>
                    <span className="text-sm text-white/85 font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct dial */}
            <div className="rounded-2xl bg-[#A3B18A]/10 border border-[#A3B18A]/20 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#A3B18A] mb-1">⚡ Direct Subscribe</p>
              <p className="text-sm text-white/80">
                Dial{' '}
                <span className="font-mono font-bold text-[#A3B18A] bg-[#A3B18A]/10 px-2 py-0.5 rounded-lg">
                  *213*36906#
                </span>{' '}
                on your Robi or cirkle connection to subscribe instantly.
              </p>
            </div>
          </div>

          {/* RIGHT — multi-step inline flow */}
          <div className="rounded-3xl border border-white/10 bg-white/8 backdrop-blur-sm p-8 flex flex-col gap-6 min-h-[480px]">

            {/* ── STEP: PHONE ─────────────────────────────────────────── */}
            {step === 'phone' && (
              <div className="flex flex-col gap-5 animate-in fade-in duration-300">
                {/* Operator selector */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#A3B18A]/70 mb-3">
                    Select Operator
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {(['robi', 'cirkle'] as Operator[]).map((op) => {
                      const c = OPERATOR_CONFIG[op];
                      const isActive = operator === op;
                      return (
                        <button
                          key={op}
                          type="button"
                          id={`operator-${op}`}
                          onClick={() => handleOperatorChange(op)}
                          className={`relative py-3.5 px-4 rounded-2xl border-2 transition-all duration-200 font-bold text-sm flex items-center justify-center gap-2 ${
                            isActive
                              ? `bg-gradient-to-r ${c.gradient} border-transparent text-white shadow-lg scale-[1.03]`
                              : 'border-white/15 text-white/60 hover:border-white/30 hover:text-white/90 bg-white/5'
                          }`}
                        >
                          <Smartphone className="w-4 h-4" />
                          {c.label}
                          {isActive && <CheckCircle2 className="w-4 h-4 absolute top-2 right-2 opacity-80" />}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-[11px] text-[#A3B18A]/50">
                    {cfg.hint}
                  </p>
                </div>

                {/* Phone form */}
                <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="sub-section-phone" className="text-[11px] font-bold uppercase tracking-wider text-[#A3B18A]/70 mb-2 block">
                      Mobile Number
                    </label>
                    <input
                      id="sub-section-phone"
                      type="tel"
                      inputMode="numeric"
                      placeholder={cfg.placeholder}
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (checkStatus !== 'idle') { setCheckStatus('idle'); setCheckMessage(''); }
                      }}
                      className="w-full px-4 py-4 rounded-2xl bg-white/10 border border-white/15 text-white placeholder-white/30 text-sm font-semibold focus:outline-none focus:border-[#A3B18A]/60 focus:bg-white/15 transition-all"
                    />
                  </div>

                  {/* Inline check result */}
                  {checkStatus !== 'idle' && (
                    <div className={`rounded-2xl px-4 py-3.5 flex items-start gap-3 border animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                      checkStatus === 'loading'
                        ? 'bg-white/5 border-white/10 text-white/60'
                        : checkStatus === 'subscribed'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : checkStatus === 'not_subscribed'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    }`}>
                      <span className="mt-0.5 shrink-0">
                        {checkStatus === 'loading' && <RotateCw className="w-4 h-4 animate-spin" />}
                        {checkStatus === 'subscribed' && <BadgeCheck className="w-4 h-4" />}
                        {checkStatus === 'not_subscribed' && <BadgeX className="w-4 h-4" />}
                        {checkStatus === 'error' && <AlertCircle className="w-4 h-4" />}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold">
                          {checkStatus === 'loading' && 'Checking subscription…'}
                          {checkStatus === 'subscribed' && '✅ Active Subscription'}
                          {checkStatus === 'not_subscribed' && '⚠️ Not Subscribed'}
                          {checkStatus === 'error' && '❌ Check Failed'}
                        </span>
                        {checkMessage && <span className="text-[11px] opacity-80">{checkMessage}</span>}
                      </div>
                    </div>
                  )}

                  {/* Error */}
                  {errorMsg && (
                    <p className="text-xs text-rose-300 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errorMsg}
                    </p>
                  )}

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      id="section-subscribe-btn"
                      type="submit"
                      disabled={isLoading}
                      className="py-4 rounded-2xl bg-[#A3B18A] hover:bg-[#8fa877] text-[#132E1E] font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group disabled:opacity-60"
                    >
                      {isLoading ? (
                        <RotateCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <button
                      id="section-check-sub-btn"
                      type="button"
                      disabled={checkStatus === 'loading'}
                      onClick={handleCheckSubscription}
                      className="py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/35 text-white/80 hover:text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {checkStatus === 'loading' ? (
                        <RotateCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Search className="w-4 h-4" />
                      )}
                      <span>Check Status</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-white/40 text-center flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#A3B18A]/60" />
                    An SMS verification OTP will be sent to your phone.
                  </p>
                </form>
              </div>
            )}

            {/* ── STEP: OTP ───────────────────────────────────────────── */}
            {step === 'otp' && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#A3B18A]/20 text-[#A3B18A] flex items-center justify-center mx-auto">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Check your SMS</h3>
                  <p className="text-xs text-white/60">
                    We sent a 6-digit code to{' '}
                    <span className="font-bold text-white">{friendlyPhone}</span>
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5">
                  <div className="flex justify-center gap-2">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`inline-otp-${idx}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-11 h-13 rounded-xl bg-white/10 border-2 border-white/20 text-center text-lg font-bold text-white focus:outline-none focus:border-[#A3B18A]/70 transition-colors"
                      />
                    ))}
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-rose-300 text-center flex items-center justify-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errorMsg}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>
                      {countdown > 0 ? (
                        `Resend in ${countdown}s`
                      ) : (
                        <button
                          type="button"
                          disabled={isLoading}
                          onClick={handleResendOtp}
                          className="font-bold text-[#A3B18A] hover:underline disabled:opacity-50"
                        >
                          Resend OTP
                        </button>
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={() => { setStep('phone'); setErrorMsg(''); }}
                      className="text-white/40 hover:text-white underline"
                    >
                      Change Number
                    </button>
                  </div>

                  <button
                    id="inline-verify-otp-btn"
                    type="submit"
                    disabled={isLoading || otp.join('').length !== 6}
                    className="w-full py-4 rounded-2xl bg-[#A3B18A] hover:bg-[#8fa877] disabled:opacity-60 text-[#132E1E] font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <><RotateCw className="w-4 h-4 animate-spin" /><span>Verifying…</span></>
                    ) : (
                      <><Check className="w-4 h-4" /><span>Verify & Activate Premium</span></>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* ── STEP: SUCCESS ────────────────────────────────────────── */}
            {step === 'success' && (
              <div className="text-center flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9 text-emerald-400" />
                </div>
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-xs font-bold text-emerald-300">
                    🌱 Premium Active
                  </div>
                  <h3 className="text-2xl font-bold text-white">Welcome to GreenCare Premium!</h3>
                  <p className="text-xs text-white/60 max-w-xs mx-auto">
                    <span className="font-bold text-white">{friendlyPhone}</span> is now linked to unlimited AI scans and doctor access.
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#A3B18A]/70">Download GreenCare App</p>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="#download"
                      className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Apple className="w-5 h-5" />
                      <div className="text-left">
                        <div className="text-[9px] uppercase tracking-wider opacity-60">Download on</div>
                        <div className="text-xs font-bold leading-none">App Store</div>
                      </div>
                    </a>
                    <a
                      href="#download"
                      className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Play className="w-5 h-5 fill-white" />
                      <div className="text-left">
                        <div className="text-[9px] uppercase tracking-wider opacity-60">GET IT ON</div>
                        <div className="text-xs font-bold leading-none">Google Play</div>
                      </div>
                    </a>
                  </div>
                </div>

                <button
                  id="inline-manage-sub-btn"
                  type="button"
                  onClick={() => setStep('unsubscribe')}
                  className="text-[11px] text-white/30 hover:text-rose-400 underline transition-colors"
                >
                  Manage / Unsubscribe
                </button>
              </div>
            )}

            {/* ── STEP: UNSUBSCRIBE CONFIRM ─────────────────────────────── */}
            {step === 'unsubscribe' && (
              <div className="text-center flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto">
                  <PhoneOff className="w-7 h-7 text-rose-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Cancel Premium?</h3>
                  <p className="text-xs text-white/60 max-w-xs mx-auto">
                    Unsubscribing will remove Premium access from{' '}
                    <strong className="text-white">{friendlyPhone}</strong>. You can re-subscribe anytime.
                  </p>
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-300 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errorMsg}
                  </p>
                )}

                <div className="flex flex-col gap-3">
                  <button
                    id="inline-confirm-unsub-btn"
                    type="button"
                    disabled={isLoading}
                    onClick={handleUnsubscribe}
                    className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <><RotateCw className="w-4 h-4 animate-spin" /><span>Unsubscribing…</span></>
                    ) : (
                      <span>Yes, Unsubscribe</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setStep('success'); setErrorMsg(''); }}
                    className="w-full py-3.5 rounded-2xl border border-white/15 text-white/80 font-semibold text-sm hover:bg-white/5 transition-colors"
                  >
                    Keep My Premium
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP: UNSUBSCRIBED ───────────────────────────────────── */}
            {step === 'unsubscribed' && (
              <div className="text-center flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto">
                  <PhoneOff className="w-7 h-7 text-[#A3B18A]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">You've been unsubscribed</h3>
                  <p className="text-xs text-white/60 max-w-xs mx-auto">
                    Your Premium access has been removed. We hope to see you back soon! 🌿
                  </p>
                </div>
                <button
                  onClick={() => { setStep('phone'); setPhone(''); setErrorMsg(''); }}
                  className="w-full py-3.5 rounded-2xl bg-[#A3B18A] hover:bg-[#8fa877] text-[#132E1E] font-bold text-sm transition-all"
                >
                  Subscribe Again
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
