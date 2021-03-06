"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrowserStore = void 0;

var _store = _interopRequireDefault(require("store"));

// Copyright 2017-2021 @axia-js/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0
class BrowserStore {
  all(cb) {
    _store.default.each((value, key) => {
      cb(key, value);
    });
  }

  get(key, cb) {
    cb(_store.default.get(key));
  }

  remove(key, cb) {
    _store.default.remove(key);

    cb && cb();
  }

  set(key, value, cb) {
    _store.default.set(key, value);

    cb && cb();
  }

}

exports.BrowserStore = BrowserStore;