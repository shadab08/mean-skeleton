clientApp.controller('HomePageCtrl', function ($scope, $resource, $log, $http, $route, $location) {

    console.log("Entered Home Page Ctrl");
    $scope.firstName = $location.search().firstName || "";
    $scope.lastName = $location.search().lastName || "";
    console.log("firstName: "+$scope.firstName);
    console.log("lastName: "+$scope.lastName);

    $scope.viewDownloadedPayloads = function(){
        $location.path("/fmc-downloads");
    }
    $scope.viewUploadedPayloads = function(){
        $location.path("/fmc-uploads");
    }
    $scope.viewEDFConsumers = function(){
        $location.path("/edf-consumers");
    }
});