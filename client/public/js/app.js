'use strict';

const app = angular.module('mkApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/users', {
      templateUrl: 'views/accountant/users-list.html',
      label: 'Lista użytkowników'
    })
    .when('/users/:userId/monthly', {
      templateUrl: 'views/user/monthly.html',
      label: 'Rozliczenia miesięczne użytkownika'
    })
    .when('/users/:userId/quarterly', {
      templateUrl: 'views/user/quarterly.html',
      label: 'Rozliczenia kwartalne użytkownika'
    })
    .when('/users/:userId', {
      templateUrl: 'views/accountant/user-details.html',
      label: 'Karta użytkownika'
    })
    .when('/user/add', {
      templateUrl: 'views/accountant/user-add.html',
      label: 'Dodanie nowego użytkownika'
    })
  ;

  $locationProvider.html5Mode(true);
}]);

// Old code
// app.controller('MainCtrl', ['$scope', function($scope) {
// }]);
