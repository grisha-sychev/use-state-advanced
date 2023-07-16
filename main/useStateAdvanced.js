import { useState } from 'react';

export default function useStateUpdate(value) {
    const [state, setState] = useState(value);

    function updateState(path, value) {
        setState(prevState => {
            const newState = { ...prevState };
            const keys = path.split('.');

            let current = newState;
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                current[key] = current[key] || {};
                current = current[key];
            }

            current[keys[keys.length - 1]] = value;
            return newState;
        });
    }

    return [state, updateState];
}
