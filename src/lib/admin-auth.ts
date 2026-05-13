export const COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

function arrayBufferToBase64url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

async function hmacSign(payload: string, secret: string): Promise<string> {
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );
  return arrayBufferToBase64url(sig);
}

export async function createSessionToken(): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET not configured");
  const exp = String(Date.now() + SESSION_DURATION_MS);
  const sig = await hmacSign(exp, secret);
  return `${exp}.${sig}`;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!secret) return false;
    const dot = token.indexOf(".");
    if (dot === -1) return false;
    const exp = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    if (Date.now() > parseInt(exp)) return false;
    const expected = await hmacSign(exp, secret);
    return sig === expected;
  } catch {
    return false;
  }
}
