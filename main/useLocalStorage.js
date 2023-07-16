import { useEffect } from 'react';
import useStateAdvanced from "./useStateAdvanced";

export default function useLocalStorage(key, value) {
    const [state, setState] = useStateAdvanced(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : value;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}