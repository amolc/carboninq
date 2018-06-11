//$(document).ready(function() {  
  
//    getCart();
//getCurrentUser();
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
	
	populateCountries("country", "state");

    var transportationInfo = {
    	   delivery:'Free',
    	   duration:'2 - 7 Days',
    	   charges:'0'
     }
    
    $("#id_1stDiv").addClass('select');
    function cartCount()
    {
    	if(localStorage.getItem('cart_data')!=null){
    		var itemCount =JSON.parse(localStorage.getItem('cart_data')).length;
    		$('#itemCount').html(itemCount).css('display', 'block');
    	}else{
    		var itemCount =0;
    		$('#itemCount').html(itemCount).css('display', 'block');
    	}
    }
    cartCount();
    getCategories();
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
		        	
//		        	$('#id_headerCategories').html('');
		        	var htmlHeaderCategories = '';
		        	var htmlHeaderCategories1 = '';
		        	
		        	$(data).each(function( index, value ) {
//		        		htmlHeaderCategories = htmlHeaderCategories + '<li role="presentation" id="'+value.category_id+'" onclick="change_category('+value.category_id+')"><a href="index.html?cat_id='+value.category_id+'" aria-controls="all" role="tab" data-toggle="tab">'+value.category_name+'</a></li>';
		        		htmlHeaderCategories1 = htmlHeaderCategories1 + '<li><a href="index.html?cat_id='+value.category_id+'" class="active">'+value.category_name+'</a></li>';
		        	}); 
            
//		        	$('#category_list').append(htmlHeaderCategories);
		        	$('#category_list1').append(htmlHeaderCategories1);
		        }
		        
		 });
   }

    
//});
  
function selected(id,deliveryType){
	transportationInfo = {};
	$('.charges').removeClass('select');
    $("#"+id).addClass('select');
    if(deliveryType == 0){
    	transportationInfo = {
    	   delivery:'Free',
    	   duration:'2 - 7 Days',
    	   charges:'0'
    }
    }else if(deliveryType == 1){
    	transportationInfo = {
    	    	   delivery:'Fast',
    	    	   duration:'2 Days',
    	    	   charges:'25'
    	    	}
    }else if(deliveryType == 2){
     	transportationInfo = {
 	    	   delivery:'Shop',
 	    	   duration:'',
 	    	   charges:'0'
 	    	}
    }
           
}

function getDeliveryInfo() {  
//alert($('#country').val());
$("#first_name").hide();
$("#last_name").hide();
$("#alert_country").hide();
$("#alert_state").hide();
$("#alert_cityName").hide();
$("#alert_zipCode").hide();
$("#alert_address").hide();
$("#alert_phone").hide();	
$("#alert_email").hide();
	if(($('#id_firstName').val() =='undefined' || $('#id_firstName').val() =='') ||
		       ($('#id_lastName').val() =='undefined' || $('#id_lastName').val() =='') ||
		       ($('#country').val() =='undefined' || $('#country').val() =='') ||
		       ($('#state').val() =='undefined' || $('#state').val() =='') ||
		       ($('#id_cityName').val() =='undefined' || $('#id_cityName').val() =='') ||
		       ($('#id_zipCode').val() =='undefined' || $('#id_zipCode').val() =='') ||
		       ($('#id_address').val() =='undefined' || $('#id_address').val() =='') ||
		       ($('#id_phone').val() =='undefined' || $('#id_phone').val() =='') ||
		       ($('#id_email').val() =='undefined' || $('#id_email').val() =='')
		       
	 ){     
		if(($('#id_firstName').val() =='undefined' || $('#id_firstName').val() ==''))
		{
			$("#first_name").text('Name Required');
			$("#first_name").show('slow');
		}
		if(($('#id_lastName').val() =='undefined' || $('#id_lastName').val() ==''))
		{
			$("#last_name").text('Last Name Required');
			$("#last_name").show('slow');
		}
		if(($('#country').val() =='undefined' || $('#country').val() =='' || $('#country').val() =='-1'))
		{
			$("#alert_country").text('Country Required');
			$("#alert_country").show('slow');
		}
		if(($('#state').val() =='undefined' || $('#state').val() =='' || $('#state').val() ==null))
		{
			$("#alert_state").text('State Required');
			$("#alert_state").show('slow');
		}
		if(($('#id_cityName').val() =='undefined' || $('#id_cityName').val() ==''))
		{
			$("#alert_cityName").text('City Name Required');
			$("#alert_cityName").show('slow');
		}
		if(($('#id_zipCode').val() =='undefined' || $('#id_zipCode').val() ==''))
		{
			$("#alert_zipCode").text('Zipcode Required');
			$("#alert_zipCode").show('slow');
		}
		if(($('#id_address').val() =='undefined' || $('#id_address').val() ==''))
		{
			$("#alert_address").text('Address Required');
			$("#alert_address").show('slow');
		}
		if(($('#id_phone').val() =='undefined' || $('#id_phone').val() ==''))
		{
			$("#alert_phone").text('Phone Required');
			$("#alert_phone").show('slow');
		}
		
		
		if(($('#id_email').val() =='undefined' || $('#id_email').val() ==''))
		{
			$("#alert_email").text('Email Required');
			$("#alert_email").show('slow');
		}
		else if(!(/\S+@\S+\.\S+/.test($('#id_email').val()))){
		       $("#alert_email").text('Invalid Email Id');
		       $("#alert_email").show('slow');
		    }
//			      $("#alertmessage").text('All fields are mandatory');
//			      $("#alertmessage").show('slow');
     }else{
    	 
    	 var orderDeliveryInfo = {
			first_name: $('#id_firstName').val(),
			last_name: $('#id_lastName').val(),
			country: $('#country').val(),
			state: $('#state').val(),
			city: $('#id_cityName').val(),
			zipCode: $('#id_zipCode').val(),
			address: $('#id_address').val(),
			phone: $('#id_phone').val(),
			email: $('#id_email').val(),
			delivery: transportationInfo.delivery,
			duration: transportationInfo.duration,
			charges: transportationInfo.charges
		};
		
		localStorage.setItem('delivery',JSON.stringify(orderDeliveryInfo));
		
//		window.location = "PaymentMethods.html";
		window.location = "Confirmation.html";
		console.log(orderDeliveryInfo);
			   
    }
	
                     
}

//function updateCart(){
//		 var cart = JSON.parse(localStorage.getItem('cart'));
//		 if(cart != null && cart != ''){
//			     $('#id_cartTable').html('');
//			     $('#id_grandTotal').html('');
//			     
//				 var htmlCartTable = "";
//				 var grandTotal = 0;
//				 $(cart).each(function( index, value ) {
//					 grandTotal = grandTotal + parseInt(value.total_price);
//					 htmlCartTable = htmlCartTable + '<tr><td><div class="media">'
//		             +'<div class="media-left"> <a href="#."> <img class="img-responsive" src="'+imageURL+'web/'+business_id.business_id+'/'+value.item_image[0]+'" alt="">'
//		             +'</a></div><div class="media-body"><p>'+value.item_name+'</p>'
//		             +'</div></div></td><td class="text-center padding-top-60">$'+value.item_price+'</td>'
//		             +'<td class="text-center"><div class="quinty padding-top-20">'
//		             +'<input type="number" value="'+value.quantity+'" id="id_cartQuantity" onchange="onChangeQty('+value.item_id+',this.value)"></div></td>'
//		             +'<td class="text-center padding-top-60" id="id_cartItemTotalPrice">$'+value.total_price+'</td>'
//		             +'<td class="text-center padding-top-60"><a href="#" onclick="onRemoveFromCart('+value.item_id+')" class="remove"><i class="fa fa-close"></i>'
//		             +'</a></td></tr>';
//		    	 });				 
//				 $('#id_cartTable').append(htmlCartTable);
//				 $('#id_grandTotal').append("$"+grandTotal);
//		 }
//}
//
//function onChangeQty(item_id,qty){
//	var cart = JSON.parse(localStorage.getItem('cart'));
//	$(cart).each(function( index, value ) {
//		if ( value.item_id == item_id){
//			value.quantity = qty;
//			value.total_price = parseInt(value.item_price)*parseInt(value.quantity);
//		}
//	});
//	localStorage.setItem('cart',JSON.stringify(cart));
//	updateCart();	
//}
//
//function onRemoveFromCart(item_id){
//	var cart = JSON.parse(localStorage.getItem('cart'));
//	$(cart).each(function( index, value ) {
//		if ( value.item_id == item_id){
//			cart.splice(index,1);
//		}
//	});
//	localStorage.setItem('cart',JSON.stringify(cart));
//	updateCart();
//}

