// Copyright 2017-2021 @axia-js/react-qr authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo } from 'react';
import Reader from 'react-qr-reader';
import styled from 'styled-components';
import { createImgSize } from "./util.js";
import { jsx as _jsx } from "react/jsx-runtime";
const DEFAULT_DELAY = 150;

const DEFAULT_ERROR = error => {
  console.error('@axia-js/react-qr:Scan', error.message);
};

function Scan({
  className,
  delay = DEFAULT_DELAY,
  onError = DEFAULT_ERROR,
  onScan,
  size,
  style
}) {
  const containerStyle = useMemo(() => createImgSize(size), [size]);

  const _onError = useCallback(error => onError(error), [onError]);

  const _onScan = useCallback(data => data && onScan(data), [onScan]);

  return /*#__PURE__*/_jsx("div", {
    className: className,
    style: containerStyle,
    children: /*#__PURE__*/_jsx(Reader, {
      className: "ui--qr-Scan",
      delay: delay,
      onError: _onError,
      onScan: _onScan,
      style: style
    })
  });
}

export const QrScan = /*#__PURE__*/React.memo(styled(Scan).withConfig({
  displayName: "Scan__QrScan",
  componentId: "sc-1aceo6b-0"
})([".ui--qr-Scan{display:inline-block;height:100%;transform:matrix(-1,0,0,1,0,0);width:100%;video{margin:0;}}"]));