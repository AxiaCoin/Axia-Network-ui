"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Base = void 0;

var _classPrivateFieldLooseBase2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseBase"));

var _classPrivateFieldLooseKey2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseKey"));

var _keyring2 = require("@axia-js/keyring");

var _util = require("@axia-js/util");

var _accounts2 = require("./observable/accounts.cjs");

var _addresses2 = require("./observable/addresses.cjs");

var _contracts2 = require("./observable/contracts.cjs");

var _env = require("./observable/env.cjs");

var _Browser = require("./stores/Browser.cjs");

// Copyright 2017-2021 @axia-js/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0
var _accounts = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("accounts");

var _addresses = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("addresses");

var _contracts = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("contracts");

var _keyring = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("keyring");

// direct import (skip index with all)
class Base {
  constructor() {
    Object.defineProperty(this, _accounts, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _addresses, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _contracts, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _keyring, {
      writable: true,
      value: void 0
    });
    this._store = void 0;
    this._genesisHash = void 0;

    this.decodeAddress = (key, ignoreChecksum, ss58Format) => {
      return this.keyring.decodeAddress(key, ignoreChecksum, ss58Format);
    };

    this.encodeAddress = (key, ss58Format) => {
      return this.keyring.encodeAddress(key, ss58Format);
    };

    (0, _classPrivateFieldLooseBase2.default)(this, _accounts)[_accounts] = _accounts2.accounts;
    (0, _classPrivateFieldLooseBase2.default)(this, _addresses)[_addresses] = _addresses2.addresses;
    (0, _classPrivateFieldLooseBase2.default)(this, _contracts)[_contracts] = _contracts2.contracts;
    this._store = new _Browser.BrowserStore();
  }

  get accounts() {
    return (0, _classPrivateFieldLooseBase2.default)(this, _accounts)[_accounts];
  }

  get addresses() {
    return (0, _classPrivateFieldLooseBase2.default)(this, _addresses)[_addresses];
  }

  get contracts() {
    return (0, _classPrivateFieldLooseBase2.default)(this, _contracts)[_contracts];
  }

  get keyring() {
    if ((0, _classPrivateFieldLooseBase2.default)(this, _keyring)[_keyring]) {
      return (0, _classPrivateFieldLooseBase2.default)(this, _keyring)[_keyring];
    }

    throw new Error('Keyring should be initialised via \'loadAll\' before use');
  }

  get genesisHash() {
    return this._genesisHash;
  }

  getPair(address) {
    return this.keyring.getPair(address);
  }

  getPairs() {
    return this.keyring.getPairs().filter(pair => _env.env.isDevelopment() || pair.meta.isTesting !== true);
  }

  isAvailable(_address) {
    const accountsValue = this.accounts.subject.getValue();
    const addressesValue = this.addresses.subject.getValue();
    const contractsValue = this.contracts.subject.getValue();
    const address = (0, _util.isString)(_address) ? _address : this.encodeAddress(_address);
    return !accountsValue[address] && !addressesValue[address] && !contractsValue[address];
  }

  isPassValid(password) {
    return password.length > 0;
  }

  setSS58Format(ss58Format) {
    if ((0, _classPrivateFieldLooseBase2.default)(this, _keyring)[_keyring] && (0, _util.isNumber)(ss58Format)) {
      (0, _classPrivateFieldLooseBase2.default)(this, _keyring)[_keyring].setSS58Format(ss58Format);
    }
  }

  setDevMode(isDevelopment) {
    _env.env.set(isDevelopment);
  }

  initKeyring(options) {
    const keyring = (0, _keyring2.createTestKeyring)(options, true);

    if ((0, _util.isBoolean)(options.isDevelopment)) {
      this.setDevMode(options.isDevelopment);
    }

    (0, _classPrivateFieldLooseBase2.default)(this, _keyring)[_keyring] = keyring;
    this._genesisHash = options.genesisHash && ((0, _util.isString)(options.genesisHash) ? options.genesisHash.toString() : options.genesisHash.toHex());
    this._store = options.store || this._store;
    this.addAccountPairs();
  }

  addAccountPairs() {
    this.keyring.getPairs().forEach(({
      address,
      meta
    }) => {
      this.accounts.add(this._store, address, {
        address,
        meta
      });
    });
  }

  addTimestamp(pair) {
    if (!pair.meta.whenCreated) {
      pair.setMeta({
        whenCreated: Date.now()
      });
    }
  }

}

exports.Base = Base;