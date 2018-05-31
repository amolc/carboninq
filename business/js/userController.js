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
        $scope.username=$scope.businessSession.business_username;
        $scope.business_name=$scope.businessSession.business_name;
        
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

        $scope.allUser = function() {
            $http.get(baseURL + 'getCarboninqUsers').success(function(res) {
                $scope.userlist = res;
            }).error(function(error) {
                console.log("Error getting item for business", error);
            });
        };
        $scope.allUser();
        

        $scope.del = function(id) {
            $http.get(baseURL + 'deletecarboninquser/' + id).success(function(res) {
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
