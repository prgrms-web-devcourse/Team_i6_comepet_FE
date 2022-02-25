import { useState, useEffect, useCallback, useRef } from 'react';

export const useThrottle = (callback, delay = 300) => {
  const [ready, setReady] = useState(true);
  const timerRef = useRef();

  const throttledFunction = useCallback(() => {
    if (!ready) {
      return;
    }

    setReady(false);
    callback();
  }, [ready, callback]);

  useEffect(() => {
    if (!ready) {
      timerRef.current = setTimeout(() => {
        setReady(true);
      }, delay);

      return () => clearTimeout(timerRef.current);
    }
  }, [ready, delay]);

  return [throttledFunction, ready];
};
