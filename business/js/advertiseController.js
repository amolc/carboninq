SampleApplicationModule.controller('advertiseController', function($rootScope, $scope, $location, $http, $routeParams, $timeout, store) {

//    $rootScope.islogin = false;
    $scope.businessSession = JSON.parse(localStorage.getItem('businessSession'));
    
    $scope.business_name=$scope.businessSession.business_name;
    $scope.getTotal = function() {
        $http.get(baseURL + 'getWalletTotal/' + $scope.businessSession.business_id).success(function(res) {
            $scope.balance = res.total;
        }).error(function(error) {
            console.log("Error getting item for business", error);
        });
    };
    $scope.getTotal();
    
    $scope.allitems = function() {
        $http.get(baseURL + 'getAllItems/' + $scope.businessSession.business_id).success(function(res) {
        	
//        	alert($scope.item_id);
        	$scope.items = res;
        	
            
        }).error(function(error) {
            console.log("Error getting item for business", error);
        });
    };
    $scope.allitems();
    
    $scope.allitembyBusinessId = function() {
        $http.get(baseURL + 'getAllItemWithPrice/' + $scope.businessSession.business_id).success(function(res) {
            $scope.data = res;
            $scope.selected_id=$scope.data[0].item_id;
            $scope.change_items($scope.selected_id);
//            $scope.items=[];
//        	$scope.items1 = res;
        	
        }).error(function(error) {
            console.log("Error getting item for business", error);
        });
    };
    $scope.allitembyBusinessId();
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
    
    $scope.change_items=function(id)
    {
    	$scope.flag=false;
//    	$scope.selected_id=id;
    	$scope.data1=[];
    	for(var i=0;i<$scope.data.length;i++)
    	{
    		if(id==$scope.data[i]['item_id'])  
    		{
    			$scope.data1=$scope.data[i];
    			
    			var params={};
            		params.item_id=$scope.data1.item_id;
            		
            		params.currentDate=new Date('Y-m-d');
            		var date = new Date();
            		$scope.CurrentDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
//            		alert($scope.FromDate);
//            		params.position='First Position';
            		
            		$http.post(baseURL + 'checkAdvertise', {item_id:$scope.data1.item_id,currentDate:$scope.CurrentDate,position:'First Position'}).success(function(res1) {
                    $scope.response1 = res1;
                    if($scope.response1.length>0)
                    {
//                       $scope.data1.first_position=true; 
                       if($scope.response1[0].business_id==$scope.businessSession.business_id)
                       {
                    	   $scope.flag=true;
                       }
                       if($scope.response1[0].type=='Quarterly')
                       {
                    	   $scope.data1.first_position1=true;
                       }
                       if($scope.response1[0].type=='Monthly')
                       {
                    	   $scope.data1.first_position=true;
                       }
                     }
                     else
                     {                      }
            		 });
            		params.position='Second Position';
            		$http.post(baseURL + 'checkAdvertise', {item_id:$scope.data1.item_id,currentDate:$scope.CurrentDate,position:'Second Position'}).success(function(res1) {
                        $scope.response2 = res1;
                        if($scope.response2.length>0)
                        {
//                           $scope.data1.second_position=true;
                           if($scope.response2[0].business_id==$scope.businessSession.business_id)
                           {
                        	   $scope.flag=true;
                           }
                           if($scope.response2[0].type=='Quarterly')
                           {
                        	   $scope.data1.second_position1=true;
                           }
                           if($scope.response2[0].type=='Monthly')
                           {
                        	   $scope.data1.second_position=true;
                           }
                         }
                         else
                         {                      }
                	});
//            		params.position='Third Position';
            		$http.post(baseURL + 'checkAdvertise', {item_id:$scope.data1.item_id,currentDate:$scope.CurrentDate,position:'Third Position'}).success(function(res1) {
                        $scope.response3 = res1;
                        if($scope.response3.length>0)
                        {
//                           $scope.data1.third_position=true;
                           if($scope.response3[0].business_id==$scope.businessSession.business_id)
                           {
                        	   $scope.flag=true;
                           }
                           if($scope.response3[0].type=='Quarterly')
                           {
                        	   $scope.data1.third_position1=true;
                           }
                           if($scope.response3[0].type=='Monthly')
                           {
                        	   $scope.data1.third_position=true;
                           }
                         }
                         else
                         {                      }
                	});
//            		params.position='Forth Position';
            		$http.post(baseURL + 'checkAdvertise', {item_id:$scope.data1.item_id,currentDate:$scope.CurrentDate,position:'Fourth Position'}).success(function(res1) {
                        $scope.response4 = res1;
                        if($scope.response4.length>0)
                        {
//                           $scope.data1.fourth_position=true;
                           if($scope.response4[0].business_id==$scope.businessSession.business_id)
                           {
                        	   $scope.flag=true;
                           }
                           if($scope.response4[0].type=='Quarterly')
                           {
                        	   $scope.data1.fourth_position1=true;
                           }
                           if($scope.response4[0].type=='Monthly')
                           {
                        	   $scope.data1.fourth_position=true;
                           }
                         }
                         else
                         {                      }
                	});
//            		params.position='Fifth Position';
            		$http.post(baseURL + 'checkAdvertise', {item_id:$scope.data1.item_id,currentDate:$scope.CurrentDate,position:'Fifth Position'}).success(function(res1) {
                        $scope.response5 = res1;
                        if($scope.response5.length>0)
                        {
//                           $scope.data1.fifth_position=true;
                           if($scope.response5[0].business_id==$scope.businessSession.business_id)
                           {
                        	   $scope.flag=true;
                           }
                           if($scope.response5[0].type=='Quarterly')
                           {
                        	   $scope.data1.fifth_position1=true;
                           }
                           if($scope.response5[0].type=='Monthly')
                           {
                        	   $scope.data1.fifth_position1=false;
                        	   $scope.data1.fifth_position=true;
                           }
                         }
                         else
                         {                      }
                	});
    		}
    	}
//    	alert(JSON.stringify($scope.data1));
    }
    $scope.applyHere=function(data,position,type)
    {
    	$scope.select_data=data;
    	$scope.select_data.position=position;
    	
    	
    	var date = new Date();
    	$scope.FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    	$scope.select_data.startDate=$scope.FromDate;
    	if(type==1)
    	{
    		$scope.EndDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 4)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    		$scope.select_data.endDate=$scope.EndDate;
    		$scope.select_data.type='Quarterly';
    		$scope.select_data.first_monthly=$scope.select_data.first_monthly*3;
    	}
    	else
    	{
    		$scope.EndDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 2)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    		$scope.select_data.endDate=$scope.EndDate;
    		$scope.select_data.type='Monthly';
    	}
    	  
    	localStorage.setItem('buy_info',(JSON.stringify($scope.select_data)));
    	$location.path("/preview" );
    }
    
});
