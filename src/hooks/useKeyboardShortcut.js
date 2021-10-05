import produce from "immer";
import { useCallback, useEffect, useReducer } from "react";


const blacklistedTargets = ["input", "textarea"];
const ACTION_KEYDOWN = 'key-down';
const ACTION_KEYUP = 'key-up';
const ACTION_RESET = 'reset';

function useKeyboardShortcut(shortcutKeys, callback) {
    if (!Array.isArray(shortcutKeys)) {
        throw new Error('The first parameter to `useKeyboardShortcut` must be an ordered array of `KeyboardEvent.key` strings.');
    }

    if (!shortcutKeys.length) {
        throw new Error('The first parameter to `useKeyboardShortcut` must contain at least one `KeyboardEvent.key` string.');
    }

    if (!callback || typeof callback !== "function") {
        throw new Error('The second parameter to `useKeyboardShortcut` must be a function that will be invoked when the keys are pressed.');
    }

    const lowerCaseKeys = shortcutKeys.map(key => key.toLowerCase());
    const initialKeyMapping = lowerCaseKeys.reduce((keys, currentKey) => {
        keys[currentKey] = false;
        return keys;
    }, {});

    const [keys, setKeys] = useReducer(keysReducer, initialKeyMapping);

    const handleKeydown = useCallback(keydownEvent => {
        const { key, target, repeat } = keydownEvent;
        const lowerCaseKey = key.toLowerCase();

        if (repeat ||
            blacklistedTargets.includes(target.tagName.toLowerCase()) ||
            !lowerCaseKeys.includes(lowerCaseKey)) {
            return;
        }

        if (!keys[lowerCaseKey]) {
            setKeys({ type: ACTION_KEYDOWN, key: lowerCaseKey });
        }
    }, [keys, lowerCaseKeys]);

    const handleKeyup = useCallback(keyupEvent => {
        const { key, target } = keyupEvent;
        const lowerCaseKey = key.toLowerCase();

        if (blacklistedTargets.includes(target.tagName.toLowerCase()) ||
            !lowerCaseKeys.includes(lowerCaseKey)) {
            return;
        }

        if (keys[lowerCaseKey]) {
            setKeys({ type: ACTION_KEYUP, key: lowerCaseKey });
        }
    }, [keys, lowerCaseKeys]);

    useEffect(() => {
        if (Object.values(keys).every(value => value)) {
            callback(keys);
            setKeys({ type: ACTION_RESET, data: initialKeyMapping });
        }
    }, [callback, keys, initialKeyMapping]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeydown, true);
        return () => window.removeEventListener('keydown', handleKeydown, true);
    }, [handleKeydown]);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup, true);
        return () => window.removeEventListener('keyup', handleKeyup, true);
    }, [handleKeyup]);

    return null;
}

function keysReducer(state, action) {
    switch (action.type) {
        case ACTION_KEYDOWN: {
            return produce(state, draft => {
                draft[action.key] = true;
            });
        }
        case ACTION_KEYUP: {
            return produce(state, draft => {
                draft[action.key] = false;
            });
        }
        case ACTION_RESET: {
            return { ...action.data };
        }
        default: {
            return state;
        }
    }
}

export default useKeyboardShortcut;