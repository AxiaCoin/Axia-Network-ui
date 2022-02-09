// Copyright 2017-2021 @axia-js/ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

const base = require('@axia-js/dev/config/babel-config-cjs.cjs');

module.exports = Object.keys(base).reduce((config, key) => {
  config[key] = base[key];

  if (key === 'plugins') {
    config[key] = config[key].concat([
      'transform-vue-template'
    ]);
  }

  return config;
}, {});
