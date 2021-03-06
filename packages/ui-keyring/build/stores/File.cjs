"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileStore = void 0;

var _classPrivateFieldLooseBase2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseBase"));

var _classPrivateFieldLooseKey2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseKey"));

var _fs = _interopRequireDefault(require("fs"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _path2 = _interopRequireDefault(require("path"));

var _util = require("@axia-js/util");

// Copyright 2017-2021 @axia-js/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0
var _path = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("path");

// NOTE untested and unused by any known apps, probably broken in various mysterious ways
class FileStore {
  constructor(path) {
    Object.defineProperty(this, _path, {
      writable: true,
      value: void 0
    });

    if (!_fs.default.existsSync(path)) {
      _mkdirp.default.sync(path);
    }

    (0, _classPrivateFieldLooseBase2.default)(this, _path)[_path] = path;
  }

  all(cb) {
    _fs.default.readdirSync((0, _classPrivateFieldLooseBase2.default)(this, _path)[_path]).filter(key => !['.', '..', '.DS_Store'].includes(key)).forEach(key => {
      const value = this._readKey(key);

      (value === null || value === void 0 ? void 0 : value.address) && cb(key, value);
    });
  }

  get(key, cb) {
    const value = this._readKey(key);

    (0, _util.assert)(value === null || value === void 0 ? void 0 : value.address, `Invalid JSON found for ${key}`);
    cb(value);
  }

  remove(key, cb) {
    _fs.default.unlinkSync(this._getPath(key));

    cb && cb();
  }

  set(key, value, cb) {
    _fs.default.writeFileSync(this._getPath(key), Buffer.from(JSON.stringify(value), 'utf-8'));

    cb && cb();
  }

  _getPath(key) {
    return _path2.default.join((0, _classPrivateFieldLooseBase2.default)(this, _path)[_path], key);
  }

  _readKey(key) {
    try {
      return JSON.parse(_fs.default.readFileSync(this._getPath(key)).toString('utf-8'));
    } catch (error) {
      console.error(error);
    }

    return undefined;
  }

}

exports.FileStore = FileStore;