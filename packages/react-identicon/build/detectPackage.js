// Copyright 2017-2021 @axia-js/react-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { packageInfo as settingsInfo } from '@axia-js/ui-settings/packageInfo';
import { packageInfo as sharedInfo } from '@axia-js/ui-shared/packageInfo';
import { detectPackage } from '@axia-js/util';
import { packageInfo } from "./packageInfo.js";
detectPackage(packageInfo, typeof __dirname !== 'undefined' && __dirname, [settingsInfo, sharedInfo]);