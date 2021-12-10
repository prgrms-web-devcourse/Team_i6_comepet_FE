import { useEffect, useRef } from 'react';

const events = ['mousedown', 'touchstart'];

const useClickAway = (handler) => {
  const ref = useRef(null);
  const refForModalBackground = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const modalBackgroundElement = refForModalBackground.current;
    if (!element) return;

    const handleEvent = (e) => {
      !element.contains(e.target) && handler(e);
    };

    for (const eventName of events) {
      if (modalBackgroundElement) {
        modalBackgroundElement.addEventListener(eventName, handleEvent);
      } else {
        document.addEventListener(eventName, handleEvent);
      }
    }
  }, [ref, refForModalBackground]);

  return [ref, refForModalBackground];
};

export default useClickAway;
