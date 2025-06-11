import { Dispatch, SetStateAction } from 'react';

// useLocalStorage
interface StorageOptions<T> {
  storage?: Storage;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  ttl?: number;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: StorageOptions<T>
): [T, Dispatch<SetStateAction<T>>];

// useStateAdvanced
type Middleware<T> = (value: T) => T | Promise<T>;
type Validator<T> = (value: T) => boolean | string | Promise<boolean | string>;
type Transformer<T> = (value: T) => T;

interface StateOptions<T> {
  middleware?: Middleware<T>[];
  validators?: Validator<T>[];
  transformers?: Transformer<T>[];
  onError?: (error: Error) => void;
}

export function useStateAdvanced<T>(
  initialState: T | (() => T),
  options?: StateOptions<T>
): [T, (value: T | ((prevState: T) => T)) => Promise<void>];

// useDebounce
export function useDebounce<T>(value: T, delay: number): T;

// useThrottle
export function useThrottle<T>(value: T, limit: number): T;

// usePrevious
export function usePrevious<T>(value: T): T | undefined;

// useToggle
export function useToggle(initialState?: boolean): [boolean, () => void];

// useCounter
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

export function useCounter(
  initialValue?: number,
  options?: CounterOptions
): CounterResult; 