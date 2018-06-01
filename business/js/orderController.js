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
        
  

	$scope.exportData = function () {
		var blob = new Blob([document.getElementById('exportable').innerHTML], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
		});
		saveAs(blob, "Report.xls");
	};

	$scope.items = [{
		"Name": "ANC101",
			"Date": "10/02/2014",
			"Terms": ["samsung", "nokia", "apple"]
	}, {
		"Name": "ABC102",
		"Date": "10/02/2014",
        "Terms": ["motrolla", "nokia", "iPhone"]
	}]
	
    });