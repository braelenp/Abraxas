import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Automatically scrolls to top when route changes (but not on rapid re-renders)
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const lastPathnameRef = useRef<string>(pathname);

  useEffect(() => {
    // Only scroll if pathname actually changed (not on same-route re-renders)
    if (lastPathnameRef.current !== pathname) {
      lastPathnameRef.current = pathname;
      
      const scrollToTop = () => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };

      // Immediate scroll attempt
      scrollToTop();
      
      // Wait for first animation frame
      const rafId1 = requestAnimationFrame(() => {
        scrollToTop();
        
        // Wait for second animation frame
        const rafId2 = requestAnimationFrame(() => {
          scrollToTop();
        });
        
        return () => cancelAnimationFrame(rafId2);
      });

      // Also use setTimeout as fallback with increasing delays
      const timeoutIds = [
        setTimeout(scrollToTop, 50),
        setTimeout(scrollToTop, 150),
        setTimeout(scrollToTop, 300),
      ];

      return () => {
        cancelAnimationFrame(rafId1);
        timeoutIds.forEach(id => clearTimeout(id));
      };
    }
  }, [pathname]);

  return null;
}
