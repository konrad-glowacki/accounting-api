(function(){
	var app = angular.module('mkApp', ['ngRoute']);

	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/users', {
				//controller: 'UsersListCtrl',
				templateUrl: 'views/accountant/users-list.html',
                label: 'Lista użytkowników'
			})
			.when('/users/:userId/monthly', {
				//controller: 'UserMonthlyCtrl',
				templateUrl: 'views/user/monthly.html',
                label: 'Rozliczenia miesięczne użytkownika'
			})
			.when('/users/:userId/quarterly', {
				//controller: 'UserQuarterlyCtrl',
				templateUrl: 'views/user/quarterly.html',
                label: 'Rozliczenia kwartalne użytkownika'
			})
			.when('/users/:userId', {
				//controller: 'UserDetailsCtrl',
				templateUrl: 'views/accountant/user-details.html',
                label: 'Karta użytkownika'
			})
			.otherwise({ redirectTo: '/users' })
		;
	}]);
	// app.controller('UsersListCtrl', ['$scope', function($scope){
		
	// }]);
	// app.controller('UserDetailsCtrl', ['$scope', function($scope){
		
	// }]);

	app.controller('MainCtrl', ['$scope', function($scope){
		
	}]);

})();