"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addresses = void 0;

var _defaults = require("../defaults.cjs");

var _genericSubject = require("./genericSubject.cjs");

// Copyright 2017-2021 @axia-js/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0
const addresses = (0, _genericSubject.genericSubject)(_defaults.addressKey);
exports.addresses = addresses;