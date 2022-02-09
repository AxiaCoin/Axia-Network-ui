// Copyright 2017-2021 @axia-js/vue-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { packageInfo as sharedInfo } from '@axia-js/ui-shared/packageInfo';
import { detectPackage } from '@axia-js/util';

import { packageInfo } from './packageInfo';

detectPackage(packageInfo, typeof __dirname !== 'undefined' && __dirname, [sharedInfo]);
