//$(document).ready(function() {  
  
    getCategories(); 
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;

  
//}); 


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

        	     var tabsContainer = document.getElementById("tabs");
     

        	     var uList = document.getElementById("id_ul");
        	     
        	     uList.innerHTML = '';
        	     
        	     var li1="";
        	     for(var i=0;i<data.length;i++){			           
			        	li1 = li1+'<li role="presentation" class=""><a href="#tabs-'+i+'">'+data[i].category_name+'</a></li>';			        	
		          }
		          
		           uList.innerHTML = li1;
			       tabsContainer.appendChild(uList);
		          	
			       var products;
			       
			       $.ajax({   
			           async: true,  
			           url: baseurl + 'itemsbusinessid/' + business_id.business_id,  
			           method: "GET",   
			           headers: {  
			               "accept": "application/json;odata=verbose",  
			               "content-type": "application/json;odata=verbose"  			     
			           },  
			           success: function(products) { 
			        	   products = products;
                           console.log(products);
			        	     for(var i=0;i<data.length;i++){
			        	    	 data[i]['products'] = [];
			        	    	 for(var j=0;j<products.length;j++){
				        	    	 if(products[j].category_id == data[i].category_id){
				        	    		 data[i]['products'].push(products[j]);
				        	    	 }
				        	     }
			        	     }
			        	     
                             var tabContent = document.createElement("div");
          		              tabContent.id='id_tab_content';
          		          
          		 		        for(var i=0;i<data.length;i++){
          		 		        	
          		 		        	 var t1 = document.createElement("div");
          		 		        	 t1.id = "tabs-"+i;
          		 		        	 var innerHTML = '<div class="item-col-5">';
          		 		        	 		        	 		        	 
          		 		        	 for(var j=0;j<data[i].products.length;j++){

          		 		        		   
          		 				        	innerHTML = innerHTML + '<div class="product"><article> <img class="img-responsive" src="'+imageURL+'web/'+business_id.business_id+'/'+data[i].products[j].item_imagename+'" alt="">' 
          		 							              +'<span class="tag">Phones</span> <a href="Product-Details.html" class="tittle">'+data[i].products[j].item_name+' </a>'
          		 							              +'<p class="rev"></p>'
          		 							              +'<div class="price">'+data[i].products[j].item_price+'</div>'
          		 							              +'<a href="Product-Details.html?product='+data[i].products[j].item_id+'" class="cart-btn"><i class="icon-basket-loaded"></i></a> </article></div>';
          		 				       }
          		 		        	 
          		 		        	 
          		 		        	 innerHTML = innerHTML+'</div>';		 		        	 
          		 		        	 t1.innerHTML = innerHTML;
          		 		        	 tabContent.appendChild(t1);		        	 
          		 		        	 
          		 		        }
          		 		        
          		 		       tabsContainer.appendChild(tabContent);
          		    	     	          			       			       		
          		               $( "#tabs" ).tabs();
			              
			           },  
			           error: function(error) {  
			               console.log(JSON.stringify(error));  
			     
			           }  			     
			       });			                                   
           
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