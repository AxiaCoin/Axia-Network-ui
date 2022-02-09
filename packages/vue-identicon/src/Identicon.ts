// Copyright 2017-2021 @axia-js/vue-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Prefix } from '@axia-js/util-crypto/address/types';

import Vue from 'vue';

import { isHex, isU8a, u8aToHex } from '@axia-js/util';
import { decodeAddress, encodeAddress } from '@axia-js/util-crypto';

import { Beachball, Empty, Jdenticon, AXIA } from './icons';

interface Account {
  address: string;
  publicKey: string;
}

interface Data {
  address: string;
  iconSize: number;
  publicKey: string;
  type: 'beachball' | 'empty' | 'jdenticon' | 'axia' | 'axlib';
}

const DEFAULT_SIZE = 64;

function encodeAccount (value: string | Uint8Array, prefix?: Prefix): Account {
  try {
    const address = isU8a(value) || isHex(value)
      ? encodeAddress(value as string, prefix)
      : value;
    const publicKey = u8aToHex(decodeAddress(address, false, prefix));

    return { address, publicKey };
  } catch (error) {
    return { address: '', publicKey: '0x' };
  }
}

/**
 * @name Identicon
 * @description The main Identicon component, taking a number of properties
 * @example
 * ```html
 * <Identicon :size="128" :theme="axia" :value="..." />
 * ```
 */
export const Identicon = Vue.extend({
  components: {
    Beachball,
    Empty,
    Jdenticon,
    AXIA
  },
  created: function (): void {
    this.createData();
  },
  data: function (): Data {
    return {
      address: '',
      iconSize: DEFAULT_SIZE,
      publicKey: '0x',
      type: 'empty'
    };
  },
  methods: {
    createData: function (): void {
      this.iconSize = this.size as number || DEFAULT_SIZE;
      this.type = this.theme as 'empty';

      this.recodeAddress();
    },
    recodeAddress: function (): void {
      const { address, publicKey } = encodeAccount(this.value);

      this.address = address;
      this.publicKey = publicKey;
    }
  },
  props: ['prefix', 'isAlternative', 'size', 'theme', 'value'],
  // FIXME These nested divs are not correct, would like a different way
  // here so we don't create a div wrapped for the div wrapper of the icon
  template: `
    <div v-if="type === 'empty' || address === ''">
      <Empty :key="address" :size="iconSize" />
    </div>
    <div v-else-if="type === 'beachball'">
      <Beachball :key="address" :address="address" :size="iconSize" />
    </div>
    <div v-else-if="type === 'axia'">
      <AXIA :key="address" :address="address" :isAlternative="isAlternative" :size="iconSize" />
    </div>
    <div v-else>
      <Jdenticon :key="address" :publicKey="publicKey" :size="iconSize" />
    </div>
  `,
  watch: {
    value: function (): void {
      this.recodeAddress();
    }
  }
});
