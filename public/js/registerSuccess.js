//$(document).ready(function() {  
  
    getCurrentUser();
    
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;

	var url = window.location.href;
    var parts = url.split("?");
    if(parts.length>1){
    	   
	       var urlparams = parts[1];
	       var params = urlparams.split("&");
	       var id = urlparams.split("=")
	       if (id[0]=='host') {
//	    	   var url = 'http://'+id[1]+'.mobilesinasia:6060/store';
	    	   //var url = 'http://priya.mobilesinasia:6060/store';
	    	   var url = "http://admin.mobilesinasia.com:6060/admin";
	    	   $('#id_registerSucessParent').append('<a href="'+url+'" class="btn-round">Configure your site</a>');
	       }
	       
    }
    
	
  
//}); 

	

