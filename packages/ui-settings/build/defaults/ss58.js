// Copyright 2017-2021 @axia-js/ui-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { availableNetworks } from '@axia-js/networks';
export const PREFIX_DEFAULT = -1;
const defaultNetwork = {
  info: 'default',
  text: 'Default for the connected node',
  value: -1
};
const networks = availableNetworks.map(({
  displayName,
  network,
  prefix
}) => ({
  info: network,
  text: displayName,
  value: prefix
}));
export const PREFIXES = [defaultNetwork, ...networks];