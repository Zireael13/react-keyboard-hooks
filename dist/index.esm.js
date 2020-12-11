import { useState, useEffect } from 'react';
import useSSR from 'use-ssr';

const useKey = (key) => {
    const { isBrowser } = useSSR();
    const [keyStatus, setKeyStatus] = useState('up');
    useEffect(() => {
        const keyDown = (e) => {
            if (e.key === key) {
                setKeyStatus('down');
            }
        };
        const keyUp = (e) => {
            if (e.key === key) {
                setKeyStatus('up');
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
    return { keyStatus };
};
// TODO: edge case where multiple keys are pressed and one is released?
// test push
const useKeys = (keys) => {
    const { isBrowser } = useSSR();
    const [keyStatus, setKeyStatus] = useState('up');
    useEffect(() => {
        const keyDown = (e) => {
            if (keys.includes(e.key)) {
                setKeyStatus('down');
            }
        };
        const keyUp = (e) => {
            if (keys.includes(e.key)) {
                setKeyStatus('up');
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
    }, [isBrowser, keys]);
    return { keyStatus };
};

export { useKey, useKeys };
//# sourceMappingURL=index.esm.js.map
