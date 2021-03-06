"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _utilCrypto = require("@axia-js/util-crypto");

var _index = require("./index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
const THEMES = ['beachball', 'axia', 'axlib'];

class Demo extends _react.default.PureComponent {
  render() {
    const identities = [];

    while (identities.length !== 50) {
      identities.push((0, _utilCrypto.encodeAddress)((0, _utilCrypto.randomAsU8a)(32)));
    }

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: identities.map((value, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Identicon, {
          theme: THEMES[index % THEMES.length],
          value: value
        }, value.toString()))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: THEMES.map(theme => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Identicon, {
          theme: theme,
          value: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
        }, theme))
      })]
    });
  }

}

exports.default = Demo;
const rootElement = document.getElementById('demo');

if (!rootElement) {
  throw new Error('Unable to find element with id \'demo\'');
}

_reactDom.default.render( /*#__PURE__*/(0, _jsxRuntime.jsx)(Demo, {}), rootElement);