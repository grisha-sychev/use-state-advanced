import { useState, useCallback } from 'react';

interface CounterOptions {
  min?: number;
  max?: number;
  step?: number;
}

interface CounterResult {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (value: number) => void;
}

/**
 * Хук для работы с числовыми значениями
 * @param initialValue - Начальное значение
 * @param options - Опции счетчика (min, max, step)
 * @returns Объект с текущим значением и методами управления
 */
function useCounter(
  initialValue: number = 0,
  options: CounterOptions = {}
): CounterResult {
  const { min = -Infinity, max = Infinity, step = 1 } = options;
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(prevCount => Math.min(prevCount + step, max));
  }, [max, step]);

  const decrement = useCallback(() => {
    setCount(prevCount => Math.max(prevCount - step, min));
  }, [min, step]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  const setCountValue = useCallback((value: number) => {
    setCount(Math.min(Math.max(value, min), max));
  }, [min, max]);

  return {
    count,
    increment,
    decrement,
    reset,
    setCount: setCountValue
  };
}

export default useCounter; 