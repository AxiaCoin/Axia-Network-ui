"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.obervableAll = void 0;

var _rxjs = require("rxjs");

var _accounts = require("./accounts.cjs");

var _addresses = require("./addresses.cjs");

var _contracts = require("./contracts.cjs");

// Copyright 2017-2021 @axia-js/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0
const obervableAll = (0, _rxjs.combineLatest)([_accounts.accounts.subject, _addresses.addresses.subject, _contracts.contracts.subject]).pipe((0, _rxjs.map)(([accounts, addresses, contracts]) => ({
  accounts,
  addresses,
  contracts
})));
exports.obervableAll = obervableAll;