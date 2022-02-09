// Copyright 2017-2021 @axia-js/ui-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { isAXIA } from "./type.js";
const LANGUAGE_DEFAULT = 'default';
const UIMODE_DEFAULT = !isAXIA && typeof window !== 'undefined' && window.location.host.includes('ui-light') ? 'light' : 'full';
const UIMODES = [{
  info: 'full',
  text: 'Fully featured',
  value: 'full'
}, {
  info: 'light',
  text: 'Basic features only',
  value: 'light'
}];
const UITHEME_DEFAULT = isAXIA ? 'axia' : 'axlib';
const UITHEMES = [{
  info: 'axia',
  text: 'AXIA',
  value: 'axia'
}, {
  info: 'axlib',
  text: 'Axlib',
  value: 'axlib'
}];
const ICON_DEFAULT = 'default';
const ICON_DEFAULT_HOST = isAXIA ? 'axia' : 'axlib';
const ICONS = [{
  info: 'default',
  text: 'Default for the connected node',
  value: 'default'
}, {
  info: 'axia',
  text: 'AXIA',
  value: 'axia'
}, {
  info: 'axlib',
  text: 'Axlib',
  value: 'axlib'
}, {
  info: 'beachball',
  text: 'Beachball',
  value: 'beachball'
}];
const NOTIFICATION_DEFAULT = 'popup';
export { ICON_DEFAULT, ICON_DEFAULT_HOST, ICONS, LANGUAGE_DEFAULT, NOTIFICATION_DEFAULT, UIMODE_DEFAULT, UIMODES, UITHEME_DEFAULT, UITHEMES };