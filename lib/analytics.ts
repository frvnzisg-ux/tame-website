export type AnalyticsEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value
    });
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: event.action,
      event_category: event.category,
      event_label: event.label,
      value: event.value
    });
  }
}
