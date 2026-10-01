import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { pushToDataLayer } from '../../lib/analytics';

export function RouteTracker() {
  const location = useLocation();
  const lastPath = useRef('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    const currentPath = location.pathname + location.search;

    // Skip initial load - the base Google Tag already covers it.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      lastPath.current = currentPath;
      return;
    }

    if (currentPath !== lastPath.current) {
      lastPath.current = currentPath;
      pushToDataLayer({
        event: 'page_view',
        page_path: currentPath,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
}
