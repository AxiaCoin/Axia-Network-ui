// Copyright 2017-2021 @axia-js/reactnative-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { jsx as _jsx } from "react/jsx-runtime";
export default function Empty({
  size
}) {
  return /*#__PURE__*/_jsx(View, {
    children: /*#__PURE__*/_jsx(Svg, {
      height: size,
      viewBox: "0 0 64 64",
      width: size,
      children: /*#__PURE__*/_jsx(Circle, {
        cx: "32",
        cy: "32",
        fill: "#eee",
        r: "32"
      })
    })
  });
}