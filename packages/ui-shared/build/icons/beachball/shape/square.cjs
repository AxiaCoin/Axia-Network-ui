"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.square = square;

var _defaults = require("../defaults.cjs");

var _rect = require("../svg/rect.cjs");

// Copyright 2017-2021 @axia-js/ui-shared authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Copyright 2016 Dan Finlay
function square(seeder, fill, diameter, count) {
  const center = diameter / 2;
  const svg = (0, _rect.rect)(diameter);
  const firstRot = seeder();
  const angle = Math.PI * 2 * firstRot;
  const scale = count / _defaults.SHAPE_COUNT;
  const velocity = diameter / _defaults.SHAPE_COUNT * seeder() + scale * diameter;
  const tx = (Math.cos(angle) * velocity).toFixed(3);
  const ty = (Math.sin(angle) * velocity).toFixed(3);
  const rot = (firstRot * 360 + seeder() * 180).toFixed(1);
  svg.setAttributeNS('', 'transform', `translate(${tx} ${ty}) rotate(${rot} ${center} ${center})`);
  svg.setAttributeNS('', 'fill', fill);
  return svg;
}