"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QrScan = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactQrReader = _interopRequireDefault(require("react-qr-reader"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _util = require("./util.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-qr authors & contributors
// SPDX-License-Identifier: Apache-2.0
const DEFAULT_DELAY = 150;

const DEFAULT_ERROR = error => {
  console.error('@axia-js/react-qr:Scan', error.message);
};

function Scan({
  className,
  delay = DEFAULT_DELAY,
  onError = DEFAULT_ERROR,
  onScan,
  size,
  style
}) {
  const containerStyle = (0, _react.useMemo)(() => (0, _util.createImgSize)(size), [size]);

  const _onError = (0, _react.useCallback)(error => onError(error), [onError]);

  const _onScan = (0, _react.useCallback)(data => data && onScan(data), [onScan]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    style: containerStyle,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQrReader.default, {
      className: "ui--qr-Scan",
      delay: delay,
      onError: _onError,
      onScan: _onScan,
      style: style
    })
  });
}

const QrScan = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Scan).withConfig({
  displayName: "Scan__QrScan",
  componentId: "sc-1aceo6b-0"
})([".ui--qr-Scan{display:inline-block;height:100%;transform:matrix(-1,0,0,1,0,0);width:100%;video{margin:0;}}"]));

exports.QrScan = QrScan;