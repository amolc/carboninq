//$(document).ready(function() {  

    getCurrentUser();
    getProductList();
  
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
	var hostname = document.location.hostname;
	
	var pagedItems = [];
	var chunk = 8;
	var to = 0;
	var from = 0;
	
//}); 
	
function getProductList(){

	var url = window.location.href;
    var parts = url.split("?");
    
    if(parts.length>1){
    	    	   
	       var urlparams = parts[1];
	       var params = urlparams.split("&");
	       var id = urlparams.split("=");
	       var urlparams1 = parts[2];
	       var params1 = urlparams1.split("&");
	       var id1 = urlparams1.split("=")
	       if (id[0]=='mcat_id') {
	    	   $('#id_itemCategory').html('');
	    	   
		    	   if (id[1]=='1') {
				    	   $.ajax({   
				    	        async: true,  
				    	        url: baseurl + 'categoriesbybusinessid/' + business_id.business_id,  
				    	        method: "GET",   
				    	        headers: {  
				    	            "accept": "application/json;odata=verbose",  
				    	            "content-type": "application/json;odata=verbose"  
				    	        },  
				    	        success: function(res) { 
				    	        	
				    	        	 var htmlItemCategories = "";
				    	        	 $(res).each(function( index, value ) {
				    	        		 htmlItemCategories = htmlItemCategories;
				    	        		   if(value.category_id == id1[1]){
				    	        			   htmlItemCategories = htmlItemCategories + '<li class="selected" style="padding-left:5%">'
				    	        			   +'<a href="ItemList.html?mcat_id='+id[1]+'?cat_id='+value.category_id+'"><label for="brand1" style="color:white;cursor:pointer;">'+value.category_name+'<span style="color:white">('+value.total_items+')</span></label></a>'
                                               +'</li>';
				    	        			   $('#id_breadcrumb').html('<a href="ItemList.html?mcat_id='+id[1]+'?cat_id='+value.category_id+'">Mobiles</a>');
				    	        			   $('#id_breadcrumb1').html(value.category_name);
				    	        		   }else{
				    	        			   htmlItemCategories = htmlItemCategories + '<li style="padding-left:5%">'
				    	        			   +'<a href="ItemList.html?mcat_id='+id[1]+'?cat_id='+value.category_id+'"><label for="brand1" style="cursor:pointer;">'+value.category_name+'<span>('+value.total_items+')</span></label></a>'
                                               +'</li>';
				    	        		   }
				    	        		 
				    	        	 });
				    	        	 
				    	        	 $('#id_itemCategory').html(htmlItemCategories);
				    	        	 $('#id_mainCategoryName').html('Mobiles');
				    	        	 
				    	        	 
				    	        	 
				    	        	
				    	        },error: function(error) {  
				    	            console.log(JSON.stringify(error));    
				    	        }  	    	  
				    	    }); 
				    	   
				    	   if (id1[0]=='cat_id') {
					    	   $.ajax({   
					       	        async: true,  
					       	        url: baseurl + 'getPortalItemsByCategoryID/' + id1[1],  
					       	        method: "GET",   
					       	        headers: {  
					       	            "accept": "application/json;odata=verbose",  
					       	            "content-type": "application/json;odata=verbose"  
					       	        },  
					       	        success: function(res) { 
					       	        	var itemListHtml = "";
					       	        						       	        	
					       	        	var i,j,temparray;
					       	        	for (i=0,j=res.length; i<j; i+=chunk) {
					       	        	    temparray = res.slice(i,i+chunk);
					       	        	    pagedItems.push(temparray);
					       	        	    // do whatever
					       	        	} 
					       	        	 
						       	        if(pagedItems.length > 0){
						       	        	$(pagedItems[0]).each(function( index, value ) {
						       	        		var itemImage = value.item_image.split(',');
						       	        		
						       	        		itemListHtml = itemListHtml+'<div class="product">'
										                      +'<a href="Product-Details.html?product='+value.item_id+'"></a>'
										                      +'<article><a href="Product-Details.html?product='+value.item_id+'">'
										                      +'<img class="img-responsive" src="'+imageURL+'web/'+business_id.business_id+'/'+itemImage[0]+'" alt="">'
										                      +'<span class="tag">Phones</span> </a>'
										                      +'<a href="Product-Details.html?product='+value.item_id+'" class="tittle">'+value.item_name+'</a>'
										                      +'<p class="rev"></p><div class="price">$'+value.item_price+'</div>'
										                      +'<a href="Product-Details.html?product='+value.item_id+'" class="cart-btn">'
										                      +'<i class="icon-basket-loaded"></i></a>' 
										                      +'</article>'
									                          +'</div>';
						    	        	});
						       	        	
						       	        	$('#id_itemList').html(itemListHtml);
						       	        	$('#id_itemListMore').html(itemListHtml);
						       	        	$('#id_resultsShowing').html('Showing 1-'+chunk+' of '+res.length+' results');
						       	        	$('#id_resultsShowingMore').html('Showing 1-'+chunk+' of '+res.length+' results');
						       	        	to = chunk;
						       	        	from = 1;
						       	        	
						       	        	if(pagedItems.length < 2){
						       	        		$('#id_moreItems').hide();
						       	        		$('#paginationDiv').hide();
						       	        	}else{
						       	        		var moreHtml = '';
						       	        		$('#id_moreItems').html('<a href="ItemListMore.html?mcat_id='+id[1]+'?cat_id='+id1[1]+'" style="color:blue;float:right"><u>More</u></a>');
						       	        	}
						       	        }else{
						       	        	alert('No Items Found');
						       	        }
					       	        	
					       	        
					       	        },error: function(error) {  
						    	            console.log(JSON.stringify(error));    
					    	        }  	    	  
					    	    });
					       }
		    	   }
		    	   
		    	   if (id[1]=='2') {

		    		   
		    		   $('#id_itemCategory').html('<li class="selected" style="padding-left:5%">'
				    	        			   +'<a href="#"><label for="brand1" style="color:white;cursor:pointer;">Charger<span style="color:white">(1)</span></label></a>'
                                               +'</li>');
		    		   
		    		   if (id1[0]=='cat_id') {
				    	   $.ajax({   
				       	        async: true,  
				       	        url: baseurl + 'getPortalAccessories',  
				       	        method: "GET",   
				       	        headers: {  
				       	            "accept": "application/json;odata=verbose",  
				       	            "content-type": "application/json;odata=verbose"  
				       	        },  
				       	        success: function(res) { 
				       	        	
				       	        	var itemListHtml = "";
				       	        					       	        					       	        					       	        					       	        	
				       	        	$(res).each(function( index, value ) {
				       	        		var itemImage = value.item_image.split(',');
				       	        		itemListHtml = itemListHtml+'<div class="product">'
								                      +'<a href="Product-Details.html?product='+value.item_id+'"></a>'
								                      +'<article><a href="Product-Details.html?product=26">'
								                      +'<img class="img-responsive" src="'+imageURL+'web/'+business_id.business_id+'/'+itemImage[0]+'" alt="">'
								                      +'<span class="tag">Phones</span> </a>'
								                      +'<a href="Product-Details.html?product=26" class="tittle">'+value.item_name+'</a>'
								                      +'<p class="rev"></p><div class="price">$'+value.item_price+'</div>'
								                      +'<a href="Product-Details.html?product='+value.item_id+'" class="cart-btn">'
								                      +'<i class="icon-basket-loaded"></i></a>' 
								                      +'</article>'
							                          +'</div>';
				    	        	});
				       	        	$('#id_itemList').html(itemListHtml);
				       	        
				       	        },error: function(error) {  
					    	            console.log(JSON.stringify(error));    
				    	        }  	    	  
				    	    });
				       }
		    		
			    	   
	    	   }
	       }
	       
	    	       
	       
    }
}


$('.page-selection').bootpag({
    total: 2
}).on("page", function(event, num){
//    $(".content").html("Page " + num); // or some ajax content loading...
         console.log($('#id_resultsShowingMore').html());
        $('#id_itemListMore').html('');
        $('#id_resultsShowingMore').html('');
        var itemListHtml = "";
        
        to = to + parseInt(pagedItems[num-1].length);
        from = from + parseInt(pagedItems[num-1].length);
        
        var showingItems = from+'-'+to;
        console.log(showingItems);
        
        var totalResults = 0;
        $(pagedItems).each(function( index, value ) {
        	totalResults = totalResults + value.length;
        });

        
	    if(pagedItems.length > 0){
		   	$(pagedItems[num-1]).each(function( index, value ) {
		   		var itemImage = value.item_image.split(',');
		   		itemListHtml = itemListHtml+'<div class="product">'
		                      +'<a href="Product-Details.html?product='+value.item_id+'"></a>'
		                      +'<article><a href="Product-Details.html?product=26">'
		                      +'<img class="img-responsive" src="'+imageURL+'web/'+business_id.business_id+'/'+itemImage[0]+'" alt="">'
		                      +'<span class="tag">Phones</span> </a>'
		                      +'<a href="Product-Details.html?product=26" class="tittle">'+value.item_name+'</a>'
		                      +'<p class="rev"></p><div class="price">$'+value.item_price+'</div>'
		                      +'<a href="Product-Details.html?product='+value.item_id+'" class="cart-btn">'
		                      +'<i class="icon-basket-loaded"></i></a>' 
		                      +'</article>'
		                      +'</div>';
			});
		   	$('#id_itemListMore').html(itemListHtml);
		   	$('#id_resultsShowingMore').html('Showing '+showingItems+' of '+totalResults+' results');
		 
		   		
		   	
		
	   }else{
	   		alert('No Items Found');
	   }
    // ... after content load -> change total to 10
    $(this).bootpag({total: pagedItems.length, maxVisible: pagedItems.length});
 
});



$('.nav-list').on('click', 'li', function() {
    $('.nav-list li.active').removeClass('active');

    $(this).addClass('active');
});



