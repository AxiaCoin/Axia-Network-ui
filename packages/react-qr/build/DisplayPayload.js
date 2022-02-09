// Copyright 2017-2021 @axia-js/react-qr authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { QrDisplay } from "./Display.js";
import { createSignPayload } from "./util.js";
import { jsx as _jsx } from "react/jsx-runtime";

function DisplayPayload({
  address,
  className,
  cmd,
  genesisHash,
  payload,
  size,
  style
}) {
  const data = useMemo(() => createSignPayload(address, cmd, payload, genesisHash), [address, cmd, payload, genesisHash]);

  if (!data) {
    return null;
  }

  return /*#__PURE__*/_jsx(QrDisplay, {
    className: className,
    size: size,
    style: style,
    value: data
  });
}

export const QrDisplayPayload = /*#__PURE__*/React.memo(DisplayPayload);