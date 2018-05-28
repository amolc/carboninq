//$(document).ready(function() {  
  
//    getCart();
getCurrentUser();
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
	
	populateCountries("country", "state");

    var transportationInfo = {
    	   delivery:'Free',
    	   duration:'7 - 12 Days',
    	   charges:'0'
     }
    
    $("#id_1stDiv").addClass('select');
    
    
//});
  
function selected(id,deliveryType){
	transportationInfo = {};
	$('.charges').removeClass('select');
    $("#"+id).addClass('select');
    if(deliveryType == 0){
    	transportationInfo = {
    	   delivery:'Free',
    	   duration:'7 - 12 Days',
    	   charges:'0'
    }
    }else if(deliveryType == 1){
    	transportationInfo = {
    	    	   delivery:'Fast',
    	    	   duration:'4 - 7 Days',
    	    	   charges:'25'
    	    	}
    }else if(deliveryType == 2){
     	transportationInfo = {
 	    	   delivery:'Expert',
 	    	   duration:'24 - 48 Hours',
 	    	   charges:'75'
 	    	}
    }
           
}

function getDeliveryInfo() {  

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
			      $("#alertmessage").text('All fields are mandatory');
			      $("#alertmessage").show('slow');
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
		
		window.location = "PaymentMethods.html";
		
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

