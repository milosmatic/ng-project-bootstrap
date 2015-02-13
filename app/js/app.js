'use strict';

var App = angular.module('AppBootstrap', ['ngRoute']);

// route configurations
App.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '../partials/home.html',
			controller: 'HomeController'
		})
		.otherwise({
			redirectTo: '/'
		});

	$locationProvider.hashPrefix('!');
}]);

//App.config(['$httpProvider', function ($httpProvider) {
//	$httpProvider.interceptors.push('HttpInterceptor');
//}]);

// production config
//App.config(['$compileProvider', function ($compileProvider) {
//	$compileProvider.debugInfoEnabled(false);
//}]);

// services
// App.factory('API', ['$http', '$window', '$cacheFactory', API]);
// App.factory('HttpInterceptor', ['$q', '$window', '$location', HttpInterceptor]);

// filters
// App.filter('sampleFilter', Sample);

// directives
// App.directive('sampleDirective', [Sample]);

// controllers
App.controller('HomeController', ['$scope', HomeController]);