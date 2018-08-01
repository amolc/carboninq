SampleApplicationModule
    .controller('settingController', function($rootScope, $scope, $location, $http, store, $timeout, $routeParams) {
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
        $scope.show_status=true;
        $scope.username=$scope.businessSession.business_username;
        $scope.business_name=$scope.businessSession.business_name;

        $scope.confirmcatdel = function(order_id) {
            $scope.delorderid = order_id;
        };
        $scope.del = function(id) {
            $http.get(baseURL + 'deletecorboninqorder/' + id).success(function(res) {
                if (res.status === true) {
                    $scope.deletemsg = 'category deleted';
                    $scope.showdeletemsgmsg = true;
                    $timeout(function() {
                        $scope.showdeletemsgmsg = false;
                    }, 3000);
//                    $location.path('/orderlist');
                    $scope.allOrder();
                } else {
                    $scope.deleterrmsg = 'Order not deleted';
                    $scope.showdeleterrmsg = true;
                    $timeout(function() {
                        $scope.showdeleterrmsg = false;
                    }, 3000);
                }
            }).error(function() {
                console.log("Please check your internet connection or data source..");
            });
        };

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

       $scope.change_status=function(o)
       {
    	  $scope.delivery_details=o.address+',\n'+o.city+',\n'+o.state+',\n'+o.country+'-'+o.zipcode;
    	   var params={};
    	   params.order_id=o.order_id;
    	   params.status=o.status;
    	   $http.post(baseURL + 'setCorboniqOrderStatus',params).success(function(res) {
               $scope.orderDetrailist11 = res;
               if(o.status=="Ready_to_Delivery")
               {
            	   $('#ready_to_shipping').modal('show');
               }
               else
               {
            	   $scope.allOrder();
               }
           }).error(function(error) {
               console.log("Error getting item for business", error);
           });
//    	   $('#show_items').modal('show');
       }



	$scope.exportData = function () {

		var blob = new Blob([document.getElementById('exportable1').innerHTML], {
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
