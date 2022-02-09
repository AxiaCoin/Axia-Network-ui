// Copyright 2017-2021 @axia-js/vue-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Vue from 'vue';
import { axiaIcon } from '@axia-js/ui-shared';

/**
 * @name AXIA
 * @description The AXIA default identicon
 */
export const AXIA = Vue.extend({
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
      const circles = axiaIcon(this.address, {
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
  template: `<div v-html="svgHtml" />`
});