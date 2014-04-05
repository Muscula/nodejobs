process.on('uncaughtException', function (err) {
	console.error("uncaught exception", err, err.stack);
});

var express = require('express');
var app = express();

app.configure(function () {
	app.use(express.compress());
	app.use(express.cookieParser());
	app.use(app.router);
	app.use(express.static(__dirname + '/../public'));
});

var port = process.env.PORT || 8080;
app.listen(port);
console.log('listening on http://localhost:' + port);