// src/types/google-analytics.d.ts

interface Window {
  dataLayer: any[];
  gtag?: (...args: any[]) => void;
}
