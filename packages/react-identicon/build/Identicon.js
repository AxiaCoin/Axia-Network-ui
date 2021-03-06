import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';
import { ICON_DEFAULT_HOST, settings } from '@axia-js/ui-settings';
import { isHex, isU8a, u8aToHex } from '@axia-js/util';
import { decodeAddress, encodeAddress, ethereumEncode } from '@axia-js/util-crypto';
import { Beachball, Empty, Ethereum, Jdenticon, AXIA } from "./icons/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
const Fallback = Beachball;
const DEFAULT_SIZE = 64;
const Components = {
  beachball: Beachball,
  empty: Empty,
  ethereum: Ethereum,
  jdenticon: Jdenticon,
  axia: AXIA,
  axlib: Jdenticon
};
const Wrapper = styled.div.withConfig({
  displayName: "Identicon__Wrapper",
  componentId: "sc-xwny8y-0"
})(["cursor:copy;display:inline-block;line-height:0;> .container{position:relative;> div,> svg{position:relative;}&.highlight:before{position:absolute;top:0;left:0;right:0;bottom:0;border-radius:50%;box-shadow:0 0 5px 2px #aaa;content:'';}}"]);

class BaseIcon extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      address: '',
      publicKey: '0x'
    };

    this.onCopy = () => {
      const {
        onCopy
      } = this.props;
      const {
        address
      } = this.state;

      if (address && onCopy) {
        onCopy(address);
      }
    };
  }

  static setDefaultPrefix(prefix) {
    BaseIcon.prefix = prefix;
  }

  static getDerivedStateFromProps({
    prefix = BaseIcon.prefix,
    theme,
    value
  }, prevState) {
    if (theme === 'ethereum') {
      const address = isU8a(value) ? ethereumEncode(value) : value || '';
      return {
        address,
        publicKey: ''
      };
    }

    try {
      const address = isU8a(value) || isHex(value) ? encodeAddress(value, prefix) : value || '';
      const publicKey = u8aToHex(decodeAddress(address, false, prefix));
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
      address
    } = this.state;
    const wrapped = this.getWrapped(this.state, this.props);
    return !address ? wrapped : /*#__PURE__*/_jsx(CopyToClipboard, {
      onCopy: this.onCopy,
      text: address,
      children: wrapped
    });
  }

  getWrapped({
    address,
    publicKey
  }, {
    Custom
  }) {
    const {
      className = '',
      isAlternative,
      isHighlight,
      size = DEFAULT_SIZE,
      style,
      theme = settings.icon
    } = this.props;
    const Component = !address ? Empty : Custom || Components[theme === 'default' ? ICON_DEFAULT_HOST : theme] || Fallback;
    return /*#__PURE__*/_jsx(Wrapper, {
      className: `ui--IdentityIcon  ${className}`,
      style: style,
      children: /*#__PURE__*/_jsx(Component, {
        address: address,
        className: isHighlight ? 'highlight' : '',
        isAlternative: isAlternative,
        publicKey: publicKey,
        size: size
      })
    }, address);
  }

}

BaseIcon.prefix = undefined;

function Icon(props) {
  return /*#__PURE__*/_jsx(BaseIcon, _objectSpread({}, props));
}

export const Identicon = /*#__PURE__*/React.memo(Icon);