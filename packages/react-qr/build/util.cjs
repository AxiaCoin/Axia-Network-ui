"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encodeNumber = encodeNumber;
exports.encodeString = encodeString;
exports.decodeString = decodeString;
exports.createAddressPayload = createAddressPayload;
exports.createSignPayload = createSignPayload;
exports.createFrames = createFrames;
exports.createImgSize = createImgSize;

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

var _constants = require("./constants.cjs");

// Copyright 2017-2021 @axia-js/react-qr authors & contributors
// SPDX-License-Identifier: Apache-2.0
const MULTIPART = new Uint8Array([0]);

function encodeNumber(value) {
  return new Uint8Array([value >> 8, value & 0xff]);
}

function encodeString(value) {
  const u8a = new Uint8Array(value.length);

  for (let i = 0; i < value.length; i++) {
    u8a[i] = value.charCodeAt(i);
  }

  return u8a;
}

function decodeString(value) {
  return value.reduce((str, code) => {
    return str + String.fromCharCode(code);
  }, '');
}

function createAddressPayload(address, genesisHash) {
  return encodeString(`${_constants.ADDRESS_PREFIX}:${address}:${genesisHash}`);
}

function createSignPayload(address, cmd, payload, genesisHash) {
  return (0, _util.u8aConcat)(_constants.AXLIB_ID, _constants.CRYPTO_SR25519, new Uint8Array([cmd]), (0, _utilCrypto.decodeAddress)(address), (0, _util.u8aToU8a)(payload), (0, _util.u8aToU8a)(genesisHash));
}

function createFrames(input) {
  const frames = [];
  let idx = 0;

  while (idx < input.length) {
    frames.push(input.subarray(idx, idx + _constants.FRAME_SIZE));
    idx += _constants.FRAME_SIZE;
  }

  return frames.map((frame, index) => (0, _util.u8aConcat)(MULTIPART, encodeNumber(frames.length), encodeNumber(index), frame));
}

function createImgSize(size) {
  if (!size) {
    return {
      height: 'auto',
      width: '100%'
    };
  }

  const height = (0, _util.isString)(size) ? size : `${size}px`;
  return {
    height,
    width: height
  };
}