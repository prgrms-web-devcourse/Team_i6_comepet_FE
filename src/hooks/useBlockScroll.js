import { useEffect } from 'react';

const useBlockScroll = (element) => {
  if (!element) return;

  useEffect(() => {
    element.style.overflow = 'hidden';

    return () => {
      element.style.overflow = 'visible';
    };
  });
};

export default useBlockScroll;
