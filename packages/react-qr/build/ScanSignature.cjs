"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QrScanSignature = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Scan = require("./Scan.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-qr authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ScanSignature({
  className,
  onError,
  onScan,
  size,
  style
}) {
  const _onScan = (0, _react.useCallback)(signature => signature && onScan({
    signature: `0x${signature}`
  }), [onScan]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Scan.QrScan, {
    className: className,
    onError: onError,
    onScan: _onScan,
    size: size,
    style: style
  });
}

const QrScanSignature = /*#__PURE__*/_react.default.memo(ScanSignature);

exports.QrScanSignature = QrScanSignature;