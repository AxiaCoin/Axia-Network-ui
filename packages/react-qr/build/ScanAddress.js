// Copyright 2017-2021 @axia-js/react-qr authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import { assert } from '@axia-js/util';
import { decodeAddress } from '@axia-js/util-crypto';
import { ADDRESS_PREFIX, SEED_PREFIX } from "./constants.js";
import { QrScan } from "./Scan.js";
import { jsx as _jsx } from "react/jsx-runtime";

function ScanAddress({
  className,
  isEthereum,
  onError,
  onScan,
  size,
  style
}) {
  const _onScan = useCallback(data => {
    if (data) {
      try {
        var _name;

        let prefix, content, genesisHash, name;

        if (!isEthereum) {
          [prefix, content, genesisHash, ...name] = data.split(':');
        } else {
          [prefix, content, ...name] = data.split(':');
          genesisHash = '';
          content = content.substring(0, 42);
        }

        const expectedPrefix = isEthereum ? 'ethereum' : ADDRESS_PREFIX;
        const isValidPrefix = prefix === expectedPrefix || prefix === SEED_PREFIX;
        assert(isValidPrefix, `Invalid prefix received, expected '${expectedPrefix} or ${SEED_PREFIX}' , found '${prefix}'`);
        const isAddress = prefix === expectedPrefix;

        if (isAddress && !isEthereum) {
          decodeAddress(content);
        }

        onScan({
          content,
          genesisHash,
          isAddress,
          name: (_name = name) !== null && _name !== void 0 && _name.length ? name.join(':') : undefined
        });
      } catch (error) {
        onError && onError(error);
        console.error('@axia-js/react-qr:QrScanAddress', error.message, data);
      }
    }
  }, [onScan, onError, isEthereum]);

  return /*#__PURE__*/_jsx(QrScan, {
    className: className,
    onError: onError,
    onScan: _onScan,
    size: size,
    style: style
  });
}

export const QrScanAddress = /*#__PURE__*/React.memo(ScanAddress);