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

        $scope.business_name=$scope.businessSession.business_name;
        $scope.getTotal = function() {
            $http.get(baseURL + 'getWalletTotal/' + $scope.businessSession.business_id).success(function(res) {
                $scope.balance = res.total;
            }).error(function(error) {
                console.log("Error getting item for business", error);
            });
        };
        $scope.getTotal();
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

        $scope.getorderstatus = function() {
        	
        
        	
            $http.get(baseURL + 'getorderstatus/' + $routeParams.payment_id).success(function(res) {
                $scope.Order.history = res.record.reverse();
                console.log(res);

            }).error(function(error) {
                console.log("Error getting order history", error);
            });
        }

        if ($routeParams.payment_id) {
            $scope.getorderstatus();
        }

        //function for add order status
        $scope.addorderstatus = function() {
            console.log("$scope.Order:", $scope.Order);
            var choosestatus = _.where($scope.deliveryStatus, {
                id: $scope.orderStatus.status
            })[0];
            var orderpayment = {
                        'items': $scope.pdetails,
                    }

            $scope.orderStatus.selectedStatus = choosestatus.status;
            $scope.orderStatus.customerId = $scope.Order.address.defaultaddress.id_pk;
            $scope.orderStatus.payment_id = $routeParams.payment_id;
            $scope.orderStatus.customername = $scope.Order.address.defaultaddress.first_name + ' ' + $scope.Order.address.defaultaddress.last_name;
            $scope.orderStatus.customeremail = $scope.Order.address.defaultaddress.email;
            $scope.orderStatus.amount = $scope.Order.total;
            $scope.orderStatus.subtotal = $scope.Order.subtotal;
            $scope.orderStatus.totalPrice = $scope.Order.total;
            $scope.orderStatus.deliveryCharges  = $scope.Order.total - $scope.Order.subtotal;
            $scope.orderStatus.mobile = $scope.Order.address.defaultaddress.mobile;
            $scope.orderStatus.fromflag = 'business'; 
            $scope.orderStatus.items = $scope.Order.details;

            if ($scope.basicsInfodetails.adminemail) {
                $scope.orderStatus.adminemail = $scope.basicsInfodetails.adminemail;
            }
            if ($scope.basicsInfodetails.storemanageremail) {
                $scope.orderStatus.storemanageremail = $scope.basicsInfodetails.storemanageremail;
            }
            $scope.orderStatus.business_id = $scope.businessSession.business_id;
            if (choosestatus.status == 'Delivered') {
                console.log("status completed:", choosestatus.status);
            }

            $http.post(baseURL + 'addOrderDeliveryStatus', $scope.orderStatus).success(function(res) {
                if (res.status == true) {
                    $scope.ordermsg = 'order status updated';
                    $scope.showordermsg = true;
                    $timeout(function() {
                        $scope.showordermsg = false;
                        $('#Change_status').modal('hide');

                        $scope.getorderstatus();
                        if (choosestatus.status == 'Completed') {
                            $http.post(baseURL + 'addpaymentstatus', $scope.orderStatus).success(function(result) {
                                console.log("result:", result);
                            }).error(function() {
                                console.log("Please check the internet connection");
                            });
                        }
                        $scope.clearOrderForm();
                        $scope.orderStatusForm.$setPristine();

                    }, 2000);
                } else {
                    $scope.ordererrmsg = 'order status failed to update';
                    $scope.showordererrmsg = true;
                    $timeout(function() {
                        $scope.showordererrmsg = false;
                    }, 2000);
                }
            }).error(function(error) {
                console.log("Please check the internate connection");
            });

        };

        $scope.getbusinessOrderpayment = function() {
            $http.get(baseURL + 'getorderpayment/' + $scope.businessSession.business_id).success(function(res) {
                $scope.OrderPayment = res;
                if (res) {
                    function add(a, b) {
                        return a + b;
                    }
                    var totalpayment = $scope.OrderPayment.map(function(i) {
                        if(i.credit != null && i.debit != null){
                            return parseFloat(i.credit) + parseFloat(i.debit);
                        }else if(i.credit != null){
                            return parseFloat(i.credit);
                        }else{
                             return parseFloat(i.debit);
                        }  
                    });
                    $scope.OrderPaymentCost = totalpayment.reduce(add, 0);
                }
            }).error(function(error) {
                console.log("error in business order payment");
            })
        };

        $scope.deliveryStatus = [
            { id: 1, status: "Pending" },   
            { id: 2, status: "Approved" },
            { id: 3 , status: "Shipped"},
            { id: 4, status: "Delivered" },
            { id: 5, status: "Completed" }
        ];

        $scope.getOrderlistByBus_id = function() {
        	
        	
            $http.get(baseURL + 'getOrderlistByBusinessid/' + $scope.businessSession.business_id).success(function(res) {
           // 	$http.get(baseURL + 'getOrderlistByBusinessid/32').success(function(res) {

            	 
                var orderbyPID = _.each(res, function(someThing) {
                    someThing.orderstatus = _.where($scope.allOrderStatus, {
                        payment_id: someThing.payment_id
                    }).reverse(someThing.orderstatus);
                });

                $scope.orderlist = orderbyPID;

                function add(a, b) {
                    return a + b;
                }

                if ($scope.orderlist) {
                    var totalsell = $scope.orderlist.map(function(i) {
                        return parseFloat(i.paid_amount);
                    });
                    $scope.totalOrderCost = totalsell.reduce(add, 0);
                }

            }).error(function(error) {
                console.log("Error getting item for business", error);
            });
        }

        if ($scope.businessSession.business_id) {
            $timeout(function() {
                $scope.getOrderlistByBus_id();
            }, 1000);
        }

        if ($scope.businessSession.business_id) {

            $http.get(baseURL + 'getallorderstatus/' + $scope.businessSession.business_id).success(function(result) {
//                 console.log(result);
            	$scope.allOrderStatus = result.record;

            }).error(function(error) {
                console.log("Error getting order status list", error);
            });
        };

        $scope.viewbasicsInfodetails = function() {
            var business_id = $scope.businessSession.business_id;
            $http.get(baseURL + 'viewbasicinfodetails/' + business_id).success(function(res) {
                $scope.basicsInfodetails = res;
            }).error(function() {
                console.log("Please check your internet connection or data source..");
            });
        }

        $scope.viewbasicsInfodetails();

        
        //fuction for get order details
        $scope.getOrderDetails = function() {
        	
            var orderid = $routeParams.payment_id;
            $scope.orderid = $routeParams.payment_id;
            $.LoadingOverlay("show");
            $http.get(baseURL + 'getOrderDetails/' + orderid).success(function(res) {
                //console.log("res:",res);
                if (res.status == true) {
                    var id = res.record[0].user_id;

                    //orderlist with its item description
                    if(res.record)
                    var singleitem = _.each(res.record, function(someThing) {
                        someThing.itemdescription = _.where($scope.items, {
                            item_id: someThing.item_id
                        })[0];
                    });


                    $scope.Order.details = singleitem;
                   
                    var subtotal = res.record.map(function(i) {
                        return parseFloat(i.itemdescription.item_price) * i.quantity;
                    });

                    function add(a, b) {
                        return a + b;
                    }

                    $scope.Order.subtotal = subtotal.reduce(add, 0);

                    var data = {
                        'id': res.record[0].user_id,
                        'payment_id': $routeParams.payment_id
                    }

                    //shipping address and default address
                    $http.post(baseURL + 'getuseradderess/', data).success(function(res1) {
                        if (res1.status == true) {
                            $scope.Order.address = res1.record;
                            $scope.Order.total = res1.record.shippingaddress.subtotal;
                        }
                    }).error(function(error1) {
                        console.log("error to get default address info");
                    });

                    $timeout(function() {
                        console.log("Order:", $scope.Order);
                        $.LoadingOverlay("hide");
                    }, 1000);

                } else {
                    console.log("error to get order details");
                }
            }).error(function(error) {
                console.log("Error getting item for business", error);
            });

        }
        if ($routeParams.payment_id) {
            $timeout(function() {
                $scope.getOrderDetails();
            }, 2000);

        }


        $scope.allitembyBusinessId = function() {
            $http.get(baseURL + 'itemsbusinessid/' + $scope.businessSession.business_id).success(function(res) {
                $scope.items = res;
            }).error(function(error) {
                console.log("Error getting item for business", error);
            });
        };
        $scope.allitembyBusinessId();

        $scope.callOrderDetailspage = function(details) {
            $scope.details = details;
//            $location.path('/orderdetails/' + details.payment_id);
            $location.path('/invoice/' + details.payment_id);
        }

        $scope.showhide = function(id) {
            if (document.getElementById(id).style.display == 'none') {
                document.getElementById(id).style.display = 'block';
            } else {
                document.getElementById(id).style.display = 'none';
            }
        };
    });
