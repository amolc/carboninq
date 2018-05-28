SampleApplicationModule.controller('businessLoginController', function($rootScope, $scope, $location, $http, $routeParams, $timeout, store) {

    $rootScope.islogin = false;

    $scope.init = function() {
        $scope.businessSession = store.get('businessSession') || {};
    };

    $scope.user = {
        username: '',
        password: ''
    };

    $scope.business_name = {
        business_name: '',
        business_address: '',
        email_id: '',
        business_username: '',
        business_password: ''
    };


    $scope.login = function(signinform, user) {

        if (signinform.$valid) {
            $http.post(baseURL + 'businesslogin', user).success(function(res) {
            	
            	console.log(res);
                if (res.status === false) {

                } else {
                    var businessSession = {
                        'business_address': res.record[0].business_address,
                        'business_id': res.record[0].business_id,
                        'host_name': res.record[0].host_name,
                        'business_name': res.record[0].business_name,
                        'business_username': res.record[0].business_username,
                        'email_id': res.record[0].email_id,
                        'superadmin_id': res.record[0].superadmin_id,
                        'islogin': true
                    };
                    store.set('businessSession', businessSession);
                    $scope.init();
                    $location.path("/viewbasicinfo");
                }
            }).error(function() {
                alert("Please check your internet connection or data source..");
            });
        }
    };

    $scope.signup = function(signupfrm) {
        if (signupfrm.$valid) {
            $http.post(baseURL + 'addbusiness', $scope.businessdata).success(function(res) {
                if (res.status === true) {
                    $scope.signupmsg = 'Account Created.Please Login In';
                    $scope.showsuccess = true;
                    $timeout(function() {
                        $scope.showsuccess = false;
                    }, 2000);
                    document.getElementById("signupfrmid").reset();
                    $scope.signupfrm.$setPristine();
                } else {
                    $scope.alradyregistermsg = 'username already register';
                    $scope.showalreadyregimsg = true;
                    $timeout(function() {
                        $scope.showalreadyregimsg = false;
                    }, 2000);
                }
            }).error(function(error) {
                console.log("error creating account", error);
            });
        } else {
            //console.log("all fields area compulsory ..");
        }

    };

    $scope.logout = function() {
        store.remove('businessSession');
        $location.path('/businesslogin');
    };
});
