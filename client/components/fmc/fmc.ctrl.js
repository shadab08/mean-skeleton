clientApp.controller('FMCPagesCtrl', function ($scope, $resource, $log, $http, $route, $location, 
    $interval, $filter) {

    $scope.res = {};

    var getDownloadPayloads = function(){
        $http.get('/fmc/payloads/download')
            .then(function(response) {
                console.log("Get Download Payload Response: "+JSON.stringify(response));
                var payloads = response.data.data;
                $scope.res.downloads = payloads;
                $log.debug("Downloads: "+JSON.stringify($scope.res.downloads));
            }, function(response) {
                $log.error("Error in getting payloads", response);
                $scope.res.error = response.data || 'Request failed';
                $scope.res.status = response.status;
            });
    };
    getDownloadPayloads();

    var getUploadPayloads = function(){
        $http.get('/fmc/payloads/upload')
            .then(function(response) {
                console.log("Get Upload Payload Response: "+JSON.stringify(response));
                var payloads = response.data.data;
                $scope.res.uploads = payloads;
                $log.debug("Uploads: "+JSON.stringify($scope.res.uploads));
            }, function(response) {
                $log.error("Error in getting payloads", response);
                $scope.res.error = response.data || 'Request failed';
                $scope.res.status = response.status;
            });
    };
    getUploadPayloads();

    $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
    });

});