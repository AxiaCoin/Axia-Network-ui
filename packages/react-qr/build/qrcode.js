// Copyright 2017-2021 @axia-js/react-qr authors & contributors
// SPDX-License-Identifier: Apache-2.0
import _qrcode from 'qrcode-generator'; // A small hurdle to jump through, just to get the default/default correct (as generated)

const qrcode = _qrcode; // HACK The default function take string -> number[], the Uint8array is compatible
// with that signature and the use thereof
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access

qrcode.stringToBytes = data => data;

export { qrcode };