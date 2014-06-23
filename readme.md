# [broccoli](https://github.com/joliss/broccoli)-autoprefixer [![Build Status](https://travis-ci.org/sindresorhus/broccoli-autoprefixer.svg?branch=master)](https://travis-ci.org/sindresorhus/broccoli-autoprefixer)

> Prefix CSS using [Autoprefixer](https://github.com/ai/autoprefixer)

*Issues with the output should be reported on the Autoprefixer [issue tracker](https://github.com/ai/autoprefixer/issues).*


## Install

```bash
$ npm install --save broccoli-autoprefixer
```


## Usage

```js
var autoprefixer = require('broccoli-autoprefixer');
tree = autoprefixer(tree, options);
```


## API

### autoprefixer(tree, options)

#### options

##### browsers

Type: `Array`
Default: `['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']`

The [browsers](https://github.com/ai/autoprefixer#browsers) you need to support.

##### sourcemap

Type: `Boolean` OR `Object`
Default: `false`

To simply turn on sourcemaps, set this to `true`. They will be data-uri'd at the bottom.

If you're starting with a sourcemap, pass an object here. This object contains one or more of
the following: `{ map: 'the old map', from: 'oldfile.css', to: 'newfile.css' }`.

Full docs on what autoprefixer wants here are [here](https://github.com/ai/postcss#source-map-1).


## License

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)
