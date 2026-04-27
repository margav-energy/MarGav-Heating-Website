import { useEffect, useRef } from 'react';

type TermlyConsentState = Record<string, boolean>;
type TermlyConsentPayload = {
  categories?: string[];
};

declare global {
  interface Window {
    Termly?: {
      getConsentState?: () => TermlyConsentState;
      on?: (eventName: 'initialized' | 'consent', callback: (data?: TermlyConsentPayload) => void) => void;
    };
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    onTermlyLoaded?: () => void;
  }
}

const env = (import.meta as ImportMeta & { env: Record<string, string | undefined> }).env;

const TERMLY_WEBSITE_UUID = env.VITE_TERMLY_WEBSITE_UUID;
const GA_MEASUREMENT_ID = env.VITE_GA_MEASUREMENT_ID;
const GTM_CONTAINER_ID = env.VITE_GTM_CONTAINER_ID;
const ANALYTICS_MODE = env.VITE_ANALYTICS_MODE || 'strict';

function hasAnalyticsConsentFromState(consentState?: TermlyConsentState) {
  if (!consentState) return false;
  return Boolean(consentState.analytics);
}

function hasAnalyticsConsentFromPayload(payload?: TermlyConsentPayload) {
  if (!payload?.categories) return false;
  return payload.categories.includes('analytics');
}

export function ConsentManager() {
  const gaLoaded = useRef(false);
  const gtmLoaded = useRef(false);

  useEffect(() => {
    if (!TERMLY_WEBSITE_UUID) return;

    const ensureDataLayer = () => {
      if (!window.dataLayer) {
        window.dataLayer = [];
      }
      if (!window.gtag) {
        window.gtag = function gtag(...args: unknown[]) {
          window.dataLayer?.push(args);
        };
      }
    };

    const loadGtm = () => {
      if (gtmLoaded.current || !GTM_CONTAINER_ID) return;
      gtmLoaded.current = true;
      ensureDataLayer();
      window.gtag?.('js', new Date());
      window.gtag?.('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'granted',
        security_storage: 'granted',
      });

      if (!document.querySelector('script[data-gtm-loader="true"]')) {
        const gtmScript = document.createElement('script');
        gtmScript.async = true;
        gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
        gtmScript.setAttribute('data-gtm-loader', 'true');
        document.head.appendChild(gtmScript);
      }
    };

    const loadGa = () => {
      if (gaLoaded.current || !GA_MEASUREMENT_ID) return;
      gaLoaded.current = true;

      ensureDataLayer();

      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID);

      if (!document.querySelector('script[data-ga4-loader="true"]')) {
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        gaScript.setAttribute('data-ga4-loader', 'true');
        document.head.appendChild(gaScript);
      }
    };

    const handleConsent = (payload?: TermlyConsentPayload) => {
      const consentState = window.Termly?.getConsentState?.();
      const analyticsAccepted =
        hasAnalyticsConsentFromState(consentState) || hasAnalyticsConsentFromPayload(payload);

      if (analyticsAccepted) {
        if (ANALYTICS_MODE === 'consent_mode' && GTM_CONTAINER_ID) {
          ensureDataLayer();
          window.gtag?.('consent', 'update', {
            analytics_storage: 'granted',
          });
          return;
        }

        loadGa();
      }
    };

    const onTermlyLoaded = () => {
      window.Termly?.on?.('initialized', () => handleConsent());
      window.Termly?.on?.('consent', (payload) => handleConsent(payload));
      handleConsent();
    };
    // Termly is loaded from index.html to satisfy "first script in head" requirement.
    // Poll briefly until Termly is available, then wire consent callbacks.
    const initInterval = window.setInterval(() => {
      if (window.Termly?.on) {
        window.clearInterval(initInterval);
        onTermlyLoaded();
      }
    }, 200);
    const timeoutId = window.setTimeout(() => {
      window.clearInterval(initInterval);
    }, 10000);

    if (ANALYTICS_MODE === 'consent_mode' && GTM_CONTAINER_ID) {
      // Load GTM with denied defaults; Termly consent updates analytics storage.
      loadGtm();
    }

    return () => {
      window.clearInterval(initInterval);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
