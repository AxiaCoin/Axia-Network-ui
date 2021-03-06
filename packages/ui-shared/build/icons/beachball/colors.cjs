"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colors = colors;

var _color = _interopRequireDefault(require("color"));

var _defaults = require("./defaults.cjs");

// Copyright 2017-2021 @axia-js/ui-shared authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Copyright 2016 Dan Finlay
const WOBBLE = 30;

function colors(seeder) {
  const amount = seeder() * WOBBLE - WOBBLE / 2;

  const all = _defaults.COLORS.map(hex => (0, _color.default)(hex).rotate(amount));

  return (alpha = 1) => {
    const index = Math.floor(all.length * seeder());
    return all.splice(index, 1)[0].alpha(alpha).string();
  };
}