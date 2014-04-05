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
		//handle mailchimp validation error
		if(err.internal.body.name==='ValidationError'){
			error = errors.parse(errors.propertyMalformed('email').innerError(err));
			error.details = err.internal.body.error;
		}
		if(error.http){
			res.statusCode = error.http;
		}
		delete error.http;
		return res.json(error);
	}
};