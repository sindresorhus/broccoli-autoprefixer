'use strict';
var Filter = require('broccoli-filter');
var autoprefixer = require('autoprefixer');
var objectAssign = require('object-assign');

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
	var opts = objectAssign({}, this.options, {
		map: this.options.sourcemap ? 'inline' : false,
		from: relativePath,
		to: relativePath
	});

	return autoprefixer(opts.browsers).process(str, opts).css;
};

module.exports = AutoprefixerFilter;
