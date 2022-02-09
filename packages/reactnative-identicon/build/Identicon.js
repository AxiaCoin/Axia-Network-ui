// Copyright 2017-2021 @axia-js/reactnative-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { isHex, isU8a, u8aToHex } from '@axia-js/util';
import { decodeAddress, encodeAddress } from '@axia-js/util-crypto';
import { Empty, AXIA } from "./icons/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
const Fallback = AXIA;
const DEFAULT_SIZE = 64;
const DEFAULT_THEME = 'axia';
const Components = {
  axia: AXIA
};
export default class IdentityIcon extends React.PureComponent {
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
      const address = isU8a(value) || isHex(value) ? encodeAddress(value, prefix) : value || '';
      const publicKey = u8aToHex(decodeAddress(address, true, prefix));
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
    const Component = !address ? Empty : Components[theme] || Fallback;
    return /*#__PURE__*/_jsx(Component, {
      address: address,
      publicKey: publicKey,
      size: size
    });
  }

}
IdentityIcon.prefix = undefined;