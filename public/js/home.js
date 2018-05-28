//$(document).ready(function() {  

    getCurrentUser();
//    getCategories();
    getFeaturedItems();
    getPortalNews();
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
	var hostname = document.location.hostname;
	
//}); 
	
	function getPortalNews(){
		 $.ajax({   
		      async: true,  
		      url: baseurl + 'getPortalNews',  
		      method: "GET",   
		      headers: {  
		          "accept": "application/json;odata=verbose",  
		          "content-type": "application/json;odata=verbose"  
		      },  
		      success: function(res) { 
		    	   
		    	   console.log(res);
		    	   var newsHtml = "";
		    	   
		    	   $(res).each(function( index, value ) {
		    		   var date = new Date(value.create_at*1000);
		    		   var locale = "en-us",
		    		   month = date.toLocaleString(locale, { month: "short" });
		    		   
		    		   newsHtml = newsHtml + '<div class="col-md-12 newsS">'
		                          +'<div class="media">'
		                          +'<div class="media-body">'
		                          +'<a class="app1" href="#">'
		                          +'<i class="fa fa-star" aria-hidden="true" style="padding-right: 4px;"></i>'
		                          +value.title+'</a>' 
		                          +'<p>'+value.description+'</p>'
		                          +'<span>'+date.getDate()+' '+month+' '+date.getFullYear()+'</span>'
		                          +'</div>'
		                          +'</div>'
		                          +'</div>';
		    	   });
		    	   
		    	   $('#id_news').html(newsHtml);
		    	   		    	  		    	   		         
		      },error: function(error) {  
		            console.log(JSON.stringify(error));    
		      }  	  
		});   
  }
	
function getFeaturedItems(){
	 $.ajax({   
	      async: true,  
	      url: baseurl + 'getFeaturedItems',  
	      method: "GET",   
	      headers: {  
	          "accept": "application/json;odata=verbose",  
	          "content-type": "application/json;odata=verbose"  
	      },  
	      success: function(res) { 
	    	   
	    	   console.log(res);
	    	   var featuredItemHtml = "";
	    	   
	    	   $(res).each(function( index, value ) {
	    		   var item_name = value.item_name.replace(/ /g, "-");
	    		   featuredItemHtml = featuredItemHtml + '<a href="FeaturedDetails.html?'+value.item_id+'?'+item_name+'"><div class="col-md-12 boxp">'
		                                 +'<div class="col-md-3">'
	                                     +'<img class="imgF" src="'+imageURL+'web/'+business_id.business_id+'/'+value.item_image+'">'
		                                 +'</div>'
		                                 +'<div class="col-md-9">'
		                                 +'<h6 class="prodF">'+value.item_name+'</h6>'
		                                 +'<p class="Fdecp">iPhone 8 introduces an allâ€‘new glass design. The worldâ€™s most popular camera, now even better. The most powerful and smartest chip ever in a smartphone. Wireless charging thatâ€™s truly effortless. And augmented reality experiences never before possible. iPhone 8. A new generation of iPhone.</p>'
		                                 +'<p class="priceF">$ 1200</p>'
		                                 +'</div>'
		                                 +'</div></a>';
	    	   });
	    	   
	    	   $('#id_featuredItems').html(featuredItemHtml);
	    	   
	    	   
	    	   
	         
	      },error: function(error) {  
	            console.log(JSON.stringify(error));    
	      }  	  
	});   
}

function getCategories() {  

    $.ajax({   
        async: true,  
        url: baseurl + 'categoriesbybusinessid/' + business_id.business_id,  
        method: "GET",   
        headers: {  
            "accept": "application/json;odata=verbose",  
            "content-type": "application/json;odata=verbose"  
        },  
        success: function(data) { 
//        	

//        	     
//
//        	     var tabsContainer = document.getElementById("tabs");
//    
//        	     var uList = document.getElementById("id_ul");
//        	     
//        	     uList.innerHTML = '';
//        	     
        	     var li1="";
        	     var mobileCategoryHtml = '';
        	     for(var i=0;i<data.length;i++){			           
			        	li1 = li1+'<li role="presentation" class=""><a href="#cat_tabs-'+data[i].category_id+'">'+data[i].category_name+'</a></li>';			        	
			        	mobileCategoryHtml = mobileCategoryHtml+'<li><a href="ItemList.html?mcat_id=1?cat_id='+data[i].category_id+'">'+data[i].category_name+'</a></li>'
        	     }
        	     
        	     $('#id_mobileCategories').html(mobileCategoryHtml);
//		          
//		           uList.innerHTML = li1;
//			       tabsContainer.appendChild(uList);
//		          	
//			       var products;
//			       
//			       $.ajax({   
//			           async: true,  
//			           url: baseurl+'portalitemsbybusinessid/' + business_id.business_id, 
//			           method: "GET",   
//			           headers: {  
//			               "accept": "application/json;odata=verbose",  
//			               "content-type": "application/json;odata=verbose"  			     
//			           },  
//			           success: function(products) { 
//			        	   products = products;
//                             
//			        	     var htmlTopSelling = '';
//			        	     $(products).each(function( index, value ) {
//			        	    	 
//			        		      if(index < 10){
//			        		    	  var itemImage = value.item_image[0];
//			        		    	  htmlTopSelling = htmlTopSelling + '<div class="product">'
//			        		            +'<a href="Product-Details.html?product='+value.item_id+'"><article> <img class="img-responsive" src="'+imageURL+'web/'+business_id.business_id+'/'+itemImage+'" alt="">' 
//			        		            +'<span class="tag">Mobiles</span> <a href="#" class="tittle">'+value.item_name+'</a>' 
//			        		            +'<p class="rev"></p>'
//			        		            +'<div class="price">$'+value.item_price+'</div>'
//			        		            +'<a href="Product-Details.html?product='+value.item_id+'" class="cart-btn"><i class="icon-basket-loaded"></i>'
//			        		            +'</a> </article></a>'
//			        		            +'</div>';
//			        		      }
//			        		   
//			        	     });
//			        	     
//			        	     $('#id_topSelling').append(htmlTopSelling);
//			        	   
//			        	     for(var i=0;i<data.length;i++){
//			        	    	 data[i]['products'] = [];
//			        	    	 for(var j=0;j<products.length;j++){
//				        	    	 if(products[j].category_id == data[i].category_id){
//				        	    		 data[i]['products'].push(products[j]);
//				        	    	 }
//				        	     }
//			        	     }
//			        	     
//                             var tabContent = document.createElement("div");
//          		              tabContent.id='id_tab_content';
//          		          
//          		 		        for(var i=0;i<data.length;i++){
//          		 		        	
//          		 		        	 var t1 = document.createElement("div");
//          		 		        	 t1.id = "cat_tabs-"+data[i].category_id;
//          		 		        	 var innerHTML = '<div class="item-col-5">';
//          		 		        	 		        	 		        	 
//          		 		        	 for(var j=0;j<data[i].products.length;j++){
//
//          		 		        		    var itemImage = data[i].products[j].item_image[0];
//          		 				        	innerHTML = innerHTML + '<div class="product"><a href="Product-Details.html?product='+data[i].products[j].item_id+'"><article> <img class="img-responsive" src="'+imageURL+'web/'+business_id.business_id+'/'+itemImage+'" alt="">' 
//          		 							              +'<span class="tag">Phones</span> <a href="Product-Details.html?product='+data[i].products[j].item_id+'" class="tittle">'+data[i].products[j].item_name+' </a>'
//          		 							              +'<p class="rev"></p>'
//          		 							              +'<div class="price">$'+data[i].products[j].item_price+'</div>'
//          		 							              +'<a href="Product-Details.html?product='+data[i].products[j].item_id+'" class="cart-btn"><i class="icon-basket-loaded"></i></a> </article></a></div>';
//          		 				       }
//          		 		        	 
//          		 		        	 
//          		 		        	 innerHTML = innerHTML+'</div>';		 		        	 
//          		 		        	 t1.innerHTML = innerHTML;
//          		 		        	 tabContent.appendChild(t1);		        	 
//          		 		        	 
//          		 		        }
//          		 		        
//          		 		       tabsContainer.appendChild(tabContent);
//          		    	     	          			       			       		
//          		               $( "#tabs" ).tabs();
//          		                        		             
//	          		           var url = window.location.href;
//	          		           var parts = url.split("?");
//	          		          
//	          		           if(parts.length>1){
//	          		           	
//	          		       	       var urlparams = parts[1];
//	          		       	       var params = urlparams.split("&");
//	          		       	       var id = urlparams.split("=");
//	          		       	       if (id[0]=='cat') {
//	          		       	    	   $('a[href="#cat_tabs-'+id[1]+'"]').click();
//	          		       	       }
//	          		       	       
//	          		           }else if(localStorage.getItem('currentCategory') == null || localStorage.getItem('currentCategory') == '' || localStorage.getItem('currentCategory') == 'undefined'){
//	          		        	   var catId = data[0].category_id;
//	          		        	   $('a[href="#cat_tabs-'+catId+'"]').click();
//	          		           }else{
//	          		        	  var catId = localStorage.getItem('currentCategory');
//	          		        	   $('a[href="#cat_tabs-'+catId+'"]').click();
//	          		           }
//          		                      		                         		                      		            
//			              
//			           },  
//			           error: function(error) {  
//			               console.log(JSON.stringify(error));  			     
//			           }  			     
//			       });			                                   
//           
        },  
        error: function(error) {  
            console.log(JSON.stringify(error));    
        }  
  
    })   
}





$('.nav-list').on('click', 'li', function() {
    $('.nav-list li.active').removeClass('active');

    $(this).addClass('active');
});



