"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Identicon = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactCopyToClipboard = _interopRequireDefault(require("react-copy-to-clipboard"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _uiSettings = require("@axia-js/ui-settings");

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

var _index = require("./icons/index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const Fallback = _index.Beachball;
const DEFAULT_SIZE = 64;
const Components = {
  beachball: _index.Beachball,
  empty: _index.Empty,
  ethereum: _index.Ethereum,
  jdenticon: _index.Jdenticon,
  axia: _index.AXIA,
  axlib: _index.Jdenticon
};

const Wrapper = _styledComponents.default.div.withConfig({
  displayName: "Identicon__Wrapper",
  componentId: "sc-xwny8y-0"
})(["cursor:copy;display:inline-block;line-height:0;> .container{position:relative;> div,> svg{position:relative;}&.highlight:before{position:absolute;top:0;left:0;right:0;bottom:0;border-radius:50%;box-shadow:0 0 5px 2px #aaa;content:'';}}"]);

class BaseIcon extends _react.default.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      address: '',
      publicKey: '0x'
    };

    this.onCopy = () => {
      const {
        onCopy
      } = this.props;
      const {
        address
      } = this.state;

      if (address && onCopy) {
        onCopy(address);
      }
    };
  }

  static setDefaultPrefix(prefix) {
    BaseIcon.prefix = prefix;
  }

  static getDerivedStateFromProps({
    prefix = BaseIcon.prefix,
    theme,
    value
  }, prevState) {
    if (theme === 'ethereum') {
      const address = (0, _util.isU8a)(value) ? (0, _utilCrypto.ethereumEncode)(value) : value || '';
      return {
        address,
        publicKey: ''
      };
    }

    try {
      const address = (0, _util.isU8a)(value) || (0, _util.isHex)(value) ? (0, _utilCrypto.encodeAddress)(value, prefix) : value || '';
      const publicKey = (0, _util.u8aToHex)((0, _utilCrypto.decodeAddress)(address, false, prefix));
      return address === prevState.address ? null : {
        address,
        publicKey
      };
    } catch (error) {
      return {
        address: '',
        publicKey: '0x'
      };
    }
  }

  render() {
    const {
      address
    } = this.state;
    const wrapped = this.getWrapped(this.state, this.props);
    return !address ? wrapped : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactCopyToClipboard.default, {
      onCopy: this.onCopy,
      text: address,
      children: wrapped
    });
  }

  getWrapped({
    address,
    publicKey
  }, {
    Custom
  }) {
    const {
      className = '',
      isAlternative,
      isHighlight,
      size = DEFAULT_SIZE,
      style,
      theme = _uiSettings.settings.icon
    } = this.props;
    const Component = !address ? _index.Empty : Custom || Components[theme === 'default' ? _uiSettings.ICON_DEFAULT_HOST : theme] || Fallback;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Wrapper, {
      className: `ui--IdentityIcon  ${className}`,
      style: style,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
        address: address,
        className: isHighlight ? 'highlight' : '',
        isAlternative: isAlternative,
        publicKey: publicKey,
        size: size
      })
    }, address);
  }

}

BaseIcon.prefix = undefined;

function Icon(props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(BaseIcon, _objectSpread({}, props));
}

const Identicon = /*#__PURE__*/_react.default.memo(Icon);

exports.Identicon = Identicon;