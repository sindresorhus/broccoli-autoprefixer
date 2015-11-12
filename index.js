'use strict';
var Filter = require('broccoli-persistent-filter');
var objectAssign = require('object-assign');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');

function AutoprefixerFilter(inputTree, _options) {
	var options = _options || {};
	if (!(this instanceof AutoprefixerFilter)) {
		return new AutoprefixerFilter(inputTree, _options);
	}

	Filter.call(this, inputTree, options);

	this.inputTree = inputTree;
	this.options = options;
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
	if (opts.sourcemap !== null || opts.sourcemap !== undefined) {
		opts.map = opts.sourcemap ? 'inline' : false;
	}

	return postcss(autoprefixer(opts))
		.process(str, opts)
		.then(function (result) {
			var warnings = result.warnings();

			if (warnings.length > 0) {
				console.error(warnings.join('\n'));
			}

			return result.css;
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
