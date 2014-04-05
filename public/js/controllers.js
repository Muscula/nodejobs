'use strict';

/* Controllers */

function AppCtrl($scope, $http, $location) {
	$scope.getJobs = function () {
		$http.get('/alljobs')
		.success(function(jobs) {
			$scope.jobs = jobs;
		})
		.error(function(data, status, headers, config) {
			$scope.name = 'Error!';
		});
	};
	$scope.getJobs();
}

function JobController($scope, $http) {
	$scope.job = {};
	$scope.createJob = function() {
		$http({
			method : 'POST',
			url : '/jobs',
			data : $scope.job
		}).success(function(data, status, headers, config) {
			$scope.getJobs();
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