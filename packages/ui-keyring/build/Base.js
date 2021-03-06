import _classPrivateFieldLooseBase from "@babel/runtime/helpers/esm/classPrivateFieldLooseBase";
import _classPrivateFieldLooseKey from "@babel/runtime/helpers/esm/classPrivateFieldLooseKey";
// Copyright 2017-2021 @axia-js/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { createTestKeyring } from '@axia-js/keyring';
import { isBoolean, isNumber, isString } from '@axia-js/util';
import { accounts } from "./observable/accounts.js";
import { addresses } from "./observable/addresses.js";
import { contracts } from "./observable/contracts.js";
import { env } from "./observable/env.js";
import { BrowserStore } from "./stores/Browser.js"; // direct import (skip index with all)

var _accounts = /*#__PURE__*/_classPrivateFieldLooseKey("accounts");

var _addresses = /*#__PURE__*/_classPrivateFieldLooseKey("addresses");

var _contracts = /*#__PURE__*/_classPrivateFieldLooseKey("contracts");

var _keyring = /*#__PURE__*/_classPrivateFieldLooseKey("keyring");

export class Base {
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

    _classPrivateFieldLooseBase(this, _accounts)[_accounts] = accounts;
    _classPrivateFieldLooseBase(this, _addresses)[_addresses] = addresses;
    _classPrivateFieldLooseBase(this, _contracts)[_contracts] = contracts;
    this._store = new BrowserStore();
  }

  get accounts() {
    return _classPrivateFieldLooseBase(this, _accounts)[_accounts];
  }

  get addresses() {
    return _classPrivateFieldLooseBase(this, _addresses)[_addresses];
  }

  get contracts() {
    return _classPrivateFieldLooseBase(this, _contracts)[_contracts];
  }

  get keyring() {
    if (_classPrivateFieldLooseBase(this, _keyring)[_keyring]) {
      return _classPrivateFieldLooseBase(this, _keyring)[_keyring];
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
    return this.keyring.getPairs().filter(pair => env.isDevelopment() || pair.meta.isTesting !== true);
  }

  isAvailable(_address) {
    const accountsValue = this.accounts.subject.getValue();
    const addressesValue = this.addresses.subject.getValue();
    const contractsValue = this.contracts.subject.getValue();
    const address = isString(_address) ? _address : this.encodeAddress(_address);
    return !accountsValue[address] && !addressesValue[address] && !contractsValue[address];
  }

  isPassValid(password) {
    return password.length > 0;
  }

  setSS58Format(ss58Format) {
    if (_classPrivateFieldLooseBase(this, _keyring)[_keyring] && isNumber(ss58Format)) {
      _classPrivateFieldLooseBase(this, _keyring)[_keyring].setSS58Format(ss58Format);
    }
  }

  setDevMode(isDevelopment) {
    env.set(isDevelopment);
  }

  initKeyring(options) {
    const keyring = createTestKeyring(options, true);

    if (isBoolean(options.isDevelopment)) {
      this.setDevMode(options.isDevelopment);
    }

    _classPrivateFieldLooseBase(this, _keyring)[_keyring] = keyring;
    this._genesisHash = options.genesisHash && (isString(options.genesisHash) ? options.genesisHash.toString() : options.genesisHash.toHex());
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