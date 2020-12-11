'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var useSSR = require('use-ssr');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var useSSR__default = /*#__PURE__*/_interopDefaultLegacy(useSSR);

const useKey = (key) => {
    const { isBrowser } = useSSR__default['default']();
    const [isKeyDown, setisKeyDown] = react.useState(false);
    react.useEffect(() => {
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
    const { isBrowser } = useSSR__default['default']();
    const [keyStatuses, setKeyStatuses] = react.useState(Object.fromEntries(keys.map((key) => [key, false])));
    react.useEffect(() => {
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
    const [isKeyDown, setisKeyDown] = react.useState(false);
    const keyStatuses = useKeys(keys);
    react.useEffect(() => {
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
    const [isKeyDown, setisKeyDown] = react.useState(false);
    const keyStatuses = useKeys(keys);
    react.useEffect(() => {
        if (!Object.values(keyStatuses).includes(false)) {
            setisKeyDown(true);
        }
        else {
            setisKeyDown(false);
        }
    }, [keyStatuses]);
    return isKeyDown;
};

exports.useAllKeys = useAllKeys;
exports.useAnyKeys = useAnyKeys;
exports.useKey = useKey;
exports.useKeys = useKeys;
//# sourceMappingURL=index.js.map
