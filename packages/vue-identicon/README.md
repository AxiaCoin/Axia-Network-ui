# @axia-js/vue-identicon

A generic identity icon that can render icons based on an address.

## Usage Examples

To install the component, do `yarn add @axia-js/vue-identicon` and then use it with `import Identicon from '@axia-js/vue-identicon';`

Inside a Vue component, you can now render any account with the associated icon, with associated props -

- `value` - the address you wish to display
- `size` (optional, defaults to `64`) - the size in pixels
- `theme` (optional, defaults to `axlib`) - the theme to use, one of
  - `axia` or
  - `axlib` (equivalent to `jdenticon`) or
  - `beachball` or
  - `empty` (displays nothing)

```
<template>
  <Identicon
    :size="128"
    :theme="'axia'"
    :value="'5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'"
  />
</template>

<script>
  import Identicon from '@axia-js/vue-identicon';

  export default {
    ...
    components: { Identicon }
    ...
  };
</script>
```
