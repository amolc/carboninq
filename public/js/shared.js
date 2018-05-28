
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
	
	getHeaderCategories();
	getHeaderAccessoryCategories();

	function onLogout() { 
		localStorage.removeItem('currentUser');
		localStorage.removeItem('card');
		localStorage.removeItem('delivery');
		localStorage.removeItem('cart');
		window.location = "LoginForm.html?redirect=0";
	}
		
	function getCurrentUser() { 
		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if(currentUser == null || currentUser == 'undefined' || currentUser == ''){
			 var loginHtml = '<a href="LoginForm.html?redirect=0">Login/Sign Up</a>';
			 $('#id_loginLogout').append(loginHtml);
		}else{
			 var logoutHtml = '<a href="#" onclick="onLogout()" id="id_logout">Logout</a>';
			 $('#id_loginLogout').append(logoutHtml);
		}	
	}
	
	function onSearch(){
		var searchQuery = $('#id_searchInput').val();
		window.location = 'SearchResult.html?query='+searchQuery;
	}
	
	function getBussinesses() {  
		window.location = "BusinessList.html";
	}
	
	function getHeaderCategories(){
	 
		 $.ajax({   
		        async: true,  
		        url: baseurl + 'categoriesbybusinessid/' + business_id.business_id,  
		        method: "GET",   
		        headers: {  
		            "accept": "application/json;odata=verbose",  
		            "content-type": "application/json;odata=verbose"  
		        },  
		        success: function(data) {
		        	
		        	$('#id_headerCategories').html('');
		        	var htmlHeaderCategories = '';
		        	
		        	$(data).each(function( index, value ) {
		        		htmlHeaderCategories = htmlHeaderCategories + '<li><a href="ItemList.html?mcat_id=1?cat_id='+value.category_id+'">'+value.category_name+'</a></li>';
		        	});

		        	$('#id_headerCategories').append(htmlHeaderCategories);
		        	$('#id_mobileCategories').html(htmlHeaderCategories);
		        }
	     });
	}
	
	function getHeaderAccessoryCategories(){
		var htmlHeaderAccessoriesCategories = "";
		htmlHeaderAccessoriesCategories = htmlHeaderAccessoriesCategories + '<li><a href="ItemList.html?mcat_id=2?cat_id=0">Charger</a></li>';		        	
		        	$('#id_headerAccessoriesCategory').append(htmlHeaderAccessoriesCategories);
		        
	}
	
