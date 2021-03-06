import _classPrivateFieldLooseBase from "@babel/runtime/helpers/esm/classPrivateFieldLooseBase";
import _classPrivateFieldLooseKey from "@babel/runtime/helpers/esm/classPrivateFieldLooseKey";
// Copyright 2017-2021 @axia-js/ui-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
import EventEmitter from 'eventemitter3';
import store from 'store';
import { isUndefined } from '@axia-js/util';
import { CAMERA, CAMERA_DEFAULT, CRYPTOS, CRYPTOS_ETH, CRYPTOS_LEDGER, ENDPOINT_DEFAULT, ENDPOINTS, ICON_DEFAULT, ICONS, LANGUAGE_DEFAULT, LEDGER_CONN, LEDGER_CONN_DEFAULT, LOCKING, LOCKING_DEFAULT, NOTIFICATION_DEFAULT, PREFIX_DEFAULT, PREFIXES, UIMODE_DEFAULT, UIMODES, UITHEME_DEFAULT, UITHEMES } from "./defaults/index.js";

function withDefault(options, option, fallback) {
  const _option = option || fallback;

  return options.some(({
    value
  }) => value === _option) ? _option : fallback;
}

var _emitter = /*#__PURE__*/_classPrivateFieldLooseKey("emitter");

var _apiType = /*#__PURE__*/_classPrivateFieldLooseKey("apiType");

var _apiUrl = /*#__PURE__*/_classPrivateFieldLooseKey("apiUrl");

var _camera = /*#__PURE__*/_classPrivateFieldLooseKey("camera");

var _i18nLang = /*#__PURE__*/_classPrivateFieldLooseKey("i18nLang");

var _icon = /*#__PURE__*/_classPrivateFieldLooseKey("icon");

var _ledgerConn = /*#__PURE__*/_classPrivateFieldLooseKey("ledgerConn");

var _locking = /*#__PURE__*/_classPrivateFieldLooseKey("locking");

var _prefix = /*#__PURE__*/_classPrivateFieldLooseKey("prefix");

var _uiMode = /*#__PURE__*/_classPrivateFieldLooseKey("uiMode");

var _uiTheme = /*#__PURE__*/_classPrivateFieldLooseKey("uiTheme");

var _notification = /*#__PURE__*/_classPrivateFieldLooseKey("notification");

export class Settings {
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
    const settings = store.get('settings') || {};
    _classPrivateFieldLooseBase(this, _emitter)[_emitter] = new EventEmitter(); // will become deprecated for supporting axlib connect light clients. apiType structure should be used instead

    _classPrivateFieldLooseBase(this, _apiUrl)[_apiUrl] = typeof settings.apiUrl === 'string' && settings.apiUrl || process.env.WS_URL || ENDPOINT_DEFAULT.value;
    _classPrivateFieldLooseBase(this, _apiType)[_apiType] = {
      param: _classPrivateFieldLooseBase(this, _apiUrl)[_apiUrl],
      type: 'json-rpc'
    };
    _classPrivateFieldLooseBase(this, _camera)[_camera] = withDefault(CAMERA, settings.camera, CAMERA_DEFAULT);
    _classPrivateFieldLooseBase(this, _ledgerConn)[_ledgerConn] = withDefault(LEDGER_CONN, settings.ledgerConn, LEDGER_CONN_DEFAULT);
    _classPrivateFieldLooseBase(this, _i18nLang)[_i18nLang] = settings.i18nLang || LANGUAGE_DEFAULT;
    _classPrivateFieldLooseBase(this, _icon)[_icon] = settings.icon || ICON_DEFAULT;
    _classPrivateFieldLooseBase(this, _locking)[_locking] = settings.locking || LOCKING_DEFAULT;
    _classPrivateFieldLooseBase(this, _prefix)[_prefix] = isUndefined(settings.prefix) ? PREFIX_DEFAULT : settings.prefix;
    _classPrivateFieldLooseBase(this, _uiMode)[_uiMode] = settings.uiMode || UIMODE_DEFAULT;
    _classPrivateFieldLooseBase(this, _uiTheme)[_uiTheme] = settings.uiTheme || UITHEME_DEFAULT;
    _classPrivateFieldLooseBase(this, _notification)[_notification] = settings.notification || NOTIFICATION_DEFAULT;
  }

  get camera() {
    return _classPrivateFieldLooseBase(this, _camera)[_camera];
  }

  get apiType() {
    return _classPrivateFieldLooseBase(this, _apiType)[_apiType];
  }

  get apiUrl() {
    return _classPrivateFieldLooseBase(this, _apiUrl)[_apiUrl];
  }

  get i18nLang() {
    return _classPrivateFieldLooseBase(this, _i18nLang)[_i18nLang];
  }

  get icon() {
    return _classPrivateFieldLooseBase(this, _icon)[_icon];
  }

  get notification() {
    return _classPrivateFieldLooseBase(this, _notification)[_notification];
  }

  get ledgerConn() {
    return _classPrivateFieldLooseBase(this, _ledgerConn)[_ledgerConn];
  }

  get locking() {
    return _classPrivateFieldLooseBase(this, _locking)[_locking];
  }

  get prefix() {
    return _classPrivateFieldLooseBase(this, _prefix)[_prefix];
  }

  get uiMode() {
    return _classPrivateFieldLooseBase(this, _uiMode)[_uiMode];
  }

  get uiTheme() {
    return _classPrivateFieldLooseBase(this, _uiTheme)[_uiTheme];
  }

  get availableCamera() {
    return CAMERA;
  }

  get availableCryptos() {
    return CRYPTOS;
  }

  get availableCryptosEth() {
    return CRYPTOS_ETH;
  }

  get availableCryptosLedger() {
    return CRYPTOS_LEDGER;
  }

  get availableIcons() {
    return ICONS;
  }

  get availableLedgerConn() {
    return LEDGER_CONN;
  }

  get availableLocking() {
    return LOCKING;
  }

  get availableNodes() {
    return ENDPOINTS;
  }

  get availablePrefixes() {
    return PREFIXES;
  }

  get availableUIModes() {
    return UIMODES;
  }

  get availableUIThemes() {
    return UITHEMES;
  }

  get() {
    return {
      apiType: _classPrivateFieldLooseBase(this, _apiType)[_apiType],
      apiUrl: _classPrivateFieldLooseBase(this, _apiUrl)[_apiUrl],
      camera: _classPrivateFieldLooseBase(this, _camera)[_camera],
      i18nLang: _classPrivateFieldLooseBase(this, _i18nLang)[_i18nLang],
      icon: _classPrivateFieldLooseBase(this, _icon)[_icon],
      ledgerConn: _classPrivateFieldLooseBase(this, _ledgerConn)[_ledgerConn],
      locking: _classPrivateFieldLooseBase(this, _locking)[_locking],
      notification: _classPrivateFieldLooseBase(this, _notification)[_notification],
      prefix: _classPrivateFieldLooseBase(this, _prefix)[_prefix],
      uiMode: _classPrivateFieldLooseBase(this, _uiMode)[_uiMode],
      uiTheme: _classPrivateFieldLooseBase(this, _uiTheme)[_uiTheme]
    };
  }

  set(settings) {
    _classPrivateFieldLooseBase(this, _apiType)[_apiType] = settings.apiType || _classPrivateFieldLooseBase(this, _apiType)[_apiType];
    _classPrivateFieldLooseBase(this, _apiUrl)[_apiUrl] = settings.apiUrl || _classPrivateFieldLooseBase(this, _apiUrl)[_apiUrl];
    _classPrivateFieldLooseBase(this, _camera)[_camera] = settings.camera || _classPrivateFieldLooseBase(this, _camera)[_camera];
    _classPrivateFieldLooseBase(this, _ledgerConn)[_ledgerConn] = settings.ledgerConn || _classPrivateFieldLooseBase(this, _ledgerConn)[_ledgerConn];
    _classPrivateFieldLooseBase(this, _i18nLang)[_i18nLang] = settings.i18nLang || _classPrivateFieldLooseBase(this, _i18nLang)[_i18nLang];
    _classPrivateFieldLooseBase(this, _icon)[_icon] = settings.icon || _classPrivateFieldLooseBase(this, _icon)[_icon];
    _classPrivateFieldLooseBase(this, _locking)[_locking] = settings.locking || _classPrivateFieldLooseBase(this, _locking)[_locking];
    _classPrivateFieldLooseBase(this, _notification)[_notification] = settings.notification || _classPrivateFieldLooseBase(this, _notification)[_notification];
    _classPrivateFieldLooseBase(this, _prefix)[_prefix] = isUndefined(settings.prefix) ? _classPrivateFieldLooseBase(this, _prefix)[_prefix] : settings.prefix;
    _classPrivateFieldLooseBase(this, _uiMode)[_uiMode] = settings.uiMode || _classPrivateFieldLooseBase(this, _uiMode)[_uiMode];
    _classPrivateFieldLooseBase(this, _uiTheme)[_uiTheme] = settings.uiTheme || _classPrivateFieldLooseBase(this, _uiTheme)[_uiTheme];
    const newValues = this.get();
    store.set('settings', newValues);

    _classPrivateFieldLooseBase(this, _emitter)[_emitter].emit('change', newValues);
  }

  on(type, cb) {
    _classPrivateFieldLooseBase(this, _emitter)[_emitter].on(type, cb);
  }

}
export const settings = new Settings();