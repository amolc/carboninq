app.controller('admincontroller', function ($scope, $http, $window, $location, $rootScope, $filter) {

$scope.Date = new Date();
$scope.SuperCategory="";
$scope.Category="";
$scope.message="";
$("#error").hide();
$("#success").hide();
//********************************************************************************* */
//Authenticate Administrator

    $scope.authenticateAdmin = function (req, res) {
        var username = $scope.username;
        var password = $scope.password;
        if($scope.password === undefined && $scope.username==undefined)
        {
        	$scope.message="Complete the required entry field";
        	 $("#error").show();
        }
        else if($scope.username==undefined || $scope.username === '')
        {
        	$scope.message="Email address can not empty";
       	    $("#error").show();
        }
        else if($scope.password === undefined || $scope.password === '')
        {
        	$scope.message="Password can not empty";
        	 $("#error").show();
        }
       
        else
        {
        	$scope.data = {};
        	$scope.data.username = username;
        	$scope.data.password = password;
        	console.log($scope.data);
        	$http.post(baseurl + 'login/', $scope.data).success(function (res) {
        		console.log("res", res[0]);
//        		alert(res.status==='200');
        		if(res.status==='200')
        		{
        			$scope.userDetails = res.data[0];
        				$scope.UserType = $scope.userDetails.UType;
        				window.localStorage.setItem('UserId', $scope.userDetails.UserId);
        				window.localStorage.setItem('UserType',$scope.userDetails.UType);
        				window.localStorage.setItem('Name', $scope.userDetails.Name);   
        				window.localStorage.setItem('Email', $scope.userDetails.Email);
        				$scope.UType = $scope.userDetails.UType;
        				console.log($scope.UserType);
        				$window.location = "dashboard.html";
        		}
        		else
        		{
        			$scope.message=res.message;
    				$("#error").show();
        		}
        		}).error(function (err) {
        			$scope.message="Your User Name or Password is incorrect. Please try again.";
        			$("#error").show();
        		});
        	}
        }

//***********************************************************************************
  
//******Get All Super Categoy *************//
    $scope.getAllSuperCategory = function (req, res) {

        if (window.localStorage.getItem('UserId') <= "0") {
            $window.location = 'index.html';
        }
        $scope.UType =  window.localStorage.getItem('UserType');
       // console.log($scope.UType)
        $http.get(baseurl + 'getAllSuperCategory').success(function (res) {

            if (res.status == '200') {
            	$scope.superCategoryList = res.data;
            	$scope.SuperCategory=$scope.superCategoryList[0].id;
            	
            }else {
               
                $scope.superCategoryList = [];
            }

        }).error(function () {

        });
    }

    
//*****End Get All Super Category *********//
    
    
  //******Get All Super Categoy By Id *************//
    $scope.getAllSuperCategoryById = function (req, res) {
    	var url = window.location.href;
        var parts = url.split("?");
        var urlparams = parts[1].split('=');
        var catid = urlparams[1];    

        if (window.localStorage.getItem('UserId') <= "0") {
            $window.location = 'index.html';
        }
        $scope.UType =  window.localStorage.getItem('UserType');
       // console.log($scope.UType)
        $http.get(baseurl + 'getAllSuperCategoryById/'+catid).success(function (res) {

            if (res.status == '200') {
            	$scope.superCategoryData = res.data[0];
            }else {
               
                $scope.superCategoryData = [];
            }

        }).error(function () {

        });
    }

    
//*****End Get All Super Category By Id *********//
    
    
    
//***** Save Category ***************************************************
    $scope.saveSuperCategory = function(){
    			if($scope.CategoryName === undefined || $scope.CategoryName=="")
        		{
        				$scope.message="Please fill category name";
        	 			$("#error").show();
        	 			$("#success").hide();
        		}
    			else
    			{
    				var data={
    						CategoryName:$scope.CategoryName
    				};
    				$http.post(baseurl + 'addSuperCategory/',data).success(function(res) {
    	            $scope.response = res;
    	             console.log(res);
    	            if (res.status == '200') {
    	            	$scope.message=res.message;
    	            	$window.location = 'super-category.html';
        				$("#success").show();
        				$("#error").hide();
    	            } else {
    	            	$scope.message=res.message;
        	 			$("#error").show();
        	 			$("#success").hide();
    	            }
    				}).error(function() {
    	                // alert("Please check your internet connection or data source..");
    				});
    	
    			}
    		}

//******End Save Super Category *********************************************************
    
    
    
  //***** Update Super Category ***************************************************
      $scope.updateSuperCategory = function(){
      			if($scope.superCategoryData.CategoryName === undefined || $scope.superCategoryData.CategoryName=="")
          		{
          				$scope.message="Please fill category name";
          	 			$("#error").show();
          	 			$("#success").hide();
          		}
      			else
      			{
      				var data={
      						CategoryName:$scope.superCategoryData.CategoryName,
      						id:$scope.superCategoryData.id,
      				};
      				$http.post(baseurl + 'updateSuperCategory/',data).success(function(res) {
      	            $scope.response = res;
      	            
      	             console.log(res);
      	            if (res.status == '200') {
      	            	$scope.message=res.message;
      	            	$window.location = 'super-category.html';
          				$("#success").show();
          				$("#error").hide();
      	            } else {
      	            	$scope.message=res.message;
          	 			$("#error").show();
          	 			$("#success").hide();
      	            }
      				}).error(function() {
      	                // alert("Please check your internet connection or data source..");
      				});
      	
      			}
      		}

  //******End Edit Super Category *********************************************************
      
      
    //***** Delete Super Category ***************************************************
      $scope.deleteSuperCategory = function(id){
    	  $scope.super_category_id=id;
    	  $('#myModal').modal('show');
      }
      
      $scope.deleteCategory = function(id){
    	  $scope.category_id=id;
    	  $('#myModalCategory').modal('show');
      }
      
      
      $scope.confirmDelete = function(){
      			var data={
      						id:$scope.super_category_id,
      				};
      				$http.post(baseurl + 'deleteSuperCategory/',data).success(function(res) {
      	            $scope.response = res;
      	            
      	             console.log(res);
      	            if (res.status == '200') {
      	            	$scope.message=res.message;
      	            	
      	            	$('#myModal').modal('hide');
      	            	success_message($scope.message);
      	            	$scope.getAllSuperCategory();
      	            } else {
      	            	$scope.message=res.message;
      	            	error_message($scope.message);
      	            }
      				}).error(function() {
      	                // alert("Please check your internet connection or data source..");
      				});
      	
      			}
      		

  //******End Edit Category *********************************************************
     
      
      
      $scope.confirmDeleteCategory = function(){
			var data={
						id:$scope.category_id,
				};
				$http.post(baseurl + 'deleteCategory/',data).success(function(res) {
	            $scope.response = res;
	            
	             console.log(res);
	            if (res.status == '200') {
	            	$scope.message=res.message;
	            	
	            	$('#myModalCategory').modal('hide');
	            	success_message($scope.message);
	            	$scope.getAllCategory();
	            } else {
	            	$scope.message=res.message;
	            	error_message($scope.message);
	            }
				}).error(function() {
	                // alert("Please check your internet connection or data source..");
				});
	
			}
		

//******End Edit Category *********************************************************
   
    //***** Save Category ***************************************************
        $scope.saveCategory = function(){
        	
        			if($scope.SuperCategory === undefined || $scope.SuperCategory=="")
            		{
            				$scope.message="Please fill super category";
            	 			$("#error").show();
            	 			$("#success").hide();
            		}
        			else if($scope.Category === undefined || $scope.Category=="")
        			{
        				$scope.message="Please fill category name";
        	 			$("#error").show();
        	 			$("#success").hide();
        			}
        			else
        			{
        				var data={
        						Category:$scope.Category,
        						create_at:new Date(),
        						SuperCategory:$scope.SuperCategory,
        						update_at:new Date(),
        				};
        				$http.post(baseurl + 'addCategory/',data).success(function(res) {
        	            $scope.response = res;
        	             console.log(res);
        	            if (res.status == '200') {
        	            	$scope.message=res.message;
        	            	$window.location = 'category.html';
            				$("#success").show();
            				$("#error").hide();
        	            } else {
        	            	$scope.message=res.message;
            	 			$("#error").show();
            	 			$("#success").hide();
        	            }
        				}).error(function() {
        	                // alert("Please check your internet connection or data source..");
        				});
        	
        			}
        		}

    //******End Save Category *********************************************************
        
      //******Get All Categoy *************//
        $scope.getAllCategory = function (req, res) {

            if (window.localStorage.getItem('UserId') <= "0") {
                $window.location = 'index.html';
            }
            $scope.UType =  window.localStorage.getItem('UserType');
           // console.log($scope.UType)
            $http.get(baseurl + 'getAllCategory').success(function (res) {

                if (res.status == '200') {
                	$scope.CategoryList = res.data;
                	
                	
                }else {
                   
                    $scope.CategoryList = [];
                }

            }).error(function () {

            });
        }

        
    //*****End Get All Super Category *********//     
        
      //******Get All Super Categoy By Id *************//
        $scope.getAllCategoryById = function (req, res) {
        	var url = window.location.href;
            var parts = url.split("?");
            var urlparams = parts[1].split('=');
            var catid = urlparams[1];    

            if (window.localStorage.getItem('UserId') <= "0") {
                $window.location = 'index.html';
            }
            $scope.UType =  window.localStorage.getItem('UserType');
           // console.log($scope.UType)
            $http.get(baseurl + 'getAllCategoryById/'+catid).success(function (res) {

                if (res.status == '200') {
                	$scope.CategoryData = res.data[0];
                }else {
                   
                    $scope.CategoryData = [];
                }

            }).error(function () {

            });
        }

        
    //*****End Get All Super Category By Id *********//
        
        
        
        //***** Update Super Category ***************************************************
            $scope.updateCategory = function(){
            			if($scope.CategoryData.Category=== undefined || $scope.CategoryData.Category=="")
                		{
                				$scope.message="Please fill category name";
                	 			$("#error").show();
                	 			$("#success").hide();
                		}
            			else if($scope.CategoryData.SuperCategory=== undefined || $scope.CategoryData.SuperCategory=="")
                		{
                				$scope.message="Please fill super category name";
                	 			$("#error").show();
                	 			$("#success").hide();
                		}
            			else
            			{
            				var data={
            						Category:$scope.CategoryData.Category,
            						SuperCategory:$scope.CategoryData.SuperCategory,
            						id:$scope.CategoryData.id,
            				};
            				$http.post(baseurl + 'updateCategory/',data).success(function(res) {
            	            $scope.response = res;
            	            
            	             console.log(res);
            	            if (res.status == '200') {
            	            	$scope.message=res.message;
            	            	$window.location = 'category.html';
                				$("#success").show();
                				$("#error").hide();
            	            } else {
            	            	$scope.message=res.message;
                	 			$("#error").show();
                	 			$("#success").hide();
            	            }
            				}).error(function() {
            	                // alert("Please check your internet connection or data source..");
            				});
            	
            			}
            		}

        //******End Edit Super Category *********************************************************
            

})
    .controller('NewPLogCtrl', function ($scope, $http, $window, $location, $rootScope, $filter) {

    })

    .directive('rating', function () {
        return {
            restrict: "AE",
            scope: {
                bindedModel: "=ngModel"
            },
            template: "<div style=\"font-size: 24px; color: #FEBF00\">\n            <span class=\"glyphicon .glyphicon-star-empty\" ng-class=\"bindedModel > 0 ? 'glyphicon-star': 'glyphicon-star-empty'\"></span>\n            <span class=\"glyphicon .glyphicon-star-empty\" ng-class=\"bindedModel > 1 ? 'glyphicon-star': 'glyphicon-star-empty'\"></span>\n            <span class=\"glyphicon .glyphicon-star-empty\" ng-class=\"bindedModel > 2 ? 'glyphicon-star': 'glyphicon-star-empty'\"></span>\n            <span class=\"glyphicon .glyphicon-star-empty\" ng-class=\"bindedModel > 3 ? 'glyphicon-star': 'glyphicon-star-empty'\"></span>\n            <span class=\"glyphicon .glyphicon-star-empty\" ng-class=\"bindedModel > 4 ? 'glyphicon-star': 'glyphicon-star-empty'\"></span>\n            </div>",
            link: function (scope, element, attrs) {
                // console.log(attrs);
            }
        }
    });

function JSONToCSVConvertor(JSONData,colArray ,ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var colArr = typeof colArray != 'object' ? JSON.parse(colArray) : colArray;
    var CSV = '';
    //Set Report title in first row or line

    //console.log("testing column array -- "+colArr['sales_date']);

    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {

            if(colArr.hasOwnProperty(index)){
                 row += colArr[index] + ',';
                 console.log("teting column heading from array "+index);
            }/*else{
                //Now convert each value to string and comma-seprated
                row += index + ',';
            }*/

        }
        console.log("teting column heading "+row);
        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
           if(colArr.hasOwnProperty(index)){
               // row += '"' + arrData[i][index] + '",';
               if(index=='deliveryTimeSlot1'){
                       if(arrData[i][index] == 0){
                        // $scope.customerList.deliveryTimeSlot1 = "Standard - 900hrs -2200hrs";
                        row += '"Standard - 900hrs -2200hrs",';
                       }else if(arrData[i][index] == 1){
                        // $scope.customerList.deliveryTimeSlot1 = "Slot A (09:00 - 12:00)";
                         row += '"Slot A (09:00 - 12:00)",';
                       }else if(arrData[i][index] == 2){
                         //$scope.customerList.deliveryTimeSlot1 = "Slot B (12:00 - 15:00)";
                         row += '"Slot B (12:00 - 15:00)",';
                       }else if(arrData[i][index] == 3){
                        // $scope.customerList.deliveryTimeSlot1 = "Slot C (15:00 - 18:00)";
                         row += '"Slot C (15:00 - 18:00)",';
                       }else{
                        // $scope.customerList.deliveryTimeSlot1 = "Slot D (18:00 - 22:00)";
                         row += '"Slot D (18:00 - 22:00)",';
                       }
                  }else if(index=='Id'){
                       row += '"DOR0' + arrData[i][index] + '",';
                  }else if(index=='qty'){
                       row += '"' + arrData[i][index] + ' Box",';
                  }else if(index=='receivedDate'){
                       row += '"' + arrData[i][index] + ' '+ arrData[i]['receivedTime'] +'",';
                  }else if(index=='totalprice'){
                       row += '"$ ' + arrData[i][index] + '",';
                  }else{
                     row += '"' + arrData[i][index] + '",';
                  }
            }
        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "Desibites_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
