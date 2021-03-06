"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.circle = circle;

var _defaults = require("../defaults.cjs");

var _circle = require("../svg/circle.cjs");

// Copyright 2017-2021 @axia-js/ui-shared authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Copyright 2016 Dan Finlay
function circle(seeder, fill, diameter, count) {
  const center = diameter / 2;
  const angle = seeder() * 360;
  const radius = (_defaults.SHAPE_COUNT - count) / _defaults.SHAPE_COUNT * (diameter / 2) + diameter / 8 * seeder();

  const offset = diameter / 4 * (seeder() + (count + 1) / _defaults.SHAPE_COUNT);

  const cx = offset * Math.sin(angle) + center;
  const cy = offset * Math.cos(angle) + center;
  const svg = (0, _circle.circle)(radius, cx, cy);
  svg.setAttributeNS('', 'fill', fill);
  return svg;
}