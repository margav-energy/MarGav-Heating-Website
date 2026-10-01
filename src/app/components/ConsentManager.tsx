import { useEffect } from 'react';

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
    onTermlyLoaded?: () => void;
  }
}

function hasAnalyticsConsentFromState(consentState?: TermlyConsentState) {
  if (!consentState) return false;
  return Boolean(consentState.analytics);
}

function hasAnalyticsConsentFromPayload(payload?: TermlyConsentPayload) {
  if (!payload?.categories) return false;
  return payload.categories.includes('analytics');
}

// Consent Mode defaults (denied) and the GTM snippet live in index.html.
// This component only relays the visitor's Termly choice to GTM.
export function ConsentManager() {
  useEffect(() => {
    const updateConsent = (payload?: TermlyConsentPayload) => {
      const analyticsAccepted =
        hasAnalyticsConsentFromState(window.Termly?.getConsentState?.()) ||
        hasAnalyticsConsentFromPayload(payload);

      window.dataLayer = window.dataLayer || [];
      // Consent commands must be pushed as an arguments object, as gtag() does.
      (function (..._args: unknown[]) {
        window.dataLayer!.push(arguments as unknown as Record<string, unknown>);
      })('consent', 'update', {
        analytics_storage: analyticsAccepted ? 'granted' : 'denied',
      });
    };

    const onTermlyLoaded = () => {
      window.Termly?.on?.('initialized', () => updateConsent());
      window.Termly?.on?.('consent', (payload) => updateConsent(payload));
      updateConsent();
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

    return () => {
      window.clearInterval(initInterval);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
