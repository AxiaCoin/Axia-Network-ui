"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PREFIXES = exports.PREFIX_DEFAULT = void 0;

var _networks = require("@axia-js/networks");

// Copyright 2017-2021 @axia-js/ui-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
const PREFIX_DEFAULT = -1;
exports.PREFIX_DEFAULT = PREFIX_DEFAULT;
const defaultNetwork = {
  info: 'default',
  text: 'Default for the connected node',
  value: -1
};

const networks = _networks.availableNetworks.map(({
  displayName,
  network,
  prefix
}) => ({
  info: network,
  text: displayName,
  value: prefix
}));

const PREFIXES = [defaultNetwork, ...networks];
exports.PREFIXES = PREFIXES;