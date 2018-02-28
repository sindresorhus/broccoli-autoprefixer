'use strict';
const Autoprefixer = require('.');

module.exports = new Autoprefixer('fixture', {sourcemap: true, cascade: false});
