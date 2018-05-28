//$(document).ready(function() {  
  getCurrentUser();
    getBusinessList(); 
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;

//}); 
	
	localStorage.removeItem('currentCategory');
	
function getBusinessList() {
	
	 		    	   
	    	   $.ajax({   
	    	        async: true,  
	    	        url: baseurl + 'getbusinesslist/1',  
	    	        method: "GET", 
	    	        headers: {  
	    	            "accept": "application/json;odata=verbose",  
	    	            "content-type": "application/json;odata=verbose"  
	    	        },
	    	        success: function(data) { 
	    	        	console.log(data);
	    	        	 var businesses = data;	
	    	        	 
	    	        	 var businessListHtml = '';
	    	        	      $(businesses).each(function( index, value ) {
	    	        	    	  $.ajax({   
	    	      	    	        async: true,  
	    	      	    	        url: baseurl + 'viewbasicinfodetails/'+value.business_id,  
	    	      	    	        method: "GET", 
	    	      	    	        headers: {  
	    	      	    	            "accept": "application/json;odata=verbose",  
	    	      	    	            "content-type": "application/json;odata=verbose"  
	    	      	    	        },
	    	      	    	        success: function(res) {
	    	      	    	        	console.log(res);
	    	      	    	        	var image = '';
	    	      	    	        	if(res.status == false){
	    	      	    	        		image = imageURL + 'img/dummy_mobile_store.jpg';
	    	      	    	        	}else{
	    	      	    	        		
	    	      	    	        		if(res.brandLogo == ''){
	    	      	    	        			image = imageURL + 'img/dummy_mobile_store.jpg';
	    	      	    	        		}else{
	    	      	    	        			image = res.brandLogo;
	    	      	    	        		}
                                             
//                                          image = imageURL + 'img/logo_for_mobile_shop.png';
	    	      	    	        	}
	    	      	    	        	$('#id_businessList').html('');
	    	      	    	         	    	      	    	        
    	      	    	        		businessListHtml = businessListHtml + '<div class="row row_padding "><div class="col-md-2"></div>'
	                                        +'<div class="col-md-8"><div style="border: 1px solid #55555545;height:auto" class="row">'
	                                        +'<div class="col-md-3 pad1p">'                                               
	                                        +'<img class="business_image " src="'+image+'"/>'                                             
	                                        +'</div><div class="col-md-9"><h5><u><a target=_blank" href="http://'+value.host_name+'.mobilesinasia.com:6060/store/">'+value.business_name+'</u></a></h5>' 
	//                                        +'<p><b>Sonia Connection</b></p>'
	                                        +'<p class="businessP">Looking for newly released phones, or selling your current phone?</br>'
	                                        +'Visit us for the best prices in Singapore </p>' 
	                                        +'<p><b>Address :</b> '+value.business_address+'</p>'
	                                        +'<p><b>Mobile  :</b> '+value.business_mobileNumber+'</p></div></div>'
	                                        +'</div><div class="col-md-2"></div></div>';
    	      	    	        		
    	      	    	        		$('#id_businessList').append(businessListHtml);
	    	      	    	        }, function(error) {  
	    	    	    	            console.log(JSON.stringify(error));  	    	  
	    	    	    	        }	    	      	    	        
	    	        	    	  });
	    	        		        		               
    	        		      });
	    	        	    	    	        	    
	    	        	 	    	        	 	    	        	 
	    	        },  
	    	        error: function(error) {  
	    	            console.log(JSON.stringify(error));  	    	  
	    	        }   
	    	    });
	      
                     
}





