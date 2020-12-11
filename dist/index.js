'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var useSSR = require('use-ssr');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var useSSR__default = /*#__PURE__*/_interopDefaultLegacy(useSSR);

const useKey = (key) => {
    const { isBrowser } = useSSR__default['default']();
    const [keyStatus, setKeyStatus] = react.useState('up');
    react.useEffect(() => {
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
const useKeys = (keys) => {
    const { isBrowser } = useSSR__default['default']();
    const [keyStatus, setKeyStatus] = react.useState('up');
    react.useEffect(() => {
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
            window.removeEventListener('keydown', keyDown);
            window.removeEventListener('keyup', keyUp);
        };
    }, [isBrowser, keys]);
    return { keyStatus };
};

exports.useKey = useKey;
exports.useKeys = useKeys;
//# sourceMappingURL=index.js.map
