"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

var _index = require("./icons/index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/reactnative-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
const Fallback = _index.AXIA;
const DEFAULT_SIZE = 64;
const DEFAULT_THEME = 'axia';
const Components = {
  axia: _index.AXIA
};

class IdentityIcon extends _react.default.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      address: '',
      publicKey: '0x'
    };
  }

  static setDefaultPrefix(prefix) {
    IdentityIcon.prefix = prefix;
  }

  static getDerivedStateFromProps({
    prefix = IdentityIcon.prefix,
    value
  }, prevState) {
    try {
      const address = (0, _util.isU8a)(value) || (0, _util.isHex)(value) ? (0, _utilCrypto.encodeAddress)(value, prefix) : value || '';
      const publicKey = (0, _util.u8aToHex)((0, _utilCrypto.decodeAddress)(address, true, prefix));
      return address === prevState.address ? null : {
        address,
        publicKey
      };
    } catch (error) {
      return {
        address: '',
        publicKey: '0x'
      };
    }
  }

  render() {
    const {
      theme = DEFAULT_THEME,
      size = DEFAULT_SIZE
    } = this.props;
    const {
      address,
      publicKey
    } = this.state;
    const Component = !address ? _index.Empty : Components[theme] || Fallback;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
      address: address,
      publicKey: publicKey,
      size: size
    });
  }

}

exports.default = IdentityIcon;
IdentityIcon.prefix = undefined;