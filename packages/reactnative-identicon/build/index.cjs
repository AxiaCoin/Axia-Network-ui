"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  packageInfo: true
};
Object.defineProperty(exports, "packageInfo", {
  enumerable: true,
  get: function () {
    return _packageInfo.packageInfo;
  }
});
exports.default = void 0;

require("./detectPackage.cjs");

var _Identicon = _interopRequireDefault(require("./Identicon.cjs"));

var _index = require("./icons/index.cjs");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});

var _packageInfo = require("./packageInfo.cjs");

// Copyright 2017-2021 @axia-js/reactnative-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
var _default = _Identicon.default;
exports.default = _default;