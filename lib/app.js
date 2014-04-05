var mongojs = require('mongojs');
var suspend = require('suspend');

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
var suspendWrappedApp = suspendWrapApp(app);

if (typeof Function.prototype.isGenerator === 'undefined') {
	Function.prototype.isGenerator = function() {
		return (/^function\s*\*/).test(this.toString());
	};
}

function suspendWrapApp(app) {
	app.get = suspendWrapAppMethod(app, app.get);
	app.post = suspendWrapAppMethod(app, app.post);
	app.put = suspendWrapAppMethod(app, app.put);
	app.del = suspendWrapAppMethod(app, app.del);
	app.patch = suspendWrapAppMethod(app, app.patch);
	app.all = suspendWrapAppMethod(app, app.all);
	return app;
}

function suspendWrapAppMethod(http, method) {
	return function () {
		if (arguments.length === 1) {
			//one parameter, no middleware. probably a get of a config var
			return method.apply(http, arguments);
		}
		var argumentsArray = Array.prototype.slice.call(arguments).map(function(middleware){
			if(typeof middleware === 'function' && middleware.isGenerator()){
				return function(req, res, next){
					suspend.async(middleware)(req, res, next);
				};
			}
			return middleware;
		});
		return method.apply(http, argumentsArray);
	};
}



require("./webservices/users.js")(suspendWrappedApp);
require("./webservices/jobs.js")(suspendWrappedApp);
require("./websiteRoutes.js")(suspendWrappedApp);
var port = process.env.PORT || 3000;
app.listen(port);
console.log('listening on http://localhost:' + port);