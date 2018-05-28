//$(document).ready(function() {  
  
    getProduct(); 
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;

  
//}); 


function getProduct() {  
	
	var url = window.location.href;
    var parts = url.split("?");
    if(parts.length>1){
    	
	       var urlparams = parts[1];
	       var params = urlparams.split("&");
	       var id = urlparams.split("=")
	       if (id[0]=='product') {
	    	   $.ajax({   
	    	        async: true,  
	    	        url: baseurl + 'itemsbusinessid/' + bussiness_id.bussiness_id,  
	    	        method: "GET",   
	    	        headers: {  
	    	            "accept": "application/json;odata=verbose",  
	    	            "content-type": "application/json;odata=verbose"  	    	  
	    	        },  
	    	        success: function(data) { 
	    	        	
	    	             for(var i=0;i<data.length,i++){
	    	            	 if(data[i].item_id == id[1])
	    	            		 var product = data[i];
	    	             }  
	    	        	 
	    	        	 var itemName = document.getElementById('id_itemName');
	    	        	 itemName.innerHTML = product.item_name;
	    	        	 var itemPrice = document.getElementById('id_itemPrice');
	    	        	 itemPrice.innerHTML = "$"+product.item_price;
	    	        	
	    	        	
	    	        },  
	    	        error: function(error) {  
	    	            console.log(JSON.stringify(error));  	    	  
	    	        }   
	    	    })
	       }
    }
                     
}


$('.nav-list').on('click', 'li', function() {
    $('.nav-list li.active').removeClass('active');

    $(this).addClass('active');
});