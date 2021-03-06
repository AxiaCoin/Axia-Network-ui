// Copyright 2017-2021 @axia-js/ui-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { CRYPTOS, CRYPTOS_ETH, CRYPTOS_LEDGER } from "./crypto.js";
import { ENDPOINT_DEFAULT, ENDPOINTS } from "./endpoints.js";
import { LEDGER_CONN, LEDGER_CONN_DEFAULT } from "./ledger.js";
import { PREFIX_DEFAULT, PREFIXES } from "./ss58.js";
import { ICON_DEFAULT, ICON_DEFAULT_HOST, ICONS, NOTIFICATION_DEFAULT, UIMODE_DEFAULT, UIMODES, UITHEME_DEFAULT, UITHEMES } from "./ui.js";
const CAMERA_DEFAULT = 'off';
const CAMERA = [{
  info: 'on',
  text: 'Allow camera access',
  value: 'on'
}, {
  info: 'off',
  text: 'Do not allow camera access',
  value: 'off'
}];
const LANGUAGE_DEFAULT = 'default';
const LOCKING_DEFAULT = 'session';
const LOCKING = [{
  info: 'session',
  text: 'Once per session',
  value: 'session'
}, {
  info: 'tx',
  text: 'On each transaction',
  value: 'tx'
}];
export { CAMERA_DEFAULT, CAMERA, CRYPTOS, CRYPTOS_ETH, CRYPTOS_LEDGER, ENDPOINT_DEFAULT, ENDPOINTS, ICON_DEFAULT, ICON_DEFAULT_HOST, ICONS, LANGUAGE_DEFAULT, LEDGER_CONN_DEFAULT, LEDGER_CONN, LOCKING_DEFAULT, LOCKING, NOTIFICATION_DEFAULT, PREFIX_DEFAULT, PREFIXES, UIMODE_DEFAULT, UIMODES, UITHEME_DEFAULT, UITHEMES };