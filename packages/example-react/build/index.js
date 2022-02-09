// Copyright 2017-2021 @axia-js/example-react authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Identicon } from '@axia-js/react-identicon';
import { keyring } from '@axia-js/ui-keyring';
import { settings } from '@axia-js/ui-settings';
import { cryptoWaitReady, mnemonicGenerate } from '@axia-js/util-crypto';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const rootElement = document.getElementById('example');

if (!rootElement) {
  throw new Error('Unable to find element with id \'example\'');
}

function App({
  className
}) {
  const [address, setAddress] = useState(null);
  const [phrase, setPhrase] = useState(null);
  const [ss58Format, setSS58Format] = useState(42);

  const _onClickNew = useCallback(() => {
    const phrase = mnemonicGenerate(12);
    const {
      address
    } = keyring.createFromUri(phrase);
    setAddress(keyring.encodeAddress(address, ss58Format));
    setPhrase(phrase);
  }, [ss58Format]);

  const _onChangeSS58Format = useCallback(({
    currentTarget: {
      value
    }
  }) => {
    setSS58Format(parseInt(value, 10));
  }, []);

  useEffect(() => {
    _onClickNew(); // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  useEffect(() => {
    address && setAddress(keyring.encodeAddress(address, ss58Format));
  }, [address, ss58Format]);

  if (!address || !phrase) {
    return null;
  }

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx("section", {
      children: /*#__PURE__*/_jsx("button", {
        onClick: _onClickNew,
        children: "another random address"
      })
    }), /*#__PURE__*/_jsxs("section", {
      children: [/*#__PURE__*/_jsx("label", {
        children: "phrase"
      }), /*#__PURE__*/_jsx("textarea", {
        cols: 40,
        readOnly: true,
        rows: 4,
        value: phrase
      })]
    }), /*#__PURE__*/_jsxs("section", {
      children: [/*#__PURE__*/_jsx("label", {
        children: "icons"
      }), /*#__PURE__*/_jsx(Identicon, {
        className: "icon",
        value: address
      }), /*#__PURE__*/_jsx(Identicon, {
        className: "icon",
        theme: "axia",
        value: address
      }), /*#__PURE__*/_jsx(Identicon, {
        className: "icon",
        theme: "beachball",
        value: address
      })]
    }), /*#__PURE__*/_jsxs("section", {
      children: [/*#__PURE__*/_jsx("label", {
        children: "address"
      }), address]
    }), /*#__PURE__*/_jsxs("section", {
      children: [/*#__PURE__*/_jsx("label", {
        children: "ss58 format"
      }), /*#__PURE__*/_jsx("select", {
        onChange: _onChangeSS58Format,
        value: ss58Format,
        children: settings.availablePrefixes.filter((_, index) => index !== 0).map(({
          text,
          value
        }) => /*#__PURE__*/_jsx("option", {
          value: value,
          children: text
        }, value))
      })]
    })]
  });
}

cryptoWaitReady().then(() => {
  keyring.loadAll({
    ss58Format: 42,
    type: 'sr25519'
  });
  ReactDOM.render( /*#__PURE__*/_jsx(App, {}), rootElement);
}).catch(console.error);