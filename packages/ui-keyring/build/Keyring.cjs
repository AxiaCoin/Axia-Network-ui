"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Keyring = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classPrivateFieldLooseBase2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseBase"));

var _classPrivateFieldLooseKey2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseKey"));

var _keyring = require("@axia-js/keyring");

var _uiSettings = require("@axia-js/ui-settings");

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

var _env = require("./observable/env.cjs");

var _Base = require("./Base.cjs");

var _defaults = require("./defaults.cjs");

var _index = require("./options/index.cjs");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const RECENT_EXPIRY = 24 * 60 * 60; // No accounts (or test accounts) should be loaded until after the chain determination.
// Chain determination occurs outside of Keyring. Loading `keyring.loadAll({ type: 'ed25519' | 'sr25519' })` is triggered
// from the API after the chain is received

var _stores = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("stores");

class Keyring extends _Base.Base {
  constructor(...args) {
    super(...args);
    this.keyringOption = new _index.KeyringOption();
    Object.defineProperty(this, _stores, {
      writable: true,
      value: {
        account: () => this.accounts,
        address: () => this.addresses,
        contract: () => this.contracts
      }
    });
  }

  addExternal(address, meta = {}) {
    const pair = this.keyring.addFromAddress(address, _objectSpread(_objectSpread({}, meta), {}, {
      isExternal: true
    }), null);
    return {
      json: this.saveAccount(pair),
      pair
    };
  }

  addHardware(address, hardwareType, meta = {}) {
    return this.addExternal(address, _objectSpread(_objectSpread({}, meta), {}, {
      hardwareType,
      isHardware: true
    }));
  }

  addMultisig(addresses, threshold, meta = {}) {
    const address = (0, _utilCrypto.createKeyMulti)(addresses, threshold); // we could use `sortAddresses`, but rather use internal encode/decode so we are 100%

    const who = (0, _util.u8aSorted)(addresses.map(who => this.decodeAddress(who))).map(who => this.encodeAddress(who));
    return this.addExternal(address, _objectSpread(_objectSpread({}, meta), {}, {
      isMultisig: true,
      threshold: (0, _util.bnToBn)(threshold).toNumber(),
      who
    }));
  }

  addPair(pair, password) {
    this.keyring.addPair(pair);
    return {
      json: this.saveAccount(pair, password),
      pair
    };
  }

  addUri(suri, password, meta = {}, type) {
    const pair = this.keyring.addFromUri(suri, meta, type);
    return {
      json: this.saveAccount(pair, password),
      pair
    };
  }

  backupAccount(pair, password) {
    if (!pair.isLocked) {
      pair.lock();
    }

    pair.decodePkcs8(password);
    return pair.toJson(password);
  }

  async backupAccounts(addresses, password) {
    const accountPromises = addresses.map(address => {
      return new Promise(resolve => {
        this._store.get((0, _defaults.accountKey)(address), resolve);
      });
    });
    const accounts = await Promise.all(accountPromises);
    return _objectSpread(_objectSpread({}, (0, _utilCrypto.jsonEncrypt)((0, _util.stringToU8a)(JSON.stringify(accounts)), ['batch-pkcs8'], password)), {}, {
      accounts: accounts.map(account => ({
        address: account.address,
        meta: account.meta
      }))
    });
  }

  createFromJson(json, meta = {}) {
    return this.keyring.createFromJson(_objectSpread(_objectSpread({}, json), {}, {
      meta: _objectSpread(_objectSpread({}, json.meta || {}), {}, {
        meta
      })
    }));
  }

  createFromUri(suri, meta = {}, type) {
    return this.keyring.createFromUri(suri, meta, type);
  }

  encryptAccount(pair, password) {
    const json = pair.toJson(password);
    json.meta.whenEdited = Date.now();
    this.keyring.addFromJson(json);
    this.accounts.add(this._store, pair.address, json, pair.type);
  }

  forgetAccount(address) {
    this.keyring.removePair(address);
    this.accounts.remove(this._store, address);
  }

  forgetAddress(address) {
    this.addresses.remove(this._store, address);
  }

  forgetContract(address) {
    this.contracts.remove(this._store, address);
  }

  getAccount(address) {
    return this.getAddress(address, 'account');
  }

  getAccounts() {
    const available = this.accounts.subject.getValue();
    return Object.keys(available).map(address => this.getAddress(address, 'account')).filter(account => _env.env.isDevelopment() || account.meta.isTesting !== true);
  }

  getAddress(_address, type = null) {
    const address = (0, _util.isString)(_address) ? _address : this.encodeAddress(_address);
    const publicKey = this.decodeAddress(address);
    const stores = type ? [(0, _classPrivateFieldLooseBase2.default)(this, _stores)[_stores][type]] : Object.values((0, _classPrivateFieldLooseBase2.default)(this, _stores)[_stores]);
    const info = stores.reduce((lastInfo, store) => store().subject.getValue()[address] || lastInfo, undefined);
    return info && {
      address,
      meta: info.json.meta,
      publicKey
    };
  }

  getAddresses() {
    const available = this.addresses.subject.getValue();
    return Object.keys(available).map(address => this.getAddress(address));
  }

  getContract(address) {
    return this.getAddress(address, 'contract');
  }

  getContracts() {
    const available = this.contracts.subject.getValue();
    return Object.entries(available).filter(([, {
      json: {
        meta: {
          contract
        }
      }
    }]) => !!contract && contract.genesisHash === this.genesisHash).map(([address]) => this.getContract(address));
  }

  rewriteKey(json, key, hexAddr, creator) {
    if (hexAddr.substr(0, 2) === '0x') {
      return;
    }

    this._store.remove(key);

    this._store.set(creator(hexAddr), json);
  }

  loadAccount(json, key) {
    if (!json.meta.isTesting && json.encoded) {
      // FIXME Just for the transition period (ignoreChecksum)
      const pair = this.keyring.addFromJson(json, true);
      this.accounts.add(this._store, pair.address, json, pair.type);
    }

    const [, hexAddr] = key.split(':');
    this.rewriteKey(json, key, hexAddr.trim(), _defaults.accountKey);
  }

  loadAddress(json, key) {
    const {
      isRecent,
      whenCreated = 0
    } = json.meta;

    if (isRecent && Date.now() - whenCreated > RECENT_EXPIRY) {
      this._store.remove(key);

      return;
    } // We assume anything hex that is not 32bytes (64 + 2 bytes hex) is an Ethereum-like address
    // (this caters for both H160 addresses as well as full or compressed publicKeys) - in the case
    // of both ecdsa and ethereum, we keep it as-is


    const address = (0, _util.isHex)(json.address) && json.address.length !== 66 ? json.address : this.encodeAddress((0, _util.isHex)(json.address) ? (0, _util.hexToU8a)(json.address) // FIXME Just for the transition period (ignoreChecksum)
    : this.decodeAddress(json.address, true));
    const [, hexAddr] = key.split(':');
    this.addresses.add(this._store, address, json);
    this.rewriteKey(json, key, hexAddr, _defaults.addressKey);
  }

  loadContract(json, key) {
    const address = this.encodeAddress(this.decodeAddress(json.address));
    const [, hexAddr] = key.split(':'); // move genesisHash to top-level (TODO Remove from contracts section?)

    json.meta.genesisHash = json.meta.genesisHash || json.meta.contract && json.meta.contract.genesisHash;
    this.contracts.add(this._store, address, json);
    this.rewriteKey(json, key, hexAddr, _defaults.contractKey);
  }

  loadInjected(address, meta, type) {
    const json = {
      address,
      meta: _objectSpread(_objectSpread({}, meta), {}, {
        isInjected: true
      })
    };
    const pair = this.keyring.addFromAddress(address, json.meta, null, type);
    this.accounts.add(this._store, pair.address, json, pair.type);
  }

  allowGenesis(json) {
    if (json && json.meta && this.genesisHash) {
      const hashes = Object.values(_uiSettings.chains).find(hashes => hashes.includes(this.genesisHash || '')) || [this.genesisHash];

      if (json.meta.genesisHash) {
        return hashes.includes(json.meta.genesisHash);
      } else if (json.meta.contract) {
        return hashes.includes(json.meta.contract.genesisHash);
      }
    }

    return true;
  }

  loadAll(options, injected = []) {
    super.initKeyring(options);

    this._store.all((key, json) => {
      if (options.filter ? options.filter(json) : true) {
        try {
          if (this.allowGenesis(json)) {
            if (_defaults.accountRegex.test(key)) {
              this.loadAccount(json, key);
            } else if (_defaults.addressRegex.test(key)) {
              this.loadAddress(json, key);
            } else if (_defaults.contractRegex.test(key)) {
              this.loadContract(json, key);
            }
          }
        } catch (error) {// ignore
        }
      }
    });

    injected.forEach(account => {
      if (this.allowGenesis(account)) {
        try {
          this.loadInjected(account.address, account.meta, account.type);
        } catch (error) {// ignore
        }
      }
    });
    this.keyringOption.init(this);
  }

  restoreAccount(json, password) {
    const cryptoType = Array.isArray(json.encoding.content) ? json.encoding.content[1] : 'ed25519';
    const encType = Array.isArray(json.encoding.type) ? json.encoding.type : [json.encoding.type];
    const pair = (0, _keyring.createPair)({
      toSS58: this.encodeAddress,
      type: cryptoType
    }, {
      publicKey: this.decodeAddress(json.address, true)
    }, json.meta, (0, _util.isHex)(json.encoded) ? (0, _util.hexToU8a)(json.encoded) : (0, _utilCrypto.base64Decode)(json.encoded), encType); // unlock, save account and then lock (locking cleans secretKey, so needs to be last)

    pair.decodePkcs8(password);
    this.addPair(pair, password);
    pair.lock();
    return pair;
  }

  restoreAccounts(json, password) {
    const accounts = JSON.parse((0, _util.u8aToString)((0, _utilCrypto.jsonDecrypt)(json, password)));
    accounts.forEach(account => {
      this.loadAccount(account, (0, _defaults.accountKey)(account.address));
    });
  }

  saveAccount(pair, password) {
    this.addTimestamp(pair);
    const json = pair.toJson(password);
    this.keyring.addFromJson(json);
    this.accounts.add(this._store, pair.address, json, pair.type);
    return json;
  }

  saveAccountMeta(pair, meta) {
    const address = pair.address;

    this._store.get((0, _defaults.accountKey)(address), json => {
      pair.setMeta(meta);
      json.meta = pair.meta;
      this.accounts.add(this._store, address, json, pair.type);
    });
  }

  saveAddress(address, meta, type = 'address') {
    const available = this.addresses.subject.getValue();
    const json = available[address] && available[address].json || {
      address,
      meta: {
        isRecent: undefined,
        whenCreated: Date.now()
      }
    };
    Object.keys(meta).forEach(key => {
      json.meta[key] = meta[key];
    });
    delete json.meta.isRecent;

    (0, _classPrivateFieldLooseBase2.default)(this, _stores)[_stores][type]().add(this._store, address, json);

    return json;
  }

  saveContract(address, meta) {
    return this.saveAddress(address, meta, 'contract');
  }

  saveRecent(address) {
    const available = this.addresses.subject.getValue();

    if (!available[address]) {
      this.addresses.add(this._store, address, {
        address,
        meta: {
          genesisHash: this.genesisHash,
          isRecent: true,
          whenCreated: Date.now()
        }
      });
    }

    return this.addresses.subject.getValue()[address];
  }

}

exports.Keyring = Keyring;