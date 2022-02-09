"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOptionItem = createOptionItem;

var _util = require("@axia-js/util");

// Copyright 2017-2021 @axia-js/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0
function createOptionItem(address, _name) {
  const name = (0, _util.isUndefined)(_name) ? address.length > 15 ? `${address.slice(0, 6)}…${address.slice(-6)}` : address : _name;
  return {
    key: address,
    name,
    value: address
  };
}