
SampleApplicationModule.controller('paymentController', function($rootScope, $scope, $location, $http, $routeParams, $timeout, store,$sce) {
	Stripe.setPublishableKey('pk_test_f4AmpyV2vuql0QPEb2WHIQRo');
//	$scope.business_id='12';
	 $scope.businessSession = store.get('businessSession') || {};

	
	 $scope.orderFor = localStorage.getItem('type');
	 $scope.orderPrice = localStorage.getItem('price');
	 $scope.userDetails = JSON.parse(localStorage.getItem('userDetails'));
	 $('#id_submit').show();
	 $('#id_loading').hide();
	 $scope.invalidName = false;
	 $scope.invalidCardNumber = false;

	 $scope.business_name=$scope.businessSession.business_name;
	    $scope.getTotal = function() {
	        $http.get(baseURL + 'getWalletTotal/' + $scope.businessSession.business_id).success(function(res) {
	            $scope.balance = res.total;
	        }).error(function(error) {
	            console.log("Error getting item for business", error);
	        });
	    };
	    $scope.getTotal();
	    
	 $scope.bankdata={
			 name:'',
			 bank_name:'',
			 branch_name:'',
			 address:'',
			 country:'',
			 swift_code:'',
			 account_number:'',
			 business_id:$scope.businessSession.business_id
	 }
	    
	 $scope.stripeCallback = function (code, result) {
//		 alert($scope.amount);
         $('#id_error_meesage').text('');
         
         console.log(result);

//        if(($scope.name=="" || typeof $scope.name=='undefined') || 
//     		   (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test($scope.name) || ($scope.name.match(/^[0-9]+$/) != null)) ||
//     		   ($scope.cardNumber=="" || typeof $scope.cardNumber=="undefined") || 
//     		   !($scope.cardNumber.match(/^[0-9]+$/) != null) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test($scope.cardNumber) ||
//     		   ($scope.expiry=="" || typeof $scope.expiry=="undefined")||
//     		   ($scope.cvc=="" || typeof $scope.cvc=="undefined")){
        
         if(result.error){
       	   	  
       	  if(result.error != 'Invalid form submitted.'){
       		  $('#id_error_meesage').text(result.error.message);
       	  }else{
           	 if($scope.name=="" || typeof $scope.name=='undefined'){
           		 $scope.add_details.cardName.$invalid=true;
		   			 $scope.add_details.cardName.$pristine=false;	    	            	    	  	    	    	            	 
   	             $('#id_error_meesage').text(result.error.message);
		         }else if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test($scope.name) || ($scope.name.match(/^[0-9]+$/) != null)){
		        	 $scope.add_details.cardName.$invalid=true;
		   			 $scope.add_details.cardName.$pristine=false;
		   			 $scope.invalidName = true;
		         }
		   		 
		   		 if($scope.cardNumber=="" || typeof $scope.cardNumber=='undefined') {	    			   		
		   			 $scope.add_details.cardNumber.$invalid=true;
		   			 $scope.add_details.cardNumber.$pristine=false;    			
		   		 }else if(!($scope.cardNumber.match(/^[0-9]+$/) != null) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test($scope.cardNumber)){
		   			
		   			 $scope.add_details.cardNumber.$invalid=true;
		   			 $scope.add_details.cardNumber.$pristine=false;
		   			 $scope.invalidCardNumber = true;
		         }
		   		 
		   		if($scope.amount=="" || typeof $scope.amount=='undefined') {	    			   		
		   			 $scope.add_details.chargeAmount.$invalid=true;
		   			 $scope.add_details.chargeAmount.$pristine=false;    			
		   		 }else if(!($scope.chargeAmount.match(/^[0-9]+$/) != null) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test($scope.chargeAmount)){
		   			
		   			 $scope.add_details.chargeAmount.$invalid=true;
		   			 $scope.add_details.chargeAmount.$pristine=false;
		   			 $scope.invalidAmount = true;
		         }
		   		 
		   		if($scope.expiry=="" || typeof $scope.expiry=='undefined'){
		   			 $scope.add_details.expiry.$invalid=true;
		   			 $scope.add_details.expiry.$pristine=false;
			   		 }
			   		if($scope.cvc=="" || typeof $scope.cvc=='undefined'){
  			   		$scope.add_details.cvc.$invalid=true;
		   			    $scope.add_details.cvc.$pristine=false;
			   		}
         }
             			   		 
       }else{
	   		 
	   		if(typeof $scope.cardName=="undefined" && typeof $scope.cardNumber=="undefined" && typeof $scope.expiry=="undefined" && typeof $scope.cvc=="undefined"){
				 $scope.msg=false;
				 $scope.msg1=true;
	          	$scope.message1 = "Please fill required field."
			}else{
				  
				   $('#id_submit').hide();
				   $('#id_loading').show();
	    	    	  
					var params = {};
					var params1 = {};
					var params2 = {};
					
					var userDetails = JSON.parse(localStorage.getItem('businessSession'));
//					var b = JSON.parse(localStorage.getItem('buy_info'));
                    
		            params.userid = 20;
			        params.business_id = userDetails.business_id;
			        params.name = $scope.name;
			        params.status = 1;
			        params.token = result.id;
			        params.created_on = result.created;
			        params.amount = parseInt($scope.amount);
			        
			        params.email = userDetails.email;
			        params.mobile = userDetails.phone;
//			        params.orderType = localStorage.getItem('type');

			        var token = result.id;
			        
			        $http.post(baseURL+'addAmount',params).success(function(res) {
			        	if(res.status == 200){
			        		 $('#id_submit').show();
   						   $('#id_loading').hide();
//   						$http.get(baseURL + 'getWalletTotal/' + userDetails.business_id).success(function(res) {
//   				            $scope.total = res.record;
//   				            console.log($scope.total);
//   				            if(!$scope.total.length)
//   				            {
//   				            	alert('Add Wallet');
//   				            	params1.amount=$scope.amount;
//   				            	params1.business_id=userDetails.business_id;
//   				            	$http.post(baseURL+'addWalletAmount',params1).success(function(res) {
//   						        	if(res.status == 200){
//   						        		console.log(res);
//   						        	}
//   				            	})
//   				            }
//   				            else
//   				            {
//   				            	alert('update Wallet');
//   				            	params2.amount=parseInt($scope.amount)+parseInt($scope.total[0].total);
//   				            	params2.business_id=userDetails.business_id;
//   				            	$http.post(baseURL+'updateWalletAmount',params2).success(function(res) {
//   						        	if(res.status == 200){
//   						        	}
//   				            	})
//   				            }
//   				            
//   				        }).error(function(error) {
//   				            console.log("Error getting total amount", error);
//   				        });
			        		 $('#myModal').modal('show');
			        	}else{
			        		  $('#id_submit').show();
   						   $('#id_loading').hide();
			        		 alert('Something Went Wrong');
			        	}	    		                    

	                }).error(function() {
	                	$('#id_submit').show();
		       		    $('#id_loading').hide();
	                         // alert("Please check your internet connection or data source..");
	                });
	    	    	      			    	     						    
	   		
			}
       }
        
};

$scope.addBankAccount=function(addbankform)
{
	 if (addbankform.$valid) {
		 $http.post(baseURL+'addBankDetails',$scope.bankdata).success(function(res) {
	        	if(res.status == true){
	        		 alert('Bank Details Added');
	        		 $scope.bankdata={
	        				 name:'',
	        				 bank_name:'',
	        				 branch_name:'',
	        				 address:'',
	        				 country:'',
	        				 swift_code:'',
	        				 account_number:'',
	        				 business_id:$scope.businessSession.business_id
	        		 }
	        		 $scope.add_details.$setPristine();
	        	}else{
	        		 
	        		 alert('Something Went Wrong');
	        	}	    		                    

         }).error(function() {
         	
             alert("Please check your internet connection or data source..");
         });
	 }
	 else
    {
		 if($scope.bankdata.name=="" || typeof $scope.bankdata.name=='undefined') {	    			   		
   			 $scope.add_details.name.$invalid=true;
   			 $scope.add_details.name.$pristine=false;    			
   		 }
		 if($scope.bankdata.bank_name=="" || typeof $scope.bankdata.bank_name=='undefined') {	    			   		
   			 $scope.add_details.bank_name.$invalid=true;
   			 $scope.add_details.bank_name.$pristine=false;    			
   		 }
		 if($scope.bankdata.branch_name=="" || typeof $scope.bankdata.branch_name=='undefined') {	    			   		
   			 $scope.add_details.branch_name.$invalid=true;
   			 $scope.add_details.branch_name.$pristine=false;    			
   		 }
		 if($scope.bankdata.address=="" || typeof $scope.bankdata.address=='undefined') {	    			   		
   			 $scope.add_details.address.$invalid=true;
   			 $scope.add_details.address.$pristine=false;    			
   		 }
		 if($scope.bankdata.country=="" || typeof $scope.bankdata.country=='undefined') {	    			   		
   			 $scope.add_details.country.$invalid=true;
   			 $scope.add_details.country.$pristine=false;    			
   		 }
		 if($scope.bankdata.swift_code=="" || typeof $scope.bankdata.swift_code=='undefined') {	    			   		
   			 $scope.add_details.swift_code.$invalid=true;
   			 $scope.add_details.swift_code.$pristine=false;    			
   		 }
		 if($scope.bankdata.account_number=="" || typeof $scope.bankdata.account_number=='undefined') {	    			   		
   			 $scope.add_details.account_number.$invalid=true;
   			 $scope.add_details.account_number.$pristine=false;    			
   		 }
    }
	
}

$scope.init = function() {
    $scope.businessSession = store.get('businessSession') || {};
};

$scope.init();

$scope.allitembyBusinessId = function() {
    $http.get(baseURL + 'getWalletTransactionByCredit/' + $scope.businessSession.business_id).success(function(res) {
        $scope.walletTransaction = res;
    }).error(function(error) {
        console.log("Error getting item for business", error);
    });
};

$scope.allitembyBusinessId();

$scope.allitembyBusinessId = function() {
    $http.get(baseURL + 'getWalletTransaction/' + $scope.businessSession.business_id).success(function(res) {
        $scope.walletTransaction1 = res;
        $scope.deposited_amount=0;
        $scope.withdraw_amount=0;
        for(var i=0;i<$scope.walletTransaction1.length;i++)
        {
        	if($scope.walletTransaction1[i]['transaction_type']=='Credit')
            {
        		 $scope.deposited_amount=$scope.deposited_amount+$scope.walletTransaction1[i]['amount'];
            }
        	if($scope.walletTransaction1[i]['transaction_type']=='Debit')
            {
        		$scope.withdraw_amount=$scope.withdraw_amount+$scope.walletTransaction1[i]['amount'];
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

$scope.getBankDetails = function() {
    $http.get(baseURL + 'getBankDetails/' + $scope.businessSession.business_id).success(function(res) {
        $scope.bank_data = res.result;
//        alert(JSON.stringify($scope.bank_data));
    }).error(function(error) {
        console.log("Error getting item for business", error);
    });
};
$scope.getBankDetails();

$scope.bankdata={};
$scope.change_bank=function(id)
{
	
    for(var i=0;i<$scope.bank_data.length;i++)
    {
    	if($scope.bank_data[i]['id']==id)
    	{
    		$scope.bankdata=$scope.bank_data[i];
    	}
    }
}

$scope.goto = function(page) {
    $location.path(page);
};

$scope.open_wallet = function() {
	$('#myModal').modal('hide');
    $location.path('/wallet');
};

$scope.showhide = function(id) {
    if (document.getElementById(id).style.display == 'none') {
        document.getElementById(id).style.display = 'block';
    } else {
        document.getElementById(id).style.display = 'none';
    }
};


});
