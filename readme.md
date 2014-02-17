# [broccoli](https://github.com/joliss/broccoli)-autoprefixer [![Build Status](https://travis-ci.org/sindresorhus/broccoli-autoprefixer.png?branch=master)](https://travis-ci.org/sindresorhus/broccoli-autoprefixer)

> Prefix CSS using [Autoprefixer](https://github.com/ai/autoprefixer)


## Install

```
npm install --save broccoli-autoprefixer
```


## Example

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


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
