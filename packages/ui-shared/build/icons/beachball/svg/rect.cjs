"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rect = rect;

var _element = require("./element.cjs");

// Copyright 2017-2021 @axia-js/ui-shared authors & contributors
// SPDX-License-Identifier: Apache-2.0
function rect(size) {
  const elem = (0, _element.element)(size, 'rect');
  elem.setAttributeNS('', 'rx', `${size / 16}`);
  elem.setAttributeNS('', 'ry', `${size / 16}`);
  return elem;
}