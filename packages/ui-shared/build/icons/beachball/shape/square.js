// Copyright 2017-2021 @axia-js/ui-shared authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Copyright 2016 Dan Finlay
import { SHAPE_COUNT } from "../defaults.js";
import { rect as newRect } from "../svg/rect.js";
export function square(seeder, fill, diameter, count) {
  const center = diameter / 2;
  const svg = newRect(diameter);
  const firstRot = seeder();
  const angle = Math.PI * 2 * firstRot;
  const scale = count / SHAPE_COUNT;
  const velocity = diameter / SHAPE_COUNT * seeder() + scale * diameter;
  const tx = (Math.cos(angle) * velocity).toFixed(3);
  const ty = (Math.sin(angle) * velocity).toFixed(3);
  const rot = (firstRot * 360 + seeder() * 180).toFixed(1);
  svg.setAttributeNS('', 'transform', `translate(${tx} ${ty}) rotate(${rot} ${center} ${center})`);
  svg.setAttributeNS('', 'fill', fill);
  return svg;
}