// Copyright 2017-2021 @axia-js/vue-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Vue from 'vue';

import { axiaIcon } from '@axia-js/ui-shared';

interface Data {
  svgHtml: string;
}

interface This {
  address: string;
  isAlternative?: boolean;
}

/**
 * @name AXIA
 * @description The AXIA default identicon
 */
export const AXIA = Vue.extend({
  created: function (): void {
    this.createSvgHtml();
  },
  data: function (): Data {
    return {
      // eslint-disable-next-line quotes
      svgHtml: `<svg viewBox="0 0 64 64" />`
    };
  },
  methods: {
    createSvgHtml: function (): void {
      const circles = axiaIcon(this.address, { isAlternative: (this as This).isAlternative || false }).map(({ cx, cy, fill, r }) =>
        `<circle cx=${cx} cy=${cy} fill="${fill}" r=${r} />`
      ).join('');

      this.svgHtml = `<svg height=${this.size as number} viewBox='0 0 64 64' width=${this.size as number}>${circles}</svg>`;
    }
  },
  props: ['address', 'isAlternative', 'size'],
  // eslint-disable-next-line quotes
  template: `<div v-html="svgHtml" />`
});
