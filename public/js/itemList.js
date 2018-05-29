//$(document).ready(function() {  

//    getCurrentUser();
    getCategories();
//    getProductList();
  
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
		        		htmlHeaderCategories = htmlHeaderCategories + '<li role="presentation" id="'+value.category_id+'" onclick="change_category('+value.category_id+')"><a href="index.html?cat_id='+value.category_id+'" aria-controls="all" role="tab" data-toggle="tab">'+value.category_name+'</a></li>';
		        	}); 
              
		        	$('#category_list').append(htmlHeaderCategories);
		        	
//		        	$('#id_mobileCategories').html(htmlHeaderCategories);
		        	if (data.length>0) {
		        		var url = window.location.href;
		        	    var parts = url.split("?");
		        	   
		        	    if(parts.length>1){
		        		       var urlparams = parts[1];
		        		       var id = urlparams.split("=");
//		        		       alert(id[1]);
		        		       $("#"+id[1]).addClass("active");
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
										                      	+'<div class="thumb" style="background-image: url('+imageURL+'web/'+business_id.business_id+'/'+value.item_image+');">'
										                      		
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
										                      	+'<a href="product_detail.html?product='+value.item_id+'"><span class="btn btn-sm pull-right product_btn"><i class="fa fa-shopping-cart"></i></span></a>'
										                      +'</div>'
										                      +'</div>';
						    	        	});
						       	        	
						       	        	$('#id_itemList').html(itemListHtml);
//						       	        	$('#id_itemListMore').html(itemListHtml);
//						       	        	$('#id_resultsShowing').html('Showing 1-'+chunk+' of '+res.length+' results');
//						       	        	$('#id_resultsShowingMore').html('Showing 1-'+chunk+' of '+res.length+' results');
//						       	        	to = chunk;
//						       	        	from = 1;
						       	        	
//						       	        	if(pagedItems.length < 2){
//						       	        		$('#id_moreItems').hide();
////						       	        		$('#paginationDiv').hide();
//						       	        	}else{
//						       	        		var moreHtml = '';
//						       	        		$('#id_moreItems').html('<a href="ItemListMore.html?mcat_id='+id[1]+'?cat_id='+id1[1]+'" style="color:blue;float:right"><u>More</u></a>');
//						       	        	}
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
		        	    	$("#category_list li:first").addClass("active");
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
									                      	+'<div class="thumb" style="background-image: url('+imageURL+'web/'+business_id.business_id+'/'+value.item_image+');">'
									                      		
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
									                      	+'<a href="product_detail.html?product='+value.item_id+'"><span class="btn btn-sm pull-right product_btn"><i class="fa fa-shopping-cart"></i></span></a>'
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
//					       	        		$('#paginationDiv').hide();
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
//		$(this).addClass('active');
		window.location ='index.html?cat_id='+id;
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



