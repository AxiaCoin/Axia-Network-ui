"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AXLIB_ID = exports.SEED_PREFIX = exports.FRAME_SIZE = exports.CRYPTO_SR25519 = exports.CMD_SIGN_MSG = exports.CMD_SIGN_IMMORTAL_TX = exports.CMD_SIGN_TX_HASH = exports.CMD_SIGN_TX = exports.ADDRESS_PREFIX = void 0;
// Copyright 2017-2021 @axia-js/react-qr authors & contributors
// SPDX-License-Identifier: Apache-2.0
const ADDRESS_PREFIX = 'axlib';
exports.ADDRESS_PREFIX = ADDRESS_PREFIX;
const SEED_PREFIX = 'secret';
exports.SEED_PREFIX = SEED_PREFIX;
const FRAME_SIZE = 1024;
exports.FRAME_SIZE = FRAME_SIZE;
const AXLIB_ID = new Uint8Array([0x53]);
exports.AXLIB_ID = AXLIB_ID;
const CRYPTO_SR25519 = new Uint8Array([0x01]);
exports.CRYPTO_SR25519 = CRYPTO_SR25519;
const CMD_SIGN_TX = new Uint8Array([0]);
exports.CMD_SIGN_TX = CMD_SIGN_TX;
const CMD_SIGN_TX_HASH = new Uint8Array([1]);
exports.CMD_SIGN_TX_HASH = CMD_SIGN_TX_HASH;
const CMD_SIGN_IMMORTAL_TX = new Uint8Array([2]);
exports.CMD_SIGN_IMMORTAL_TX = CMD_SIGN_IMMORTAL_TX;
const CMD_SIGN_MSG = new Uint8Array([3]);
exports.CMD_SIGN_MSG = CMD_SIGN_MSG;