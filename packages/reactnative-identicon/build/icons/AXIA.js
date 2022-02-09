// Copyright 2018-2021 @axia-js/reactnative-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { View } from 'react-native';
import Svg, { Circle as SvgCircle } from 'react-native-svg';
import { axiaIcon } from '@axia-js/ui-shared';
import { jsx as _jsx } from "react/jsx-runtime";

function renderCircle({
  cx,
  cy,
  fill,
  r
}, key) {
  return /*#__PURE__*/_jsx(SvgCircle, {
    cx: cx,
    cy: cy,
    fill: fill,
    r: r
  }, key);
}

export default function Identicon({
  address,
  isAlternative = false,
  size
}) {
  return /*#__PURE__*/_jsx(View, {
    children: /*#__PURE__*/_jsx(Svg, {
      height: size,
      id: address,
      viewBox: "0 0 64 64",
      width: size,
      children: axiaIcon(address, {
        isAlternative
      }).map(renderCircle)
    })
  });
}