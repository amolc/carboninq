SampleApplicationModule
    .controller('orderDetailsController', function($rootScope, $scope, $location, $http, store, $timeout, $routeParams) {
        $scope.init = function() {
            $scope.businessSession = store.get('businessSession') || {};
        };
        $scope.init();
        $scope.Order = {};
   
        
       
        $scope.imageURL = imageURL;

        $scope.goto = function(page) {
            $location.path(page);
        };
        $scope.show = function(id) {
            $location.path('/order-details/' + id);
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

       

        
       $scope.showItems=function()
       {
    	   
    	   $http.get(baseURL + 'getCarboninqCustomerOrderDetails/'+$routeParams.id).success(function(res) {
               $scope.orderDetaillist = res;
           }).error(function(error) {
               console.log("Error getting item for business", error);
           });
    	   
       }
       $scope.showItems(); 
       
       $scope.showOrder=function()
       {
    	   
    	   $http.get(baseURL + 'getCarboninqCustomerOrderByOrderId/'+$routeParams.id).success(function(res) {
               $scope.orderlist = res[0];
           }).error(function(error) {
               console.log("Error getting item for business", error);
           });
    	  
       }
       $scope.showOrder(); 
  

	$scope.exportData = function () {
		var blob = new Blob([document.getElementById('exportable').innerHTML], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
		});
		saveAs(blob, "Report.xls");
	};

	
	
    });