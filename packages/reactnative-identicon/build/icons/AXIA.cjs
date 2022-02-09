"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Identicon;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));

var _uiShared = require("@axia-js/ui-shared");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2018-2021 @axia-js/reactnative-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
function renderCircle({
  cx,
  cy,
  fill,
  r
}, key) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Circle, {
    cx: cx,
    cy: cy,
    fill: fill,
    r: r
  }, key);
}

function Identicon({
  address,
  isAlternative = false,
  size
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.default, {
      height: size,
      id: address,
      viewBox: "0 0 64 64",
      width: size,
      children: (0, _uiShared.axiaIcon)(address, {
        isAlternative
      }).map(renderCircle)
    })
  });
}