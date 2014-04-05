var request = require('request');
var errors = require('nodeerrors');

module.exports = {
	subscribe: subscribe,
	updateEmail: updateEmail
};

function subscribe(mongo, user, callback) {
	var body = {
		apikey: process.env.MAILCHIMP,
		id: process.env.MAILCHIMP_LIST,
		email: {
			email: user.data.email
		},
		send_welcome: false,
		double_optin: false,
		update_existing: true
	};
	return request.post('https://us8.api.mailchimp.com/2.0/lists/subscribe.json', {
		json: true,
		body: body
	}, saveDataOnUser.onError(callback));

	function saveDataOnUser(err, resp) {
		if (!/2\d\d/.test(resp.statusCode)) {
			var error = errors.system({
				msg: 'error calling mailchimp',
				url: 'https://us8.api.mailchimp.com/2.0/lists/subscribe.json',
				statusCode: resp.statusCode,
				body: resp.body,
				user_data: user.data,
				user_mailingList: user.mailingList
			});
			return callback(error);
		}
		return mongo.appUsers.findAndModify(
			{
				query: {
					_id: user._id
				},
				update: {$set: {mailingList: resp.body }},
				"new": true
			},
			callback
		);
	}
}

function updateEmail(mongo, user, callback) {
	if (!(user.mailingList && user.mailingList.leid)) {
		return callback();
	}
	var body = {
		apikey: process.env.MAILCHIMP,
		id: process.env.MAILCHIMP_LIST,
		email: {
			leid: user.mailingList.leid
		},
		merge_vars: {
			"new-email": user.data.email
		}
	};
	return request.post('https://us8.api.mailchimp.com/2.0/lists/update-member.json', {
		json: true,
		body: body
	}, saveDataOnUser.onError(callback));

	function saveDataOnUser(err, resp) {
		if (!/2\d\d/.test(resp.statusCode)) {
			var error = errors.system({
				msg: 'error calling mailchimp',
				url: 'https://us8.api.mailchimp.com/2.0/lists/update-member.json',
				statusCode: resp.statusCode,
				body: resp.body,
				user_data: user.data,
				user_mailingList: user.mailingList
			});
			return callback(error);
		}
		return mongo.appUsers.findAndModify(
			{
				_id: user._id
			},
			[],
			{$set: {mailingList: resp.body }},
			{safe: true, "new": true},
			callback
		);
	}
}