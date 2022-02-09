"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AXIA = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _uiShared = require("@axia-js/ui-shared");

// Copyright 2017-2021 @axia-js/vue-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name AXIA
 * @description The AXIA default identicon
 */
const AXIA = _vue.default.extend({
  created: function () {
    this.createSvgHtml();
  },
  data: function () {
    return {
      // eslint-disable-next-line quotes
      svgHtml: `<svg viewBox="0 0 64 64" />`
    };
  },
  methods: {
    createSvgHtml: function () {
      const circles = (0, _uiShared.axiaIcon)(this.address, {
        isAlternative: this.isAlternative || false
      }).map(({
        cx,
        cy,
        fill,
        r
      }) => `<circle cx=${cx} cy=${cy} fill="${fill}" r=${r} />`).join('');
      this.svgHtml = `<svg height=${this.size} viewBox='0 0 64 64' width=${this.size}>${circles}</svg>`;
    }
  },
  props: ['address', 'isAlternative', 'size'],
  // eslint-disable-next-line quotes
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      domProps: {
        "innerHTML": _vm._s(_vm.svgHtml)
      }
    });
  },
  staticRenderFns: []
});

exports.AXIA = AXIA;