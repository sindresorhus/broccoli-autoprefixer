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

	async processString(text, relativePath) {
		const options = {
			from: relativePath,
			to: relativePath,
			...this.options
		};

		// Support explicit override of inline sourcemaps
		if (options.sourcemap !== null || options.sourcemap !== undefined) {
			options.map = options.sourcemap ? 'inline' : false;
		}

		let result;
		try {
			result = await postcss(autoprefixer(options)).process(text, options);
		} catch (error) {
			if (error.name === 'CssSyntaxError') {
				// TODO: Find a way to hide the stack so to adhere to the PostCSS guidelines
				error.message += error.showSourceCode();
			}
			throw error;
		}

		const warnings = result.warnings();

		if (warnings.length > 0) {
			console.error(warnings.join('\n'));
		}

		return result.css;
	}
};
