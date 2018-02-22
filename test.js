import test from 'ava';
import fn from './';

test('expect a string', t => {
	t.throws(() => {
		fn([]);
	}, 'valid-email expected a string');
});

// These email addresses are considered valid, yet this module
// currently fails to validate them.
// See: https://github.com/johnhenry/valid-email/issues/1
test('valid patterns that are currently not passing', t => {
	t.is(fn('"very.unusual.@.unusual.com"@example.com'), true);
	t.is(fn('"very.(),:;<>[]".VERY."very@\\ "very".unusual"@strange.example.com'), true);
	t.is(fn('"()<>[]:,;@\\"!#$%&\'*+-/=?^_`{}| ~.a"@example.org'), true);
	t.is(fn('user@[IPv6:2001:db8::1]'), true);

	// normally .. before @ is invalid, unless it's a gmail address
	t.is(fn('john..doe@gmail.com'), true);
});

test('valid emails', t => {
	t.is(fn('prettyandsimple@example.com'), true);
	t.is(fn('prettyandsimple@example.com'), true);
	t.is(fn('very.common@example.com'), true);
	t.is(fn('disposable.style.email.with+symbol@example.com'), true);
	t.is(fn('other.email-with-dash@example.com'), true);
	t.is(fn('x@example.com'), true);
	t.is(fn('"much.more unusual"@example.com'), true);
	t.is(fn('example-indeed@strange-example.com'), true);
	t.is(fn('admin@mailserver1'), true);
	t.is(fn('#!$%&\'*+-/=?^_`{}|~@example.org'), true);
	t.is(fn('" "@example.org'), true);
	t.is(fn('example@localhost'), true);
	t.is(fn('example@s.solutions'), true);
	t.is(fn('user@com'), true);
	t.is(fn('user@localserver'), true);
});

test('invalid emails', t => {
	// no @ character
	t.is(fn('Abc.example.com'), false);

	// only one @ is allowed outside quotation marks
	t.is(fn('A@b@c@example.com'), false);

	// none of the special characters in this local part are allowed outside quotation marks
	t.is(fn('a"b(c)d,e:f;g<h>i[j\\k]l@example.com'), false);

	// quoted strings must be dot separated or the only element making up the local-part
	t.is(fn('just"not"right@example.com'), false);

	// spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
	t.is(fn('this is"not\\allowed@example.com'), false);

	// even if escaped (preceded by a backslash), spaces, quotes,
	// and backslashes must still be contained by quotes
	t.is(fn('this\\ still"not\\allowed@example.com'), false);

	// double dot before @ (and not a gmail address)
	t.is(fn('john..doe@example.com'), false);

	// (double dot after @)
	// t.is(fn('john.doe@example..com'), false);

	// a valid address with a leading space
	t.is(fn(' example@email.com'), false);

	// a valid address with a trailing space
	t.is(fn('example@email.com '), false);
});

