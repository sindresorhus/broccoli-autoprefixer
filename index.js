'use strict';

const Filter = require('broccoli-persistent-filter');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

module.exports = class extends Filter {
	constructor(inputTree, options = {}) {
		super(inputTree, options);
		this.inputTree = inputTree;
		this.options = options;
	}

	get extensions() {
		return ['css'];
	}

	get targetExtension() {
		return 'css';
	}

	processString(text, relativePath) {
		const options = Object.assign({
			from: relativePath,
			to: relativePath
		}, this.options);

		// Support explicit override of inline sourcemaps
		if (options.sourcemap !== null || options.sourcemap !== undefined) {
			options.map = options.sourcemap ? 'inline' : false;
		}

		return postcss(autoprefixer(options))
			.process(text, options)
			.then(result => {
				const warnings = result.warnings();

				if (warnings.length > 0) {
					console.error(warnings.join('\n'));
				}

				return result.css;
			})
			.catch(error => {
				if (error.name === 'CssSyntaxError') {
					// TODO: Find a way to hide the stack so to adhere to the PostCSS guidelines
					error.message += error.showSourceCode();
				}

				throw error;
			});
	}
};
