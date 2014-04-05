"use strict";
module.exports = function (options) {

	var errors = require('nodeerrors');
	return errorHandler;

	function errorHandler(err, req, res, next) {
		var error = errors.parse(err);
		req.error = JSON.parse(JSON.stringify(error));
		if (process.env.NODE_ENV === 'production') {
			delete error.internal; //do not show internal messages to users
			delete error.stack; //do not show internal messages to users
		}
		return res.json(error);
	}
};