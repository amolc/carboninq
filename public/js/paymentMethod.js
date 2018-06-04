//$(document).ready(function() {  
  
//    getCategories(); 
// getCurrentUser();    
var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
	var payment_type="card";
//	getProduct();
	
	// Stripe.setPublishableKey('pk_live_jkyEOI3O4ab2LXdgIevpM0Yz');
    Stripe.setPublishableKey('pk_test_f4AmpyV2vuql0QPEb2WHIQRo');
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
   		        	
//   		        	$('#id_headerCategories').html('');
   		        	var htmlHeaderCategories = '';
   		        	var htmlHeaderCategories1 = '';
   		        	
   		        	$(data).each(function( index, value ) {
//   		        		htmlHeaderCategories = htmlHeaderCategories + '<li role="presentation" id="'+value.category_id+'" onclick="change_category('+value.category_id+')"><a href="index.html?cat_id='+value.category_id+'" aria-controls="all" role="tab" data-toggle="tab">'+value.category_name+'</a></li>';
   		        		htmlHeaderCategories1 = htmlHeaderCategories1 + '<li><a href="index.html?cat_id='+value.category_id+'" class="active">'+value.category_name+'</a></li>';
   		        	}); 
                
//   		        	$('#category_list').append(htmlHeaderCategories);
   		        	$('#category_list1').append(htmlHeaderCategories1);
   		        }
   		        
   		 });
       }
    $("#card").attr('checked', 'checked');
    $("#cash_payment").hide();
    $(".btn_cash").hide();
    localStorage.setItem('payment_type','card');
    $('input[name="paymentRadio"]').on('change', function(){
        if ($(this).val()=='card') {
             
            //change to "show update"
             $("#card_payment").show();
             $("#cash_payment").hide();
             $(".btn_cash").hide();
             $(".btn_card").show();
             payment_type="card";
             localStorage.setItem('payment_type','card');
        } else  {
           
            $("#card_payment").hide();
            $("#cash_payment").show();
            $(".btn_cash").show();
            $(".btn_card").hide();
            payment_type="cash";
            localStorage.setItem('payment_type','cash');
        }
    });
    $('#id_loading').hide();
	$('#id_submit').show();
	function getProduct()
	{
		var url = window.location.href;
	    var parts = url.split("?");
	   
		var urlparams = parts[1];
		var id = urlparams.split("=");
		$.ajax({   
		        async: true,  
		        url: baseurl + 'carboninqsingleitem/' + id[1],  
		        method: "GET",   
		        headers: {  
		            "accept": "application/json;odata=verbose",  
		            "content-type": "application/json;odata=verbose"  
		        },  
		        success: function(res) {
		        	
		        	var itemListHtml = "";
		        	var value=res;
//		        	alert(JSON.stringify(res));
		        	itemListHtml = itemListHtml+'<div class="col-md-4">'
	   				+'<img src="'+imageURL+'web/'+business_id.business_id+'/'+value.item_image+'" class="thumb">'
	   				+'</div>'
	   				+'<div class="col-md-8">'
	   				+'<p class="title">'+value.item_name+'</p>'
	   				+'<p class="price"> SGD '+value.item_price+' </p> '
	   				
	   				+'<p>'+value.item_description+'</p>'
	   				+'</div>';
		        
	   	
					$('#item_info').html(itemListHtml);				       	        	
		        	
		        	 
	   	        
		        	
		        
		        },error: function(error) {  
		            console.log(JSON.stringify(error));    
	        }  	    	  
	    });
	}
	
//});
	
	
    
    $(document).ready(function() {
        function addInputNames() {
            $(".card-number").attr("name", "card-number")
            $(".card-cvc").attr("name", "card-cvc")
            $(".card-expiry-year").attr("name", "card-expiry-year")
        }
        function removeInputNames() {
            $(".card-number").removeAttr("name")
            $(".card-cvc").removeAttr("name")
            $(".card-expiry-year").removeAttr("name")
        }
        function submit(form) {
            removeInputNames(); 
            $('#id_loading').show();
        	$('#id_submit').hide();
            // given a valid form, submit the payment details to stripe
            $(form['submit-button']).attr("disabled", "disabled")
            Stripe.createToken({            	
                name: $('.card-name').val(),
                number: $('.card-number').val(),
                cvc: $('.card-cvc').val(),
                exp_month: $('.card-expiry-month').val(), 
                exp_year: $('.card-expiry-year').val()
            }, function(status, response) {
                if (response.error) {
                  
                    $(form['submit-button']).removeAttr("disabled")
                    $(".payment-errors").html(response.error.message);
                    addInputNames();
                } else {
                    var token = response['id'];
                    localStorage.setItem('card',JSON.stringify(response));
                    if(payment_type=="card")
                    {
                    	placeOrder1();
                    }
                    else
                    {
                    	placeOrder2();
                    }
//                    placeOrder1();
//                    window.location = "Confirmation.html";
                }
            });
            
            return false;
        }

        jQuery.validator.addMethod("cardNumber", Stripe.validateCardNumber, "Please enter a valid card number");
        jQuery.validator.addMethod("cardCVC", Stripe.validateCVC, "Please enter a valid security code");
        jQuery.validator.addMethod("cardExpiry", function() {
            return Stripe.validateExpiry($(".card-expiry-month").val(), 
                                         $(".card-expiry-year").val())
        }, "Please enter a valid expiration");
        
        $("#example-form").validate({
            submitHandler: submit,
            rules: {
                "card-cvc" : {
                    cardCVC: true,
                    required: true
                },
                "card-number" : {
                    cardNumber: true,
                    required: true
                },
                "card-expiry-year" : "cardExpiry" // we don't validate month separately
            }
        });                
        addInputNames();
        
    });
    
    function placeOrder1(){
    	var invoice={};
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
    	 invoice.user=params;
    	 $.ajax({
		        type: "POST",
		        url: baseUrl + 'getCarboninqUser',
		        data: params,// now data come in this function
		        crossDomain: true,
		        dataType: "json",
		        success: function (result3) {
		        	$('#id_loading').hide();
		     	    $('#id_submit').show();
		     	    console.log(result3);
		     	    if(result3.status==1)
		     	    {
		     	       	params1={};
		     	       	var card = JSON.parse(localStorage.getItem('card'));
		     	       	params1.user_id = result3.data[0].user_id;
		     	       	
		     	       	params1.token = card.id;
		     	       	params1.created_on = card.created;
		     	       	params1.cartPrice = parseInt(localStorage.getItem('grand_total'));
		     	       	params1.name = card.card.name;	           
		     	       	var token = card.id;
		     	       	invoice.payment=params1;   
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
		     	       		        invoice.order=params2;
		     	       		     	$.ajax({
		     	       				  type: "POST",
		     	       				  url: baseUrl + 'addcarboninqorder',
		     	       				  data: params2,// now data come in this function
		     	       				  crossDomain: true,
		     	       				  dataType: "json",
		     	       				  success: function (result3) {
		     	       				        	$('#id_loading').hide();
		     	       				     	    $('#id_submit').show();
		     	       				     	    invoice.order_id=result3.record.insertId;
		     	       				     	    invoice.cart_data=JSON.parse(localStorage.getItem('cart_data'));
												localStorage.setItem('invoice',JSON.stringify(invoice));
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
		     	       	        	
		     	       	       
						}
                        else
                        {
							$.ajax({
								type: "POST",
								url: baseUrl + 'addcarboninquser',
								data: params,// now data come in this function
								crossDomain: true,
								dataType: "json",
								success: function (result1) {
									params1={};
									var card = JSON.parse(localStorage.getItem('card'));
									params1.user_id = result1.record.insertId;   
									params1.token = card.id;
									params1.created_on = card.created;
									params1.cartPrice = parseInt(localStorage.getItem('grand_total'));
									params1.name = card.card.name;	           
									var token = card.id;
									invoice.payment=params1;   
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
										invoice.order=params2;
										$.ajax({
											type: "POST",
											url: baseUrl + 'addcarboninqorder',
											data: params2,// now data come in this function
											crossDomain: true,
											dataType: "json",
											success: function (result3) {
												$('#id_loading').hide();
												$('#id_submit').show();
												invoice.order_id=result3.record.insertId;
												invoice.cart_data=JSON.parse(localStorage.getItem('cart_data'));
												localStorage.setItem('invoice',JSON.stringify(invoice));
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
		     	       

		     	   
//		     	    alert(JSON.stringify(result3));
		        	
		        },error: function (jqXHR, status) {
		            // error handler
		            console.log(jqXHR);
		            localStorage.setItem('order_status','failed');
			     	
		        }
		        
	        });
    }
    
    

    function placeOrder2(){
		var invoice={};
    	var delivery = JSON.parse(localStorage.getItem('delivery'));
    	
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
		 invoice.user=params;
		 $.ajax({
		        type: "POST",
		        url: baseUrl + 'getCarboninqUser',
		        data: params,// now data come in this function
		        crossDomain: true,
		        dataType: "json",
		        success: function (result3) {
		        	$('#id_loading').hide();
		     	    $('#id_submit').show();
		     	    console.log(result3);
		     	    if(result3.status==1)
		     	    {
						params2={};
								var cart_data =localStorage.getItem('cart_data');
								params2.user_id = result3.data[0].user_id;
								params2.payment_id=null;
								params2.total_amount= parseInt(localStorage.getItem('grand_total'));
								params2.payment_type = 'cash';
								params2.charges = delivery.charges;
								params2.delivery = delivery.delivery;
								params2.cart_data=localStorage.getItem('cart_data');
								invoice.order=params2;
								$.ajax({
									type: "POST",
									url: baseUrl + 'addcarboninqorder',
									data: params2,// now data come in this function
									crossDomain: true,
									dataType: "json",
									success: function (result3) {
										$('#id_loading').hide();
										$('#id_submit').show();
										invoice.order_id=result3.record.insertId;
		     	       				    invoice.cart_data=JSON.parse(localStorage.getItem('cart_data'));
										localStorage.setItem('invoice',JSON.stringify(invoice));
										localStorage.removeItem('cart_data');
										localStorage.removeItem('cash');
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
					}
					else
					{
						$.ajax({
							type: "POST",
							url: baseUrl + 'addcarboninquser',
							data: params,// now data come in this function
							crossDomain: true,
							dataType: "json",
							success: function (result1) {
								params2={};
								var cart_data =localStorage.getItem('cart_data');
								params2.user_id = result1.record.insertId;
								params2.payment_id=null;
								params2.total_amount= parseInt(localStorage.getItem('grand_total'));
								params2.payment_type = 'cash';
								params2.charges = delivery.charges;
								params2.delivery = delivery.delivery;
								params2.cart_data=localStorage.getItem('cart_data');
								invoice.order=params2;
								$.ajax({
									type: "POST",
									url: baseUrl + 'addcarboninqorder',
									data: params2,// now data come in this function
									crossDomain: true,
									dataType: "json",
									success: function (result3) {
										$('#id_loading').hide();
										$('#id_submit').show();
										invoice.order_id=result3.record.insertId;
		     	       				    invoice.cart_data=JSON.parse(localStorage.getItem('cart_data'));
										localStorage.setItem('invoice',JSON.stringify(invoice));
										localStorage.removeItem('cart_data');
										localStorage.removeItem('cash');
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
					}
				},error: function (jqXHR, status) {
					// error handler
					console.log(jqXHR);
					localStorage.setItem('order_status','failed');
					window.location = "thank.html";
					alert('fail' + status.code);
				}
    				        
			});
    }




    