// Copyright 2017-2021 @axia-js/ui-shared authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Copyright 2016 Dan Finlay
import Color from 'color';
import { COLORS } from "./defaults.js";
const WOBBLE = 30;
export function colors(seeder) {
  const amount = seeder() * WOBBLE - WOBBLE / 2;
  const all = COLORS.map(hex => Color(hex).rotate(amount));
  return (alpha = 1) => {
    const index = Math.floor(all.length * seeder());
    return all.splice(index, 1)[0].alpha(alpha).string();
  };
}