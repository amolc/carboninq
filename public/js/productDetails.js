//$(document).ready(function() {  
  getCurrentUser();
    getProduct(); 
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;

//}); 
	
function getRelatedProducts(cat_id) {
	 
		$.ajax({   
	        async: true,  
	        url: baseurl + 'getPortalItemsByCategoryID/' + cat_id,  
	        method: "GET", 
	        headers: {  
	            "accept": "application/json;odata=verbose",  
	            "content-type": "application/json;odata=verbose"  
	        },
	        success: function(data) { 

	        	  $(data).each(function( index, value ) {
	        		  var item_images = value.item_image.split(',');
	        		  var htmlFloatingBanner = '<div class="owl-item" style="width: 204px; margin-right: 30px;">'
	        		                       +'<a href="Product-Details.html?product='+value.item_id+'"><div class="product product1">'
                                           +'<article style="padding: 0px;">'
                                           +'<img class="img-responsive" src="'+imageURL+'web/'+business_id.business_id+'/'+item_images[0]+'" alt="">'
                                           +'</article>'
                                           +'</div></a>'
                                           +'</div>';
	        		  
	        		  $('#id_floatingBanner').owlCarousel().trigger('add.owl.carousel', [jQuery('<div class="owl-item">' + htmlFloatingBanner + '</div>')]).trigger('refresh.owl.carousel');
	        	  });
	        	  	        	  	        	  
	        	  
	        },error: function(error) {  
	            console.log(JSON.stringify(error));  	    	  
	        }
	   });
}
	
function getProduct() {  
	  
	var url = window.location.href;
    var parts = url.split("?");
    if(parts.length>1){
    	
	       var urlparams = parts[1];
	       var params = urlparams.split("&");
	       var id = urlparams.split("=")
	       if (id[0]=='product') {
	    	   
	    	   $.ajax({   
	    	        async: true,  
	    	        url: baseurl + 'portalitemsbybusinessid/' + business_id.business_id,  
	    	        method: "GET", 
	    	        headers: {  
	    	            "accept": "application/json;odata=verbose",  
	    	            "content-type": "application/json;odata=verbose"  
	    	        },
	    	        success: function(data) { 
	    	        		    	        	
//	    	        	localStorage.removeItem('cart');
	    	        	
	    	        	 var product={};
	    	        	     	        	 	    	        		    	        	 
	    	        	 $(data).each(function( index, value ) {
	    	        	    if ( value.item_id == id[1]){	    	        	    	
	    	        	    	product = value;
	    	        	    	    	        	    		    	        	      
		    	        	    $('#id_quantityInputParent').append('<input type="number" onchange="onChangeQty('+product.item_id+',this.value)" value="'+localStorage.getItem('quantity')+'" id="id_quantityInput">');
		 	    	        	 
			    	        	 var htmlSlider = '';
			    	        	 var htmlCarousel = '';
			    	        	 $(product.item_image).each(function( index, innerValue ) {
			    	        		 htmlSlider = htmlSlider + '<li><img class="imgSld" src="'+imageURL+'web/'+business_id.business_id+'/'+innerValue+'" alt="" style="width:310px;height:330px"></li>';  
			    	        		 htmlCarousel = htmlCarousel + '<li><img src="'+imageURL+'web/'+business_id.business_id+'/'+innerValue+'" alt=""></li>';
			    	        	 });
			    	        	 
			    	        	 $('#id_slider').append(htmlSlider);
			    	        	 $('#id_carousel').append(htmlCarousel);
			    	        	 			  	        	  
			    	        	 var colors = product.color.split(',');
			    	        	 var htmlColors = '';
			    	        	 localStorage.setItem('selectedColor',colors[0]);
			    	        	 $(colors).each(function( index, value ) {
			    	        		 htmlColors = htmlColors + '<span id="'+value+'" style="background:'+value+'"></span>';  	    	        		 
			    	        	 });
			    	        	 $('#id_colors').append(htmlColors);
				    	        
			    	        	 localStorage.setItem('currentCategory',product.category_id);
			    	        	 $('#id_breadcrumCategory').append('<a href="index.html?cat='+product.category_id+'">'+product.category_name+'</a>');
			    	        	 $('#id_breadcrumItem').append(""+product.item_name+" "+product.internal_storage+"/ Camera "+product.secondary_camera);
			    	        	 $('#id_itemName').append(""+product.item_name+" "+product.internal_storage+"/ Camera "+product.secondary_camera);
			    	        	 $('#id_itemPrice').append("$"+product.item_price);
			    	        	 var htmlGeneral = '<tr><td><b><h6>General</h6></b></td></tr>'
			    	        		 +'<tr><td><b> In The Box</b></td><td>'+product.in_the_box+'</td></tr>'
			    	        		 +'<tr><td><b> Model Number</b></td><td>'+product.model_number+'</td></tr>'
			    	        		 +'<tr><td><b> Colors</b></td><td>'+product.color+'</td></tr>'
			    	        		 +'<tr><td><b> Sim Type</b></td><td>'+product.sim_type+'</td></tr>'
			    	        		 +'<tr><td><b> Touchscreen</b></td><td>'+product.touchscreen+'</td></tr>'
			    	        		 +'<tr><td><b> OTG Compatible</b></td><td>'+product.otg_compatible+'</td></tr>';	    	        	 
			    	        	 $('#id_generalTable').append(htmlGeneral);
			    	        	 
			    	        	 var htmlDisplay = '<tr><td><b><h6>Display Features</h6></b></td></tr>'
			    	        		 +'<tr><td><b> Display Size</b></td><td>'+product.display_size+'</td></tr>'
			    	        		 +'<tr><td><b> Resolution</b></td><td>'+product.resolution+'</td></tr>'
			    	        		 +'<tr><td><b> Resolution Type</b></td><td>'+product.resolution_type+'</td></tr>'
			    	        		 +'<tr><td><b> GPU</b></td><td>'+product.gpu+'</td></tr>'
			    	        		 +'<tr><td><b> Display Type</b></td><td>'+product.display_type+'</td></tr>'
			    	        		 +'<tr><td><b> Display Colors</b></td><td>'+product.display_colors+'</td></tr>';    	        	 
			    	        	 $('#id_displayTable').append(htmlDisplay);
			    	        	 
			    	        	 var htmlOsProcessor = '<tr><td><b><h6>Os & Processor Features</h6></b></td></tr>'
			    	        		 +'<tr><td><b> Operating System</b></td><td>'+product.operating_system+'</td></tr>'
			    	        		 +'<tr><td><b> Processor Type</b></td><td>'+product.processor_type+'</td></tr>'
			    	        		 +'<tr><td><b> Processor Core</b></td><td>'+product.processor_core+'</td></tr>';	    	        		 	    	        	 
			    	        	 $('#id_osProcessorTable').append(htmlOsProcessor);
			    	        	 
			    	        	 var htmlMemoryStorage = '<tr><td><b><h6>Memory & Storage Features</h6></b></td></tr>'
			    	        		 +'<tr><td><b> Internal Storage</b></td><td>'+product.internal_storage+'</td></tr>'
			    	        		 +'<tr><td><b> RAM</b></td><td>'+product.ram+'</td></tr>'
			    	        		 +'<tr><td><b> Expandable Storage</b></td><td>'+product.expandable_storage+'</td></tr>'
			    	        		 +'<tr><td><b> Supported Memory Card</b></td><td>'+product.supported_memory_card+'</td></tr>'
			    	        		 +'<tr><td><b> Memory Card Slot Type</b></td><td>'+product.memory_card_slot_type+'</td></tr>';    	        	 
			    	        	 $('#id_memoryStorage').append(htmlMemoryStorage);
			    	        	 
			    	        	 var htmlCameraFeatures = '<tr><td><b><h6>Camera Features</h6></b></td></tr>'
			    	        		 +'<tr><td><b> Primary Camera</b></td><td>'+product.primary_camera+'</td></tr>'
			    	        		 +'<tr><td><b> Secondary Camera</b></td><td>'+product.secondary_camera+'</td></tr>';   	        	 
			    	        	 $('#id_cameraFeatures').append(htmlCameraFeatures);
			    	        	 
			    	        	 var htmlConnectivity = '<tr><td><b><h6>Connectivity Features</h6></b></td></tr>'
			    	        		 +'<tr><td><b> Network Type</b></td><td>'+product.network_type+'</td></tr>'
			    	        		 +'<tr><td><b> Internet Connectivity</b></td><td>'+product.internet_connectivity+'</td></tr>'
			    	        		 +'<tr><td><b> Bluetooth Support</b></td><td>'+product.bluetooth_support+'</td></tr>'
			    	        		 +'<tr><td><b> Flash</b></td><td>'+product.flash+'</td></tr>' 
			    	        	     +'<tr><td><b> HD Recording</b></td><td>'+product.hd_recording+'</td></tr>'
			    	        	     +'<tr><td><b> Full HD Recording</b></td><td>'+product.full_hd_recording+'</td></tr>'
			    	        	     +'<tr><td><b> Video Recording</b></td><td>'+product.video_recording+'</td></tr>'
			    	        	     +'<tr><td><b> Video Recording Resolution</b></td><td>'+product.video_recording_resolution+'</td></tr>';
			    	        	 $('#id_connectivity').append(htmlConnectivity);
			    	        	 
			    	        	 var htmlOther = '<tr><td><b><h6>Other Details</h6></b></td></tr>'
			    	        		 +'<tr><td><b> Network Type</b></td><td>'+product.smartphone+'</td></tr>'
			    	        		 +'<tr><td><b> Internet Connectivity</b></td><td>'+product.sim_size+'</td></tr>'
			    	        		 +'<tr><td><b> Bluetooth Support</b></td><td>'+product.removable_battery+'</td></tr>'
			    	        		 +'<tr><td><b> Flash</b></td><td>'+product.graphics_ppi+'</td></tr>'; 	          	    
			    	        	 $('#id_other').append(htmlOther);
			    	        	 
			    	        	 var htmlBatteryPower = '<tr><td><b><h6>Battery Capacity</h6></b></td></tr>'
			    	        		 +'<tr><td><b> Battery Capacity</b></td><td>'+product.battery_power+'</td></tr>';	          	    
			    	        	 $('#id_batteryPower').append(htmlBatteryPower);
			    	        	 
			    	        	 var htmlWarranty = '<tr><td><b><h6>Warranty</h6></b></td></tr>'
			    	        		 +'<tr><td><b> Warranty Summary</b></td><td>'+product.warranty+'</td></tr>';	          	    
			    	        	 $('#id_warranty').append(htmlWarranty);
			    	        	 
			    	        	 $('#id_screenSize').append("- Screen Size: "+product.display_size);
			    	        	 $('#id_rearCamera').append("- Rear Camera: "+product.primary_camera);
			    	        	 $('#id_frontCamera').append("- Front Camera: "+product.secondary_camera);
			    	        	 $('#id_ram').append("- RAM: "+product.ram);
			    	        	 $('#id_internalMemory').append("- Internal Memory: "+product.internal_storage);
//			    	        	 $('#id_availability').append(""+product.availability); 
			    	        	 
			    	        	 getRelatedProducts(product.category_id);
	    	        	      }
	    	        	 });
	    	        	 
	    	         
	    	        if(localStorage.getItem('cart') != null && localStorage.getItem('cart') != 'undefined'){
	    	        	 var cart = JSON.parse(localStorage.getItem('cart'));
	    	        	 var isExists = false;
    	        		 $(cart).each(function( index, value ) {
    	        			 var product = value;
 	    	        	    if ( value.item_id == id[1]){
 	    	        	    	localStorage.setItem('quantity',value.quantity);
 	    	        	    	isExists = true;
 	    	        	    }
 	    	        	 });
    	        		 if(!isExists){
    	        			 localStorage.setItem('quantity','1');
    	        		 }
	    	        }else{
	    	        	localStorage.setItem('quantity','1');
	    	        	
	    	        }
	    	        
	    	        getBusinessForAdvertise(id[1]);
	    	        
	    	        	    	        	    	             	    	        	 
	    	        	// $('#id_buyNowParent').append('<a href="ShoppingCart.html?product='+product.item_id+'" class="btn-round"><i class="icon-basket-loaded margin-right-5"></i>Buy Now</a>');
	    	       
	    	        },  
	    	        error: function(error) {  
	    	            console.log(JSON.stringify(error));  	    	  
	    	        }   
	    	    });
	       }
      }
                     
}


$('.clr').on('click', 'span', function() {
    $('.selectedColor').removeClass('selectedColor');
    $(this).addClass('selectedColor');
    localStorage.setItem('selectedColor',""+$(this).attr("id"));
});


function onChangeQty(item_id,qty){
	localStorage.setItem('quantity',qty);
	var cart = JSON.parse(localStorage.getItem('cart'));
	$(cart).each(function( index, value ) {
		if ( value.item_id == item_id){
			value.quantity = qty;
			value.total_price = parseInt(value.item_price)*parseInt(value.quantity);
		}
	});
	localStorage.setItem('cart',JSON.stringify(cart));	
}

function getBusinessForAdvertise(item_id){
	
	$.ajax({   
        async: true,  
        url: baseurl + 'getBusinessForAdvertiseByItemId/'+item_id,  
        method: "GET", 
        headers: {  
            "accept": "application/jso" + "n;odata=verbose",  
            "content-type": "application/json;odata=verbose"  
        },
        success: function(data) {
        	console.log(data);
        	var firstPosition = {};
        	var secondPosition = {};
        	var thirdPosition = {};
        	var fourthPosition = {};
        	var fifthPosition = {};
        	var positions = [];
        	
        	var htmlBuyNow = '';
        	
        	
        	
        	$(data).each(function( index, value ) {
        		 $.ajax({   
  	    	        async: false,  
  	    	        url: baseurl + 'viewbasicinfodetails/'+value.business_id,  
  	    	        method: "GET", 
  	    	        headers: {  
  	    	            "accept": "application/json;odata=verbose",  
  	    	            "content-type": "application/json;odata=verbose"  
  	    	        },
  	    	        success: function(res) {
  	    	        	
  	    	        	var image = '';
  	    	        	if(res.status == false){
  	    	        		image = imageURL + 'img/dummy_mobile_store.jpg';
  	    	        	}else{
  	    	        		
  	    	        		if(res.brandLogo == ''){
  	    	        			image = imageURL + 'img/dummy_mobile_store.jpg';
  	    	        		}else{
  	    	        			image = res.brandLogo;
  	    	        		}
  	    	        	}
  	    	        	
  	    	        	
  	    	        	value['logo'] = image;
  	    	        	
  	    	        	console.log(value);
  	    	        	if ( value.position == 'First Position'){
  		        			firstPosition = value;	        			
  		        		}
  		        		if ( value.position == 'Second Position'){
  		        			secondPosition = value;	        			
  		        		}
  		        		if ( value.position == 'Third Position'){
  		        			thirdPosition = value;
  		        			
  		        		}
  		        		if ( value.position == 'Fourth Position'){
  		        			fourthPosition = value;
  		        			
  		        		}
  		        		if ( value.position == 'Fifth Position'){
  		        			fifthPosition = value;
  		        		}
  	    	        },function(error) {  
	    	            console.log(JSON.stringify(error));  	    	  
	    	        }
        		});
        			        		        			        	     	    	        
       	    });
        	

        	
        	if(JSON.stringify(firstPosition) != '{}') {
        		positions.push(firstPosition);
        	}
        	
            if(JSON.stringify(secondPosition) != '{}') {
            	positions.push(secondPosition);        		
        	}

			if(JSON.stringify(thirdPosition) != '{}') {
				positions.push(thirdPosition);				
			}
			
            if(JSON.stringify(fourthPosition) != '{}') {
            	positions.push(fourthPosition);				
			}
            
        	if(JSON.stringify(fifthPosition) != '{}') {
        		positions.push(fifthPosition);				
			}
        	
        	console.log(positions);
        	
        	$(positions).each(function( index, value ) {

        		htmlBuyNow = htmlBuyNow + '<div class="row ">'
        		+'<div class="col-xs-12 colStyle">'
        		+'<div class="col-xs-6">'
                +'<img class="imgLogo" src="'+value.logo+'">'
                +'</div>'
                +'<div class="col-xs-6">'
                 +'<a target="_blank" href="http://'+value.host_name+'.mobilesinasia.com:6060/store/Product-Details.html?product='+value.business_item_id+'" class="btn  btn_success pull-right">Buy Now</a>'       		
                 +'<span class="spnrg pull-right">$'+value.item_price+'</span>'
                  +'</div>'
                   +'</div>'
                   +'</div>';
        	});
        	
        	$('#id_buyNowParent').append(htmlBuyNow);
        	
        	
        },error: function(error) {  
            console.log(JSON.stringify(error));  	    	  
        } 
	});
}


