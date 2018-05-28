SampleApplicationModule.controller('MCategoryController', function($rootScope, $scope, $location, $http, store , $timeout) {

    $scope.init = function() {
        $scope.businessSession = store.get('businessSession') || {};
    };
    $scope.init();

    //$rootScope.categoryForMun;
    $scope.adminusername = loginuser;
    $scope.maincategory = {
        business_id: $scope.businessSession.business_id,
        maincatg_name: '',
        maincatg_alias: '',
        maincatg_description: ''
    };

    $scope.category = {
        maincatg_name: '',
        maincatg_description: '',
        maincatg_alias: '',
        admin_id: ''
    };

    $scope.findusercat = function() {
        $http.get(baseURL + 'bus_maincategory/findmaincategorybyuser/' + $scope.businessSession.business_id).success(function(res) {
            $scope.response = res;
            if (res.status == 'false') {
                alert(res.message);
            } else {
                $scope.mainCategory = res;
               // $rootScope.categoryForMun = res;
            }

        }).error(function() {
            alert("Please check your internet connection or data source..");
        });
    }
    if ($scope.businessSession.business_id) {
        $scope.findusercat();
    }

    $scope.confirmdel = function(id){
        $scope.deletemaincatid = id ;
    }

    $scope.del = function(id) {
        $http.get(baseURL + 'bus_maincategory/deletemaincategory/' + id).success(function(res) {
            $scope.response = res;
            if (res.status == false) {
                alert(res.message);
            } else {
                $location.path('/main_category');
                 $scope.findusercat();
            }

        }).error(function() {
            alert("Please check your internet connection or data source..");
        });

    };

    $scope.addMainCategory = function(addmaincatform) {
        $scope.maincategory.business_id = $scope.businessSession.business_id;
        if (addmaincatform.$valid) {
            $http.post(baseURL + 'bus_maincategory/addmaincategory', $scope.maincategory).success(function(res) {
                
                if (res.status == false) {
                    $scope.addmaincaterrmsg = res.message;
                    $scope.showaddmaincaterrmsg = true;
                    $timeout(function() {
                        $scope.showaddmaincaterrmsg = false;
                        //$location.path("/main_category");
                    }, 3000);
                } else {
                    $scope.addmaincatmsg = 'main category added';
                    $scope.showaddmaincatmsg = true;
                    $timeout(function() {
                        $scope.showaddmaincatmsg = false;
                        $location.path("/main_category");
                    }, 3000);
                    
                }
                   

            }).error(function() {
                alert("Please check your internet connection or data source..");
            });
        }
    };

    $scope.goto = function(page) {
        $location.path(page);
    };

    $scope.edit = function(id) {
        $location.path('/editmain_category/' + id);
    };

    $scope.maincategorydata = function(id) {
        $location.path('/viewmain_category/' + id);
    };

    /*$scope.maincategorydata=function(id){
        alert("new");
        $location.path('/viewmain_category/'+id);   
    };*/

    $scope.showhide = function(id) {
        if (document.getElementById(id).style.display == 'none') {
            document.getElementById(id).style.display = 'block';
        } else {
            document.getElementById(id).style.display = 'none';
        }
    };

});


SampleApplicationModule.controller('MCategoryEditController', function($rootScope, $scope, $location, $http, $routeParams , store ,$timeout) {
    $scope.init = function() {
        $scope.businessSession = store.get('businessSession') || {};
    };
    $scope.init();

    $scope.maincategorydata = {
        business_id: $scope.businessSession.business_id,
        maincatg_name: '',
        maincatg_alias: '',
        maincatg_description: ''
    };

    var id = $routeParams.id;

    $http.get(baseURL + 'bus_maincategory/viewMainCategory/' + id).success(function(res) {
        $scope.maincategorydata = res;
    }).error(function() {
        alert("Please check your internet connection or data source..");
    });

    $scope.editMainCategory = function(editmaincatform) {
        if(editmaincatform.$valid){
            $scope.maincategorydata.business_id = $scope.businessSession.business_id;
            $http.post(baseURL + 'bus_maincategory/updateMainCategory', $scope.maincategorydata).success(function(res) {
                if (res.status == false) {
                    //alert(res.message);
                    $scope.updmaincaterrmsg = 'main category not updated';
                    $scope.showupdmaincaterrmsg = true;
                    $timeout(function() {
                        $scope.showupdmaincaterrmsg = false;
                       
                    }, 3000);
                } else {

                    $scope.updmaincatmsg = 'main category updated';
                    $scope.showupdmaincatmsg = true;
                    $timeout(function() {
                        $scope.showupdmaincatmsg = false;
                        $location.path("/main_category");
                    }, 3000);

                    
                }
            }).error(function() {
                alert("Please check your internet connection or data source..");
            });
        }
    };

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

});
