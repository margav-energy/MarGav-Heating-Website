declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function pushToDataLayer(data: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

export function trackPhoneClick(callSource: string) {
  pushToDataLayer({
    event: 'phone_click',
    call_source: callSource,
    page_path: window.location.pathname,
  });
}

export function trackLeadCapture(leadSource: string, serviceType?: string) {
  // Categorical fields only - never name, email, phone, address or free text.
  pushToDataLayer({
    event: 'lead_capture',
    lead_source: leadSource,
    service_type: serviceType,
    page_path: window.location.pathname,
  });
}
