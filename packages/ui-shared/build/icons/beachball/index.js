// Copyright 2017-2021 @axia-js/ui-shared authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Copyright 2016 Dan Finlay
import { circle } from "./shape/circle.js";
import { element } from "./svg/element.js";
import { colors } from "./colors.js";
import { container as newContainer } from "./container.js";
import { SHAPE_COUNT } from "./defaults.js";
import { seeder as newSeeder } from "./seeder.js";
export function beachballIcon(seed, {
  size = 256
}, className = '', style) {
  const seeder = newSeeder(seed);
  const colorGen = colors(seeder);
  const outer = newContainer(size, 'white', className, style);
  const container = newContainer(size, colorGen());
  const svg = element(size);
  outer.appendChild(container);
  container.appendChild(svg);

  for (let count = 0; count < SHAPE_COUNT; count++) {
    const fill = colorGen();
    const shape = circle(seeder, fill, size, count);
    svg.appendChild(shape);
  }

  return outer;
}