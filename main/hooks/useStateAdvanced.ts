import { useState, useCallback } from 'react';

type Middleware<T> = (value: T) => T | Promise<T>;
type Validator<T> = (value: T) => boolean | string | Promise<boolean | string>;
type Transformer<T> = (value: T) => T;

interface StateOptions<T> {
  middleware?: Middleware<T>[];
  validators?: Validator<T>[];
  transformers?: Transformer<T>[];
  onError?: (error: Error) => void;
}

async function runMiddleware<T>(value: T, middleware: Middleware<T>[]): Promise<T> {
  let result = value;
  for (const fn of middleware) {
    result = await fn(result);
  }
  return result;
}

async function validateValue<T>(value: T, validators: Validator<T>[]): Promise<boolean> {
  for (const validator of validators) {
    const result = await validator(value);
    if (result !== true) {
      throw new Error(typeof result === 'string' ? result : 'Validation failed');
    }
  }
  return true;
}

function transformValue<T>(value: T, transformers: Transformer<T>[]): T {
  return transformers.reduce((result, transformer) => transformer(result), value);
}

function useStateAdvanced<T>(
  initialState: T | (() => T),
  options: StateOptions<T> = {}
): [T, (value: T | ((prevState: T) => T)) => Promise<void>] {
  const {
    middleware = [],
    validators = [],
    transformers = [],
    onError = console.error
  } = options;

  const [state, setState] = useState<T>(initialState);

  const setValue = useCallback(async (value: T | ((prevState: T) => T)) => {
    try {
      // Получаем новое значение
      const newValue = typeof value === 'function' 
        ? (value as (prevState: T) => T)(state)
        : value;

      // Применяем трансформации
      const transformedValue = transformValue(newValue, transformers);

      // Проверяем валидацию
      await validateValue(transformedValue, validators);

      // Применяем middleware
      const processedValue = await runMiddleware(transformedValue, middleware);

      // Обновляем состояние
      setState(processedValue);
    } catch (error) {
      onError(error as Error);
    }
  }, [state, middleware, validators, transformers, onError]);

  return [state, setValue];
}

export default useStateAdvanced;
