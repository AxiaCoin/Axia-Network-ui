"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contractRegex = exports.contractKey = exports.addressRegex = exports.addressKey = exports.accountRegex = exports.accountKey = void 0;

var _keyring = require("@axia-js/keyring");

var _util = require("@axia-js/util");

// Copyright 2017-2021 @axia-js/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0
const ACCOUNT_PREFIX = 'account:';
const ADDRESS_PREFIX = 'address:';
const CONTRACT_PREFIX = 'contract:';

function toHex(address) {
  return (0, _util.u8aToHex)( // When saving pre-checksum changes, ensure that we can decode
  (0, _keyring.decodeAddress)(address, true));
}

const accountKey = address => `${ACCOUNT_PREFIX}${toHex(address)}`;

exports.accountKey = accountKey;

const addressKey = address => `${ADDRESS_PREFIX}${toHex(address)}`;

exports.addressKey = addressKey;

const contractKey = address => `${CONTRACT_PREFIX}${toHex(address)}`;

exports.contractKey = contractKey;
const accountRegex = new RegExp(`^${ACCOUNT_PREFIX}0x[0-9a-f]*`, '');
exports.accountRegex = accountRegex;
const addressRegex = new RegExp(`^${ADDRESS_PREFIX}0x[0-9a-f]*`, '');
exports.addressRegex = addressRegex;
const contractRegex = new RegExp(`^${CONTRACT_PREFIX}0x[0-9a-f]*`, '');
exports.contractRegex = contractRegex;