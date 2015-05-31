'use strict';
var Filter = require('broccoli-filter');
var objectAssign = require('object-assign');
var autoprefixer = require('autoprefixer-core');
var postcss = require('postcss');

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
	var opts = objectAssign({
		from: relativePath,
		to: relativePath
	}, this.options);

	// support explicit override of inline sourcemaps
	if (opts.sourcemap != null) {
		opts.map = opts.sourcemap ? 'inline' : false;
	}

	return postcss(autoprefixer(opts))
		.process(str, opts)
		.then(function (res) {
			var warnings = res.warnings();

			if (warnings.length > 0) {
				console.error(warnings.join('\n'));
			}

			return res.css;
		})
		.catch(function (err) {
			if (err.name === 'CssSyntaxError') {
				// TODO: find a way to hide the stack so to adhere to the PostCSS guidelines
				err.message += err.showSourceCode();
			}

			throw err;
		});
};

module.exports = AutoprefixerFilter;
