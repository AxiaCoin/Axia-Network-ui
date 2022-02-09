"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Beachball = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _uiShared = require("@axia-js/ui-shared");

// Copyright 2017-2021 @axia-js/vue-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name Beachball
 * @description The Beachball identicon
 */
const Beachball = _vue.default.extend({
  created: function () {
    this.createHtml();
  },
  data: function () {
    return {
      // eslint-disable-next-line quotes
      html: `<div />`
    };
  },
  methods: {
    createHtml: function () {
      this.html = (0, _uiShared.beachballIcon)(this.address, this.size).outerHTML;
    }
  },
  props: ['address', 'size'],
  // eslint-disable-next-line quotes
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      domProps: {
        "innerHTML": _vm._s(_vm.html)
      }
    });
  },
  staticRenderFns: []
});

exports.Beachball = Beachball;