//$(document).ready(function() {  
  
    getCurrentUser();
    getSearchResult(); 
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
	var hostname = document.location.hostname;
	
  
//}); 

function getSearchResult() {  
	 
//	localStorage.removeItem('cart');
	var url = window.location.href;
    var parts = url.split("?");
    if(parts.length>1){
    	
	       var urlparams = parts[1];
	       var params = urlparams.split("&");
	       var id = urlparams.split("=")
	       if (id[0]=='query') {
	    	   	          		   						      					       
					       $.ajax({   
					           async: true,  
					           url: baseurl + 'getPortalItemsByFilter/'+id[1],
					           method: "GET",   
					           headers: {  
					               "accept": "application/json;odata=verbose",  
					               "content-type": "application/json;odata=verbose"  			     
					           },  
					           success: function(products) {
                                        
					        	   var products = products;
						        	   
						        	   console.log(products);
						        	   
						        	   console.log(products.length);
						        	   			        	   	                      
						        	     var htmlTopSelling = '';
						        	     $(products).each(function( index, value ) {
						        	    	 
						        		      if(index < 10){
						        		    	  var itemImage = value.item_image[0];
						        		    	  htmlTopSelling = htmlTopSelling + '<div class="product">'
						        		            +'<a href="Product-Details.html?product='+value.item_id+'"><article> <img class="img-responsive" src="'+imageURL+'web/'+business_id.business_id+'/'+itemImage+'" alt="">' 
						        		            +'<span class="tag">Mobiles</span> <a href="#" class="tittle">'+value.item_name+'</a>' 
						        		            +'<p class="rev"></p>'
						        		            +'<div class="price">$'+value.item_price+'</div>'
						        		            +'<a href="Product-Details.html?product='+value.item_id+'" class="cart-btn"><i class="icon-basket-loaded"></i>'
						        		            +'</a> </article></a>'
						        		            +'</div>';
						        		      }
						        		   
						        	     });
						        	     
						        	     $('#id_topSelling').append(htmlTopSelling);
						        	     $('#id_searchResultCount').append(products.length+' Results found');
						        	     
						        	   
						        	                              		                      		            
						              
						           },  
						           error: function(error) {  
						               console.log(JSON.stringify(error));  			     
						           }  			     
						       });	                                   
			      
    
	       }
    }
}






