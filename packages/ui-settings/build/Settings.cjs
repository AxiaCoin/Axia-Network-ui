"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.Settings = void 0;

var _classPrivateFieldLooseBase2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseBase"));

var _classPrivateFieldLooseKey2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseKey"));

var _eventemitter = _interopRequireDefault(require("eventemitter3"));

var _store = _interopRequireDefault(require("store"));

var _util = require("@axia-js/util");

var _index = require("./defaults/index.cjs");

// Copyright 2017-2021 @axia-js/ui-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
function withDefault(options, option, fallback) {
  const _option = option || fallback;

  return options.some(({
    value
  }) => value === _option) ? _option : fallback;
}

var _emitter = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("emitter");

var _apiType = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("apiType");

var _apiUrl = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("apiUrl");

var _camera = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("camera");

var _i18nLang = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("i18nLang");

var _icon = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("icon");

var _ledgerConn = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("ledgerConn");

var _locking = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("locking");

var _prefix = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("prefix");

var _uiMode = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("uiMode");

var _uiTheme = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("uiTheme");

var _notification = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("notification");

class Settings {
  // will become deprecated for supporting axlib connect light clients. apiType structure should be used instead
  constructor() {
    Object.defineProperty(this, _emitter, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _apiType, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _apiUrl, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _camera, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _i18nLang, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _icon, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _ledgerConn, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _locking, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _prefix, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _uiMode, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _uiTheme, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _notification, {
      writable: true,
      value: void 0
    });
    const settings = _store.default.get('settings') || {};
    (0, _classPrivateFieldLooseBase2.default)(this, _emitter)[_emitter] = new _eventemitter.default(); // will become deprecated for supporting axlib connect light clients. apiType structure should be used instead

    (0, _classPrivateFieldLooseBase2.default)(this, _apiUrl)[_apiUrl] = typeof settings.apiUrl === 'string' && settings.apiUrl || process.env.WS_URL || _index.ENDPOINT_DEFAULT.value;
    (0, _classPrivateFieldLooseBase2.default)(this, _apiType)[_apiType] = {
      param: (0, _classPrivateFieldLooseBase2.default)(this, _apiUrl)[_apiUrl],
      type: 'json-rpc'
    };
    (0, _classPrivateFieldLooseBase2.default)(this, _camera)[_camera] = withDefault(_index.CAMERA, settings.camera, _index.CAMERA_DEFAULT);
    (0, _classPrivateFieldLooseBase2.default)(this, _ledgerConn)[_ledgerConn] = withDefault(_index.LEDGER_CONN, settings.ledgerConn, _index.LEDGER_CONN_DEFAULT);
    (0, _classPrivateFieldLooseBase2.default)(this, _i18nLang)[_i18nLang] = settings.i18nLang || _index.LANGUAGE_DEFAULT;
    (0, _classPrivateFieldLooseBase2.default)(this, _icon)[_icon] = settings.icon || _index.ICON_DEFAULT;
    (0, _classPrivateFieldLooseBase2.default)(this, _locking)[_locking] = settings.locking || _index.LOCKING_DEFAULT;
    (0, _classPrivateFieldLooseBase2.default)(this, _prefix)[_prefix] = (0, _util.isUndefined)(settings.prefix) ? _index.PREFIX_DEFAULT : settings.prefix;
    (0, _classPrivateFieldLooseBase2.default)(this, _uiMode)[_uiMode] = settings.uiMode || _index.UIMODE_DEFAULT;
    (0, _classPrivateFieldLooseBase2.default)(this, _uiTheme)[_uiTheme] = settings.uiTheme || _index.UITHEME_DEFAULT;
    (0, _classPrivateFieldLooseBase2.default)(this, _notification)[_notification] = settings.notification || _index.NOTIFICATION_DEFAULT;
  }

  get camera() {
    return (0, _classPrivateFieldLooseBase2.default)(this, _camera)[_camera];
  }

  get apiType() {
    return (0, _classPrivateFieldLooseBase2.default)(this, _apiType)[_apiType];
  }

  get apiUrl() {
    return (0, _classPrivateFieldLooseBase2.default)(this, _apiUrl)[_apiUrl];
  }

  get i18nLang() {
    return (0, _classPrivateFieldLooseBase2.default)(this, _i18nLang)[_i18nLang];
  }

  get icon() {
    return (0, _classPrivateFieldLooseBase2.default)(this, _icon)[_icon];
  }

  get notification() {
    return (0, _classPrivateFieldLooseBase2.default)(this, _notification)[_notification];
  }

  get ledgerConn() {
    return (0, _classPrivateFieldLooseBase2.default)(this, _ledgerConn)[_ledgerConn];
  }

  get locking() {
    return (0, _classPrivateFieldLooseBase2.default)(this, _locking)[_locking];
  }

  get prefix() {
    return (0, _classPrivateFieldLooseBase2.default)(this, _prefix)[_prefix];
  }

  get uiMode() {
    return (0, _classPrivateFieldLooseBase2.default)(this, _uiMode)[_uiMode];
  }

  get uiTheme() {
    return (0, _classPrivateFieldLooseBase2.default)(this, _uiTheme)[_uiTheme];
  }

  get availableCamera() {
    return _index.CAMERA;
  }

  get availableCryptos() {
    return _index.CRYPTOS;
  }

  get availableCryptosEth() {
    return _index.CRYPTOS_ETH;
  }

  get availableCryptosLedger() {
    return _index.CRYPTOS_LEDGER;
  }

  get availableIcons() {
    return _index.ICONS;
  }

  get availableLedgerConn() {
    return _index.LEDGER_CONN;
  }

  get availableLocking() {
    return _index.LOCKING;
  }

  get availableNodes() {
    return _index.ENDPOINTS;
  }

  get availablePrefixes() {
    return _index.PREFIXES;
  }

  get availableUIModes() {
    return _index.UIMODES;
  }

  get availableUIThemes() {
    return _index.UITHEMES;
  }

  get() {
    return {
      apiType: (0, _classPrivateFieldLooseBase2.default)(this, _apiType)[_apiType],
      apiUrl: (0, _classPrivateFieldLooseBase2.default)(this, _apiUrl)[_apiUrl],
      camera: (0, _classPrivateFieldLooseBase2.default)(this, _camera)[_camera],
      i18nLang: (0, _classPrivateFieldLooseBase2.default)(this, _i18nLang)[_i18nLang],
      icon: (0, _classPrivateFieldLooseBase2.default)(this, _icon)[_icon],
      ledgerConn: (0, _classPrivateFieldLooseBase2.default)(this, _ledgerConn)[_ledgerConn],
      locking: (0, _classPrivateFieldLooseBase2.default)(this, _locking)[_locking],
      notification: (0, _classPrivateFieldLooseBase2.default)(this, _notification)[_notification],
      prefix: (0, _classPrivateFieldLooseBase2.default)(this, _prefix)[_prefix],
      uiMode: (0, _classPrivateFieldLooseBase2.default)(this, _uiMode)[_uiMode],
      uiTheme: (0, _classPrivateFieldLooseBase2.default)(this, _uiTheme)[_uiTheme]
    };
  }

  set(settings) {
    (0, _classPrivateFieldLooseBase2.default)(this, _apiType)[_apiType] = settings.apiType || (0, _classPrivateFieldLooseBase2.default)(this, _apiType)[_apiType];
    (0, _classPrivateFieldLooseBase2.default)(this, _apiUrl)[_apiUrl] = settings.apiUrl || (0, _classPrivateFieldLooseBase2.default)(this, _apiUrl)[_apiUrl];
    (0, _classPrivateFieldLooseBase2.default)(this, _camera)[_camera] = settings.camera || (0, _classPrivateFieldLooseBase2.default)(this, _camera)[_camera];
    (0, _classPrivateFieldLooseBase2.default)(this, _ledgerConn)[_ledgerConn] = settings.ledgerConn || (0, _classPrivateFieldLooseBase2.default)(this, _ledgerConn)[_ledgerConn];
    (0, _classPrivateFieldLooseBase2.default)(this, _i18nLang)[_i18nLang] = settings.i18nLang || (0, _classPrivateFieldLooseBase2.default)(this, _i18nLang)[_i18nLang];
    (0, _classPrivateFieldLooseBase2.default)(this, _icon)[_icon] = settings.icon || (0, _classPrivateFieldLooseBase2.default)(this, _icon)[_icon];
    (0, _classPrivateFieldLooseBase2.default)(this, _locking)[_locking] = settings.locking || (0, _classPrivateFieldLooseBase2.default)(this, _locking)[_locking];
    (0, _classPrivateFieldLooseBase2.default)(this, _notification)[_notification] = settings.notification || (0, _classPrivateFieldLooseBase2.default)(this, _notification)[_notification];
    (0, _classPrivateFieldLooseBase2.default)(this, _prefix)[_prefix] = (0, _util.isUndefined)(settings.prefix) ? (0, _classPrivateFieldLooseBase2.default)(this, _prefix)[_prefix] : settings.prefix;
    (0, _classPrivateFieldLooseBase2.default)(this, _uiMode)[_uiMode] = settings.uiMode || (0, _classPrivateFieldLooseBase2.default)(this, _uiMode)[_uiMode];
    (0, _classPrivateFieldLooseBase2.default)(this, _uiTheme)[_uiTheme] = settings.uiTheme || (0, _classPrivateFieldLooseBase2.default)(this, _uiTheme)[_uiTheme];
    const newValues = this.get();

    _store.default.set('settings', newValues);

    (0, _classPrivateFieldLooseBase2.default)(this, _emitter)[_emitter].emit('change', newValues);
  }

  on(type, cb) {
    (0, _classPrivateFieldLooseBase2.default)(this, _emitter)[_emitter].on(type, cb);
  }

}

exports.Settings = Settings;
const settings = new Settings();
exports.settings = settings;