var mongojs = require('mongojs');

process.on('uncaughtException', function (err) {
	console.error("uncaught exception", err, err.stack);
});

var express = require('express');
var app = express();

app.configure(function () {

	app.use(express.logger());
	app.use(express.bodyParser());
	app.use(function(req, res, next){
		req.db = mongojs('nodejobs', ['jobs']);
		return next();
	});
	app.use(app.router);
	app.use(express.compress());
	app.set('views', __dirname + '/../views');
	app.set('view engine', 'jade');

	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/../public', {clientMaxAge:-1000 * 60 * 60 * 24}));
	app.use(function(err, req, res, next){
		console.error(err.stack);
		res.send(500, 'Something broke!');
	});
});
require("./webservices/jobs.js")(app);
require("./websiteRoutes.js")(app);
var port = process.env.PORT || 3000;
app.listen(port);
console.log('listening on http://localhost:' + port);