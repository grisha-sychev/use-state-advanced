import { useRef, useEffect } from 'react';

/**
 * Хук для отслеживания предыдущего значения
 * @param value - Текущее значение
 * @returns Предыдущее значение
 */
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious; 