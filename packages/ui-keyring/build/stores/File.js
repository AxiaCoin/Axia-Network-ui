import _classPrivateFieldLooseBase from "@babel/runtime/helpers/esm/classPrivateFieldLooseBase";
import _classPrivateFieldLooseKey from "@babel/runtime/helpers/esm/classPrivateFieldLooseKey";
// Copyright 2017-2021 @axia-js/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0
import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import { assert } from '@axia-js/util'; // NOTE untested and unused by any known apps, probably broken in various mysterious ways

var _path = /*#__PURE__*/_classPrivateFieldLooseKey("path");

export class FileStore {
  constructor(path) {
    Object.defineProperty(this, _path, {
      writable: true,
      value: void 0
    });

    if (!fs.existsSync(path)) {
      mkdirp.sync(path);
    }

    _classPrivateFieldLooseBase(this, _path)[_path] = path;
  }

  all(cb) {
    fs.readdirSync(_classPrivateFieldLooseBase(this, _path)[_path]).filter(key => !['.', '..', '.DS_Store'].includes(key)).forEach(key => {
      const value = this._readKey(key);

      (value === null || value === void 0 ? void 0 : value.address) && cb(key, value);
    });
  }

  get(key, cb) {
    const value = this._readKey(key);

    assert(value === null || value === void 0 ? void 0 : value.address, `Invalid JSON found for ${key}`);
    cb(value);
  }

  remove(key, cb) {
    fs.unlinkSync(this._getPath(key));
    cb && cb();
  }

  set(key, value, cb) {
    fs.writeFileSync(this._getPath(key), Buffer.from(JSON.stringify(value), 'utf-8'));
    cb && cb();
  }

  _getPath(key) {
    return path.join(_classPrivateFieldLooseBase(this, _path)[_path], key);
  }

  _readKey(key) {
    try {
      return JSON.parse(fs.readFileSync(this._getPath(key)).toString('utf-8'));
    } catch (error) {
      console.error(error);
    }

    return undefined;
  }

}