// Copyright 2017-2021 @axia-js/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { Keyring } from "./Keyring.js";
export { Ledger } from '@axia-js/hw-ledger';
export { packageInfo } from "./packageInfo.js";
const keyring = new Keyring();
export { Keyring, keyring };