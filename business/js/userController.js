SampleApplicationModule
    .controller('userController', function($rootScope, $scope, $location, $http, store, $timeout, $routeParams , Upload) {

        
        $scope.init = function() {
            $scope.businessSession = store.get('businessSession') || {};
        };

        $scope.init();
        $scope.showhide = function(id) {
            if (document.getElementById(id).style.display == 'none') {
                document.getElementById(id).style.display = 'block';
            } else {
                document.getElementById(id).style.display = 'none';
            }
        };
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
        
        $scope.item = {
            'item_name': "",
            'item_description': "",
            'item_price': "",
            'item_imagename': "",
            'item_image': "",
            'item_category': "",
            'category_id': '',
            'business_id': $scope.businessSession.business_id
        };

        $scope.colorobj = [];
        $scope.itemsizeobj = [];

        $scope.alluserbyBusinessId = function() {
//            $http.get(baseURL + 'usersbusinessid/' + $scope.businessSession.business_id).success(function(res) {
          	$http.get(baseURL + 'usersbusinessid/40').success(function(res) {
                $scope.users = res;
            }).error(function(error) {
                console.log("Error getting user for business", error);
            });
        };
        $scope.alluserbyBusinessId();

        

        $scope.del = function(id) {
            $http.get(baseURL + 'deleteuser/' + id).success(function(res) {
                if (res.status === true) {
                    $scope.deletemsg = 'user deleted';
                    $scope.showdeletemsgmsg = true;
                    $timeout(function() {
                        $scope.showdeletemsgmsg = false;
                    }, 3000);
//                    $location.path('/item');
                    $scope.alluserbyBusinessId();
                } else {
                    $scope.deleterrmsg = 'user not deleted';
                    $scope.showdeleterrmsg = true;
                    $timeout(function() {
                        $scope.showdeleterrmsg = false;
                    }, 3000);
                }
            }).error(function() {
                console.log("Please check your internet connection or data source..");
            });
        };

        $scope.confirmcatdel = function(user_id) {
            $scope.userid = user_id;
        };


    });
