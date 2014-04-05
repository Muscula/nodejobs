"use strict";

module.exports = function(http){
	http.get("/", function(req, res, next){
		req.url = "/index.html";
		next();
	});

	http.get('/api/name', function (req, res, next) {
		res.json({
			name: 'Bob'
		});
		next();
	});
};