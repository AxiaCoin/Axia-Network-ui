"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _vue = _interopRequireDefault(require("vue"));

var _uiKeyring = require("@axia-js/ui-keyring");

var _uiSettings = require("@axia-js/ui-settings");

var _utilCrypto = require("@axia-js/util-crypto");

var _vueIdenticon = _interopRequireDefault(require("@axia-js/vue-identicon"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const ss58Options = _uiSettings.settings.availablePrefixes.filter((_, index) => index !== 0);

function generateAccount(ss58Format = 42) {
  const phrase = (0, _utilCrypto.mnemonicGenerate)(12);

  const {
    address
  } = _uiKeyring.keyring.createFromUri(phrase);

  return {
    address: _uiKeyring.keyring.encodeAddress(address, ss58Format),
    phrase
  };
}

const Example = _vue.default.extend({
  components: {
    Identicon: _vueIdenticon.default
  },
  data: function () {
    return _objectSpread(_objectSpread({}, generateAccount()), {}, {
      ss58Format: 42,
      ss58Options
    });
  },
  methods: {
    onClickNew: function () {
      const {
        address,
        phrase
      } = generateAccount(this.ss58Format);
      this.address = address;
      this.phrase = phrase;
    }
  },
  name: 'Example',
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      attrs: {
        "id": "example"
      }
    }, [_c('section', [_c('button', {
      on: {
        "click": _vm.onClickNew
      }
    }, [_vm._v("another random address")])]), _vm._v(" "), _c('section', [_c('label', [_vm._v("phrase")]), _vm._v(" "), _c('textarea', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.phrase,
        expression: "phrase"
      }],
      attrs: {
        "cols": 40,
        "rows": 4,
        "readonly": ""
      },
      domProps: {
        "value": _vm.phrase
      },
      on: {
        "input": function ($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.phrase = $event.target.value;
        }
      }
    })]), _vm._v(" "), _c('section', [_c('label', [_vm._v("icons")]), _vm._v(" "), _c('Identicon', {
      staticClass: "icon",
      attrs: {
        "value": _vm.address
      }
    }), _vm._v(" "), _c('Identicon', {
      staticClass: "icon",
      attrs: {
        "value": _vm.address,
        "theme": 'axia'
      }
    }), _vm._v(" "), _c('Identicon', {
      staticClass: "icon",
      attrs: {
        "value": _vm.address,
        "theme": 'beachball'
      }
    })], 1), _vm._v(" "), _c('section', [_c('label', [_vm._v("address")]), _vm._v("\n        " + _vm._s(_vm.address) + "\n      ")]), _vm._v(" "), _c('section', [_c('label', [_vm._v("ss58 format")]), _vm._v(" "), _c('select', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.ss58Format,
        expression: "ss58Format"
      }],
      on: {
        "change": function ($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
            return o.selected;
          }).map(function (o) {
            var val = "_value" in o ? o._value : o.value;
            return val;
          });
          _vm.ss58Format = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
        }
      }
    }, _vm._l(_vm.ss58Options, function (option) {
      return _c('option', {
        domProps: {
          "value": option.value
        }
      }, [_vm._v("\n            " + _vm._s(option.text) + "\n          ")]);
    }), 0)])]);
  },
  staticRenderFns: [],
  watch: {
    ss58Format: function () {
      this.address = _uiKeyring.keyring.encodeAddress(this.address, this.ss58Format);
    }
  }
});

(0, _utilCrypto.cryptoWaitReady)().then(() => {
  _uiKeyring.keyring.loadAll({
    ss58Format: 42,
    type: 'sr25519'
  });

  new _vue.default({
    render: h => h(Example)
  }).$mount('#example');
}).catch(console.error);