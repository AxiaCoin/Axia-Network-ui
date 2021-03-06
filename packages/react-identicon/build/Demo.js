// Copyright 2017-2021 @axia-js/react-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import ReactDOM from 'react-dom';
import { encodeAddress, randomAsU8a } from '@axia-js/util-crypto';
import { Identicon } from "./index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const THEMES = ['beachball', 'axia', 'axlib'];
export default class Demo extends React.PureComponent {
  render() {
    const identities = [];

    while (identities.length !== 50) {
      identities.push(encodeAddress(randomAsU8a(32)));
    }

    return /*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx("div", {
        children: identities.map((value, index) => /*#__PURE__*/_jsx(Identicon, {
          theme: THEMES[index % THEMES.length],
          value: value
        }, value.toString()))
      }), /*#__PURE__*/_jsx("div", {
        children: THEMES.map(theme => /*#__PURE__*/_jsx(Identicon, {
          theme: theme,
          value: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
        }, theme))
      })]
    });
  }

}
const rootElement = document.getElementById('demo');

if (!rootElement) {
  throw new Error('Unable to find element with id \'demo\'');
}

ReactDOM.render( /*#__PURE__*/_jsx(Demo, {}), rootElement);