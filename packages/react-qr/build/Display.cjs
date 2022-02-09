"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QrDisplay = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utilCrypto = require("@axia-js/util-crypto");

var _qrcode = require("./qrcode.cjs");

var _util = require("./util.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const FRAME_DELAY = 2500;
const TIMER_INC = 500;

function getDataUrl(value) {
  const qr = (0, _qrcode.qrcode)(0, 'M'); // HACK See our qrcode stringToBytes override as used internally. This
  // will only work for the case where we actually pass `Bytes` in here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  qr.addData(value, 'Byte');
  qr.make();
  return qr.createDataURL(16, 0);
}

function Display({
  className,
  size,
  skipEncoding,
  style,
  value
}) {
  const [{
    image
  }, setFrameState] = (0, _react.useState)({
    frameIdx: 0,
    frames: [],
    image: null,
    valueHash: null
  });
  const timerRef = (0, _react.useRef)({
    timerDelay: FRAME_DELAY,
    timerId: null
  });
  const containerStyle = (0, _react.useMemo)(() => (0, _util.createImgSize)(size), [size]); // run on initial load to setup the global timer and provide and unsubscribe

  (0, _react.useEffect)(() => {
    const nextFrame = () => setFrameState(state => {
      // when we have a single frame, we only ever fire once
      if (state.frames.length <= 1) {
        return state;
      }

      let frameIdx = state.frameIdx + 1; // when we overflow, skip to the first and slightly increase the delay between frames

      if (frameIdx === state.frames.length) {
        frameIdx = 0;
        timerRef.current.timerDelay = timerRef.current.timerDelay + TIMER_INC;
      }

      timerRef.current.timerId = setTimeout(nextFrame, timerRef.current.timerDelay); // only encode the frames on demand, not above as part of the
      // state derivation - in the case of large payloads, this should
      // be slightly more responsive on initial load

      return _objectSpread(_objectSpread({}, state), {}, {
        frameIdx,
        image: getDataUrl(state.frames[frameIdx])
      });
    });

    timerRef.current.timerId = window.setTimeout(nextFrame, FRAME_DELAY);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timerRef.current.timerId && clearTimeout(timerRef.current.timerId);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  (0, _react.useEffect)(() => {
    setFrameState(state => {
      const valueHash = (0, _utilCrypto.xxhashAsHex)(value);

      if (valueHash === state.valueHash) {
        return state;
      }

      const frames = skipEncoding ? [value] : (0, _util.createFrames)(value); // encode on demand

      return {
        frameIdx: 0,
        frames,
        image: getDataUrl(frames[0]),
        valueHash
      };
    });
  }, [skipEncoding, value]);

  if (!image) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    style: containerStyle,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--qr-Display",
      style: style,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        src: image
      })
    })
  });
}

const QrDisplay = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Display).withConfig({
  displayName: "Display__QrDisplay",
  componentId: "sc-8269vg-0"
})([".ui--qr-Display{height:100%;width:100%;img,svg{background:white;height:auto !important;max-height:100%;max-width:100%;width:auto !important;}}"]));

exports.QrDisplay = QrDisplay;