// Copyright 2017-2021 @axia-js/ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

const config = require('@axia-js/dev/config/jest.cjs');

module.exports = {
  ...config,
  moduleNameMapper: {
    '@axia-js/react-(identicon|qr)(.*)$': '<rootDir>/packages/react-$1/src/$2',
    '@axia-js/reactnative-(identicon)(.*)$': '<rootDir>/packages/reactnative-$1/src/$2',
    '@axia-js/ui-(assets|keyring|settings|shared)(.*)$': '<rootDir>/packages/ui-$1/src/$2',
    '\\.(css|less)$': 'empty/object',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'empty/object'
  },
  testEnvironment: 'jsdom'
};
