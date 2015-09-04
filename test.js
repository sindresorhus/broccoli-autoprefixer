/* eslint-env mocha */
'use strict';
var assert = require('assert');
var fs = require('fs');
var rimraf = require('rimraf');

afterEach(function () {
	rimraf.sync('temp');
});

it('should prefix CSS', function () {
	var f = fs.readFileSync('temp/fixture.css', 'utf8');
	assert(/:-webkit-full-screen/.test(f), f);
	assert(/sourceMappingURL=data:application/.test(f));
});
