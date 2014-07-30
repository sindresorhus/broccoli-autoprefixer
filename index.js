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
	return autoprefixer.apply(autoprefixer, this.options.browsers).process(str, this.options).css;
};

module.exports = AutoprefixerFilter;
