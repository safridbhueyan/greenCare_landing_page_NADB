/**
 * BDApps Gateway Service
 * Handles Subscription, OTP, and Unsubscribe flows for GreenCare.
 *
 * All endpoints expect application/x-www-form-urlencoded POST bodies.
 * Requests are proxied through /bdapps in dev, and relative/absolute in prod.
 *
 * Eligible operators: Robi, cirkle (Bangladesh)
 * Application ID: APP_139202
 */

/** Direct API URL for APK download */
export const APP_DOWNLOAD_URL = 'https://www.bdappsdigitalapps.com/NADB26115/greencare/download.php';

/**
 * Triggers the download of the GreenCare mobile app from the BDApps server.
 */
export function triggerAppDownload(): void {
  const link = document.createElement('a');
  link.href = APP_DOWNLOAD_URL;
  link.setAttribute('download', 'GreenCare.apk');
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/** Normalize any BD mobile format → 13-digit international: 8801XXXXXXXXX */
export function normalizeMobile(raw: string): string {
  const digits = raw.replace(/\D/g, ''); // strip +, spaces, dashes, etc.

  // Already 13-digit international format
  if (digits.startsWith('880') && digits.length === 13) return digits;

  // Local 11-digit with trunk 0: 01XXXXXXXXX → 8801XXXXXXXXX
  if (digits.startsWith('01') && digits.length === 11) return '880' + digits.slice(1);

  // 10-digit without trunk 0: 1XXXXXXXXX → 8801XXXXXXXXX
  if (digits.startsWith('1') && digits.length === 10) return '880' + digits;

  // Fallback: prepend 880 if not already present
  return digits.startsWith('880') ? digits : '880' + digits;
}

/**
 * API Base URL resolution:
 * - In Vite Dev mode (localhost): Uses '/bdapps' to leverage Vite proxy server.
 * - In Production (cPanel deployment): Uses '.' (relative path, e.g. './check_subscription.php')
 *   so requests resolve to the PHP files in the current cPanel directory without 404 errors.
 */
const getEndpoint = (path: string): string => {
  if (import.meta.env.DEV) {
    return `/bdapps${path}`;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `.${cleanPath}`;
};

/** Encode a plain object as application/x-www-form-urlencoded */
function encode(params: Record<string, string>): string {
  return Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
}

async function post<T>(path: string, params: Record<string, string>): Promise<T> {
  const endpoint = getEndpoint(path);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(params),
    });

    if (res.ok) {
      const text = await res.text();
      try {
        return JSON.parse(text) as T;
      } catch {
        throw new Error(text || 'Unknown server error');
      }
    }
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  } catch (err) {
    // If relative endpoint fetch failed in production (e.g. 404 or network error),
    // try fallback to absolute BDApps server URL directly
    if (!import.meta.env.DEV && !endpoint.startsWith('http')) {
      const fallbackUrl = `https://www.bdappsdigitalapps.com/NADB26115/greencare${path.startsWith('/') ? path : '/' + path}`;
      const res = await fetch(fallbackUrl, {
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
        throw new Error(text || 'Unknown server error');
      }
    }
    throw err;
  }
}

// ─── Response Types ────────────────────────────────────────────────────────

export interface SendOtpResponse {
  referenceNo?: string;
  statusCode?: string;
  message?: string;
  status?: string;
}

export interface VerifyOtpResponse {
  statusCode?: string;
  message?: string;
  status?: string;
}

export interface CheckSubscriptionResponse {
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

export async function sendOtp(mobile: string): Promise<SendOtpResponse> {
  return post<SendOtpResponse>('/send_otp.php', {
    user_mobile: normalizeMobile(mobile),
  });
}

export async function verifyOtp(
  otp: string,
  referenceNo: string
): Promise<VerifyOtpResponse> {
  return post<VerifyOtpResponse>('/verify_otp.php', {
    Otp: otp,
    referenceNo,
  });
}

export async function checkSubscription(
  mobile: string
): Promise<CheckSubscriptionResponse> {
  return post<CheckSubscriptionResponse>('/check_subscription.php', {
    user_mobile: normalizeMobile(mobile),
  });
}

export async function unsubscribe(
  mobile: string
): Promise<UnsubscribeResponse> {
  return post<UnsubscribeResponse>('/unsubscribe.php', {
    user_mobile: normalizeMobile(mobile),
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────

export function isSuccess(res: { statusCode?: string; status?: string; message?: string }): boolean {
  const code = (res.statusCode ?? res.status ?? '').toUpperCase().trim();
  const msg  = (res.message ?? '').toUpperCase();

  const SUCCESS_CODES = new Set([
    'S',
    '0',
    'SUCCESS',
    'REGISTERED',
    'ALREADY_SUBSCRIBED',
    'SUBSCRIPTION_ALREADY_EXIST',
    'ALREADY_REGISTERED',
    'ACTIVE',
    'OK',
  ]);

  if (SUCCESS_CODES.has(code)) return true;
  if (/^S\d+$/.test(code)) return true;
  if (!code && (msg.includes('SUCCESS') || msg.includes('SUBSCRIBED') || msg.includes('REGISTERED'))) return true;

  return false;
}
