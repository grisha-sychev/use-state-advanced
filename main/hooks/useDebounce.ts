import { useState, useEffect } from 'react';

/**
 * Хук для отложенного обновления значения
 * @param value - Значение для дебаунсинга
 * @param delay - Задержка в миллисекундах
 * @returns Дебаунсированное значение
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce; 