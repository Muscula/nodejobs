'use strict';

/* Controllers */

function AppCtrl($scope, $http) {
  $http.get('/jobs').success(function(jobs) {
    $scope.jobs = jobs;
  }).
  error(function(data, status, headers, config) {
    $scope.name = 'Error!';
  });
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