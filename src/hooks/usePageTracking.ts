import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { trackPageView } from '@/config/analytics';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when location changes
    trackPageView(location.pathname + location.search);
  }, [location]);
}; 