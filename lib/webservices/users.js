var errors = require('nodeerrors');
var mailingList = require('../mailingList');

module.exports = function (http) {
	http.post("/signup", function (req, res, next) {
		var email = req.body.email;
		if (!email || typeof email !== 'string' || email.lenght < 6 || email.length > 100) {
			return next(errors.propertyMalformed('email', email));
		}
		req.db.appUsers.save({ data: { email: email}, created: new Date(), lastlogin: new Date()}, function (err, user) {
			if (err) {
				return next(err);
			}
			var data = user.data;
			data.id = user._id;
			mailingList.subscribe(req.db, user, function(err){
				if (err) {
					return next(err);
				}
				res.json(data);
			});
		});
	});
};