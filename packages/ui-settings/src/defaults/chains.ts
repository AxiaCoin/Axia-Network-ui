// Copyright 2017-2021 @axia-js/ui-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { selectableNetworks } from '@axia-js/networks';

type ChainDef = string[];

const chains: Record <string, ChainDef> = selectableNetworks
  .filter((n) => n.genesisHash.length)
  .reduce((chains, { genesisHash, network }) => ({ ...chains, [network]: genesisHash }), {});

export { chains };
