# @axia-js/reactnative-identicon

A generic identity icon that can render icons based on an address.

## Usage Examples

To install the component, do `yarn add @axia-js/reactnative-identicon`

Inside a React component, you can now render any account with the associated icon -

```javascript
import Identicon from '@axia-js/reactnative-identicon';

...
render () {
  // address is an ss58-encoded address or publicKey (hex string or Uint8Array)
  const { address } = this.props;
  // size (optional) is a number, indicating the size (in pixels, 64 as default)
  const size = 32;

  // standard className & style props are also available
  return (
    <Identicon
      value={address}
      size={size}
    />
  );
}
...
```
