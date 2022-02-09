import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-qr authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { xxhashAsHex } from '@axia-js/util-crypto';
import { qrcode } from "./qrcode.js";
import { createFrames, createImgSize } from "./util.js";
import { jsx as _jsx } from "react/jsx-runtime";
const FRAME_DELAY = 2500;
const TIMER_INC = 500;

function getDataUrl(value) {
  const qr = qrcode(0, 'M'); // HACK See our qrcode stringToBytes override as used internally. This
  // will only work for the case where we actually pass `Bytes` in here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  qr.addData(value, 'Byte');
  qr.make();
  return qr.createDataURL(16, 0);
}

function Display({
  className,
  size,
  skipEncoding,
  style,
  value
}) {
  const [{
    image
  }, setFrameState] = useState({
    frameIdx: 0,
    frames: [],
    image: null,
    valueHash: null
  });
  const timerRef = useRef({
    timerDelay: FRAME_DELAY,
    timerId: null
  });
  const containerStyle = useMemo(() => createImgSize(size), [size]); // run on initial load to setup the global timer and provide and unsubscribe

  useEffect(() => {
    const nextFrame = () => setFrameState(state => {
      // when we have a single frame, we only ever fire once
      if (state.frames.length <= 1) {
        return state;
      }

      let frameIdx = state.frameIdx + 1; // when we overflow, skip to the first and slightly increase the delay between frames

      if (frameIdx === state.frames.length) {
        frameIdx = 0;
        timerRef.current.timerDelay = timerRef.current.timerDelay + TIMER_INC;
      }

      timerRef.current.timerId = setTimeout(nextFrame, timerRef.current.timerDelay); // only encode the frames on demand, not above as part of the
      // state derivation - in the case of large payloads, this should
      // be slightly more responsive on initial load

      return _objectSpread(_objectSpread({}, state), {}, {
        frameIdx,
        image: getDataUrl(state.frames[frameIdx])
      });
    });

    timerRef.current.timerId = window.setTimeout(nextFrame, FRAME_DELAY);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timerRef.current.timerId && clearTimeout(timerRef.current.timerId);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setFrameState(state => {
      const valueHash = xxhashAsHex(value);

      if (valueHash === state.valueHash) {
        return state;
      }

      const frames = skipEncoding ? [value] : createFrames(value); // encode on demand

      return {
        frameIdx: 0,
        frames,
        image: getDataUrl(frames[0]),
        valueHash
      };
    });
  }, [skipEncoding, value]);

  if (!image) {
    return null;
  }

  return /*#__PURE__*/_jsx("div", {
    className: className,
    style: containerStyle,
    children: /*#__PURE__*/_jsx("div", {
      className: "ui--qr-Display",
      style: style,
      children: /*#__PURE__*/_jsx("img", {
        src: image
      })
    })
  });
}

export const QrDisplay = /*#__PURE__*/React.memo(styled(Display).withConfig({
  displayName: "Display__QrDisplay",
  componentId: "sc-8269vg-0"
})([".ui--qr-Display{height:100%;width:100%;img,svg{background:white;height:auto !important;max-height:100%;max-width:100%;width:auto !important;}}"]));