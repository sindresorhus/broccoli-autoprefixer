'use strict';
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');
var includePathSearcher = require('include-path-searcher');
var autoprefixer = require('autoprefixer-core');
var CachingWriter = require('broccoli-caching-writer');
var _ = require('lodash');
var Promise = require('rsvp').Promise;



module.exports = AutoprefixerFilter;
AutoprefixerFilter.prototype = Object.create(CachingWriter.prototype);
AutoprefixerFilter.prototype.constructor = AutoprefixerFilter;
function AutoprefixerFilter(inputTrees, inputFile, outputFile, options) {

	if (!(this instanceof AutoprefixerFilter)) {
		return new AutoprefixerFilter(inputTrees, inputFile, outputFile, options);
	}
	if (!Array.isArray(inputTrees)) {
		throw new Error('Expected array for first argument - did you mean [tree] instead of tree?');
	}


	CachingWriter.call(this, inputTrees, options);

	this.inputFile = inputFile;
	this.outputFile = outputFile;
	this.options = options || {};
}


AutoprefixerFilter.prototype.updateCache = function (includePaths, destDir) {

	var self = this;

	return new Promise(function(resolve, reject) {
		var destFile = path.join(destDir, self.outputFile);
		var srcFile = includePathSearcher.findFileSync(self.inputFile, includePaths);
		var str = fs.readFileSync(srcFile, { encoding: 'utf8' });
		
		mkdirp.sync(path.dirname(destFile));

		var opts = {
			from: self.inputFile,
			to: self.outputFile
		};

		// support explicit override of inline sourcemaps
		if (self.options.sourcemap !== null) {
			self.options.map = self.options.sourcemap ? 'inline' : false;
		}

		_.merge(opts, self.options);

		var output = autoprefixer(opts).process(str, opts).css;

		fs.writeFileSync(destFile, output, { encoding: 'utf8' });

		resolve(this);
	});
};
