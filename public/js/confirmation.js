//$(document).ready(function() {

//    getCurrentUser();
    cartCount();
    updateCartDetails();
    updateDeliveryDetails();
    contactDetails();
    updateCardDetails();

  var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;

	$('#id_loading').hide();
	$('#id_submit').show();


  $(window).scroll(function(e){
    var $el = $('.navbar-btm');
    var isPositionFixed = ($el.css('position') == 'fixed');
    if ($(this).scrollTop() > 200 && !isPositionFixed){
      $('.navbar-btm').css({'position': 'fixed', 'top': '0px'});
    }
    if ($(this).scrollTop() < 200 && isPositionFixed)
    {
       $('.navbar-btm').css({'position': '', 'top': '100px'});
    }
  });

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



function updateCartDetails(){
		 var cart = JSON.parse(localStorage.getItem('cart_data'));
		 var delivery = JSON.parse(localStorage.getItem('delivery'));

		 if(cart != null && cart != ''){
			     $('#id_grandTotal').html('');
				 var htmlCartDetails = "";
				 var grandTotal = parseInt(delivery.charges);
				 $(cart).each(function( index, value ) {
					 grandTotal = grandTotal + parseInt(value.quantity*value.item_price);
					 htmlCartDetails = htmlCartDetails + '<ul class="row check-item">'
			            +'<li class="col-xs-6">'
			            +'<p>'+value.item_name+'</p>'
			            +'</li>'
			            +'<li class="col-xs-2 text-center">'
			            +'<p>$'+value.item_price+'</p>'
			            +'</li>'
			            +'<li class="col-xs-2 text-center">'
			            +'<p>'+value.quantity+'</p>'
			            +'</li>'
			            +'<li class="col-xs-2 text-center">'
			            +'<p>$'+(value.item_price*value.quantity)+'</p>'
			            +'</li>'
			            +'</ul>';

		    	 });
          console.log(htmlCartDetails);
				 $('#id_cartProductDetails').append(htmlCartDetails);

				 $('#id_grandTotal').append("$"+grandTotal);
				 localStorage.setItem('grand_total',grandTotal);
		 }
}

function updateDeliveryDetails(){
	 var delivery = JSON.parse(localStorage.getItem('delivery'));
	 if(delivery != null && delivery != 'undefined'){

		    console.log(delivery);

        var htmlTransportationDetails = '<ul class="row check-item">'
                +'<li class="col-xs-6">'
		            +'<p>'+delivery.delivery+'</p>'
		            +'</li>'
		            +'<li class="col-xs-2 text-center"></li>'
		            +'<li class="col-xs-2 text-center">'
		            +'<p>'+delivery.duration+'</p>'
		            +'</li>'
		            +'<li class="col-xs-2 text-center">'
                +'<p> $'+delivery.charges+'</p></li>'
                +'<li class="col-sm-6"> <span></span> </li>';
			 $('#id_transaportationDetails').append(htmlTransportationDetails);



       var htmlDeliveryDetails = '<li class="col-sm-12">'
               +'<span><b>Delivery Type</b>      '+delivery.delivery+'  ('+delivery.deliveryday+'-'+delivery.deliverytime+')'+'</span>'
               +'</li>'
               +'<li class="col-sm-12">'
               +'<span>Address</span>'
               +'</li>'
               +'<li class="col-sm-12">'
               +'<span>'+delivery.first_name+' '+delivery.last_name+'</span>'
               +'</li>'
               +'<li class="col-sm-12">'
               +'<span>'+delivery.address+'</span>'
               +'</li>'
               +'<li class="col-sm-12">'
              +'<span>'+delivery.city+delivery.zipCode+'</span>'
              +'</li>'
              +'<li class="col-sm-12">'
             +'<span>'+delivery.email+'</span>'
             +'</li>'
               +'<li class="col-sm-12">'
               +'<span>'+delivery.phone+'</span>'
               +'</li>';



       var selfcollectDetails = '<li class="col-sm-12 ">'
               +'<span>Self Collection Point</span>'
               +'</li>'
               +'<li class="col-sm-12">'
               +'<span>33 Poh Huat Drive</span>'
               +'</li>'
               +'<li class="col-sm-12">'
              +'<span>Singapore 546823</span>'
              +'</li>'
               +'<li class="col-sm-12">'
               +'<span>Phone : +65 9146 1911</span>'
               +'</li>'
               +'<li class="col-sm-12">'
               +'<span>Collection within 7 days of email confirmation.<br> Monday - Friday 11am - 8pm</span>'
               +'</li>';

          var deliveryaddress = '' ;
          var deliverytypeheading ='';

          if(delivery.delivery=="Self Collection"){
              deliveryaddress = selfcollectDetails ;
              deliverytypeheading = "<h2>Self Collection Information</h2>" ;

          }else{
              deliveryaddress = htmlDeliveryDetails ;
              deliverytypeheading = "<h2>Delivery Information</h2>" ;
          }
        $('#deliverytype').append(deliverytypeheading);
			  $('#id_deliveryDetails').append(deliveryaddress);

	 }
}









function contactDetails(){
	 var delivery = JSON.parse(localStorage.getItem('delivery'));
	 if(delivery != null && delivery != 'undefined'){
		    console.log(delivery);

		    var contactDetails = '<li class="col-sm-12 ">'
	              +'<span>'+delivery.first_name+' '+delivery.last_name+'</span>'
	              +'</li>'
	              +'<li class="col-sm-12">'
	              +'<span>'+delivery.address+'</span>'
	              +'</li>'
                +'<li class="col-sm-12">'
               +'<span>'+delivery.city+delivery.zipCode+'</span>'
               +'</li>'
               +'<li class="col-sm-12">'
              +'<span>'+delivery.email+'</span>'
              +'</li>'
	              +'<li class="col-sm-12">'
	              +'<span>'+delivery.phone+'</span>'
	              +'</li>';

			 $('#id_contactDetails').append(contactDetails);

	 }
}





function updateCardDetails(){
	var payment_type= localStorage.getItem('payment_type');
	 if(payment_type != null && payment_type != 'undefined')
	 {
		 if(payment_type=='cash')
		 {
		    	cardImage = 'images/cod.png';
		    	var htmlCardDetails = '<li class="col-xs-6">'
	              +'<p><img class="margin-right-20" style="height: 70px;" src="'+cardImage+'" alt=""> Cash On Delivery</p>'
	              +'</li>'
	              +'<li class="col-xs-6 text-center">'

	              +'</li>';

			 $('#id_cardDetails').append(htmlCardDetails);
		 }
		 else
		 {
			 var card = JSON.parse(localStorage.getItem('card'));
			 if(card != null && card != 'undefined'){
			    var cardImage = '';
			    if(card.card.brand == 'Visa'){
			    	cardImage = 'images/visa-card.jpg';
			    }
			    var htmlCardDetails = '<li class="col-xs-6">'
		              +'<p><img class="margin-right-20" src="'+cardImage+'" alt="">'+card.card.brand+' Credit Card</p>'
		              +'</li>'
		              +'<li class="col-xs-6 text-center">'
		              +'<p>Card number:   XXX-XXX-XXX-'+card.card.last4+'</p>'
		              +'</li>';

				 $('#id_cardDetails').append(htmlCardDetails);
			 }
		 }
	 }
	 else
	 {
		 var card = JSON.parse(localStorage.getItem('card'));
		 if(card != null && card != 'undefined'){
		    var cardImage = '';
		    if(card.card.brand == 'Visa'){
		    	cardImage = 'images/visa-card.jpg';
		    }
		    var htmlCardDetails = '<li class="col-xs-6">'
	              +'<p><img class="margin-right-20" src="'+cardImage+'" alt="">'+card.card.brand+' Credit Card</p>'
	              +'</li>'
	              +'<li class="col-xs-6 text-center">'
	              +'<p>Card number:   XXX-XXX-XXX-'+card.card.last4+'</p>'
	              +'</li>';

			 $('#id_cardDetails').append(htmlCardDetails);
		 }
	 }
}




function placeOrder()
{
	window.location="PaymentMethods.html";
}
function placeOrder1(){
	var delivery = JSON.parse(localStorage.getItem('delivery'));
	$('#id_loading').show();
	$('#id_submit').hide();
	var params = {};
	 params.first_name = delivery.first_name;
	 params.last_name = delivery.last_name;
	 params.phone = delivery.phone;
	 params.email = delivery.email;
	 params.address = delivery.address;
	 params.city = delivery.city;
	 params.state = delivery.state;
	 params.country = delivery.country;
	 params.zipcode = delivery.zipCode;
	 $.ajax({
	        type: "POST",
	        url: baseUrl + 'addcarboninquser',
	        data: params,// now data come in this function
	        crossDomain: true,
	        dataType: "json",
	        success: function (result1) {
//	        	$('#id_loading').hide();
//	     	    $('#id_submit').show();
	        	params1={};
	        	var card = JSON.parse(localStorage.getItem('card'));
	        	params1.user_id = result1.record.insertId;

	            params1.token = card.id;
	            params1.created_on = card.created;
	            params1.cartPrice = parseInt(localStorage.getItem('grand_total'));
	            params1.name = card.card.name;
	            var token = card.id;

	     	   $.ajax({
		        type: "POST",
		        url: baseUrl + 'addcarboninqpayment',
		        data: params1,// now data come in this function
		        crossDomain: true,
		        dataType: "json",
		        success: function (result2) {
		        	$('#id_loading').hide();
		     	    $('#id_submit').show();

		     	   params2={};
		     	  var cart_data =localStorage.getItem('cart_data');
		        	params2.user_id = params1.user_id;
		            params2.payment_id=result2.record.insertId;
		            params2.total_amount= parseInt(localStorage.getItem('grand_total'));
		            params2.payment_type = 'card';
		       	 	params2.charges = delivery.charges;
		       	 	params2.delivery = delivery.delivery;
		            params2.cart_data=localStorage.getItem('cart_data');
		     	   $.ajax({
				        type: "POST",
				        url: baseUrl + 'addcarboninqorder',
				        data: params2,// now data come in this function
				        crossDomain: true,
				        dataType: "json",
				        success: function (result3) {
				        	$('#id_loading').hide();
				     	    $('#id_submit').show();
				     	   localStorage.removeItem('cart_data');
      	    	     	    localStorage.removeItem('card');
      	    	     	    localStorage.removeItem('delivery');
      	    	     	    localStorage.setItem('order_status','success');
				     	   window.location = "thank.html";

				        },error: function (jqXHR, status) {
				            // error handler
				            console.log(jqXHR);
				            localStorage.setItem('order_status','failed');
					     	 window.location = "thank.html";
				            alert('fail' + status.code);
				        }

			        });

		        },error: function (jqXHR, status) {
		            // error handler
		            console.log(jqXHR);
		            localStorage.setItem('order_status','failed');
			     	 window.location = "thank.html";
		            alert('fail' + status.code);
		        }

	        });

	        },error: function (jqXHR, status) {
	            // error handler
	            console.log(jqXHR);
	            localStorage.setItem('order_status','failed');
		     	 window.location = "thank.html";
	            alert('fail' + status.code);
	        }

        });
}
