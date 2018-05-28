

if(document.location.hostname == "desibites.sg" || document.location.hostname == "www.desibites.sg"){
	var business_id = { business_id: 11 };
	var baseurl = "https://www.desibites.sg/api/";
} else{
	 var business_id = { business_id: 11 };
     var baseurl = "https://www.sparksinasia.com/api/" ;
     var imageURL = "https://www.sparksinasia.com/assets/";
}

//if(env === 'local'){
//  var business_id = { business_id: 32 };
//  var baseURL = 'http://localhost:2000/api/';
//  var imageURL = 'http://localhost:2000/assets/';
//}else if(env === 'dev'){
//  var business_id = { business_id: 32 };
//  var baseURL= "https://www.sparksinasia.com/api/";
//  var imageURL = "https://www.sparksinasia.com/assets/";
//}  
