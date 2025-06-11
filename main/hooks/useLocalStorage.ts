import { useState, useEffect } from 'react';

interface StorageOptions<T> {
  storage?: Storage;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  ttl?: number; // время жизни в миллисекундах
}

interface StorageItem<T> {
  value: T;
  timestamp: number;
}

function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: StorageOptions<T> = {}
): [T, (value: T) => void] {
  const {
    storage = localStorage,
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    ttl
  } = options;

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = storage.getItem(key);
      if (!item) return initialValue;

      const parsedItem: StorageItem<T> = deserializer(item);
      
      // Проверка TTL
      if (ttl && Date.now() - parsedItem.timestamp > ttl) {
        storage.removeItem(key);
        return initialValue;
      }

      return parsedItem.value;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const item: StorageItem<T> = {
        value,
        timestamp: Date.now()
      };
      storage.setItem(key, serializer(item));
      setStoredValue(value);
    } catch (error) {
      console.error('Error writing to storage:', error);
    }
  };

  // Синхронизация между вкладками
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          const parsedItem: StorageItem<T> = deserializer(e.newValue);
          if (!ttl || Date.now() - parsedItem.timestamp <= ttl) {
            setStoredValue(parsedItem.value);
          }
        } catch (error) {
          console.error('Error parsing storage event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, ttl, deserializer]);

  return [storedValue, setValue];
}

export default useLocalStorage;