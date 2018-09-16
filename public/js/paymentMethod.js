var business_id = business_id;
var imageURL = imageURL;
var baseUrl = baseurl;
var payment_type = "card";

$(window).scroll(function (e) {
    var $el = $('.navbar-btm');
    var isPositionFixed = ($el.css('position') == 'fixed');
    if ($(this).scrollTop() > 200 && !isPositionFixed) {
        $('.navbar-btm').css({
            'position': 'fixed',
            'top': '0px'
        });
    }
    if ($(this).scrollTop() < 200 && isPositionFixed) {
        $('.navbar-btm').css({
            'position': '',
            'top': '100px'
        });
    }
});

// Stripe.setPublishableKey('pk_live_Myl1OMbipQMGAMDnqf6SZ3Gv'); //carboninq account
Stripe.setPublishableKey('pk_test_OKKZyHD6nnZujaeDy0ks4fWa'); //carboninq account

function cartCount() {
    if (localStorage.getItem('cart_data') != null) {
        var itemCount = JSON.parse(localStorage.getItem('cart_data')).length;
        $('#itemCount').html(itemCount).css('display', 'block');
    } else {
        var itemCount = 0;
        $('#itemCount').html(itemCount).css('display', 'block');
    }
}
cartCount();

$("#card").attr('checked', 'checked');
$("#cash_payment").hide();
$(".btn_cash").hide();
localStorage.setItem('payment_type', 'card');
$('input[name="paymentRadio"]').on('change', function () {
    if ($(this).val() == 'card') {

        //change to "show update"
        $("#card_payment").show();
        $(".btn_card").show();
        payment_type = "card";
        $("#cash_payment").hide();
        $(".btn_cash").hide();
        localStorage.setItem('payment_type', 'card');
    } else {

        $("#card_payment").hide();
        $("#cash_payment").show();
        $(".btn_cash").show();
        $(".btn_card").hide();
        payment_type = "cash";
        localStorage.setItem('payment_type', 'cash');
    }
});


function getProduct() {
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
        success: function (res) {

            var itemListHtml = "";
            var value = res;
            //		        	alert(JSON.stringify(res));
            itemListHtml = itemListHtml + '<div class="col-md-4">' +
                '<img src="' + imageURL + 'web/' + business_id.business_id + '/' + value.item_image + '" class="thumb">' +
                '</div>' +
                '<div class="col-md-8">' +
                '<p class="title">' + value.item_name + '</p>' +
                '<p class="price"> SGD ' + value.item_price + ' </p> '

                +
                '<p>' + value.item_description + '</p>' +
                '</div>';


            $('#item_info').html(itemListHtml);





        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
}

//});



$(document).ready(function () {

    $("#card").attr('checked', 'checked');
    $('#id_loading').hide();
    $('#id_submit').show();

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
        console.log("Submit Form");
        removeInputNames();
        $('#id_loading').show();
        $('#id_submit').hide();
        // given a valid form, submit the payment details to stripe
        $(form['submit-button']).attr("disabled", "disabled");
        Stripe.createToken({
            name: $('.card-name').val(),
            number: $('.card-number').val(),
            cvc: $('.card-cvc').val(),
            exp_month: $('.card-expiry-month').val(),
            exp_year: $('.card-expiry-year').val()
        }, function (status, response) {
            if (response.error) {
                console.log("Response Error has come");
                console.log(response.error);
                console.log(response.error.code);
                console.log(response.error.message);
                $(form['submit-button']).removeAttr("disabled");
                $('#cardmessage').html(response.error.message);
                $('.showalert').fadeIn(500);
                $('.showalert').delay(5000);
                $('.showalert').fadeOut(3000);
                $('#id_loading').hide();
                $('#id_submit').show();
            } else {
                var token = response['id'];
                localStorage.setItem('card', JSON.stringify(response));
                placeOrder1();

            }
        });

        return false;
    }

    jQuery.validator.addMethod("cardNumber", Stripe.validateCardNumber, "Please enter a valid card number");
    jQuery.validator.addMethod("cardCVC", Stripe.validateCVC, "Please enter a valid security code");
    jQuery.validator.addMethod("cardExpiry", function () {
        return Stripe.validateExpiry($(".card-expiry-month").val(),
            $(".card-expiry-year").val())
    }, "Please enter a valid expiration");

    $("#example-form").validate({
        submitHandler: submit,
        rules: {
            "card-cvc": {
                cardCVC: true,
                required: true
            },
            "card-number": {
                cardNumber: true,
                required: true
            },
            "card-expiry-year": "cardExpiry" // we don't validate month separately
        }
    });
    addInputNames();

});

function placeOrder1() {
    var invoice = {};
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
    invoice.user = params;
    $.ajax({
        type: "POST",
        url: baseUrl + 'getCarboninqUser',
        data: params, // now data come in this function
        crossDomain: true,
        dataType: "json",
        success: function (result3) {
            $('#id_loading').hide();
            $('#id_submit').show();
            console.log(result3);
            if (result3.status == 1) {
                params1 = {};
                var card = JSON.parse(localStorage.getItem('card'));
                console.log("placeoder1");
                console.log(card);
                params1.user_id = result3.data[0].user_id;
                params1.token = card.id;
                params1.created_on = card.created;
                params1.cartPrice = parseInt(localStorage.getItem('grand_total'));
                params1.name = card.card.name;
                var token = card.id;
                invoice.payment = params1;
                console.log(params1);
                var result2 ={};
                $.ajax({
                    type: "POST",
                    url: baseUrl + 'addcarboninqpayment',
                    data: params1, // now data come in this function
                    crossDomain: true,
                    dataType: "json",
                    success: function (result2) {
                          console.log(result2);
                            console.log("Line 240 addcarboninqorder");
                            params2 = {};
                            $('#id_loading').hide();
                            $('#id_submit').show();

                            var cart_data = localStorage.getItem('cart_data');
                            params2.user_id = params1.user_id;
                            params2.payment_id = result2.record.insertId;
                            params2.total_amount = parseInt(localStorage.getItem('grand_total'));
                            params2.payment_type = 'card';
                            params2.charges = delivery.charges;
                            params2.delivery = delivery.delivery;
                            params2.cart_data = localStorage.getItem('cart_data');
                            invoice.order = params2;
                            $.ajax({
                                type: "POST",
                                url: baseUrl + 'addcarboninqorder',
                                data: params2, // now data come in this function
                                crossDomain: true,
                                dataType: "json",
                                success: function (result3) {
                                    console.log(result3);
                                    $('#id_loading').hide();
                                    $('#id_submit').show();
                                    invoice.order_id = result3.record.insertId;
                                    invoice.cart_data = JSON.parse(localStorage.getItem('cart_data'));
                                    localStorage.setItem('invoice', JSON.stringify(invoice));
                                    localStorage.setItem('order_status', 'success');
                                    localStorage.removeItem('cart_data');
                                    localStorage.removeItem('card');
                                    localStorage.removeItem('delivery');
                                    localStorage.removeItem('deliveryday');
                                    localStorage.removeItem('deliverytime');
                                    localStorage.removeItem('grand_total');
                                    localStorage.removeItem('payment_type');
                                    localStorage.removeItem('transportationInfo');
                                    window.location = "thank.html";
                                },
                                error: function (jqXHR, status) {
                                    // error handler
                                    console.log(jqXHR);
                                    localStorage.setItem('order_status', 'failed');
                                    alert('fail' + status.code);
                                }
                            });


                    },
                    error: function (jqXHR, status) {
                        // error handler
                        console.log(jqXHR);
                        localStorage.setItem('order_status', 'failed');
                        alert('Fail' + status.code);

                    }

                });


            }
        },
        error: function (jqXHR, status) {
            // error handler
            console.log(jqXHR);
            localStorage.setItem('order_status', 'failed');

        }

    });
}
