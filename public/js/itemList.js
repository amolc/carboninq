//$(document).ready(function() {  

//    getCurrentUser();
    getCategories();
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
	
	function getCategories(){
		 
		 $.ajax({   
		        async: true,  
		        url: baseurl + 'categoriesbycarboniqid/' + business_id.business_id,  
		        method: "GET",   
		        headers: {  
		            "accept": "application/json;odata=verbose",  
		            "content-type": "application/json;odata=verbose"  
		        },  
		        success: function(data) {
		        	
		        	$('#id_headerCategories').html('');
		        	var htmlHeaderCategories = '';
		        	
		        	$(data).each(function( index, value ) {
		        		htmlHeaderCategories = htmlHeaderCategories + '<li role="presentation" onclick="change_category('+value.category_id+')"><a href="index.html?cat_id='+value.category_id+'" aria-controls="all" role="tab" data-toggle="tab">'+value.category_name+'</a></li>';
		        	}); 
              
		        	$('#category_list').append(htmlHeaderCategories);
		        	$("#category_list li:first").addClass("active");
//		        	$('#id_mobileCategories').html(htmlHeaderCategories);
		        	if (data.length>0) {
		        		var url = window.location.href;
		        	    var parts = url.split("?");
		        	   
		        	    if(parts.length>1){
		        		       var urlparams = parts[1];
		        		       var id = urlparams.split("=");
//		        		       alert(id[1]);
		        		       $.ajax({   
					       	        async: true,  
					       	        url: baseurl + 'getCarboninqItemsByCategoryID/' + id[1],  
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
						       	        		
						       	        		itemListHtml = itemListHtml+'<div class="col-md-4 col-sm-6 hvr-outline-in box-1-item">'
										                      +'<a href="product_detail.html?product='+value.item_id+'">'
										                      	+'<div class="thumb" style="background-image: url(http://localhost:2000/assets/web/78/'+value.item_image+');">'
										                      		+'<div class="type">New</div>'
										                      	+'</div>'
										                      	+'<div class="content">'
										                      		+'<div class="code" title="'+value.item_name+'">'+value.item_name+'</div>'
										                      		+'<hr>'
										                      		+'<div class="desc">'
										                      			+'<div style="padding-bottom:5px;">'
										                      				+'<p>'+value.item_description+'</p>'
										                      			+'</div>'
										                      		+'</div>'
										                      	+'</div>'
										                      +'</a>'
										                      +'<div class="price-details">'
										                      	+'<div class="price">SGD '+value.item_price+'</div>'
										                      	+'<button type="button" class="btn btn-sm pull-right btn-green" onclick="window.location=&#39;https://www.cnle.com.sg/course/gardeners-series-advance-workshop-kovan-19/register?referrer=all&#39;;">Enrol Now</button>'
										                      +'</div>'
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
		        	    else
		        	    {
				    	   $.ajax({   
				       	        async: true,  
				       	        url: baseurl + 'getCarboninqItemsByCategoryID/' + data[0]['category_id'],  
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
					       	        		
					       	        		itemListHtml = itemListHtml+'<div class="col-md-4 col-sm-6 hvr-outline-in box-1-item">'
									                      +'<a href="product_detail.html?product='+value.item_id+'">'
									                      	+'<div class="thumb" style="background-image: url(http://localhost:2000/assets/web/78/'+value.item_image+');">'
									                      		+'<div class="type">New</div>'
									                      	+'</div>'
									                      	+'<div class="content">'
									                      		+'<div class="code" title="'+value.item_name+'">'+value.item_name+'</div>'
									                      		+'<hr>'
									                      		+'<div class="desc">'
									                      			+'<div style="padding-bottom:5px;">'
									                      				+'<p>'+value.item_description+'</p>'
									                      			+'</div>'
									                      		+'</div>'
									                      	+'</div>'
									                      +'</a>'
									                      +'<div class="price-details">'
									                      	+'<div class="price">SGD '+value.item_price+'</div>'
									                      	+'<button type="button" class="btn btn-sm pull-right btn-green" onclick="window.location=&#39;https://www.cnle.com.sg/course/gardeners-series-advance-workshop-kovan-19/register?referrer=all&#39;;">Enrol Now</button>'
									                      +'</div>'
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
		        }
	     });
		 
	}
	
	function change_category(id)
	{
		window.location ='index.html?cat_id='+id;
	}
	
	function change_category1(id)
	{
		
	    	   $.ajax({   
	       	        async: true,  
	       	        url: baseurl + 'getCarboninqItemsByCategoryID/' + id,  
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
		       	        		
		       	        		itemListHtml = itemListHtml+'<div class="col-md-4 col-sm-6 hvr-outline-in box-1-item">'
						                      +'<a href="product_detail.html?product='+value.item_id+'">'
						                      	+'<div class="thumb" style="background-image: url(http://localhost:2000/assets/web/78/'+value.item_image+');">'
						                      		+'<div class="type">New</div>'
						                      	+'</div>'
						                      	+'<div class="content">'
						                      		+'<div class="code" title="'+value.item_name+'">'+value.item_name+'</div>'
						                      		+'<hr>'
						                      		+'<div class="desc">'
						                      			+'<div style="padding-bottom:5px;">'
						                      				+'<p>'+value.item_description+'</p>'
						                      			+'</div>'
						                      		+'</div>'
						                      	+'</div>'
						                      +'</a>'
						                      +'<div class="price-details">'
						                      	+'<div class="price">SGD '+value.item_price+'</div>'
						                      	+'<button type="button" class="btn btn-sm pull-right btn-green" onclick="window.location=&#39;https://www.cnle.com.sg/course/gardeners-series-advance-workshop-kovan-19/register?referrer=all&#39;;">Enrol Now</button>'
						                      +'</div>'
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
	
function getProductList(){

	var url = window.location.href;
    var parts = url.split("?");
   
    if(parts.length>1){
    	    	 
	       var urlparams = parts[1];
//	       var params = urlparams.split("&");
	       var id = urlparams.split("=");
//	       var urlparams1 = parts[2];
//	       var params1 = urlparams1.split("&");
//	       var id1 = urlparams1.split("=")
//	       alert(id[1]); 
	       if (id[0]=='mcat_id') 
	       {
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



