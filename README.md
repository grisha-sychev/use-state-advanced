# useStateAdvanced
A set of useState hooks and tools

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
```
