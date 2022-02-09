"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactIdenticon = require("@axia-js/react-identicon");

var _uiKeyring = require("@axia-js/ui-keyring");

var _uiSettings = require("@axia-js/ui-settings");

var _utilCrypto = require("@axia-js/util-crypto");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/example-react authors & contributors
// SPDX-License-Identifier: Apache-2.0
const rootElement = document.getElementById('example');

if (!rootElement) {
  throw new Error('Unable to find element with id \'example\'');
}

function App({
  className
}) {
  const [address, setAddress] = (0, _react.useState)(null);
  const [phrase, setPhrase] = (0, _react.useState)(null);
  const [ss58Format, setSS58Format] = (0, _react.useState)(42);

  const _onClickNew = (0, _react.useCallback)(() => {
    const phrase = (0, _utilCrypto.mnemonicGenerate)(12);

    const {
      address
    } = _uiKeyring.keyring.createFromUri(phrase);

    setAddress(_uiKeyring.keyring.encodeAddress(address, ss58Format));
    setPhrase(phrase);
  }, [ss58Format]);

  const _onChangeSS58Format = (0, _react.useCallback)(({
    currentTarget: {
      value
    }
  }) => {
    setSS58Format(parseInt(value, 10));
  }, []);

  (0, _react.useEffect)(() => {
    _onClickNew(); // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  (0, _react.useEffect)(() => {
    address && setAddress(_uiKeyring.keyring.encodeAddress(address, ss58Format));
  }, [address, ss58Format]);

  if (!address || !phrase) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: _onClickNew,
        children: "another random address"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
        children: "phrase"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("textarea", {
        cols: 40,
        readOnly: true,
        rows: 4,
        value: phrase
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
        children: "icons"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactIdenticon.Identicon, {
        className: "icon",
        value: address
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactIdenticon.Identicon, {
        className: "icon",
        theme: "axia",
        value: address
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactIdenticon.Identicon, {
        className: "icon",
        theme: "beachball",
        value: address
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
        children: "address"
      }), address]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
        children: "ss58 format"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("select", {
        onChange: _onChangeSS58Format,
        value: ss58Format,
        children: _uiSettings.settings.availablePrefixes.filter((_, index) => index !== 0).map(({
          text,
          value
        }) => /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
          value: value,
          children: text
        }, value))
      })]
    })]
  });
}

(0, _utilCrypto.cryptoWaitReady)().then(() => {
  _uiKeyring.keyring.loadAll({
    ss58Format: 42,
    type: 'sr25519'
  });

  _reactDom.default.render( /*#__PURE__*/(0, _jsxRuntime.jsx)(App, {}), rootElement);
}).catch(console.error);