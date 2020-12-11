import { useState, useEffect } from 'react';
import useSSR from 'use-ssr';

const useKey = (key) => {
    const { isBrowser } = useSSR();
    const [isKeyDown, setisKeyDown] = useState(false);
    useEffect(() => {
        const keyDown = (e) => {
            if (e.key === key) {
                setisKeyDown(true);
            }
        };
        const keyUp = (e) => {
            if (e.key === key) {
                setisKeyDown(false);
            }
        };
        if (isBrowser) {
            window.addEventListener('keydown', keyDown);
            window.addEventListener('keyup', keyUp);
        }
        return () => {
            window.removeEventListener('keydown', keyDown);
            window.removeEventListener('keyup', keyUp);
        };
    }, [isBrowser, key]);
    return isKeyDown;
};

// returns an object with each key and its' current status. used internally by other hooks.
const useKeys = (keys) => {
    const { isBrowser } = useSSR();
    const [keyStatuses, setKeyStatuses] = useState(Object.fromEntries(keys.map((key) => [key, false])));
    useEffect(() => {
        const keyDown = (e) => {
            if (e.key in keyStatuses) {
                setKeyStatuses((prevState) => ({ ...prevState, [e.key]: true }));
            }
        };
        const keyUp = (e) => {
            if (e.key in keyStatuses) {
                setKeyStatuses((prevState) => ({ ...prevState, [e.key]: false }));
            }
        };
        if (isBrowser) {
            window.addEventListener('keydown', keyDown);
            window.addEventListener('keyup', keyUp);
        }
        return () => {
            if (isBrowser) {
                window.removeEventListener('keydown', keyDown);
                window.removeEventListener('keyup', keyUp);
            }
        };
    }, [isBrowser, keyStatuses]);
    return keyStatuses;
};

// returns true if any of the keys are pressed.
const useAnyKeys = (keys) => {
    const [isKeyDown, setisKeyDown] = useState(false);
    const keyStatuses = useKeys(keys);
    useEffect(() => {
        if (Object.values(keyStatuses).includes(true)) {
            setisKeyDown(true);
        }
        else {
            setisKeyDown(false);
        }
    }, [keyStatuses]);
    return isKeyDown;
};
// returns true if all of the keys are pressed.
const useAllKeys = (keys) => {
    const [isKeyDown, setisKeyDown] = useState(false);
    const keyStatuses = useKeys(keys);
    useEffect(() => {
        if (!Object.values(keyStatuses).includes(false)) {
            setisKeyDown(true);
        }
        else {
            setisKeyDown(false);
        }
    }, [keyStatuses]);
    return isKeyDown;
};

export { useAllKeys, useAnyKeys, useKey, useKeys };
//# sourceMappingURL=index.esm.js.map
