"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.circle = circle;

var _svg = require("./svg.cjs");

// Copyright 2017-2021 @axia-js/ui-shared authors & contributors
// SPDX-License-Identifier: Apache-2.0
function circle(r, cx, cy) {
  const elem = (0, _svg.svg)('circle');
  elem.setAttributeNS('', 'cx', `${cx}`);
  elem.setAttributeNS('', 'cy', `${cy}`);
  elem.setAttributeNS('', 'r', `${r}`);
  return elem;
}