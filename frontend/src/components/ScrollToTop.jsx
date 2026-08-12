import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the window immediately whenever the route path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
