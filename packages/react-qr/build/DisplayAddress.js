// Copyright 2017-2021 @axia-js/react-qr authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { QrDisplay } from "./Display.js";
import { createAddressPayload } from "./util.js";
import { jsx as _jsx } from "react/jsx-runtime";

function DisplayAddress({
  address,
  className,
  genesisHash,
  size,
  style
}) {
  const data = useMemo(() => createAddressPayload(address, genesisHash), [address, genesisHash]);

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

export const QrDisplayAddress = /*#__PURE__*/React.memo(DisplayAddress);