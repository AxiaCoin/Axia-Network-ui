"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Identicon = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

var _index = require("./icons/index.cjs");

// Copyright 2017-2021 @axia-js/vue-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
const DEFAULT_SIZE = 64;

function encodeAccount(value, prefix) {
  try {
    const address = (0, _util.isU8a)(value) || (0, _util.isHex)(value) ? (0, _utilCrypto.encodeAddress)(value, prefix) : value;
    const publicKey = (0, _util.u8aToHex)((0, _utilCrypto.decodeAddress)(address, false, prefix));
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


const Identicon = _vue.default.extend({
  components: {
    Beachball: _index.Beachball,
    Empty: _index.Empty,
    Jdenticon: _index.Jdenticon,
    AXIA: _index.AXIA
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
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _vm.type === 'empty' || _vm.address === '' ? _c('div', [_c('Empty', {
      key: _vm.address,
      attrs: {
        "size": _vm.iconSize
      }
    })], 1) : _vm.type === 'beachball' ? _c('div', [_c('Beachball', {
      key: _vm.address,
      attrs: {
        "address": _vm.address,
        "size": _vm.iconSize
      }
    })], 1) : _vm.type === 'axia' ? _c('div', [_c('AXIA', {
      key: _vm.address,
      attrs: {
        "address": _vm.address,
        "isAlternative": _vm.isAlternative,
        "size": _vm.iconSize
      }
    })], 1) : _c('div', [_c('Jdenticon', {
      key: _vm.address,
      attrs: {
        "publicKey": _vm.publicKey,
        "size": _vm.iconSize
      }
    })], 1);
  },
  staticRenderFns: [],
  watch: {
    value: function () {
      this.recodeAddress();
    }
  }
});

exports.Identicon = Identicon;