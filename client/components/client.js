var clientApp = angular.module('clientApp', ['ngAnimate', 'ui.bootstrap', 'ngSanitize', 'ngResource', 'ngRoute'
]);

clientApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'components/home/home.html',
            controller: 'HomePageCtrl'
        })
        .when('/edf-consumers', {
            templateUrl: 'components/edf/consumers.html',
            controller: 'EDFPagesCtrl'
        })
        .when('/fmc-uploads', {
            templateUrl: 'components/fmc/uploads.html',
            controller: 'FMCPagesCtrl'
        })
        .when('/fmc-downloads', {
            templateUrl: 'components/fmc/downloads.html',
            controller: 'FMCPagesCtrl'
        })
        .otherwise({
            redirectTo: '/not-found'
        });

}]);

clientApp.controller('MainCtrl', function ($rootScope, $scope) {
    console.log("Main ctrl")
});

