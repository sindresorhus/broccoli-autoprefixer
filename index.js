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

AutoprefixerFilter.prototype.processString = function (str) {
	var enablePassthroughSourcemaps = typeof this.options.sourcemap == 'object';
	var enableSimpleSourcemaps = this.options.sourcemap && typeof this.options.sourcemap == 'boolean'

	var options = {
		browsers: this.options.browsers
	};

	if (enablePassthroughSourcemaps) {
		options.map = this.options.sourcemap.map || undefined;
		options.from = this.options.sourcemap.from || undefined;
		options.to = this.options.sourcemap.to || undefined;
	}
	else if (enableSimpleSourcemaps) {
		options.map = true;
	}

	var css = autoprefixer.apply(autoprefixer, options).process(str);
	var output = css.css;

	if (enableSimpleSourcemaps || enablePassthroughSourcemaps) {
		output += '\n/*# sourceMappingURL=data:application/json;base64,' + new Buffer(css.map).toString('base64') + ' */';
	}

	return output;
};

module.exports = AutoprefixerFilter;
