"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QrScanAddress = void 0;

var _react = _interopRequireWildcard(require("react"));

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

var _constants = require("./constants.cjs");

var _Scan = require("./Scan.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-qr authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ScanAddress({
  className,
  isEthereum,
  onError,
  onScan,
  size,
  style
}) {
  const _onScan = (0, _react.useCallback)(data => {
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

        const expectedPrefix = isEthereum ? 'ethereum' : _constants.ADDRESS_PREFIX;
        const isValidPrefix = prefix === expectedPrefix || prefix === _constants.SEED_PREFIX;
        (0, _util.assert)(isValidPrefix, `Invalid prefix received, expected '${expectedPrefix} or ${_constants.SEED_PREFIX}' , found '${prefix}'`);
        const isAddress = prefix === expectedPrefix;

        if (isAddress && !isEthereum) {
          (0, _utilCrypto.decodeAddress)(content);
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

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Scan.QrScan, {
    className: className,
    onError: onError,
    onScan: _onScan,
    size: size,
    style: style
  });
}

const QrScanAddress = /*#__PURE__*/_react.default.memo(ScanAddress);

exports.QrScanAddress = QrScanAddress;