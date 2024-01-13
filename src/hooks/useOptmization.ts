import { useCallback, useEffect, useRef } from 'react';

import { DEBOUNCE_TIME } from '@/utils/defaults';

const useDebouncedCallback = <T extends (...args: any[]) => void>(
  callback: T,
  debounceTime: number = DEBOUNCE_TIME
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, debounceTime);
    },
    [callback, debounceTime]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [timeoutRef]);

  return debouncedCallback;
};

export { useDebouncedCallback };
