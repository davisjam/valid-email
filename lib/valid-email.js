/*!
 * Valid Email
 * Copyright(c) 2013 John Henry
 * MIT Licensed
 */

/**
 * Valid-Email:
 *
 * An alternative to using a regular expression to validate email.
 * Inspired by:
 *      http://stackoverflow.com/questions/997078/email-regular-expression
 *      http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address
 *
 * Examples:
 *     console.log(require('valid-email')('john@iamjohnhenry.com'))//#true
 *     console.log(require('valid-email')('iamjohnhenry.com'))//#false
 *
 * @param {String} email
 * // potential email address
 * @return {Boolean}
 * @api public
 */
module.exports = function valid(email) {
	if (typeof email !== 'string') {
		throw new TypeError('valid-email expected a string');
	}

	/* Must contain exactly one @. */
	var res = email.split("@");
	if (res.length !== 2) {
		return false;
	}

	var user = res[0];
	var domain = res[1];

	var userLen = user.length;
	var domainLen = domain.length;

	const MIN_USER_LEN = 1;
	const MAX_USER_LEN = 64;

	const MIN_DOMAIN_LEN = 1;
	const MAX_DOMAIN_LEN = 255;

	/* User. */

	// Enforce user length limit.
	if (!(MIN_USER_LEN <= userLen && userLen <= MAX_USER_LEN)) {
		return false;
	}

	// User part cannot begin or end with '.'.
	if (beginsWithDot(user) || endsWithDot(user)) {
		return false;
	}

	// User part cannot have two consecutive dots.
	if (hasTwoConsecutiveDots(user)) {
		return false;
	}

	// Limits on valid chars in the user part.
	if (!user.replace("\\\\", "").match(/^(\\\\.|[A-Za-z0-9!#%&`_=\\/$\'*+?^{}|~.-])+$/)) {
		if (!user.replace("\\\\", "").match(/^"(\\\\"|[^"])+"$/)) {
			return false;
		}
	}

	/* Domain. */

	// Enforce domain length limit.
	if (!(MIN_DOMAIN_LEN <= domainLen && domainLen <= MAX_DOMAIN_LEN)) {
		return false;
	}

	// Limited characters accepted in the domain.
	if (!domain.match(/^[A-Za-z0-9.-]+$/)) {
		return false;
	}

	// Domain part cannot have two consecutive dots.
	if (hasTwoConsecutiveDots(domain)) {
		return false;
	}

	// Guess it's OK.
	return true;
};

/* Self-explanatory tests on strings. */

function hasTwoConsecutiveDots(str) {
	return (str.search(/\.\./) !== -1);
}

function beginsWithDot(str) {
	return (str.charAt(0) === '.');
}

function endsWithDot(str) {
	return (str.charAt(str.length - 1) === '.');
}
