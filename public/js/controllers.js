'use strict';

/* Controllers */

function AppCtrl($scope, $http, $location) {
	$http.get('/jobs').success(function(jobs) {
		$scope.jobs = jobs;
	})
	.error(function(data, status, headers, config) {
		$scope.name = 'Error!';
	});

	$scope.go = function ( path ) {
		$location.path(path);
	};
}

function JobController($scope, $http) {
	$scope.job = {};
	$scope.createJob = function() {
		$http({
			method : 'POST',
			url : '/jobs',
			data : $scope.job
		});
	};
}

function UserController($scope, $http) {
	$scope.user = {};
	$scope.createUser = function() {
		$http({
			method : 'POST',
			url : '/signup',
			data : $scope.user
		});
	};
}