// Copyright 2017-2021 @axia-js/vue-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
import * as jdenticon from 'jdenticon';
import Vue from 'vue';

/**
 * @name Jdenticon
 * @description The axlib default via Jdenticon
 */
export const Jdenticon = Vue.extend({
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
      this.svgHtml = jdenticon.toSvg(this.publicKey.substr(2), this.size);
    }
  },
  props: ['publicKey', 'size'],
  // eslint-disable-next-line quotes
  template: `<div v-html="svgHtml" />`
});