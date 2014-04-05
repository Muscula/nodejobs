'use strict';

/* Controllers */

function AppCtrl($scope, $http) {
  $http({method: 'GET', url: '/api/name'}).
  success(function(data, status, headers, config) {
    $scope.name = data.name;
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