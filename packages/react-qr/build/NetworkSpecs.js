// Copyright 2017-2021 @axia-js/react-qr authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { QrDisplay } from "./Display.js";
import { encodeString } from "./util.js";
import { jsx as _jsx } from "react/jsx-runtime";

function DisplayNetworkSpecs({
  className,
  networkSpecs,
  size,
  style
}) {
  const data = useMemo(() => encodeString(JSON.stringify(networkSpecs)), [networkSpecs]);

  if (!data) {
    return null;
  }

  return /*#__PURE__*/_jsx(QrDisplay, {
    className: className,
    size: size,
    skipEncoding: true,
    style: style,
    value: data
  });
}

export const QrNetworkSpecs = /*#__PURE__*/React.memo(DisplayNetworkSpecs);