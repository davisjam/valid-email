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

	var MIN_USER_LEN = 1;
	var MAX_USER_LEN = 64;

	var MIN_DOMAIN_LEN = 1;
	var MAX_DOMAIN_LEN = 255;

	/* User. */

	// Enforce user length limit.
	if (!(MIN_USER_LEN <= userLen && userLen <= MAX_USER_LEN)) {
		return false;
	}

	// User part cannot begin or end with '.'.
	if (user.match(/^\./) || user.match(/\.$/)) {
		return false;
	}

	// User part cannot have two consecutive dots.
	if (user.match(/\.\./)) {
		return false;
	}

	// Limits on valid chars in the user part.
	if (!user.match(/^[A-Za-z0-9!#%&`_=\\/$\'*+?^{}|~.\-" ]+$/)) {
		return false;
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
	if (domain.match(/\.\./)) {
		return false;
	}

	// Guess it's OK.
	return true;
};
