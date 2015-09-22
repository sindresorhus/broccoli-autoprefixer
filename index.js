'use strict';
var Filter = require('broccoli-persistent-filter');
var objectAssign = require('object-assign');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var crypto = require('crypto');
var stringify = require('json-stable-stringify');

function AutoprefixerFilter(inputTree, options) {
	if (!(this instanceof AutoprefixerFilter)) {
		return new AutoprefixerFilter(inputTree, options);
	}

	Filter.call(this, inputTree);

	this.inputTree = inputTree;
	this.options = options || {};
	this.persist = true;
}

AutoprefixerFilter.prototype = Object.create(Filter.prototype);
AutoprefixerFilter.prototype.constructor = AutoprefixerFilter;

AutoprefixerFilter.prototype.extensions = ['css'];
AutoprefixerFilter.prototype.targetExtension = 'css';

AutoprefixerFilter.prototype.baseDir = function () {
	return __dirname;
};

AutoprefixerFilter.prototype.optionsHash = function () {
	if (!this._optionsHash) {
		this._optionsHash = crypto.createHash('md5').update(stringify(this.options), 'utf8').digest('hex');
	}
	return this._optionsHash;
};

AutoprefixerFilter.prototype.cacheKeyProcessString = function (string, relativePath) {
	return this.optionsHash() + Filter.prototype.cacheKeyProcessString.call(this, string, relativePath);
};

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
