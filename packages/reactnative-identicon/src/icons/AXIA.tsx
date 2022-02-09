// Copyright 2018-2021 @axia-js/reactnative-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Circle as CircleType } from '@axia-js/ui-shared/icons/types';
import type { Props } from '../types';

import React from 'react';
import { View } from 'react-native';
import Svg, { Circle as SvgCircle } from 'react-native-svg';

import { axiaIcon } from '@axia-js/ui-shared';

function renderCircle ({ cx, cy, fill, r }: CircleType, key: number): React.ReactNode {
  return (
    <SvgCircle
      cx={cx}
      cy={cy}
      fill={fill}
      key={key}
      r={r}
    />
  );
}

export default function Identicon ({ address, isAlternative = false, size }: Props): React.ReactElement<Props> {
  return (
    <View>
      <Svg
        height={size}
        id={address}
        viewBox='0 0 64 64'
        width={size}
      >
        {axiaIcon(address, { isAlternative }).map(renderCircle)}
      </Svg>
    </View>
  );
}
