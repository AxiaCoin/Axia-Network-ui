"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Keyring", {
  enumerable: true,
  get: function () {
    return _Keyring.Keyring;
  }
});
Object.defineProperty(exports, "Ledger", {
  enumerable: true,
  get: function () {
    return _hwLedger.Ledger;
  }
});
Object.defineProperty(exports, "packageInfo", {
  enumerable: true,
  get: function () {
    return _packageInfo.packageInfo;
  }
});
exports.keyring = void 0;

var _Keyring = require("./Keyring.cjs");

var _hwLedger = require("@axia-js/hw-ledger");

var _packageInfo = require("./packageInfo.cjs");

// Copyright 2017-2021 @axia-js/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0
const keyring = new _Keyring.Keyring();
exports.keyring = keyring;