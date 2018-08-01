ordertype();

var business_id = business_id;
var imageURL = imageURL;
var baseUrl = baseurl;
var orderBodyTable1 = [];
var invoice=JSON.parse(localStorage.getItem('invoice'));


function ordertype(){

   var invoice=JSON.parse(localStorage.getItem('invoice'));

   var shippingDetailsHtml = "";
         shippingDetailsHtml = '<div><h3><b>Shipping Address</b></h3>'
       +'<div class="panel-heading"> </div>'
       +'<p>'+invoice.user.first_name+' '+invoice.user.last_name+' </p>'
       +'<p>'+invoice.user.address+'</p>'
       +'<p>'+invoice.user.country+'-'+invoice.user.zipcode+'</p></div>';

    var collectionhtml = "";
          collectionhtml = '<div style="line-height:10pt;"><h3><b>Collection Address</b></h3>'
               +'<div class="panel-heading"> </div>'
               +'<p>Carboninq Collection Point </p>'
               +'<p>33 poh huat drive</p>'
               +'<p>Singapore 546823</p>'
               +'<p>Phone : +65 9146 1911</p>'
              +'<p>sales@carboninq.com</p>';
              +'<p>Remark: Please collect within 7 days from order date.</p>';

              if(invoice.order.delivery=="Self Collection"){
                $('#shopping_details').html(collectionhtml);
              }else{
                $('#shopping_details').html(shippingDetailsHtml);
              }

 }


var customerDetailsHtml = "";
      customerDetailsHtml = '<div style="float:right;line-height:10pt;"><h3><b>Customer Details</b></h3>'
    +'<div class="panel-heading"> </div>'
        +'<p><b>Order No :'+invoice.order_id+'</b></p>'
        +'<p><b>Name : </b>'+invoice.user.first_name+' '+invoice.user.last_name+' </p>'
        +'<p><b>Email : </b>'+invoice.user.email+'</p>'
        +'<p><b>Tel : </b>'+invoice.user.phone+'</p>'
        +'<p>'+invoice.user.address+'</p>'
        +'<p>'+invoice.user.country+'-'+invoice.user.zipcode+'</p></div>';

var shippingDetailsHtml = "";
      shippingDetailsHtml = '<div><h3><b>Shipping Address</b></h3>'
    +'<div class="panel-heading"> </div>'
        +'<p>'+invoice.user.first_name+' '+invoice.user.last_name+' </p>'
        +'<p>'+invoice.user.address+'</p>'
        +'<p>'+invoice.user.country+'-'+invoice.user.zipcode+'</p></div>';

var itemListHtml='<table class="table table-striped table-hover table-bordered">'
                      +'<tbody><tr><th><b>Image</b></th><th><b>Product</b></th><th><b>QTY</b></th>'
                      +'<th><b>Unit Price</b></th><th><b>Total Price</b></th></b></tr>';
for(var i=0;i<invoice.cart_data.length;i++)
{
  itemListHtml=itemListHtml+'<tr>'
  +'<td><img src="'+imageURL+'web/'+business_id.business_id+'/'+invoice.cart_data[i]['item_image']+'" style="height: 100px;width: 100px;"></td>'
  +'<td>'+invoice.cart_data[i]['item_name']+'</td><td>'+invoice.cart_data[i]['quantity']+'</td>'
  +'<td>SGD '+invoice.cart_data[i]['item_price']+'</td>'
  +'<td>SGD '+(invoice.cart_data[i]['item_price']*invoice.cart_data[i]['quantity'])+'</td>'
}
itemListHtml=itemListHtml+'<tr>'
         +'<th colspan="4"><span class="pull-right"><b>Sub Total</b></span></th>'
         +'<th>SGD '+(invoice.order.total_amount-invoice.order.charges)+'</th>'
         +'</tr>'
         +'<tr>'
         +'<th colspan="4"><span class="pull-right"><b>Shipping Charges</b></span></th>'
         +'<th>SGD '+invoice.order.charges+'</th>'
         +'</tr>'
         +'<tr>'
         +'<th><span class="pull-right"><b>Payment Type</b></span></th><th>'+invoice.order.payment_type+'</th>'
         +'<th colspan="2"><span class="pull-right"><b>Total</b></span></th>'
         +'<th>SGD '+invoice.order.total_amount+'</th>'
         +'</tr>'
         +'</tbody>'
         +'</table>';



$('#customer_details').html(customerDetailsHtml);
$('#itemList').html(itemListHtml);

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
function toDataUrl(url, value, callback) {
var xhr = new XMLHttpRequest();
xhr.onload = function() {

var reader = new FileReader();

reader.onloadend = function() {
        callback(reader.result,value);
    }
    reader.readAsDataURL(xhr.response);
};

xhr.open('GET', url);
xhr.responseType = 'blob';
xhr.send();
}

function onOpenPDF(){

var content1 = [];
orderBodyTable1 = [
              [
                {text: 'Image', style: 'tableHeader'},
                {text: 'Product', style: 'tableHeader'},
                {text: 'QTY', style: 'tableHeader'},
                {text: 'Unit Price', style: 'tableHeader'},
                {text: 'Total Price', style: 'tableHeader'}
              ]

            ];


      console.log(invoice.cart_data);
for(var i=0;i<invoice.cart_data.length;i++){
    value = invoice.cart_data[i];

    toDataUrl(imageURL+'web/78/'+value.item_image,value,function(myBase64,product) {

var innerArray = [
  {
      image: myBase64,
      width: 50,
      height: 50,
   },
  {text: product.item_name, color: 'gray'},
  {text: product.quantity, color: 'gray'},
  {text: product.item_price, color: 'gray'},
  {text: parseInt(product.quantity*product.item_price), color: 'gray'},
];

orderBodyTable1.push(innerArray);
    });
     }
                console.log(orderBodyTable1);



               content = [
                  'Invoice\n\n',
                  {
                    style: 'tableExample',
                    table: {
                      widths: [200, '*', '*', 150],
                      body: [
                        [
                          'Customer Details',
                          '',
                          '',
                          'Shipping Details'
                          ],
                        [
                          {
                            table: {
                              body: [
                                ['ORDER NO',invoice.order_id],
                              ]
                            },
                            layout: 'noBorders'
                          },
                          '',
                            '',
                            invoice.user.first_name+' '+invoice.user.last_name
                          ],
                        [
                          {
                            table: {
                              body: [
                                ['NAME',invoice.user.first_name+' '+invoice.user.last_name],
                              ]
                            },
                            layout: 'noBorders'
                          },
                          '',
                          '',
                          invoice.user.address
                        ],
                        [
                          {
                            table: {
                              body: [
                                ['EMAIL',invoice.user.email],
                              ]
                            },
                            layout: 'noBorders'
                          },
                          '',
                          '',
                          invoice.user.country+' '+invoice.user.zipcode
                        ],
                        [
                          {
                            table: {
                              body: [
                                ['Tel',invoice.user.phone],
                              ]
                            },
                            layout: 'noBorders'
                          },
                          '',
                          '',
                          ''
                        ],
                      ]
                    },
                    layout: 'noBorders'
                  },

                ];

 var suTotalArray = [
   {colSpan:4,text:'Sub Total',alignment: 'right'},
   '',
   '',
   '',
   {text:'SGD '+(invoice.order.total_amount-invoice.order.charges)}
];
orderBodyTable1.push(suTotalArray);

var deliveryChargesArray = [
   {colSpan:4,text:'Shipping Charges',alignment: 'right'},
   '',
   '',
   '',
   {text:'SGD '+invoice.order.charges}
];
orderBodyTable1.push(deliveryChargesArray);

var paymentTypeArray = [
  {text:'Payment Type',alignment: 'right'},
  {text:"Credit Card"},
  {colSpan:2,text:'Total',alignment: 'right'},
  '',
  {text:'SGD '+invoice.order.total_amount.toLocaleString()}
];
orderBodyTable1.push(paymentTypeArray);

content1 = content;
var orderBodyObject = {
style: 'tableExample',
table: {
  widths: ['*', 200, '*','*',80],
  headerRows: 1,
  body: orderBodyTable1
},
};

content1.push(orderBodyObject);

console.log(content1);

var dd = {
content: content1,
styles: {
  header: {
    fontSize: 18,
    bold: true
  },
  bigger: {
    fontSize: 15,
    italics: true
  },
  tableExample: {
    margin: [0, 5, 0, 15]
  },
},
defaultStyle: {
  columnGap: 20
}

};

console.log(dd);
pdfMake.createPdf(dd).open();
}
