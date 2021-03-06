// Copyright 2017-2021 @axia-js/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0
import store from 'store';
export class BrowserStore {
  all(cb) {
    store.each((value, key) => {
      cb(key, value);
    });
  }

  get(key, cb) {
    cb(store.get(key));
  }

  remove(key, cb) {
    store.remove(key);
    cb && cb();
  }

  set(key, value, cb) {
    store.set(key, value);
    cb && cb();
  }

}