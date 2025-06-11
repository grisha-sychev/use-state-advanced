import { useState, useCallback } from 'react';

/**
 * Хук для работы с булевыми значениями
 * @param initialState - Начальное состояние
 * @returns [состояние, функция переключения]
 */
function useToggle(initialState: boolean = false): [boolean, () => void] {
  const [state, setState] = useState(initialState);
  
  const toggle = useCallback(() => {
    setState(prevState => !prevState);
  }, []);

  return [state, toggle];
}

export default useToggle; 