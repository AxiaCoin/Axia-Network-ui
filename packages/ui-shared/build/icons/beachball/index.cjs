"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beachballIcon = beachballIcon;

var _circle = require("./shape/circle.cjs");

var _element = require("./svg/element.cjs");

var _colors = require("./colors.cjs");

var _container = require("./container.cjs");

var _defaults = require("./defaults.cjs");

var _seeder = require("./seeder.cjs");

// Copyright 2017-2021 @axia-js/ui-shared authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Copyright 2016 Dan Finlay
function beachballIcon(seed, {
  size = 256
}, className = '', style) {
  const seeder = (0, _seeder.seeder)(seed);
  const colorGen = (0, _colors.colors)(seeder);
  const outer = (0, _container.container)(size, 'white', className, style);
  const container = (0, _container.container)(size, colorGen());
  const svg = (0, _element.element)(size);
  outer.appendChild(container);
  container.appendChild(svg);

  for (let count = 0; count < _defaults.SHAPE_COUNT; count++) {
    const fill = colorGen();
    const shape = (0, _circle.circle)(seeder, fill, size, count);
    svg.appendChild(shape);
  }

  return outer;
}