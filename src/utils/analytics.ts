/**
 * Analytics utilities for the application
 * This module provides type-safe Google Analytics 4 tracking capabilities
 */

// Google Analytics Measurement ID from environment variables (for security)
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID || 'G-XXXXXXXXXX';

// TypeScript type definitions for Google Analytics
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set' | 'consent', 
      targetId: string, 
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
    GA_INITIALIZED?: boolean;
  }
}

/**
 * Track page views with enhanced parameters
 * @param url - Current page URL
 * @param title - Page title
 * @param referrer - Referrer URL (optional)
 */
export const pageview = (url: string, title?: string, referrer?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title || document.title,
      page_referrer: referrer || document.referrer,
      send_page_view: true
    });
  }
};

/**
 * Event tracking with structured typing for event parameters
 */
export interface GAEventParams {
  action: string;
  category: string;
  label?: string;
  value?: number;
  non_interaction?: boolean;
  items?: GAItem[];
  user_properties?: Record<string, string>;
}

export interface GAItem {
  item_id?: string;
  item_name?: string;
  item_category?: string;
  item_variant?: string;
  price?: number;
  quantity?: number;
}

/**
 * Track specific events with enhanced parameters
 */
export const event = ({
  action,
  category,
  label,
  value,
  non_interaction = false,
  items = [],
  user_properties = {}
}: GAEventParams) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      non_interaction: non_interaction,
      items: items,
      ...user_properties
    });
  }
};

/**
 * Initialize Google Analytics
 */
export const initGA = () => {
  if (typeof window !== 'undefined' && !window.GA_INITIALIZED) {
    // Add Google Analytics script to document head
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', { 
        page_path: window.location.pathname,
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
      });
    `;
    
    document.head.appendChild(script1);
    document.head.appendChild(script2);
    
    window.GA_INITIALIZED = true;
  }
};

/**
 * Track user engagement with content viewing
 * @param contentType - Type of content (blog, project, etc)
 * @param contentId - ID of the content
 * @param contentName - Name of the content
 * @param timeSpent - Time spent on content in seconds (optional)
 */
export const trackContentView = (
  contentType: string,
  contentId: string,
  contentName: string,
  timeSpent?: number
) => {
  event({
    action: 'content_view',
    category: contentType,
    label: contentName,
    value: timeSpent,
    items: [
      {
        item_id: contentId,
        item_name: contentName,
        item_category: contentType
      }
    ]
  });
};

/**
 * Track form submissions
 * @param formName - Name of the form
 * @param success - Whether the form submission was successful
 */
export const trackFormSubmission = (formName: string, success: boolean) => {
  event({
    action: success ? 'form_submit_success' : 'form_submit_failure',
    category: 'forms',
    label: formName
  });
};

/**
 * Track outbound links
 * @param url - Target URL
 * @param linkText - Text of the link
 * @param destination - Destination type (social, external, etc)
 * @param preventNavigation - Whether to prevent default navigation behavior
 */
export const trackOutboundLink = (
  url: string, 
  linkText: string, 
  destination: string,
  preventNavigation = false
) => {
  event({
    action: 'outbound_click',
    category: 'outbound',
    label: linkText,
    user_properties: {
      target_url: url,
      destination_type: destination
    },
    non_interaction: true
  });
  
  if (preventNavigation) {
    // We don't navigate because the anchor tag will handle it
    return;
  }
  
  // Allow time for the tracking request to send
  setTimeout(() => {
    window.open(url, '_blank');
  }, 100);
};

/**
 * Track scroll depth to measure engagement
 * @param scrollPercentage - The depth of scroll as a percentage
 * @param pageUrl - The current page URL
 */
export const trackScrollDepth = (scrollPercentage: number, pageUrl: string) => {
  // Only track at specific thresholds to avoid excessive events
  const thresholds = [25, 50, 75, 90, 100];
  
  // Find the highest threshold that the user has reached
  const threshold = thresholds.filter(t => scrollPercentage >= t).pop();
  
  if (threshold) {
    // Create a unique identifier to prevent duplicate events
    const storageKey = `scroll_${threshold}_${pageUrl.replace(/[^a-zA-Z0-9]/g, '_')}`;
    
    // Check if this threshold was already tracked for this page
    if (!sessionStorage.getItem(storageKey)) {
      event({
        action: 'scroll_depth',
        category: 'engagement',
        label: `${threshold}%`,
        value: threshold,
        user_properties: {
          page_url: pageUrl,
          scroll_percentage: threshold
        }
      });
      
      // Mark this threshold as tracked for this page in this session
      sessionStorage.setItem(storageKey, 'tracked');
    }
  }
};

/**
 * Track time spent on page
 * @param duration - Time in seconds
 * @param pageUrl - The page URL
 */
export const trackTimeOnPage = (duration: number, pageUrl: string) => {
  // Track at specific intervals
  const intervals = [10, 30, 60, 120, 300, 600];
  
  // Find the interval that matches the current duration
  const interval = intervals.find(i => duration <= i);
  
  if (interval) {
    const storageKey = `time_${interval}_${pageUrl.replace(/[^a-zA-Z0-9]/g, '_')}`;
    
    if (!sessionStorage.getItem(storageKey)) {
      event({
        action: 'time_on_page',
        category: 'engagement',
        label: `${interval}s`,
        value: interval,
        user_properties: {
          page_url: pageUrl,
          duration: duration
        }
      });
      
      sessionStorage.setItem(storageKey, 'tracked');
    }
  }
};
