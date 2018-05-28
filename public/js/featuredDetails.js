//$(document).ready(function() {  

    getCurrentUser();
    getProductList();
  
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
	var hostname = document.location.hostname;
	
	var pagedItems = [];
	
//}); 
	
function getProductList(){

	var url = window.location.href;
    var parts = url.split("?");
    console.log(parts);
    if(parts.length>2){
    	 
	    	$.ajax({   
	  	      async: true,  
	  	      url: baseurl + 'getFeaturedItemByID/'+parts[1],  
	  	      method: "GET",   
	  	      headers: {  
	  	          "accept": "application/json;odata=verbose",  
	  	          "content-type": "application/json;odata=verbose"  
	  	      },  
	  	      success: function(res) {
	  	    	console.log(res);
                  $('#id_itemName').html(res[0].item_name);
                  var date = new Date();                  
	    		  var locale = "en-us",
	    		  month = date.toLocaleString(locale, { month: "short" });
	    		  
	    		   
                  var htmlItemDetails = '<div class="col-md-12 boxp" style="padding: 32px;border: 1px solid #d6d4d4;">'
                                      +'<div class="col-md-3">'
                                      +'<img class="imgF" src="'+imageURL+'web/'+business_id.business_id+'/'+res[0].item_image+'">'
                                      +'</div>'
                                      +'<div class="col-md-9">'
                                      +'<h6 class="prodF"></h6>'
                                      +'<p class="Fdecp">'+res[0].detailed_description+'</p>'
                                      +'<p class="priceF">$ '+res[0].item_price+'</p>'                                      
                                      +'</div>'
                                      +'<div class="col-md-12">'
                                      +'<div class="comment-user" style="float:right;width:auto">'                                      
                                      +'<img class="img-responsive" src="'+imageURL+'img/'+res[0].author_pic+'" style="width: 30px;border-radius: 50%;">'
                                      +'<span class="">'+res[0].author_name+',</span>'
                                      +'<time class="comment-date" datetime="16-12-2014 01:05" style="padding-left: 7px;">'
									  +'<i class="fa fa-clock-o"></i>'+date.getDate()+' '+month+' '+date.getFullYear()+'</time>'
                                      +'</div>'
                                      +'</div>'
                                      +'</div>';
                                                                                                                             
                  $('#id_itemDetailsParent').html(htmlItemDetails);
                  $('#id_breadcrumb').html(res[0].item_name);
	  	    	  
	  	      },error: function(error) {  
	              console.log(JSON.stringify(error));    
	          }  	    
	       });  
	     
    }
    
    
}


