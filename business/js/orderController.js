SampleApplicationModule
    .controller('orderController', function($rootScope, $scope, $location, $http, store, $timeout, $routeParams) {
        $scope.init = function() {
            $scope.businessSession = store.get('businessSession') || {};
        };
        $scope.init();
        $scope.Order = {};

        $scope.imageURL = imageURL;

        $scope.goto = function(page) {
            $location.path(page);
        };
        $scope.username=$scope.businessSession.business_username;
        $scope.business_name=$scope.businessSession.business_name;
        
        $scope.orderStatus = {
            'status': '',
            'notes': '',
            'business_id': $scope.businessSession.business_id
        };

        $scope.clearOrderForm = function() {
            $scope.orderStatus = {
                'status': '',
                'notes': '',
                'business_id': $scope.businessSession.business_id
            };
        };

        //get order history

       

        $scope.allOrder = function() {
            $http.get(baseURL + 'getCarboninqCustomerOrder').success(function(res) {
                $scope.orderlist = res;
            }).error(function(error) {
                console.log("Error getting item for business", error);
            });
        };
        $scope.allOrder();
       $scope.showItems=function(id)
       {
    	   $scope.order_id=id;
    	   $http.get(baseURL + 'getCarboninqCustomerOrderDetails/'+id).success(function(res) {
               $scope.orderDetrailist = res;
           }).error(function(error) {
               console.log("Error getting item for business", error);
           });
    	   $('#show_items').modal('show');
       }
        
    });
