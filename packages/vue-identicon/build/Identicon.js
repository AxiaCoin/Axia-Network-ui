// Copyright 2017-2021 @axia-js/vue-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Vue from 'vue';
import { isHex, isU8a, u8aToHex } from '@axia-js/util';
import { decodeAddress, encodeAddress } from '@axia-js/util-crypto';
import { Beachball, Empty, Jdenticon, AXIA } from "./icons/index.js";
const DEFAULT_SIZE = 64;

function encodeAccount(value, prefix) {
  try {
    const address = isU8a(value) || isHex(value) ? encodeAddress(value, prefix) : value;
    const publicKey = u8aToHex(decodeAddress(address, false, prefix));
    return {
      address,
      publicKey
    };
  } catch (error) {
    return {
      address: '',
      publicKey: '0x'
    };
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
  created: function () {
    this.createData();
  },
  data: function () {
    return {
      address: '',
      iconSize: DEFAULT_SIZE,
      publicKey: '0x',
      type: 'empty'
    };
  },
  methods: {
    createData: function () {
      this.iconSize = this.size || DEFAULT_SIZE;
      this.type = this.theme;
      this.recodeAddress();
    },
    recodeAddress: function () {
      const {
        address,
        publicKey
      } = encodeAccount(this.value);
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
    value: function () {
      this.recodeAddress();
    }
  }
});