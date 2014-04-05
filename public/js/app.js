'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','ngRoute']).
	config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'home.html',
			controller: AppCtrl
		}).
		when('/signup', {
			templateUrl: 'signup.html',
			controller: UserController
		}).
		otherwise({
			redirectTo: '/'
		});
		$locationProvider.html5Mode(true);
	}]);