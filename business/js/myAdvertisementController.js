
SampleApplicationModule.controller('myAdvertisementController', function($rootScope, $scope, $location, $http, $routeParams, $timeout, store,$sce) {


$scope.init = function() {
    $scope.businessSession = store.get('businessSession') || {};
};

$scope.init();
$scope.business_name=$scope.businessSession.business_name;
$scope.getTotal = function() {
    $http.get(baseURL + 'getWalletTotal/' + $scope.businessSession.business_id).success(function(res) {
        $scope.balance = res.total;
    }).error(function(error) {
        console.log("Error getting item for business", error);
    });
};
$scope.getTotal();
$scope.goto = function(page) {
    $location.path(page);
};


$scope.showhide = function(id) {
    if (document.getElementById(id).style.display == 'none') {
        document.getElementById(id).style.display = 'block';
    } else {
        document.getElementById(id).style.display = 'none';
    }
};

$scope.allorderbyBusinessId = function() {
    $http.get(baseURL + 'getAdvertiseByBusinessId/' + $scope.businessSession.business_id).success(function(res) {
        $scope.data = res.data;
    }).error(function(error) {
        console.log("Error getting item for business", error);
    });
};

$scope.allorderbyBusinessId();

  });
