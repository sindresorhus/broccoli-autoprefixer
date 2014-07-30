'use strict';
var Filter = require('broccoli-filter');
var autoprefixer = require('autoprefixer');

function AutoprefixerFilter(inputTree, options) {
	if (!(this instanceof AutoprefixerFilter)) {
		return new AutoprefixerFilter(inputTree, options);
	}

	this.inputTree = inputTree;
	this.options = options || {};
}

AutoprefixerFilter.prototype = Object.create(Filter.prototype);
AutoprefixerFilter.prototype.constructor = AutoprefixerFilter;

AutoprefixerFilter.prototype.extensions = ['css'];
AutoprefixerFilter.prototype.targetExtension = 'css';

AutoprefixerFilter.prototype.processString = function (str, relativePath) {
	// Options required for pass-through inline sourcemaps
	var options = {
		from: relativePath,
		to: relativePath
	}

	// Support explicit override of inline sourcemaps
	if (this.options.sourcemap != null) {
		options.map = this.options.sourcemap ? 'inline' : false;
	}

	// Copy remaining options
	for (var key in this.options) {
		options[key] = this.options[key];
	}

	return autoprefixer.apply(autoprefixer, this.options.browsers).process(str, options).css;
};

module.exports = AutoprefixerFilter;
