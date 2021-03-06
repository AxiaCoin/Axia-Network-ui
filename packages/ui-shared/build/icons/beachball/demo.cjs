"use strict";

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

var _index = require("./index.cjs");

// Copyright 2017-2021 @axia-js/ui-shared authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Copyright 2016 Dan Finlay
const element = document.getElementById('demo');

function generateIcon(seed = (0, _utilCrypto.encodeAddress)((0, _utilCrypto.randomAsU8a)(32))) {
  const start = Date.now();

  if ((0, _util.isNull)(element)) {
    throw new Error('Unable to find #demo element');
  }

  element.appendChild((0, _index.beachballIcon)(seed, {
    isAlternative: false,
    size: 100
  }, 'padded'));
  console.log(`Icon generated in ${Date.now() - start}ms`);
}

function generateIcons(count = 512) {
  generateIcon((0, _utilCrypto.encodeAddress)(new Uint8Array(32)));

  for (let index = 1; index < count; index++) {
    generateIcon();
  }
}

generateIcons();