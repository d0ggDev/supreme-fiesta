export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "App";

export const APP_LOGO = "/bitsa-logo.png";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const rawPortal = import.meta.env.VITE_OAUTH_PORTAL_URL || "";
  const oauthPortalUrl = String(rawPortal).trim();
  const appId = String(import.meta.env.VITE_APP_ID || "").trim();
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  try {
    const base = oauthPortalUrl || window.location.origin;
    const url = new URL(`${base}/app-auth`);
    if (appId) url.searchParams.set("appId", appId);
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signIn");
    return url.toString();
  } catch (_err) {
    return redirectUri;
  }
};
