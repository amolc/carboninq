SampleApplicationModule.controller('SupplierController', function($rootScope, $scope, $location, $http, store, $timeout, $routeParams) {
    $scope.init = function() {
        $scope.businessSession = store.get('businessSession') || {};
        console.log($scope.businessSession);

    };
    $scope.init();

    $scope.supplier = {
        supplier_name: '',
        supplier_addr1: '',
        supplier_addr2: '',
        supplier_city: '',
        supplier_postalcode: '',
        supplier_email: '',
        supplier_phone: '',
        business_id: $scope.businessSession.business_id
    };
    $scope.username=$scope.businessSession.business_username;
    $scope.business_name=$scope.businessSession.business_name;
    $scope.getTotal = function() {
        $http.get(baseURL + 'getWalletTotal/' + $scope.businessSession.business_id).success(function(res) {
            $scope.balance = res.total;
        }).error(function(error) {
            console.log("Error getting item for business", error);
        });
    };
    $scope.getTotal();
    $scope.supplierbyBusinessId = function() {
      console.log('Get All Suppliers');
        $http.get(baseURL + 'supplierbyBusinessid/' + $scope.businessSession.business_id).success(function(res) {
            $scope.Supplier = res;
            console.log($scope.Supplier);
        }).error(function(error) {
            console.log("Error getting category for business", error);
        });
    };
  $scope.supplierbyBusinessId();

    $scope.supplierdel = function(id) {
        $http.get(baseURL + 'deleteSupplier/' + id).success(function(res) {
            if (res.status === true) {
                $scope.deletemsg = 'Supplier deleted';
                $scope.showdeletemsgmsg = true;
                $timeout(function() {
                    $scope.showdeletemsgmsg = false;
                }, 3000);
                $location.path('/supplier');
                $scope.supplierbyBusinessId();
            } else {
                $scope.deleterrmsg = 'Supplier not deleted';
                $scope.showdeleterrmsg = true;
                $timeout(function() {
                    $scope.showdeleterrmsg = false;
                }, 3000);
            }
        }).error(function() {
            console.log("Please check your internet connection or data source..");
        });
    };

    $scope.confirmcatdel = function(supplier_id) {
        $scope.supplierid = supplier_id;
    };

    $scope.addSupplier = function(supplierform, supplier) {
      console.log(supplier);
        if (supplierform.$valid) {
            $http.post(baseURL + 'addSupplier', $scope.supplier).success(function(res) {
                $scope.response = res;
                if (res.status === false) {
                    console.log(res.message);
                    $scope.addcaterrrmsg = res.message;
                    $scope.showaddcaterrrmsg = true;
                    $timeout(function() {
                        $scope.showaddcaterrrmsg = false;
                    }, 3000);
                } else {
                    $scope.addcatmsg = res.message;
                    $scope.showaddcatmsg = true;
                    $timeout(function() {
                        $scope.showaddcatmsg = false;
                        $location.path("/supplier");
                    }, 3000);
                }
            }).error(function(error) {
                console.log("Supplier", error);
            });
        }
    };

    $scope.goto = function(page) {
        $location.path(page);
    };

    $scope.supplieredit = function(id) {
        $location.path('/edit_supplier/' + id);
    };

    $scope.supplierview = function(id) {
        $location.path('/view_supplier/' + id);
    };

    var id = $routeParams.id;
    if (id) {
        $http.get(baseURL + 'singleSupplier/' + id).success(function(res) {
            $scope.supplierdata = res;
        }).error(function() {
            console.log("Please check your internet connection or data source..");
        });
    }

    $scope.editSupplier = function(editSupplierform) {
        console.log("edit test before validation");
        // if (editsupplierform.$valid) {
            console.log("edit test");
            $scope.supplierdata.business_id = $scope.businessSession.business_id;
          //  console.log( $scope.supplierdata);
              $http.post(baseURL + 'updateSupplier', $scope.supplierdata).success(function(res) {
                if (res.status === true) {
                    $scope.updatecatmsg = 'Supplier updated';
                    $scope.showupdatecatmsg = true;
                    $timeout(function() {
                        $scope.showupdatecatmsg = false;
                        $location.path("/supplier");
                    }, 3000);
                } else {
                    $scope.updateerrmsg = 'Supplier not updated';
                    $scope.showupdateerrmsg = true;
                    $timeout(function() {
                        $scope.showupdateerrcatmsg = false;
                    }, 3000);
                }
            }).error(function(error) {
                console.log("Error updating Supplier", error);
            });
        // }
    };

    $scope.showhide = function(id) {
        if (document.getElementById(id).style.display == 'none') {
            document.getElementById(id).style.display = 'block';
        } else {
            document.getElementById(id).style.display = 'none';
        }
    };

});
