// Copyright 2017-2021 @axia-js/ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import path from 'path';

import { createBundle } from '@axia-js/dev/config/rollup';

const pkgs = [
  '@axia-js/react-identicon',
  '@axia-js/react-qr',
  '@axia-js/ui-keyring',
  '@axia-js/ui-settings',
  '@axia-js/vue-identicon'
];

const external = [
  ...pkgs,
  '@axia-js/hw-ledger',
  '@axia-js/keyring',
  '@axia-js/util',
  '@axia-js/util-crypto',
  'react',
  'react-dom',
  'vue',
  'vue-router'
];

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  vue: 'Vue',
  'vue-router': 'VueRouter'
};

const entries = ['ui-shared'].reduce((all, p) => ({
  ...all,
  [`@axia-js/${p}`]: path.resolve(process.cwd(), `packages/${p}/build`)
}), {
  // re-exported in @axia-js/util-crypto, map directly
  '@axia-js/networks': '@axia-js/util-crypto'
});

const overrides = {};

export default pkgs.map((pkg) => {
  const override = (overrides[pkg] || {});

  return createBundle({
    external,
    globals,
    pkg,
    ...override,
    entries: {
      ...entries,
      ...(override.entries || {})
    }
  });
});
