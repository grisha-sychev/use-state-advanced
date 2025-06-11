# use-state-advanced

Библиотека расширенных хуков состояния для React, предоставляющая удобные инструменты для работы с состоянием.

## Установка

```bash
npm install use-state-advanced
# или
yarn add use-state-advanced
```

## Доступные хуки

### useLocalStorage

Хук для синхронизации состояния с localStorage. Поддерживает:
- Разные типы storage (localStorage, sessionStorage, custom storage)
- Кастомную сериализацию/десериализацию
- TTL (time-to-live) для значений
- Синхронизацию между вкладками

```typescript
import { useLocalStorage } from 'use-state-advanced';

function Component() {
  const [value, setValue] = useLocalStorage('key', 'initialValue', {
    // Использование sessionStorage вместо localStorage
    storage: sessionStorage,
    
    // Кастомная сериализация/десериализация
    serializer: (value) => JSON.stringify(value),
    deserializer: (value) => JSON.parse(value),
    
    // TTL в миллисекундах (1 час)
    ttl: 60 * 60 * 1000
  });
  
  return (
    <div>
      <input 
        value={value} 
        onChange={e => setValue(e.target.value)} 
      />
    </div>
  );
}
```

### useStateAdvanced

Расширенная версия useState с поддержкой:
- Middleware для обработки значений
- Валидации значений
- Трансформации значений
- Обработки ошибок

```typescript
import { useStateAdvanced } from 'use-state-advanced';

function Component() {
  const [state, setState] = useStateAdvanced(initialState, {
    // Middleware для обработки значений
    middleware: [
      // Логирование
      (value) => {
        console.log('New value:', value);
        return value;
      },
      // Асинхронная обработка
      async (value) => {
        const processed = await someAsyncOperation(value);
        return processed;
      }
    ],
    
    // Валидация значений
    validators: [
      // Простая валидация
      (value) => value > 0,
      // Валидация с сообщением об ошибке
      (value) => value < 100 || 'Value must be less than 100',
      // Асинхронная валидация
      async (value) => {
        const isValid = await checkValueOnServer(value);
        return isValid;
      }
    ],
    
    // Трансформация значений
    transformers: [
      // Приведение к числу
      (value) => Number(value),
      // Округление
      (value) => Math.round(value)
    ],
    
    // Обработка ошибок
    onError: (error) => {
      console.error('State update failed:', error);
    }
  });

  // Использование
  const handleUpdate = async () => {
    await setState(newValue);
  };
}
```

### useDebounce

Хук для отложенного обновления значения. Полезен для поиска, валидации форм и API-запросов.

```typescript
import { useDebounce } from 'use-state-advanced';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    // Выполнить поиск только после того, как пользователь перестал печатать
    searchAPI(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return <input onChange={e => setSearchTerm(e.target.value)} />;
}
```

### useThrottle

Хук для ограничения частоты обновления значения. Полезен для обработки скролла, ресайза и частых событий.

```typescript
import { useThrottle } from 'use-state-advanced';

function ScrollComponent() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const throttledScroll = useThrottle(scrollPosition, 100);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div>Scroll position: {throttledScroll}</div>;
}
```

### usePrevious

Хук для отслеживания предыдущего значения состояния.

```typescript
import { usePrevious } from 'use-state-advanced';

function CounterComponent() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {previousCount}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```

### useToggle

Хук для удобной работы с булевыми значениями.

```typescript
import { useToggle } from 'use-state-advanced';

function ModalComponent() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>
        {isOpen ? 'Закрыть' : 'Открыть'}
      </button>
      {isOpen && <div>Модальное окно</div>}
    </div>
  );
}
```

### useCounter

Хук для работы с числовыми значениями, включая инкремент, декремент и установку границ.

```typescript
import { useCounter } from 'use-state-advanced';

function CounterComponent() {
  const { count, increment, decrement, reset, setCount } = useCounter(0, {
    min: 0,
    max: 10,
    step: 1
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={() => setCount(5)}>Set to 5</button>
    </div>
  );
}
```

## Типизация

Библиотека полностью типизирована с использованием TypeScript. Все хуки поддерживают дженерики для обеспечения типобезопасности.

## Требования

- React 16.8.0 или выше
- TypeScript 4.0 или выше (опционально)

## Лицензия

MIT

## Installation
```
npm i use-state-advanced
```
At the moment there are two hooks these are useStateAdvanced and useLocalStorage
> Numeric keys are passed through a dash at the beginning of shelf-5 and shelf-2 and the like
## How to useStateAdvanced


```js
import { useStateAdvanced } from 'use-state-advanced'

const [state, setState] = useStateAdvanced({ user: { books: { shelf: {...and the like} } } });

setState('user.books.shelf-5.name.garypotter.title', data);
// user["books"]["shelf][5]["name"]["garipoter"]["title"]
```
## How to useLocalStorage

 
```js
import { useLocalStorage } from 'use-state-advanced'

const [state, setState] = useLocalStorage('myKey', { user: { books: { shelf: {...and the like} } } });

setState('user.books.shelf-5.name.garypotter.title', data);
// user["books"]["shelf][5]["name"]["garipoter"]["title"]
