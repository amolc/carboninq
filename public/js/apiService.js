

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
	
