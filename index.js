'use strict';
const Filter = require('broccoli-persistent-filter');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

function AutoprefixerFilter(inputTree, _options) {
	const options = _options || {};

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
	const opts = Object.assign({
		from: relativePath,
		to: relativePath
	}, this.options);

	// Support explicit override of inline sourcemaps
	if (opts.sourcemap !== null || opts.sourcemap !== undefined) {
		opts.map = opts.sourcemap ? 'inline' : false;
	}

	return postcss(autoprefixer(opts))
		.process(str, opts)
		.then(result => {
			const warnings = result.warnings();

			if (warnings.length > 0) {
				console.error(warnings.join('\n'));
			}

			return result.css;
		})
		.catch(err => {
			if (err.name === 'CssSyntaxError') {
				// TODO: Find a way to hide the stack so to adhere to the PostCSS guidelines
				err.message += err.showSourceCode();
			}

			throw err;
		});
};

module.exports = AutoprefixerFilter;
