import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/example-vue authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Vue from 'vue';
import { keyring } from '@axia-js/ui-keyring';
import { settings } from '@axia-js/ui-settings';
import { cryptoWaitReady, mnemonicGenerate } from '@axia-js/util-crypto';
import Identicon from '@axia-js/vue-identicon';
const ss58Options = settings.availablePrefixes.filter((_, index) => index !== 0);

function generateAccount(ss58Format = 42) {
  const phrase = mnemonicGenerate(12);
  const {
    address
  } = keyring.createFromUri(phrase);
  return {
    address: keyring.encodeAddress(address, ss58Format),
    phrase
  };
}

const Example = Vue.extend({
  components: {
    Identicon
  },
  data: function () {
    return _objectSpread(_objectSpread({}, generateAccount()), {}, {
      ss58Format: 42,
      ss58Options
    });
  },
  methods: {
    onClickNew: function () {
      const {
        address,
        phrase
      } = generateAccount(this.ss58Format);
      this.address = address;
      this.phrase = phrase;
    }
  },
  name: 'Example',
  template: `
    <div id="example">
      <section>
        <button v-on:click="onClickNew">another random address</button>
      </section>
      <section>
        <label>phrase</label>
        <textarea :cols="40" :rows="4" readonly v-model="phrase" />
      </section>
      <section>
        <label>icons</label>
        <Identicon class='icon' :value="address" />
        <Identicon class='icon' :value="address" :theme="'axia'" />
        <Identicon class='icon' :value="address" :theme="'beachball'" />
      </section>
      <section>
        <label>address</label>
        {{ address }}
      </section>
      <section>
        <label>ss58 format</label>
        <select v-model="ss58Format">
          <option v-for="option in ss58Options" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
      </section>
    </div>
  `,
  watch: {
    ss58Format: function () {
      this.address = keyring.encodeAddress(this.address, this.ss58Format);
    }
  }
});
cryptoWaitReady().then(() => {
  keyring.loadAll({
    ss58Format: 42,
    type: 'sr25519'
  });
  new Vue({
    render: h => h(Example)
  }).$mount('#example');
}).catch(console.error);