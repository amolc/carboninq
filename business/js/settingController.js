SampleApplicationModule.controller('settingController', function($rootScope, $scope, $location, $http, $routeParams, $timeout, store) {

    $scope.businessSession = store.get('businessSession') || {};


    $scope.Basicinfo = {
        'brandName': "",
        'about': "",
        'brandlogoname': "",
        'brandlogo': ""
    };
    $scope.username=$scope.businessSession.business_username;
    $scope.hostName = $scope.businessSession.host_name;
    $scope.business_name=$scope.businessSession.business_name;
    $scope.getTotal = function() {
        $http.get(baseURL + 'getWalletTotal/' + $scope.businessSession.business_id).success(function(res) {
            $scope.balance = res.total;
        }).error(function(error) {
            console.log("Error getting item for business", error);
        });
    };
    $scope.getTotal();
    $scope.addBasicInfo = function(addBasicinfoform, Basicinfo) {
        $scope.Basicinfo.business_id = $scope.businessSession.business_id;
        $http.post(baseURL + 'addbasicinformation', $scope.Basicinfo).success(function(res) {
            $scope.response = res;
            if (res.status == false) {
                $scope.addbasicinfoerrmsg = res.message;
                $scope.showaddbasicinfoerrmsg = true;
                $timeout(function() {
                    $scope.showaddbasicinfoerrmsg = false;
                }, 3000);
            } else {
                $scope.addbasicinfomsg = res.message;
                $scope.showaddbasicinfomsg = true;
                $scope.viewbasicsInfodetails();
                $timeout(function() {
                    $scope.showaddbasicinfomsg = false;
                    $location.path("/viewbasicinfo");
                }, 3000);
            }

        }).error(function(error) {
            console.log("error while adding basic information", error);
        });

    };



    $scope.updateattachment = function() {
        var img = new Image();
        var newfile = document.getElementById("file_browse").files[0];
        var fileDisplayArea = document.getElementById('fileDisplayArea');
        var imageType = /image.*/;
        if (newfile.type.match(imageType)) {
            var oFReader = new FileReader();
            oFReader.onload = function(oFREvent) {
                $scope.attachname = document.getElementById("file_browse").files[0].name;
                console.log("attachname:", $scope.attachname);
                $scope.attachmentfile = oFReader.result;
                $scope.Basicinfo.brandlogoname = $scope.attachname;
                $scope.Basicinfo.brandlogo = $scope.attachmentfile;
                $scope.$apply();
                img.src = $scope.attachmentfile;
            };
            oFReader.readAsDataURL(newfile);
        } else {}
    };

    $scope.updateattachment1 = function() {
        var img = new Image();
        var newfile = document.getElementById("file_browse1").files[0];
        var fileDisplayArea = document.getElementById('fileDisplayArea');
        var imageType = /image.*/;
        if (newfile.type.match(imageType)) {
            var oFReader = new FileReader();
            oFReader.onload = function(oFREvent) {
                $scope.attachname1 = document.getElementById("file_browse1").files[0].name;
                console.log("$scope.attachname1:", $scope.attachname1);
                $scope.attachmentfile1 = oFReader.result;
                //console.log("$scope.attachmentfile1:",$scope.attachmentfile1);
                $scope.$apply();
                var reqObj = {
                    'brandlogoname': $scope.attachname1,
                    'brandlogo': $scope.attachmentfile1,
                    'settingId': $scope.basicsInfodetails.settingId,
                    'business_id': $scope.businessSession.business_id
                };

                $http.post(baseURL + 'updatebusineesslogo', reqObj).success(function(res) {
                    $scope.basicsInfodetails.brandlogo = $scope.attachmentfile1;
                    $scope.viewbasicsInfodetails();
                }).error(function(error) {
                    console.log("Error updating item image", error);
                });
                img.src = $scope.attachmentfile1;
            };
            oFReader.readAsDataURL(newfile);
        } else {}
    };

    $scope.clearImage1 = function(basicsInfodetails) {
       
        $http.post(baseURL + 'deletebusinesslogo', basicsInfodetails).success(function(res) {
            $scope.viewbasicsInfodetails();
        }).error(function() {
            console.log("Please check internet connection..");
        })
    }

    $scope.updateheaderinfo = function(){
        $http.post(baseURL + 'updateheaderinfo', $scope.basicsInfodetails).success(function(res) {
           
            if (res.status == true) {
                //$scope.viewbasicsInfodetails();
                $scope.updheaderinfomsg = 'Header information updated';
                $scope.showupdheaderinfomsg = true;
                $timeout(function() {
                    $scope.showupdheaderinfomsg = false;
                }, 3000);

            } else {

                $scope.updHeaderinfoerrmsg = 'Failed to update header information';
                $scope.showupdHeaderinfoerrmsg = true;
                $timeout(function() {
                    $scope.showupdHeaderinfoerrmsg = false;
                }, 3000);

            }
        }).error(function() {
            console.log("Please check internet connection..");
        });
    };

    $scope.updatefooterstyle = function(){
        $http.post(baseURL + 'updatefooterstyle', $scope.basicsInfodetails).success(function(res) {
            if (res.status == true) {
                $scope.updfoterstylemsg = 'Footer style information updated';
                $scope.showupdfoterstylemsg = true;
                $timeout(function() {
                    $scope.showupdfoterstylemsg = false;
                }, 3000);

            } else {

                $scope.updfoterstyleerrmsg = 'Failed to update Footer style information';
                $scope.showupdfoterstyleerrmsg = true;
                $timeout(function() {
                    $scope.showupdfoterstyleerrmsg = false;
                }, 3000);

            }
        }).error(function() {
            console.log("Please check internet connection..");
        });
    };

    $scope.updatefooterIconlink = function(){
         $http.post(baseURL + 'updatefootericons', $scope.basicsInfodetails).success(function(res) {
            if (res.status == true) {
                $scope.updfooterIconmsg = 'Footer icons links updated';
                $scope.showupdfooterIconmsg = true;
                $timeout(function() {
                    $scope.showupdfooterIconmsg = false;
                }, 3000);

            } else {

                $scope.updbasicinfoerrmsg = 'Failed to update footer links';
                $scope.showupdbasicinfoerrmsg = true;
                $timeout(function() {
                    $scope.showupdbasicinfoerrmsg = false;
                }, 3000);

            }
        }).error(function() {
            console.log("Please check internet connection..");
        })
    }

    $scope.updatebasicinfo = function() {
        
        $http.post(baseURL + 'updatebasicinfo', $scope.basicsInfodetails).success(function(res) {
            if (res.status == true) {
                $scope.viewbasicsInfodetails();
                $scope.updbasicinfomsg = res.message;
                $scope.showupdbasicinfomsg = true;
                $timeout(function() {
                    $scope.showupdbasicinfomsg = false;
                }, 3000);

            } else {

                $scope.updbasicinfoerrmsg = res.message;
                $scope.showupdbasicinfoerrmsg = true;
                $timeout(function() {
                    $scope.showupdbasicinfoerrmsg = false;
                }, 3000);

            }
        }).error(function() {
            console.log("Please check internet connection..");
        })
    }

    $scope.clearImage = function() {
        $scope.Basicinfo.brandlogoname = '';
        $scope.Basicinfo.brandlogo = '';
        $scope.attachname = '';
    };


    $scope.goto = function(page) {
        $location.path(page);
    };

    $scope.deletebasicinfo = function() {
        $http.post(baseURL + 'deletebasicinformation' , $scope.basicsInfodetails).success(function(res) {
            if (res.status == true) {
                $scope.delbasicinfomsg = res.message;
                $scope.showdelbasicinfomsg = true;
                $timeout(function() {
                    $scope.showdelbasicinfomsg = false;
                    $location.path('/category');
                }, 3000);
            } else {

                $scope.delbasicinfoerrmsg = res.message;
                $scope.showdelbasicinfoerrmsg = true;
                $timeout(function() {
                    $scope.showdelbasicinfoerrmsg = false;
                }, 3000);

            }
        }).error(function() {
            console.log("Please check your internet connection or data source..");
        });
    }
    $scope.viewbasicsInfodetails = function() {
        var business_id = $scope.businessSession.business_id;
        $http.get(baseURL + 'viewbasicinfodetails/' + business_id).success(function(res) {
            $scope.basicsInfodetails = res;
        }).error(function() {
            console.log("Please check your internet connection or data source..");
        });
    }

    $scope.viewbasicsInfodetails();

    $scope.managesetting = function(page) {
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
