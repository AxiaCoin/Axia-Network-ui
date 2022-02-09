// Copyright 2017-2021 @axia-js/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { packageInfo as settingsInfo } from '@axia-js/ui-settings/packageInfo';
import { detectPackage } from '@axia-js/util';

import { packageInfo } from './packageInfo';

detectPackage(packageInfo, typeof __dirname !== 'undefined' && __dirname, [settingsInfo]);
