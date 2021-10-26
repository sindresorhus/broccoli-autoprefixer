# [broccoli](https://github.com/joliss/broccoli)-autoprefixer

> Prefix CSS using [Autoprefixer](https://github.com/postcss/autoprefixer)

*Issues with the output should be reported on the Autoprefixer [issue tracker](https://github.com/postcss/autoprefixer/issues).*

## Install

```
$ npm install --save-dev broccoli-autoprefixer
```

## Usage

```js
import Autoprefixer from 'broccoli-autoprefixer';

tree = new Autoprefixer(tree, options);
```

## API

### Autoprefixer(tree, options?)

#### options

Type: `object`

See the Autoprefixer [options](https://github.com/postcss/autoprefixer#options).

In addition, you can set this option:

##### sourcemap

Type: `boolean`\
Default: `true` if the input has a sourcemap, otherwise `false`

Set to `true` to include a Base64-encoded sourcemap at the end of the output.

If a sourcemap already exists in the input, Autoprefixer will automatically include an updated sourcemap in the output. Set this value to `false` to strip out the sourcemap entirely.

If you'd like to extract the inline sourcemap from the output, consider using a tool like [`broccoli-source-map`](https://github.com/myfreeweb/broccoli-source-map).
