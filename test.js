import fs from 'fs';
import test from 'ava';
import del from 'del';

test.afterEach(() => {
	del.sync('temp');
});

test('prefix CSS', t => {
	const f = fs.readFileSync('temp/fixture.css', 'utf8');
	t.regex(f, /:-webkit-full-screen/);
	t.regex(f, /sourceMappingURL=data:application/);
});
