"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _vue = _interopRequireDefault(require("vue"));

var _index = _interopRequireDefault(require("./index.cjs"));

// Copyright 2017-2021 @axia-js/vue-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name Demo
 * @description Demo component
 */
const Demo = _vue.default.extend({
  components: {
    Identicon: _index.default
  },
  data: function () {
    return {
      address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      size: 128
    };
  },
  name: 'Demo',
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      attrs: {
        "id": "demo"
      }
    }, [_c('Identicon', {
      attrs: {
        "size": _vm.size,
        "theme": 'axia',
        "value": _vm.address
      }
    }), _vm._v(" "), _c('Identicon', {
      attrs: {
        "size": _vm.size,
        "theme": 'axlib',
        "value": _vm.address
      }
    }), _vm._v(" "), _c('Identicon', {
      attrs: {
        "size": _vm.size,
        "theme": 'beachball',
        "value": _vm.address
      }
    }), _vm._v(" "), _c('Identicon', {
      attrs: {
        "size": _vm.size,
        "theme": 'empty'
      }
    })], 1);
  },
  staticRenderFns: []
});

new _vue.default({
  render: h => h(Demo)
}).$mount('#demo');