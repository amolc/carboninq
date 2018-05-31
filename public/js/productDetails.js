//$(document).ready(function() {  
//  getCurrentUser();
    getProduct(); 
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
    var product_data;
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
	        	product_data=res;
	        	var value=res;
//	        	alert(JSON.stringify(res));
	        	itemListHtml = itemListHtml+'<div class="col-md-4">'
   				+'<img src="'+imageURL+'web/'+business_id.business_id+'/'+value.item_image+'" class="thumb">'
   				+'</div>'
   				+'<div class="col-md-8">'
   				+'<p class="title">'+value.item_name+'</p>'
   				+'<p class="price"> SGD '+value.item_price+' '
   	 			+'<input type="number" name="quantity" onchange="onChangeQty('+value.item_id+',this.value)" value="1" id="id_quantityInput" class="btn-round1"><button type="button" onclick="addItem('+value.item_id+')" class="btn btn-sm btn-green btn-round" >Buy Now</button></p>'
   				+'<p>'+value.item_description+'</p>'
   				+'</div>';
	        
   	
				$('#item_info').html(itemListHtml);				       	        	
	        	
	        	 
   	        
	        	
	        
	        },error: function(error) {  
	            console.log(JSON.stringify(error));    
        }  	    	  
    });
}

function addItem(item_id)
{
	var quantity = document.getElementsByName('quantity')[0].value;
	product_data.quantity=quantity;
//	alert(quantity);
	var find=true;
	var item_i;
	var cart_data=[];
	var check_cart_data=[];
	check_cart_data=JSON.parse(localStorage.getItem('cart_data'));
//	cart_data=check_cart_data;
	if(check_cart_data===null || check_cart_data.length==0 )
	{
		cart_data=[];
		product_data.quantity=quantity;
		cart_data.push(product_data);
		localStorage.setItem('cart_data',JSON.stringify(cart_data));
		window.location = "shopping-cart.html";
	}
	else
	{
		
		for(var i=0;i<check_cart_data.length;i++)
		{
			if(check_cart_data[i].item_id===item_id )
			{
				
				if(check_cart_data[i].item_id===item_id && check_cart_data[i].quantity==product_data.quantity)
				{
					check_cart_data[i].quantity=product_data.quantity;
					cart_data.push(check_cart_data[i]);
					
				}
				else
				{	
					check_cart_data[i].quantity=product_data.quantity;
					
					cart_data.push(check_cart_data[i]);
				}
			}
			else
			{
			   	
				cart_data.push(check_cart_data[i]);
				
			}
		}
	}
	for(var i=0;i<cart_data.length;i++)
	{
		if(cart_data[i].item_id===item_id )
		{
			find=false;
		}
		
	}
		
	if(find==true)
	{
		product_data.quantity=document.getElementsByName('quantity')[0].value;
			cart_data.push(product_data);
		
	}
	localStorage.setItem('cart_data',JSON.stringify(cart_data));
	 window.location = "shopping-cart.html";
}

function onChangeQty(item_id,qnty)
{
   product_data.quantity=qnty;	
}
