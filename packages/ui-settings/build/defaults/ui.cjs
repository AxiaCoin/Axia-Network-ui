"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UITHEMES = exports.UITHEME_DEFAULT = exports.UIMODES = exports.UIMODE_DEFAULT = exports.NOTIFICATION_DEFAULT = exports.LANGUAGE_DEFAULT = exports.ICONS = exports.ICON_DEFAULT_HOST = exports.ICON_DEFAULT = void 0;

var _type = require("./type.cjs");

// Copyright 2017-2021 @axia-js/ui-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
const LANGUAGE_DEFAULT = 'default';
exports.LANGUAGE_DEFAULT = LANGUAGE_DEFAULT;
const UIMODE_DEFAULT = !_type.isAXIA && typeof window !== 'undefined' && window.location.host.includes('ui-light') ? 'light' : 'full';
exports.UIMODE_DEFAULT = UIMODE_DEFAULT;
const UIMODES = [{
  info: 'full',
  text: 'Fully featured',
  value: 'full'
}, {
  info: 'light',
  text: 'Basic features only',
  value: 'light'
}];
exports.UIMODES = UIMODES;
const UITHEME_DEFAULT = _type.isAXIA ? 'axia' : 'axlib';
exports.UITHEME_DEFAULT = UITHEME_DEFAULT;
const UITHEMES = [{
  info: 'axia',
  text: 'AXIA',
  value: 'axia'
}, {
  info: 'axlib',
  text: 'Axlib',
  value: 'axlib'
}];
exports.UITHEMES = UITHEMES;
const ICON_DEFAULT = 'default';
exports.ICON_DEFAULT = ICON_DEFAULT;
const ICON_DEFAULT_HOST = _type.isAXIA ? 'axia' : 'axlib';
exports.ICON_DEFAULT_HOST = ICON_DEFAULT_HOST;
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
exports.ICONS = ICONS;
const NOTIFICATION_DEFAULT = 'popup';
exports.NOTIFICATION_DEFAULT = NOTIFICATION_DEFAULT;