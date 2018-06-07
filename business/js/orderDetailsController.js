SampleApplicationModule
    .controller('orderDetailsController', function($rootScope, $scope, $location, $http, store, $timeout, $routeParams) {
        $scope.init = function() {
            $scope.businessSession = store.get('businessSession') || {};
        };
        $scope.init();
        $scope.Order = {};
   
        
       
        $scope.imageURL = imageURL;

        $scope.goto = function(page) {
            $location.path(page);
        };
        $scope.back = function() {
        	window.history.back();
        };
        $scope.show = function(id) {
            $location.path('/order-details/' + id);
        };
        $scope.username=$scope.businessSession.business_username;
        $scope.business_name=$scope.businessSession.business_name;
        
        $scope.orderStatus = {
            'status': '',
            'notes': '',
            'business_id': $scope.businessSession.business_id
        };

        $scope.clearOrderForm = function() {
            $scope.orderStatus = {
                'status': '',
                'notes': '',
                'business_id': $scope.businessSession.business_id
            };
        };

        //get order history

       

        
       $scope.showItems=function()
       {
    	   
    	   $http.get(baseURL + 'getCarboninqCustomerOrderDetails/'+$routeParams.id).success(function(res) {
               $scope.orderDetaillist = res;
           }).error(function(error) {
               console.log("Error getting item for business", error);
           });
    	   
       }
       $scope.showItems(); 
       
       $scope.showOrder=function()
       {
    	   
    	   $http.get(baseURL + 'getCarboninqCustomerOrderByOrderId/'+$routeParams.id).success(function(res) {
               $scope.orderlist = res[0];
               
           }).error(function(error) {
               console.log("Error getting item for business", error);
           });
    	  
       }
       $scope.showOrder(); 
  

	$scope.exportData = function () {
		var blob = new Blob([document.getElementById('exportable').innerHTML], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
		});
		saveAs(blob, "Report.xls");
	};

	$scope.generatePDF = function () {
      var logo=toDataUrl('http://localhost:8500/admin/img/Capture.png', function(myBase64) {
             return myBase64;
            
//             window.localStorage.setItem('productImage',data);
   	 });
		var orderBodyTable = [
            [
             {text: 'Image', style: 'tableHeader'},
             {text: 'Product', style: 'tableHeader'},
             {text: 'QTY', style: 'tableHeader'},
             {text: 'Unit Price', style: 'tableHeader'},
             {text: 'Total Price', style: 'tableHeader'}
            ]
                         
           ];
	     $($scope.orderDetaillist).each(function( index, value ) {
	    	
	    	 toDataUrl(imageURL+'/'+value.item_image, function(myBase64) {
	              var data = myBase64;
	             
	              window.localStorage.setItem('productImage',data);
	    	 });
             var innerArray = [
            	 {image:''+window.localStorage.getItem('productImage')+'',
            		 width: 100,
            		 height:50
            	 
            	 },
              	{text: value.item_name},                    
              	{text: value.quantity},
              	{text: 'SGD '+value.item_price},
              	{text: 'SGD '+parseInt(value.quantity*value.item_price)},
              	];                      
             orderBodyTable.push(innerArray);
            });
	     innerArray = [
        	
        	{colSpan:4,text:'Sub Total',alignment: 'right'},
        	'',
        	'',
        	'',
        	{text:'SGD '+($scope.orderlist.total_amount-$scope.orderlist.charges)}
          	];                      
         orderBodyTable.push(innerArray);
         innerArray = [
         	
         	{colSpan:4,text:'Shipping Charges',alignment: 'right'},
         	'',
         	'',
         	'',
         	{text:'SGD '+$scope.orderlist.charges}
           	];                      
          orderBodyTable.push(innerArray);
          innerArray = [
           	
           	{text:'Payment Type',alignment: 'right'},
           	{text:$scope.orderlist.payment_type},
           	{colSpan:2,text:'Total',alignment: 'right'},
           	'',
           	{text:'SGD '+$scope.orderlist.total_amount}
             	];                      
            orderBodyTable.push(innerArray);
	     function toDataUrl(url, callback) {
	         var xhr = new XMLHttpRequest();
	         xhr.onload = function() {
	             var reader = new FileReader();
	             reader.onloadend = function() {
	                 callback(reader.result);
	             }
	             reader.readAsDataURL(xhr.response);
	         };

	         xhr.open('GET', url);
	         xhr.responseType = 'blob';
	         xhr.send();
	     }
		dd = {
	            content: [                      
	            	{image:''+logo+'',
	            		 width: 100,
	            		 height:50
	            	 
	            	 },
	             {
	              style: 'tableExample',
	              table: {
	               widths: [200, '*', '*', 150],
	               body: [
	            	   [
	  	                 {
	  	                  table: {
	  	                   body: [
	  	                    ['Customer Details'],                      
	  	                   ]
	  	                  },
	  	                  layout: 'noBorders'
	  	                 },
	  	                 '',
	  	                    '',
	  	                    'Shipping Address'
	  	                   ],
	            	  [
	                 {
	                  table: {
	                   body: [
	                    ['ORDER NO :',$scope.orderlist.order_id],                      
	                   ]
	                  },
	                  layout: 'noBorders'
	                 },
	                 '',
	                    '',
	                    $scope.orderlist.first_name
	                   ],
	                [
	                 {
	                  table: {
	                   body: [
	                    ['NAME :',$scope.orderlist.first_name],                      
	                   ]
	                  },
	                  layout: 'noBorders'
	                 },
	                 '',
	                 '',
	                 $scope.orderlist.address
	                ], 
	                [
	                 {
	                  table: {
	                   body: [
	                    ['EMAIL :',$scope.orderlist.email],                      
	                   ]
	                  },
	                  layout: 'noBorders'
	                 },
	                 '',
	                 '',
	                 $scope.orderlist.state+' '+$scope.orderlist.zipcode
	                ],
	                [
	                    {
	                     table: {
	                      body: [
	                       ['Tel',$scope.orderlist.phone],                      
	                      ]
	                     },
	                     layout: 'noBorders'
	                    },
	                    '',
	                    '',
	                    ''
	                   ],
	                  ]
	                 },
	                 layout: 'noBorders'
	                },
	                {
	                 style: 'tableExample',
	                 table: {
	                  widths: [150, 200, '*','*','*'],
	                  headerRows: 1,
	                  body: orderBodyTable
	                 },
	                 
	                },
	                
	                   
	               ],
	               styles: {
	                header: {
	                 fontSize: 18,
	                 bold: true
	                },
	                bigger: {
	                 fontSize: 15,
	                 italics: true
	                },
	                tableExample: {
	                 margin: [0, 5, 0, 15]
	                },
	               },
	               defaultStyle: {
	                columnGap: 20
	               }
	               
	              };
		pdfMake.createPdf(dd).open();
		
	};

	
    });