/**
 * BDApps Gateway Service
 * Handles Subscription, OTP, and Unsubscribe flows for GreenCare.
 *
 * All endpoints expect application/x-www-form-urlencoded POST bodies.
 * Requests are proxied through /bdapps to avoid CORS issues.
 *
 * Eligible operators: Robi, cirkle (Bangladesh)
 * Application ID: APP_139202
 */

const BASE = '/bdapps';

/** Normalize any BD mobile format to 8801XXXXXXXXX */
export function normalizeMobile(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('8801') && digits.length === 13) return digits;
  if (digits.startsWith('01') && digits.length === 11) return '880' + digits;
  if (digits.startsWith('1') && digits.length === 10) return '8801' + digits;
  return digits; // pass through and let server validate
}

/** Encode a plain object as application/x-www-form-urlencoded */
function encode(params: Record<string, string>): string {
  return Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
}

async function post<T>(path: string, params: Record<string, string>): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encode(params),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const text = await res.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    // Some PHP endpoints may return plain-text on error
    throw new Error(text || 'Unknown server error');
  }
}

// ─── Response Types ────────────────────────────────────────────────────────

export interface SendOtpResponse {
  /** BDApps reference token — must be stored and passed to verifyOtp */
  referenceNo?: string;
  statusCode?: string;
  message?: string;
  /** Some endpoints return status instead of statusCode */
  status?: string;
}

export interface VerifyOtpResponse {
  statusCode?: string;
  message?: string;
  status?: string;
}

export interface CheckSubscriptionResponse {
  /** 'REGISTERED' means active subscriber */
  status?: string;
  statusCode?: string;
  message?: string;
}

export interface UnsubscribeResponse {
  statusCode?: string;
  message?: string;
  status?: string;
}

// ─── API Methods ──────────────────────────────────────────────────────────

/**
 * Step 1: Send OTP to user's mobile.
 * Returns a referenceNo that must be stored for Step 2.
 */
export async function sendOtp(mobile: string): Promise<SendOtpResponse> {
  return post<SendOtpResponse>('/send_otp.php', {
    user_mobile: normalizeMobile(mobile),
  });
}

/**
 * Step 2: Verify the OTP and complete subscription.
 * @param otp      6-digit code received via SMS
 * @param referenceNo  token returned from sendOtp()
 */
export async function verifyOtp(
  otp: string,
  referenceNo: string
): Promise<VerifyOtpResponse> {
  return post<VerifyOtpResponse>('/verify_otp.php', {
    Otp: otp,
    referenceNo,
  });
}

/**
 * Check if a mobile number currently has an active subscription.
 * Returns status === 'REGISTERED' for active subscribers.
 */
export async function checkSubscription(
  mobile: string
): Promise<CheckSubscriptionResponse> {
  return post<CheckSubscriptionResponse>('/check_subscription.php', {
    user_mobile: normalizeMobile(mobile),
  });
}

/**
 * Unsubscribe a user from the service.
 */
export async function unsubscribe(
  mobile: string
): Promise<UnsubscribeResponse> {
  return post<UnsubscribeResponse>('/unsubscribe.php', {
    user_mobile: normalizeMobile(mobile),
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────

/** Returns true when a BDApps response indicates success. */
export function isSuccess(res: { statusCode?: string; status?: string }): boolean {
  const code = (res.statusCode ?? res.status ?? '').toUpperCase();
  // BDApps uses 'S' or '0' or 'SUCCESS' or 'REGISTERED' depending on endpoint
  return (
    code === 'S' ||
    code === '0' ||
    code === 'SUCCESS' ||
    code === 'REGISTERED'
  );
}
