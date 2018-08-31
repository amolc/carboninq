SampleApplicationModule
    .controller('itemController', function($rootScope, $scope, $location, $http, store, $timeout, $routeParams , Upload) {

    	$scope.opts = {
    		    dateFormat: 'dd/mm/yy',
    		    changeMonth: true,
    		    changeYear: true
    		  };
    		  $scope.data = {
    		    valor: "10/09/2013"
    		  };
        $scope.init = function() {
            $scope.businessSession = store.get('businessSession') || {};
        };

        $scope.init();

        $scope.imageURL = imageURL;

        $scope.inventory = {
            'item_name': "",
            'inventory_inventory': "",
        };

        $scope.colorobj = [];
        $scope.itemsizeobj = [];
        $scope.username=$scope.businessSession.business_username;
        $scope.business_name=$scope.businessSession.business_name;



        $scope.edit = function(id) {
            $location.path('/edit_inventory/' + id);
        };


        $scope.editinventory = function(editinventoryform) {
            console.log("$scope.inventorydata:",$scope.inventorydata);
//            console.log("$scope.findcategory.category_id:",$scope.findcategory.category_id);
            if (editinventoryform.$valid) {
                $scope.inventorydata.business_id = $scope.businessSession.business_id;
//                $scope.itemdata.category_id = $scope.findcategory.category_id;
                $http.post(baseURL + 'updateinventoryforcarboninq', $scope.inventorydata).success(function(res) {
                    if (res.status === true) {
                        $scope.updatecatmsg = 'item updated';
                        $scope.showupdatecatmsg = true;
                        $timeout(function() {
                            $scope.showupdatecatmsg = false;
                            $location.path("/inventory");
                            $scope.allitembyBusinessId();
                            $scope.allcategorybyBusinessId();

                        }, 3000);
                    } else {
                        $scope.updateerrcatmsg = 'inventory not updated';
                        $scope.showupdateerrcatmsg = true;
                        $timeout(function() {
                            $scope.showupdateerrcatmsg = false;
                        }, 3000);
                    }
                }).error(function(error) {
                    console.log("Error updating item", error);
                });
            }
        };
