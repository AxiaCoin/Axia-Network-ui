"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.qrcode = void 0;

var _qrcodeGenerator = _interopRequireDefault(require("qrcode-generator"));

// Copyright 2017-2021 @axia-js/react-qr authors & contributors
// SPDX-License-Identifier: Apache-2.0
// A small hurdle to jump through, just to get the default/default correct (as generated)
const qrcode = _qrcodeGenerator.default; // HACK The default function take string -> number[], the Uint8array is compatible
// with that signature and the use thereof
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access

exports.qrcode = qrcode;

qrcode.stringToBytes = data => data;