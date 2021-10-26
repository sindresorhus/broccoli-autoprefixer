const fs = require('fs');
const test = require('ava');
const del = require('del');

test.afterEach(() => {
	del.sync('temp');
});

test('prefix CSS', t => {
	const fixture = fs.readFileSync('temp/fixture.css', 'utf8');
	t.regex(fixture, /:-webkit-full-screen/);
	t.regex(fixture, /sourceMappingURL=data:application/);
});
