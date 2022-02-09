"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AXIA = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiShared = require("@axia-js/ui-shared");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2018-2021 @axia-js/react-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Copyright 2018 AXIA-tech via axia-tech/oo7/axia-identicon
// This has been converted from the original version that can be found at
//
// https://github.com/axia-tech/oo7/blob/251ba2b7c45503b68eab4320c270b5afa9bccb60/packages/axia-identicon/src/index.jsx
//
// Here we have done the following to convert the component -
//   - Converted the code to TypeScript
//   - Removed the oo7 dependencies (since not initialised properly, it makes calls to wrong endpoints)
//   - Remove encoding functionality, these are catered for in the base
//   - Remove copy functionality (this is catered from in the base components)
//   - Split calculations into relevant functions
//   - Move constants to file-level
//   - Overall it is now just a static component, expecting an address as an input value
function renderCircle({
  cx,
  cy,
  fill,
  r
}, key) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: cx,
    cy: cy,
    fill: fill,
    r: r
  }, key);
}

function Identicon({
  address,
  className = '',
  isAlternative = false,
  size,
  style
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("svg", {
    className: className,
    height: size,
    id: address,
    name: address,
    style: style,
    viewBox: "0 0 64 64",
    width: size,
    children: (0, _uiShared.axiaIcon)(address, {
      isAlternative
    }).map(renderCircle)
  });
}

const AXIA = /*#__PURE__*/_react.default.memo(Identicon);

exports.AXIA = AXIA;