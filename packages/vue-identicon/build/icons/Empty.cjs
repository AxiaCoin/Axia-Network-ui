"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Empty = void 0;

var _vue = _interopRequireDefault(require("vue"));

// Copyright 2017-2021 @axia-js/vue-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name Empty
 * @description An empty identicon
 */
const Empty = _vue.default.extend({
  props: ['size'],
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('svg', {
      attrs: {
        "height": _vm.size,
        "width": _vm.size,
        "viewBox": "0 0 64 64"
      }
    }, [_c('circle', {
      attrs: {
        "cx": "50%",
        "cy": "50%",
        "fill": "#eee",
        "r": "50%"
      }
    })]);
  },
  staticRenderFns: []
});

exports.Empty = Empty;