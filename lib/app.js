var mongojs = require('mongojs');

process.on('uncaughtException', function (err) {
	console.error("uncaught exception", err, err.stack);
});

var express = require('express');
var app = express();
var mongoConnection = process.env.NODEJOBS_MONGO || 'nodejobs';

app.configure(function () {
	app.use(express.logger());
	app.use(express.compress());
	app.use(express.bodyParser());
	app.use(function(req, res, next){
		req.db = mongojs(mongoConnection, ['jobs', 'appUsers']);
		return next();
	});
	app.use(app.router);
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/../public', {clientMaxAge:-1000 * 60 * 60 * 24}));
	app.use(require('./middleware/errorHandler')());
});
require("./webservices/users.js")(app);
require("./webservices/jobs.js")(app);
require("./websiteRoutes.js")(app);
var port = process.env.PORT || 3000;
app.listen(port);
console.log('listening on http://localhost:' + port);