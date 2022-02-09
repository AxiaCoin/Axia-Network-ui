// Copyright 2017-2021 @axia-js/react-qr authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { isString, u8aConcat, u8aToU8a } from '@axia-js/util';
import { decodeAddress } from '@axia-js/util-crypto';
import { ADDRESS_PREFIX, CRYPTO_SR25519, FRAME_SIZE, AXLIB_ID } from "./constants.js";
const MULTIPART = new Uint8Array([0]);
export function encodeNumber(value) {
  return new Uint8Array([value >> 8, value & 0xff]);
}
export function encodeString(value) {
  const u8a = new Uint8Array(value.length);

  for (let i = 0; i < value.length; i++) {
    u8a[i] = value.charCodeAt(i);
  }

  return u8a;
}
export function decodeString(value) {
  return value.reduce((str, code) => {
    return str + String.fromCharCode(code);
  }, '');
}
export function createAddressPayload(address, genesisHash) {
  return encodeString(`${ADDRESS_PREFIX}:${address}:${genesisHash}`);
}
export function createSignPayload(address, cmd, payload, genesisHash) {
  return u8aConcat(AXLIB_ID, CRYPTO_SR25519, new Uint8Array([cmd]), decodeAddress(address), u8aToU8a(payload), u8aToU8a(genesisHash));
}
export function createFrames(input) {
  const frames = [];
  let idx = 0;

  while (idx < input.length) {
    frames.push(input.subarray(idx, idx + FRAME_SIZE));
    idx += FRAME_SIZE;
  }

  return frames.map((frame, index) => u8aConcat(MULTIPART, encodeNumber(frames.length), encodeNumber(index), frame));
}
export function createImgSize(size) {
  if (!size) {
    return {
      height: 'auto',
      width: '100%'
    };
  }

  const height = isString(size) ? size : `${size}px`;
  return {
    height,
    width: height
  };
}