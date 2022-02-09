"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAXIA = void 0;
// Copyright 2017-2021 @axia-js/ui-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
// matches https://axia.js.org & https://*.axia.io
const isAXIA = typeof window !== 'undefined' && window.location.host.includes('axia');
exports.isAXIA = isAXIA;