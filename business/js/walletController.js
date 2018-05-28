SampleApplicationModule
    .controller('walletController', function($rootScope, $scope, $location, $http, store, $timeout, $routeParams , Upload) {

        
        $scope.init = function() {
            $scope.businessSession = store.get('businessSession') || {};
        };

        $scope.init();
        $scope.business_name=$scope.businessSession.business_name;
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
        
        $scope.imageURL = imageURL;

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

        $scope.allitembyBusinessId = function() {
            $http.get(baseURL + 'getWalletTransaction/' + $scope.businessSession.business_id).success(function(res) {
                $scope.walletTransaction = res;
                $scope.deposited_amount=0;
                $scope.withdraw_amount=0;
                for(var i=0;i<$scope.walletTransaction.length;i++)
                {
                	if($scope.walletTransaction[i]['transaction_type']=='Credit')
                    {
                		 $scope.deposited_amount=$scope.deposited_amount+$scope.walletTransaction[i]['amount'];
                    }
                	if($scope.walletTransaction[i]['transaction_type']=='Debit')
                    {
                		$scope.withdraw_amount=$scope.withdraw_amount+$scope.walletTransaction[i]['amount'];
                    }
                }
            }).error(function(error) {
                console.log("Error getting item for business", error);
            });
        };
        $scope.getTotal = function() {
            $http.get(baseURL + 'getWalletTotal/' + $scope.businessSession.business_id).success(function(res) {
                $scope.balance = res.total;
            }).error(function(error) {
                console.log("Error getting item for business", error);
            });
        };
        $scope.allitembyBusinessId();  
        $scope.getTotal();
       
    });
