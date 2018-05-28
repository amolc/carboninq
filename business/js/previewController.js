
SampleApplicationModule.controller('previewController', function($rootScope, $scope, $location, $http, $routeParams, $timeout, store,$sce) {
	 $scope.businessSession = store.get('businessSession') || {};

$scope.data=JSON.parse(localStorage.getItem('buy_info'));

$scope.goto = function(page) {
    $location.path(page);
};
$scope.goto1 = function(page) {
    $('#myModal').modal('hide');
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
$scope.showhide = function(id) {
    if (document.getElementById(id).style.display == 'none') {
        document.getElementById(id).style.display = 'block';
    } else {
        document.getElementById(id).style.display = 'none';
    }
};
$('#id_loading').hide();
$scope.buyAdvertise = function (code, result) {
//	 alert($scope.amount);
    			$('#id_error_meesage').text('');
    			console.log(result);
			   $('#id_submit').hide();
			   $('#id_loading').show();
   	    	  
				var params = {};
				var params1 = {};
				var params2 = {};
				
				var userDetails = JSON.parse(localStorage.getItem('businessSession'));
				var b = JSON.parse(localStorage.getItem('buy_info'));
               
	            params.userid = 20;
		        params.business_id = userDetails.business_id;
		        params.status = 1;
		        params.created_on = new Date();
		        params.amount = parseInt(b.first_monthly);
		        $scope.amount=params.amount;
		        params.item_id = b.item_id;
		        params.item_name = b.item_name;
		        params.position = b.position;
		        params.type = b.type;
		        params.startDate = b.startDate;
		        params.endDate = b.endDate;
		        
		        params.email = userDetails.email;
		        params.mobile = userDetails.phone;
//		        params.orderType = localStorage.getItem('type');

//		        var token = result.id;
		        
		        $http.post(baseURL+'buyAdvertise',params).success(function(res) {
		        	if(res.status == true){
		        		 $('#id_submit').show();
						   $('#id_loading').hide();
						   localStorage.removeItem('buy_info');
		        		 $('#myModal').modal('show');
		        	}else{
		        		  $('#id_submit').show();
						   $('#id_loading').hide();
						   $('#myModal1').modal('show');
						   $scope.message=res.message;
//		        		 alert('Something Went Wrong');
		        	}	    		                    

               }).error(function() {
               	$('#id_submit').show();
	       		    $('#id_loading').hide();
                        // alert("Please check your internet connection or data source..");
               });
   	    	      			    	     						    
  		
		};
  });
