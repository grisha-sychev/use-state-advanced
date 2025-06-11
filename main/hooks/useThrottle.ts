import { useState, useEffect, useRef } from 'react';

/**
 * Хук для ограничения частоты обновления значения
 * @param value - Значение для троттлинга
 * @param limit - Интервал в миллисекундах
 * @returns Троттлированное значение
 */
function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRun = useRef(Date.now());
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const now = Date.now();
    
    if (now - lastRun.current >= limit) {
      setThrottledValue(value);
      lastRun.current = now;
    } else {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      
      timer.current = setTimeout(() => {
        setThrottledValue(value);
        lastRun.current = Date.now();
      }, limit - (now - lastRun.current));
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [value, limit]);

  return throttledValue;
}

export default useThrottle; 