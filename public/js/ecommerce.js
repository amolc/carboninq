$(document).ready(function() {
    getMenu();
    getallitems();
    cartCount();
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
                          +`<div class="thumb" style="background-image: url('`+imageURL+`web/`+business_id.business_id+`/`+value.item_image+`');">`

                          +'</div>'
                          +'<div class="content">'
                            +'<div class="code" title="'+value.item_name+'">'+value.item_name+'</div>'
                            +'<hr>'
                            +'<div class="desc">'
                              +'<div style="padding-bottom:5px;">'
                                +'<p>'+value.item_description+'</p>'
                              +'</div>'
                            +'</div>'
                          +'</div>'
                        +'</a>'
                        +'<div class="price-details">'
                          +'<div class="price">SGD '+value.item_price+'</div>'
                          +'<a href="product_detail.html?product='+value.item_id+'"><span class="btn btn-sm pull-right product_btn"><i class="fa fa-shopping-cart"></i></span></a>'
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
                         +`<div class="thumb" style="background-image: url('`+imageURL+`web/`+business_id.business_id+`/`+value.item_image+`');">`

                         +'</div>'
                         +'<div class="content">'
                           +'<div class="code" title="'+value.item_name+'">'+value.item_name+'</div>'
                           +'<hr>'
                           +'<div class="desc">'
                             +'<div style="padding-bottom:5px;">'
                               +'<p>'+value.item_description+'</p>'
                             +'</div>'
                           +'</div>'
                         +'</div>'
                       +'</a>'
                       +'<div class="price-details">'
                         +'<div class="price">SGD '+value.item_price+'</div>'
                         +'<a href="product_detail.html?product='+value.item_id+'"><span class="btn btn-sm pull-right product_btn"><i class="fa fa-shopping-cart"></i></span></a>'
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
      $('#itemCount').html(itemCount).css('display', 'block');
    }else{
      var itemCount =0;
      $('#itemCount').html(itemCount).css('display', 'block');
    }
  }
