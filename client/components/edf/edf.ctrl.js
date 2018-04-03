clientApp.controller('EDFPagesCtrl', function ($scope, $resource, $log, $http, $route, $location, 
    $interval, $filter) {

    $scope.res = {};

    var getEDFConsumers = function(){
        $http.get('/edf/consumers')
            .then(function(response) {
                var consumers = response.data.data;
                $scope.res.consumers = consumers;
                $log.debug("consumers: "+JSON.stringify($scope.res.consumers));
            }, function(response) {
                $log.error("Error in getting consumers", response);
                $scope.res.error = response.data || 'Request failed';
                $scope.res.status = response.status;
            });
    };
    getEDFConsumers();

    $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
    });

});