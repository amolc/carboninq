$(document).ready(function() {
    getMenu();
    getallitems();
    cartCount();
  });

var product_data ;
var business_id = business_id;
var imageURL = imageURL;
var baseUrl = baseurl;

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


function getallitems(){

   $.ajax({
          async: true,
          url: baseurl + 'getCarboninqItemsAll' ,
          method: "GET",
          headers: {
              "accept": "application/json;odata=verbose",
              "content-type": "application/json;odata=verbose"
          },
          success: function(res) {
            var i,j,temparray;
            itemListHtmlall = '' ;
            $(res).each(function( index, value ) {

              itemListHtmlall = itemListHtmlall+'<div class="col-md-4 col-sm-6 hvr-outline-in box-1-item">'
                        +'<a href="product_detail.html?product='+value.item_id+'">'
                          +`<div class="thumb" id="`+value.item_id+`_image"  alt="`+value.item_image+`" style="background-image: url('`+imageURL+`web/`+business_id.business_id+`/`+value.item_image+`');">`
                          +'</div>'
                          +'<div class="content">'
                            +'<div class="code" title="'+value.item_name+'" id="'+value.item_id+'_name"  value ="'+value.item_name+'" >'+value.item_name+'</div>'

                            +'<hr>'
                            +'<div class="desc">'
                              +'<div style="padding-bottom:5px;">'
                                +'<p id="'+value.item_id+'_description"  value ="'+value.item_description+'">'+value.item_description+'</p>'
                              +'</div>'
                            +'</div>'
                          +'</div>'
                        +'</a>'
                        +'<div class="price" >SGD <div id="'+value.item_id+'_price">'+value.item_price+'</div></div>'
                        +'<div class="price-details">'
                          +'<div style="width:100px;float:left;" >'
                          +'<select  name="quantity"  id="'+value.item_id+'_quantity" value="2" class="form-control" style="width:100px;" >'
                          +'<option selected value="1">1</option>'
                          +'<option value="2" >2</option>'
                          +'<option>3</option>'
                          +'<option>4</option>'
                          +'<option>5</option>'
                          +'<option>6</option>'
                          +'<option>7</option>'
                          +'<option>8</option>'
                          +'<option>9</option>'
                          +'<option>10</option>'
                          +'</select>'
                          +'</div>'
                          +'<div style="float:right;">'
                            +'<button type="button" onclick="addItem('+value.item_id+')" class="btn btn-sm btn-green btn-round" >Add To Cart</button></p>'
                          +'</div>'
                        +'</div>' // end red box
                        +'</div>'
                        +'</div>';

            });



                $('#id_itemList').html(itemListHtmlall);

          },error: function(error) {
              console.log(JSON.stringify(error));
        }

     });
}



function getMenu(){

   $.ajax({
          async: true,
          url: baseurl + 'categoriesbycarboniqid/' + business_id.business_id,
          method: "GET",
          headers: {
              "accept": "application/json;odata=verbose",
              "content-type": "application/json;odata=verbose"
          },
          success: function(data) {

            $('#id_headerCategories').html('');

            var htmlHeaderCategories = '';
            htmlHeaderCategories = '<li role="presentation" id="0" onclick="change_category(0)"><a href="#" aria-controls="all" role="tab" data-toggle="tab">All</a></li>';

            $(data).each(function( index, value ) {
              htmlHeaderCategories = htmlHeaderCategories + '<li role="presentation" id="'+value.category_id+'" onclick="change_category('+value.category_id+')"><a href="#" aria-controls="all" role="tab" data-toggle="tab">'+value.category_name+'</a></li>';
            });

            $('#category_list').append(htmlHeaderCategories);

          },
            error: function(error) {
              console.log(JSON.stringify(error));
            }
     });

}



function getitemById(id){

  $.ajax({
         async: true,
         url: baseurl + 'getCarboninqItemsByCategoryID/' + id,
         method: "GET",
         headers: {
             "accept": "application/json;odata=verbose",
             "content-type": "application/json;odata=verbose"
         },
         success: function(res) {
           var i,j,temparray;
           itemListHtmlall = '' ;
           $(res).each(function( index, value ) {
             console.log(value);

             itemListHtmlall = itemListHtmlall+'<div class="col-md-4 col-sm-6 hvr-outline-in box-1-item">'
                       +'<a href="product_detail.html?product='+value.item_id+'">'
                         +`<div class="thumb" id="`+value.item_id+`_image"  alt="`+value.item_image+`" style="background-image: url('`+imageURL+`web/`+business_id.business_id+`/`+value.item_image+`');">`
                         +'</div>'
                         +'<div class="content">'
                           +'<div class="code" title="'+value.item_name+'" id="'+value.item_id+'_name"  value ="'+value.item_name+'" >'+value.item_name+'</div>'

                           +'<hr>'
                           +'<div class="desc">'
                             +'<div style="padding-bottom:5px;">'
                               +'<p id="'+value.item_id+'_description"  value ="'+value.item_description+'">'+value.item_description+'</p>'
                             +'</div>'
                           +'</div>'
                         +'</div>'
                       +'</a>'
                       +'<div class="price" >SGD <div id="'+value.item_id+'_price">'+value.item_price+'</div></div>'
                       +'<div class="price-details">'
                         +'<div style="width:100px;float:left;" >'
                         +'<select  name="quantity"  id="'+value.item_id+'_quantity" value="2" class="form-control" style="width:100px;" >'
                         +'<option selected value="1">1</option>'
                         +'<option value="2" >2</option>'
                         +'<option>3</option>'
                         +'<option>4</option>'
                         +'<option>5</option>'
                         +'<option>6</option>'
                         +'<option>7</option>'
                         +'<option>8</option>'
                         +'<option>9</option>'
                         +'<option>10</option>'
                         +'</select>'
                         +'</div>'
                         +'<div style="float:right;">'
                           +'<button type="button" onclick="addItem('+value.item_id+')" class="btn btn-sm btn-green btn-round" >Add To Cart</button></p>'
                         +'</div>'
                       +'</div>' // end red box
                       +'</div>'
                       +'</div>';

           });



               $('#id_itemList').html(itemListHtmlall);

         },error: function(error) {
             console.log(JSON.stringify(error));
       }

    });

}


function change_category(id)
{
  if(id==0){
    console.log("if0");
    console.log(id);
    getallitems();
  }else{
    console.log(id);
    console.log("else");
    getitemById(id)
  }
}

function cartCount()
  {
    if(localStorage.getItem('cart_data')!=null){
    	var itemCount =JSON.parse(localStorage.getItem('cart_data')).length;
      console.log(itemCount);
      $('#itemCount').html(itemCount).css('display', 'block');
    }else{
      var itemCount = 0;
      $('#itemCount').html(itemCount).css('display', 'block');
    }
  }


  function addItem(item_id)
  {
    var product_data ;

    var nameId = "#"+item_id+"_name" ;
    console.log(nameId);
    var	name= $(nameId).attr('title');
    console.log(name);

    var descriptionId = "#"+item_id+"_description" ;
    console.log(descriptionId);
    var	description= $(descriptionId).attr('value');
    console.log(description);

    var item = item_id ;
    var priceId = "#"+item_id+"_price" ;
    var	price= $(priceId).html();
    console.log(price);

    var imageId = "#"+item_id+"_image" ;
    console.log(imageId);
    var	thumbnail= $(imageId).attr('alt');
    console.log(thumbnail);

    var qtyId = item_id+"_quantity" ;
    var	quantity= document.getElementById(qtyId).value;
    console.log(quantity);

    var itemprice = price*quantity ;
    console.log(itemprice);

    var addcart = {} ;
    addcart.item_id  = item_id ;
    addcart.item_name = name ;
    addcart.actual_price = itemprice ;
    addcart.item_description = description ;
    addcart.business_id = "78" ;
    addcart.item_image = thumbnail ;
    addcart.quantity = quantity ;
    addcart.item_price = price ;
    addcart.created_on = moment().format("YYYY/MM/DD");
    addcart.modified_on = moment().format("YYYY/MM/DD");


    var check_cart_data=[];
    check_cart_data=localStorage.getItem('cart_data') ;

    if(check_cart_data===null || check_cart_data.length==0 )
    {
      console.log("we are in the check data null loop");
      cart_data=[];
      cart_data.push(addcart);
      localStorage.setItem('cart_data',JSON.stringify(cart_data));
      cartCount();
    }else{

        cart_data= JSON.parse(localStorage.getItem('cart_data'));
        $(cart_data).each(function( index, value ) {
          if ( value.item_id == item_id){
              console.log(value);
              	cart_data.splice(index,1);
          }
        });
        cart_data.push(addcart);
        localStorage.setItem('cart_data',JSON.stringify(cart_data));
        $('.showalert').fadeIn(500);
        $('.showalert').delay(5000);
        $('.showalert').fadeOut(3000);
       cartCount();

    }



  }

  function onChangeQty(item_id,qnty)
  {
     product_data.quantity=qnty;
  }
