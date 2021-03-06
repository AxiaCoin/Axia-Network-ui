"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.element = element;

var _svg = require("./svg.cjs");

// Copyright 2017-2021 @axia-js/ui-shared authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Copyright 2016 Dan Finlay
function element(size, type = 'svg', x = 0, y = 0) {
  const elem = (0, _svg.svg)(type);
  elem.setAttributeNS('', 'x', `${x}`);
  elem.setAttributeNS('', 'y', `${y}`);
  elem.setAttributeNS('', 'width', `${size}`);
  elem.setAttributeNS('', 'height', `${size}`);
  return elem;
}