//$(document).ready(function() {  
//  getCurrentUser();
    getProduct(); 
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;

//}); 

	
function getProduct()
{
	var url = window.location.href;
    var parts = url.split("?");
   
	var urlparams = parts[1];
	var id = urlparams.split("=");
	$.ajax({   
	        async: true,  
	        url: baseurl + 'carboninqsingleitem/' + id[1],  
	        method: "GET",   
	        headers: {  
	            "accept": "application/json;odata=verbose",  
	            "content-type": "application/json;odata=verbose"  
	        },  
	        success: function(res) {
	        	
	        	var itemListHtml = "";
	        	var value=res;
//	        	alert(JSON.stringify(res));
	        	itemListHtml = itemListHtml+'<div class="col-md-4">'
   				+'<img src="'+imageURL+'web/'+business_id.business_id+'/'+value.item_image+'" class="thumb">'
   				+'</div>'
   				+'<div class="col-md-8">'
   				+'<p class="title">'+value.item_name+'</p>'
   				+'<p class="price"> SGD '+value.item_price+'   '
   				+'<a href="payment.html?product='+value.item_id+'"><button type="button" class="btn btn-sm btn-green" >Buy Now</button></a></p>'
   				+'<p>'+value.item_description+'</p>'
   				+'</div>';
	        
   	
				$('#item_info').html(itemListHtml);				       	        	
	        	
	        	 
   	        
	        	
	        
	        },error: function(error) {  
	            console.log(JSON.stringify(error));    
        }  	    	  
    });
}