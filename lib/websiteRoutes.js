"use strict";

var routes = require('../routes');
var api = require('../routes/api');

module.exports = function(http){
	http.get('/', routes.index);
	http.get('/partial/:name', routes.partial);
	http.get('/api/name', api.name);
	http.get('*', routes.index);
};