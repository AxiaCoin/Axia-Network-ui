import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { BehaviorSubject } from 'rxjs';
import { createOptionItem } from "../options/item.js";
import { env } from "./env.js";

function callNext(current, subject, withTest) {
  const isDevMode = env.isDevelopment();
  const filtered = {};
  Object.keys(current).forEach(key => {
    const {
      json: {
        meta: {
          isTesting = false
        } = {}
      } = {}
    } = current[key];

    if (!withTest || isDevMode || isTesting !== true) {
      filtered[key] = current[key];
    }
  });
  subject.next(filtered);
}

export function genericSubject(keyCreator, withTest = false) {
  let current = {};
  const subject = new BehaviorSubject({});

  const next = () => callNext(current, subject, withTest);

  env.subject.subscribe(next);
  return {
    add: (store, address, json, type) => {
      current = _objectSpread({}, current);
      current[address] = {
        json: _objectSpread(_objectSpread({}, json), {}, {
          address
        }),
        option: createOptionItem(address, json.meta.name),
        type
      }; // we do not store dev or injected accounts (external/transient)

      if (!json.meta.isInjected && (!json.meta.isTesting || env.isDevelopment())) {
        store.set(keyCreator(address), json);
      }

      next();
      return current[address];
    },
    remove: (store, address) => {
      current = _objectSpread({}, current);
      delete current[address];
      store.remove(keyCreator(address));
      next();
    },
    subject
  };
}