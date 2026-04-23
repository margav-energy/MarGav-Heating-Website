import { useEffect, useRef } from 'react';

type ConsentLike = {
  purposes?: Record<string, boolean>;
  consent?: {
    purposes?: Record<string, boolean>;
  };
};

declare global {
  interface Window {
    _iub?: {
      csConfiguration?: Record<string, unknown>;
    };
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const env = (import.meta as ImportMeta & { env: Record<string, string | undefined> }).env;

const IUBENDA_SITE_ID = env.VITE_IUBENDA_SITE_ID;
const IUBENDA_COOKIE_POLICY_ID = env.VITE_IUBENDA_COOKIE_POLICY_ID;
const GA_MEASUREMENT_ID = env.VITE_GA_MEASUREMENT_ID;

function hasAnalyticsConsent(consentLike?: ConsentLike) {
  const purposes = consentLike?.consent?.purposes ?? consentLike?.purposes;
  if (!purposes) return false;
  return Boolean(purposes['4']);
}

export function ConsentManager() {
  const gaLoaded = useRef(false);

  useEffect(() => {
    if (!IUBENDA_SITE_ID || !IUBENDA_COOKIE_POLICY_ID) return;

    const loadGa = () => {
      if (gaLoaded.current || !GA_MEASUREMENT_ID) return;
      gaLoaded.current = true;

      if (!window.dataLayer) {
        window.dataLayer = [];
      }
      if (!window.gtag) {
        window.gtag = function gtag(...args: unknown[]) {
          window.dataLayer?.push(args);
        };
      }

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

    const handleConsent = (consentLike?: ConsentLike) => {
      if (hasAnalyticsConsent(consentLike)) {
        loadGa();
      }
    };

    window._iub = window._iub || {};
    window._iub.csConfiguration = {
      siteId: IUBENDA_SITE_ID,
      cookiePolicyId: IUBENDA_COOKIE_POLICY_ID,
      lang: 'en-GB',
      perPurposeConsent: true,
      enableGdpr: true,
      callback: {
        onConsentFirstGiven: handleConsent,
        onConsentGiven: handleConsent,
        onPreferenceExpressedOrNotNeeded: handleConsent,
      },
    };

    const injectScript = (id: string, src: string) => {
      if (document.getElementById(id)) return;
      const script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    };

    injectScript(
      'iubenda-autoblocking-script',
      `https://cs.iubenda.com/autoblocking/${IUBENDA_SITE_ID}.js`,
    );
    injectScript('iubenda-cookie-solution-script', 'https://cdn.iubenda.com/cs/iubenda_cs.js');
  }, []);

  return null;
}
