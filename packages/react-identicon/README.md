# @axia-js/react-identicon

A generic identity icon that can render icons based on the theme, be it Axlib or AXIA

## Usage Examples

To install the component, do `yarn add @axia-js/react-identicon`

Inside a React component, you can now render any account with the associated icon -

```javascript
import Identicon from '@axia-js/react-identicon';

...
render () {
  // address is an ss58-encoded address or publicKey (hex string or Uint8Array)
  const { address } = this.props;
  // size (optional) is a number, indicating the size (in pixels, 64 as default)
  const size = 32;
  // theme (optional), depicts the type of icon, one of
  // 'axia', 'axlib' (default), 'beachball' or 'jdenticon'
  const theme = 'axia';

  // standard className & style props are also available
  return (
    <Identicon
      value={address}
      size={size}
      theme={theme}
    />
  );
}
...
```
