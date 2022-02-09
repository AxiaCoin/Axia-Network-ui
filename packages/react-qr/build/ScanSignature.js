// Copyright 2017-2021 @axia-js/react-qr authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import { QrScan } from "./Scan.js";
import { jsx as _jsx } from "react/jsx-runtime";

function ScanSignature({
  className,
  onError,
  onScan,
  size,
  style
}) {
  const _onScan = useCallback(signature => signature && onScan({
    signature: `0x${signature}`
  }), [onScan]);

  return /*#__PURE__*/_jsx(QrScan, {
    className: className,
    onError: onError,
    onScan: _onScan,
    size: size,
    style: style
  });
}

export const QrScanSignature = /*#__PURE__*/React.memo(ScanSignature);