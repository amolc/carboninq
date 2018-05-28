//$(document).ready(function() {  
  
//    getCategories(); 
 getCurrentUser();    
var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;

  
//});
	
	// Stripe.setPublishableKey('pk_live_jkyEOI3O4ab2LXdgIevpM0Yz');
    Stripe.setPublishableKey('pk_test_f4AmpyV2vuql0QPEb2WHIQRo');
       
    
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
                    window.location = "Confirmation.html";
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