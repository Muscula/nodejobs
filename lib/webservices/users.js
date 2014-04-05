var errors = require('nodeerrors');
var mailingList = require('../mailingList');
var resume = require('suspend').resume;

module.exports = function (http) {
	http.post("/signup", function* (req, res, next) {
		var email = req.body.email;
		if (!email || typeof email !== 'string' || email.lenght < 6 || email.length > 100) {
			return next(errors.propertyMalformed('email'));
		}
		var user = yield req.db.appUsers.save({ data: { email: email}, created: new Date(), lastlogin: new Date()}, resume());
		var data = user.data;
		data.id = user._id;
		yield mailingList.subscribe(req.db, user, resume());
		res.json(data);
	});
};