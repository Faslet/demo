function setCookie(a,b,c){var d=new Date;d.setTime(d.getTime()+24*c*60*60*1e3);var e="expires="+d.toUTCString();document.cookie=a+"="+b+"; "+e+";path=/"}function getCookie(a){for(var b=a+"=",c=document.cookie.split(";"),d=0;d<c.length;d++){for(var e=c[d];" "==e.charAt(0);)e=e.substring(1);if(0==e.indexOf(b))return e.substring(b.length,e.length)}return""}

function issetGetParam(xparam)
{
var url = window.location.href;
if(url.indexOf('?' + xparam + '') != -1)
    return true;
else if(url.indexOf('&' + xparam + '') != -1)
    return true;
return false;
}

/* Double tap to go */
;(function($, window, document, undefined) {
  $.fn.doubleTapToGo = function(action) {

    if (!('ontouchstart' in window) &&
      !navigator.msMaxTouchPoints &&
      !navigator.userAgent.toLowerCase().match( /windows phone os 7/i )) return false;

    if (action === 'unbind') {
      this.each(function() {
        $(this).off();
        $(document).off('click touchstart MSPointerDown', handleTouch);  
      });
    } else {
      
      this.each(function() {
        var curItem = false;
  
        $(this).on('click', function(e) {
          var item = $(this);
          if (item[0] != curItem[0]) {
            e.preventDefault();
            curItem = item;
          }
        });
  
        //$(document).on('click touchstart MSPointerDown', handleTouch); 
        
        function handleTouch(e) {
          var resetItem = true,
            parents = $(e.target).parents();
  
          for (var i = 0; i < parents.length; i++)
            if (parents[i] == curItem[0])
              resetItem = false;src
  
          if(resetItem)
            curItem = false;
        }
      });
    }
    return this;  
  };
})(jQuery, window, document);

/*
    Name: YouTubePopUp
    Description: jQuery plugin to display YouTube or Vimeo video in PopUp, responsive and retina, easy to use.
    Version: 1.0.1
    Plugin URL: http://wp-time.com/youtube-popup-jquery-plugin/
    Written By: Qassim Hassan
    Twitter: @QQQHZ
    Websites: wp-time.com | qass.im | wp-plugins.in
    Dual licensed under the MIT and GPL licenses:
        http://www.opensource.org/licenses/mit-license.php
        http://www.gnu.org/licenses/gpl.html
    Copyright (c) 2016 - Qassim Hassan
*/

(function ( $ ) {
 
    $.fn.YouTubePopUp = function(options) {

        var YouTubePopUpOptions = $.extend({
                autoplay: 1
        }, options );

        $(this).on('click', function (e) {

            var youtubeLink = $(this).attr("href");

            if( youtubeLink.match(/(youtube.com)/) ){
                var split_c = "v=";
                var split_n = 1;
            }

            if( youtubeLink.match(/(youtu.be)/) || youtubeLink.match(/(vimeo.com\/)+[0-9]/) ){
                var split_c = "/";
                var split_n = 3;
            }

            if( youtubeLink.match(/(vimeo.com\/)+[a-zA-Z]/) ){
                var split_c = "/";
                var split_n = 5;
            }

            var getYouTubeVideoID = youtubeLink.split(split_c)[split_n];

            var cleanVideoID = getYouTubeVideoID.replace(/(&)+(.*)/, "");

            if( youtubeLink.match(/(youtu.be)/) || youtubeLink.match(/(youtube.com)/) ){
                var videoEmbedLink = "https://www.youtube.com/embed/"+cleanVideoID+"?autoplay="+YouTubePopUpOptions.autoplay+"";
            }

            if( youtubeLink.match(/(vimeo.com\/)+[0-9]/) || youtubeLink.match(/(vimeo.com\/)+[a-zA-Z]/) ){
                var videoEmbedLink = "https://player.vimeo.com/video/"+cleanVideoID+"?autoplay="+YouTubePopUpOptions.autoplay+"";
            }

            $("body").append('<div class="YouTubePopUp-Wrap YouTubePopUp-animation"><div class="YouTubePopUp-Content"><span class="YouTubePopUp-Close"><i class="fa fa-times"></i></span><iframe src="'+videoEmbedLink+'" allowfullscreen></iframe></div></div>');

            if( $('.YouTubePopUp-Wrap').hasClass('YouTubePopUp-animation') ){
                setTimeout(function() {
                    $('.YouTubePopUp-Wrap').removeClass("YouTubePopUp-animation");
                }, 600);
            }

            $(".YouTubePopUp-Wrap, .YouTubePopUp-Close").click(function(){
                $(".YouTubePopUp-Wrap").addClass("YouTubePopUp-Hide").delay(515).queue(function() { $(this).remove(); });
            });

            e.preventDefault();

        });

        $(document).keyup(function(e) {

            if ( e.keyCode == 27 ){
                $('.YouTubePopUp-Wrap, .YouTubePopUp-Close').click();
            }

        });

    };
 
}( jQuery ));

function deparam(query) {
    var pairs, i, keyValuePair, key, value, map = {};
    // remove leading question mark if its there
    if (query.slice(0, 1) === '?') {
        query = query.slice(1);
    }
    if (query !== '') {
        pairs = query.split('&');
        for (i = 0; i < pairs.length; i += 1) {
            keyValuePair = pairs[i].split('=');
            key = decodeURIComponent(keyValuePair[0]);
            value = (keyValuePair.length > 1) ? decodeURIComponent(keyValuePair[1]) : undefined;
            map[key] = value;
        }
    }
    return map;
}

function pad(number, length)
{
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
	
	return str;
}

function getProductImage(imageId, size)
{
  size = size || '650x750x2';
  return staticUrl + 'files/'+pad(imageId,9)+'/'+size+'/image.jpg'
}

function parseStockStatus(available, on_stock, track, allow_outofstock_sale)
{
  if( track == false )
  {
    return '<div class="in-stock"><i class="fa fa-check"></i> '+tInStock+'</div>';
  }
  else
  {
    if( available == true && on_stock == false )
    {
      return '<div class="backorder"><i class="fa fa-truck"></i> '+tBackorder+'</div>';
    }
    else if( available == true && on_stock == true )
    {
      return '<div class="in-stock"><i class="fa fa-check"></i> '+tInStock+'</div>';
    }
    else
    {
      return '<div class="out-of-stock"><i class="fa fa-truck"></i> '+tOutOfStock+'</div>';
    }
  }
}

//=============================================
// Get ready for the launch
//=============================================
$(document).ready(function()
{
  //Quick Scrollview function
  $.fn.scrollView = function (minusoffset) {
      return this.each(function () {
          $('html, body').animate({
              scrollTop: $(this).offset().top - minusoffset
          }, 1000);
      });
  }
  
  //$('input[type="checkbox"]').wrap('<div class="pretty p-default"></p>');
  //$('.p-default').append('<div class="state"><label>Check</label></div>');
  
  //$(":checkbox").labelauty({ label:false });
  
  //=============================================
  // Double tap for links on mobile devices
  //=============================================
  if( true )
  {
    //=============================================
    // Check if the device is a tablet/smartphone
    //=============================================
    if ('ontouchstart' in document)
    {
      $('body').addClass('touch-device');
    }
    else
    {
      $('body').addClass('non-touch-device');
    }
    
    $( '#navbar li:has(ul)' ).doubleTapToGo();
  }
  
  //=============================================
  // Init Nice Select design for selectboxes
  // TODO: no fixed.rain
  //=============================================
  $('body:not(.checkout) select').niceSelect();
  //$('select').niceSelect();
  
  //=============================================
  // Homepage notification
  //=============================================
  if( notification != false )
  {
    if( !getCookie(notification) )
    {
      $('#notification').show();
      
      $('#close-notification').click( function()
      {
        setCookie(notification, 1, 100);
        $('#notification').slideUp();
      })
    }
  }
  
$(document).on('click', '.dropdown-content', function (e) {
  e.stopPropagation();
});
  
  /*$('#topbar-right .langs, #topbar-right .currencies').on('click', function(e)
	{
    $(this).find('ul').toggle(200);
    e.preventDefault();
  });*/
  
  //=============================================
  // Slide the top USP's
  //=============================================
  var swiperTopUsps = new Swiper('.usps-header',
	{
    slidesPerView: 3,
    spaceBetween: 15,
    pagination: {
      clickable: true,
      el: '.swiper-pagination-usps',
    },
    breakpoints: {
      1400: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      850: {
        slidesPerView: 1,
        spaceBetween: 15,
      }
    },
    autoplay: 3000,  
    loop:true,
    roundLengths : true
  });
  
      var swiperQuickUsps = new Swiper('.usps-quickshop',
      {
        slidesPerView: 2,
        spaceBetween: 15,
        pagination:false,
        observer: true,
				observeParents: true,
        autoplay: 3000,  
        loop:true,
      });
  
  if( $('.home-slider-holder').length )
  {
    var swiperHomeSlider = new Swiper('.home-slider', {
      slidesPerView: 1,
      
      pagination: false,
    autoplay: sliderTimout,
      nextButton: '.img-arrow-right',
      	prevButton: '.img-arrow-left',
      
    loop:true,
    });
  }
  
  if( $('.home-brands-holder').length )
  {
    var swiperHomeBrands = new Swiper('.home-brands', {
      slidesPerView: 7,
      spaceBetween: 50,
      
      breakpoints: {
        1400: {
          slidesPerView: 7,
          spaceBetween: 50,
        },
        
        991: {
          slidesPerView: 6,
          spaceBetween: 50,
        },
        
        768: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 50,
        }
      },
      
      pagination: false,
    autoplay: 2000,
      
    loop:true,
    });
  }
  
  var shown = false;
  
  function checkHeaderScroll()
  {
    //var distance = $('#header-holder').offset().top,
    var distance = $('#navbar').offset().top,
    $window = $(window);
    
    //if ( $window.scrollTop() >= distance + 50 )
    if ( $window.scrollTop() >= 215 )
    {
      if( shown == false )
      {

        $('#scrollnav').show();
        
        $('#header-holder').after($('#header-holder').clone(true).css('position', 'fixed').css('top', '0').css('width', '100%').css('display', 'block').addClass('headerscrolled'));
        

         $( ".headerscrolled" ).css('margin', '-70px 0 0 0');
        $( ".headerscrolled" ).animate({
          margin:0
  }, 300, function() {
    // Animation complete.
     //     alert(1)
       //   shown = true;
  });
        
        shown = true;
      }
      
    }
    else
    {
      /*$('#search').removeClass('searchscrolled');
      $('#stickycart').hide();*/
      //$('#header-holder').removeClass('headerscrolled');
      $('.headerscrolled').remove();
      //$('#topbar').css('margin-bottom', '0px');
      $('#scrollnav').hide();
      $('.navscrolled').remove();
      shown = false;
    }
  
    setTimeout(checkHeaderScroll, 50);
  }

  checkHeaderScroll();
  
  
  //$('header').off().on('click', '.scrollnav>a', function (e)
  $('.scrollnav .nav-icon').on('click', function(e)
  {
    if(  $('.navscrolled').length > 0 )
    {
      $(this).removeClass('change');
      $('.navscrolled').slideUp(300, function()
			{
      	$('.navscrolled').remove();
      });
    }
    else
    {
      $(this).addClass('change');
      $('.headerscrolled').after($('#navbar').clone(true).hide().css('position', 'fixed').css('top', '70px').css('width', '100%').addClass('navscrolled').fadeIn());
    }
    
    e.preventDefault();
  });
  
  $('#mobilesearch').on('click', function(e)
  {
    if(  $('.mobilesearchform').length > 0 )
    {
      $('.mobilesearchform').remove();
    }
    else
    {
      if(  $('.headerscrolled').length > 0 )
      {
        $('.headerscrolled').append('<form method="get" action="'+searchUrl+'" class="mobilesearchform"><input id="mobilesearchinput" type="text" name="q" placeholder="'+tSearch+'..."></form>');
      }
      else
      {
        $('#header-holder').after('<form method="get" action="'+searchUrl+'" class="mobilesearchform"><input id="mobilesearchinput" type="text" name="q" placeholder="'+tSearch+'..."></form>');
      }
    }
    
    $('#mobilesearchinput').focus();
    
    e.preventDefault();
  })
  
  //$('#navbar nav>ul>li:has(ul)').hover(function()
  if( navbar_dimbg == true )
  {
  $('#navbar').hover(function()
  {
    $('.dimmed').fadeIn(100);
  }, function()
  {
    /*if( $('#navbar:hover') )
    {
      
    }
    else
    {*/
      $('.dimmed').fadeOut(100);
    //}
  })
  }
  
  //=============================================
  // Live search in menu
  //=============================================
  $('.search input').keyup(function()
  {
    var string = $(this).val();
    
    if( string.length > 2 )
    {
      liveSearch(string);
      
      $('.search .fa-search').hide();
      $('.search .clearsearch').show();
    }
    else
    {
      $('.searchcontent').slideUp();
      
      $('.search .fa-search').show();
      $('.search .clearsearch').hide();
    }
    
  });
  
  /* Dont immediately hide when lost focus */
  $('.search input').focus(function()
  {
    $('.searchbox').addClass('searchfocus');
  });
  
  $('.search input').focusout(function()
  {
    if( $('.searchbox').val() == '' )
    {
      $('.searchcontent').slideUp();
      $('.searchbox').removeClass('searchfocus');
      
      $('.search .fa-search').show();
      $('.search .clearsearch').hide();
      
      $('.searchbox').removeClass('searchmargin');
    }
    else
    {
      /* But quick hide if no results */
      if( $('.searchcontent .noresults').is(':visible') )
      {
        $('.searchcontent').slideUp();
        $('.searchbox').val('');
        $('.searchbox').removeClass('searchfocus');
        
        $('.search .fa-search').show();
        $('.search .clearsearch').hide();
        
        $('.searchbox').removeClass('searchmargin');
      }
    }
  });
  
  /* Same as quick hide */
  $('.search .clearsearch').click( function()
  {
    $('.searchcontent').slideUp();
    $('.searchbox').val('');
    $('.searchbox').removeClass('searchfocus');
    
    $('.search .fa-search').show();
    $('.search .clearsearch').hide();
    
    $('.searchbox').removeClass('searchmargin');
  });
  
  if( $('.home-looks').length )
  {
		$('.home-look').each(function( index )
		{
      var look = $(this);
      
      $.get(look.attr('data-json'), function(data)
      {
        var product = data.product;
        
        if( product.bundles.length > 0 )
        {
        	look.find('.price').html(currencySymbol+product.bundles[0].price.price.toFixed(2));
        }
        else
        {
          look.find('.price').html(currencySymbol+product.price.price.toFixed(2));
        }
        
				if( product.images.length > 1 )
        {
          for( var i=1; i<product.images.length; i++ )
          {
            if( i >= 5 )
            {
              break;
            }
            
            look.find('.images').append('<img src="'+getProductImage(product.images[i], '130x150x2')+'" class="rowmargin">');
          }
        }
        
      });
    });
  }
  
  if( true ) //brands in submenu
  {
    var brandCats = {};
  }
  
  function productInStorage(pid)
  {
    if( !productStorage.hasOwnProperty(pid) )
    {
      return false;
    }
    else
    {
      return true;
    }
  }
  
  function storeProductData(data)
  {
    
  }
  
  function getProductData(urla)
  {    
    return $.get({url:urla} );
  }
  
  //Second image on hover
  if( hover_shows_second_image == true )
  {
    //$('.product-block-holder, .product-list-holder').hover( function()
    $('.product-block-holder').hover( function()
    {
      var pid = $(this).attr('data-pid');      
      var productBlock = $(this);
      
      if( productBlock.find('.himage>img').length == 1 )
      {
        productBlock.find('.himage').fadeIn(200);
      }
      else
      {
				if( !productInStorage(pid) )
        {
          productStorage[ pid ] = {};
          productStorage[ pid ]['done'] = false;
        }
        
        $.when( getProductData($(this).attr('data-json')) ).done( function(data)
				{          
          var product = data.product;
          productStorage[ pid ]['data'] = product;
          productStorage[ pid ]['done'] = true;
          
          //var newImage = data.images[0].replace('50x50x2', '260x300x2');
          if( productBlock.hasClass('look') )
          	var newImage = getProductImage(product.image, '520x600x2');
        	else
            var newImage = getProductImage(product.image, imageSize);
          
          if( product.images.length > 1 )
          {
            if( productBlock.hasClass('look') )
            	newImage = getProductImage(product.images[1], '520x600x2')
            else
              newImage = getProductImage(product.images[1], imageSize)
          }
          
          productBlock.find('.himage').html('<img src="'+newImage+'" alt="" class="img-responsive">');
          productBlock.find('.himage').fadeIn(200);
          //productBlock.find('.himage').addClass('active');
          
          if( productBlock.find('.product-block-stock') )
          {
            var stock = parseStockStatus(product.stock.available, product.stock.on_stock, product.stock.track, product.stock.allow_outofstock_sale)
            
            productBlock.find('.product-block-stock').html(stock);
          }
        });
      }
      
    },
    function()
    {
      $(this).find('.himage').fadeOut(200);
      //$(this).find('.himage').removeClass('active');
    });
  }
  
  $('.touch-device .product-block-holder').on('click', function(e)
  {
    console.log('clicked pblock');
    
    if( $( window ).width() < 768 )
    {
      console.log('small screen, redirect');
    	document.location = $(this).attr('data-json').replace('?format=json', '');
    }
  });
  
  $('.product-block-holder').on('click', '.quickshop', function(e)
	{
    var pid = $(e.delegateTarget).attr('data-pid');
    var jsonUrl = $(e.delegateTarget).attr('data-json');
    
    if( $( window ).width() > 890 )
    { 
      $('.body-content').css('filter', 'blur(2px)');
      $('.modal-bg').fadeIn();
      $('body').addClass('quickshop-active');
      
      if( !productInStorage(pid) )
      {  
        productStorage[ pid ] = {};
        productStorage[ pid ]['done'] = false;
        
        $.when( getProductData(jsonUrl) ).done( function(data)
				{          
          var product = data.product;
          productStorage[ pid ]['done'] = true;
          productStorage[ pid ]['data'] = product;
        });
      }
      
      /*if()
      {
        $.when( getProductData(jsonUrl) ).done( function(data)
				{          
          var product = data.product;
          productStorage[ pid ]['done'] = true;
          productStorage[ pid ]['data'] = product;
          
          drawQuickShop(product);
        });
    	}
      else
      {
        drawQuickShop(productStorage[ $(this).attr('data-pid') ].data);
      }*/
      
      var ajaxDoneCheck = setInterval( function()
      {
        console.log('not done');
        
        if( productStorage[ pid ]['done'] == true )
        {
          console.log('done');
          
          drawQuickShop(productStorage[ pid ].data);
          clearInterval(ajaxDoneCheck);
        }
      }, 100)
      
      e.preventDefault();
    }
  })
  
  function drawQuickShop(product)
  {
    /* fill */    
			$('.quickshop-modal .stock').append( parseStockStatus(product.stock.available, product.stock.on_stock, product.stock.track, product.stock.allow_outofstock_sale) );
      
      $('.quickshop-modal .title').append('<h1>'+product.title+'</h1>');
      $('.quickshop-modal .nano-content').append('<p>'+product.description+'</p>');
      
      if( variantBlocks == true && product.options == false  && product.matrix == false )
      {
      	$('.quickshop-modal .nano-content').append('<div class="variant-blocks"></div>');
      }
      else
      {
        $('.quickshop-modal .content').append('<div class="variant-blocks"></div>');
      }
      
      if( product.custom == false )
      {
      	$('.quickshop-modal .content').append('<div class="price-moreinfo"><a href="'+gotoProductUrl+product.id+'"><i class="fa fa-search"></i> '+tMoreInfo+'</a></div>');
      }
      else
      {
        $('.quickshop-modal .content').append('<div class="price-moreinfo"><a href="'+gotoProductUrl+product.id+'"><i class="fa fa-pencil"></i> '+tCustomizeProduct+'</a></div>');
      }
      
      $('.quickshop-modal .price-moreinfo').append('<div class="price-holder"></div>');
      
      if( product.price.price_old > 0 )
      {
        $('.quickshop-modal .price-holder').append('<span class="price-old">'+currencySymbol+product.price.price_old.toFixed(2)+'</span>');
      }
      $('.quickshop-modal .price-holder').append('<span class="price">'+currencySymbol+product.price.price.toFixed(2)+'</span>');
      $('.quickshop-modal .price-holder').append(' <span class="price-strict">'+tTax+'</span>');
      
            
      $('.quickshop-modal form').attr('action', addToCartUrl+product.vid+'/');
      
      console.log('variants:');
      console.log(product);
      console.log(product.variants);
      
      //for( var i = 0; i < product.variants.length; i++ )
      if( product.hasOwnProperty('variants') && product.variants != "" && product.variants != false )
      {
        if( variantBlocks == true && product.options == false && product.matrix == false )
        {
          for( var vid in product.variants )
          {
            var variant = product.variants[vid]
            
            var active = '';
            var outOfStock = '';
            
            if( variant.id == product.vid )
            {
              active = ' active';
              
              $('.quickshop-modal form').attr('action', addToCartUrl+product.vid+'/');
            }
            
            if( !variant.stock.available )
            	outOfStock = ' out-of-stock';
            
            $('.quickshop-modal .variant-blocks').append('<span class="variant-block'+active+outOfStock+'" data-vid="'+variant.id+'" data-price="'+variant.price.price+'">'+variant.title+'</span>');
          }
          
          $('.quickshop-modal .variant-block').on('click', function()
					{
            if( !$(this).hasClass('out-of-stock') )
            {
	            $('.quickshop-modal .variant-block').removeClass('active');
  	          $(this).addClass('active');
              
              $('.quickshop-modal form').attr('action', addToCartUrl+$(this).attr('data-vid')+'/');
              
              var newPrice = parseFloat($(this).attr('data-price'));
              $('.quickshop-modal .price-holder .price').html(currencySymbol+newPrice.toFixed(2));
            }
          });
        }
        else
        {
          $('.quickshop-modal .variant-blocks').append('<select class="quick-variants" name="variant"></select>');
          
          for( var vid in product.variants )
          {
            var variant = product.variants[vid]

            var selected = '';
            if( product.vid == vid )
              selected = ' selected';
            	
            $('.quickshop-modal .quick-variants').append('<option value="'+variant.id+'" data-price="'+variant.price.price+'"'+selected+'>'+variant.title+' - '+currencySymbol+variant.price.price+'</option>');
          }

          $('.quick-variants').niceSelect();

          $('.quick-variants').on('change', function()
          {
            $('.quickshop-modal form').attr('action', addToCartUrl+$(this).find('option:selected').val()+'/');
            
            var newPrice = parseFloat($(this).find('option:selected').attr('data-price'));
            console.log(newPrice);
            $('.quickshop-modal .price-holder .price').html(currencySymbol+newPrice.toFixed(2));
          });
        }
      }      
            
      var swiperQuickshopImage = new Swiper('.swiper-quickimage',
			{
				nextButton: '.img-arrow-right',
      	prevButton: '.img-arrow-left',
        //pagination: '.swiper-pagination-quickimage',
      	observer: true,
        updateOnImagesReady: true,
        spaceBetween:0,
    	});
      
      for( var i = 0; i < product.images.length; i++)
      {
        swiperQuickshopImage.appendSlide('<div class="swiper-slide zoom" data-src="'+getProductImage(product.images[i], '650x750x2')+'"><img src="'+getProductImage(product.images[i], '325x375x2')+'" class="img-responsive"></div>');
      }
      
      //swiperQuickshopImage.update();
      
      $('.quickshop-modal').fadeIn(300, function()
			{
        setTimeout( function()
				{
          //swiperQuickUsps.update(true); swiperQuickUsps.startAutoplay(); 
            var swiperQuickUsps = new Swiper('.usps-quickshop',
            {
              slidesPerView: 2,
              spaceBetween: 15,
              pagination:false,
              observer: true,
              observeParents: true,
              autoplay: 3000,  
              loop:true,
            });
          
          swiperQuickshopImage.update();
          
        }, 100 );
      });
      
      $(".nano-quick").nanoScroller();   
      
      $('.modal-bg, .quickshop-modal .x').on('click', function()
      {
        //swiperQuickshopImage.destroy();
      
      	$('.modal-bg').fadeOut();
        $('.body-content').css('filter', 'none');
        $('body').removeClass('quickshop-active');

        $('.quickshop-modal').fadeOut(300, function()
				{
          swiperQuickshopImage.removeAllSlides()
          swiperQuickshopImage.update(true);

          //$('.quickshop-modal .swiper-quickimage .swiper-wrapper').html('');
          $('.quickshop-modal .nano-content').html('');
          $('.quickshop-modal .content').html('');
        	$('.quickshop-modal .title').html('');
          $('.quickshop-modal .stock').html('');
        });
      }); 
  }

  /* Search parser */
  function liveSearch(string)
  {
    searchUrl = mainUrl + 'search/' + string.replace('/', '') + '/page1.ajax?limit=5';
    
    $.getJSON(searchUrl, function(data)
    {
      if( data.count > 0 )
      {
        $('.searchcontent .noresults').hide();
        
        var html = '';
        
        html += '<ul>';
        
        $.each(data.products, function(index, product)
        {
          html += '<li>';
          
            html += '<div class="result-col"><img src="' + product.image.replace('50x50x2', '36x36x2') + '" width="36" height="36" alt="' + product.fulltitle + '" /></div>';
            html += '<div class="result-col"><a href="' + product.url + '" title="' + product.fulltitle + '"><h4>' + product.fulltitle + '</h4></a></div>';
            
          html += '<div class="result-col">';
            if( product.price.price_old && false )
            {
              html += '<span class="price-old">' + product.price.price_old_money + '</span> ';
            }
            
            html += '<span class="price">' + product.price.price_money + '</span>';
          
          html += '</div>';
          
          html += '</li>';
        });
        
        html += '</ul>';
        
        $('.searchresults').html(html);
        
        $('.searchcontent .more a').attr('href', mainUrl+'search/?q='+encodeURIComponent(string));
        $('.searchcontent .more span').html('(' + data.count + ')');
        $('.searchcontent .more').show();
        
      }
      else
      {
        $('.searchresults').html('');
        $('.searchcontent .more').hide();
        $('.searchcontent .noresults').show();
      }
      
      $('.searchcontent').slideDown();
    });
  }
  
  
  //=============================================
  // Mobile nav
  //=============================================
  $('#mobilenav').click(function (e)
  {
    $('html').addClass('mobile-nav-active');
    
		$('.body-content').css('filter', 'blur(2px)');
    $('.modal-bg').fadeIn();
    
    //$('<div class="mobile-nav-holder"><div class="x"></div></div>').hide().prependTo('body');
    $('<div class="mobile-nav-holder" id="fixed"><div class="x"></div></div>').prependTo('body');
    $('<div class="mobile-nav"><ul class="top"></ul><ul class="categories"></ul><ul class="bottom"></ul></div>').appendTo('.mobile-nav-holder');
    
    $('.mobile-nav .top').append('<li><i class="fa fa-user"></i> '+$('li.account').html()+'</li>');
    
    $('.mobile-nav .bottom').append('<li class="mobile-langs"><div class="main-cat"><i class="fa fa-flag"></i> <span>'+currentLang+'</span><span class="open-sub"></span></div></li>');
    $('.mobile-nav .bottom').append('<li class="mobile-currencies"><div class="main-cat">'+currencySymbol+' <span>'+currencyCode+'</span><span class="open-sub"></span></div></li>');
    $('.mobile-nav .bottom').append('<li><div class="main-cat"><i class="fa fa-heart"></i> <a href="'+mainUrl+'account/wishlist">'+tWishlist+'</a></div></li>');
    $('.mobile-nav .bottom').append('<li><div class="main-cat"><i class="fa fa-bar-chart"></i> <a href="'+mainUrl+'compare">'+tCompare+'</a></div></li>');
    
    $('.mobile-langs').append('<ul>'+$('.langs ul').html()+'</ul>');
    $('.mobile-langs ul li').first().remove();
    $('.mobile-currencies').append('<ul>'+$('.currencies ul').html()+'</ul>');
    
    //$('.mobile-nav-holder').fadeIn();
    $('.body-content').addClass('mobile-active');
    $('.mobile-nav-holder').animate({"left": '+=350'}, 300);
    
    
    //$('.mobile-nav').append( $('#navbar ul>li:first-child').html() );
    
    $('.mobile-nav-holder .x').off().on('click', function()
    {
      $('html').removeClass('mobile-nav-active');
      
      $('.modal-bg').fadeOut();
      $('.body-content').css('filter', 'none');
      $('.body-content').removeClass('mobile-active');
      
      $('.mobile-nav-holder').animate({"left": '-=350'}, function()
      {
        $('.mobile-nav-holder').remove();
      })
    })
    
    var html = '';
    
    $( "nav>ul.megamenu>li" ).each(function( index )
    {
      if( index >= 0 )
      {
        if( $(this).find('ul.sub1>li h4').length > 0 )
        {
          html += '<li><div class="main-cat"><a href="'+$(this).find('a').attr('href')+'">' + $(this).find('a').html() + '</a><span class="open-sub"></span></div>'
        }
        else
        {
          html += '<li><a href="'+$(this).find('a').attr('href')+'">' + $(this).find('a').html() + '</a>'
        }
        
        if( $(this).find('ul.sub1>li h4').length > 0 )
        {
          html += '<ul>';
          
          $(this).find('ul.sub1>li h4').each(function( index )
          {
            if( $(this).parent().find('ul.sub2').length > 0 )
            {
              html += '<li><div class="main-cat"><a href="'+$(this).find('a').attr('href')+'">' + $(this).find('a').html() + '</a><span class="open-sub"></span></div>';
            }
            else
            {
              html += '<li><a href="'+$(this).find('a').attr('href')+'">' + $(this).find('a').html() + '</a>';
            }
            
            if( $(this).parent().find('ul.sub2').length > 0 )
            {
              html += '<ul>';
              
              $(this).parent().find('ul.sub2>li').each(function( index )
              {
                //html += '<li><a href="'+$(this).find('a').attr('href')+'">' + $(this).find('a').html() + '</a></li>';
                
                if( $(this).find('ul.sub3').length > 0 )
                {
                  html += '<li><div class="main-cat"><a href="'+$(this).find('a').attr('href')+'">' + $(this).find('a').html() + '</a><span class="open-sub"></span></div>';
                }
                else
                {
                  html += '<li><a href="'+$(this).find('a').attr('href')+'">' + $(this).find('a').html() + '</a>';
                }
                
                if( $(this).find('ul.sub3').length > 0 )
            		{
                  html += '<ul>';
                  
                  $(this).find('ul.sub3>li').each(function( index )
									{
                  	html += '<li><a href="'+$(this).find('a').attr('href')+'">' + $(this).find('a').html() + '</a></li>';
                  });
                  
                  html += '</ul>';
                }
                html += '</li>';                
              });
              
              html += '</ul>';
            }
            
            html += '</li>';
          });
          
          html += '</ul>';
        }
        
        html += '</li>';
        
        console.log(html)
        
        $('.mobile-nav ul.categories').html( html );
      }
    });
    
    $( "nav>ul.smallmenu>li" ).each(function( index )
    {
      if( index > 0 )
      {
        if( $(this).find('ul.sub1').length > 0 )
        {
          html += '<li><div class="main-cat"><a href="'+$(this).find('a').attr('href')+'">' + $(this).find('a').html() + '</a><span class="open-sub"></span></div>'
        }
        else
        {
          html += '<li><a href="'+$(this).find('a').attr('href')+'">' + $(this).find('a').html() + '</a>'
        }
        
        if( $(this).find('ul.sub1').length > 0 )
        {
          html += '<ul>';
          
          $(this).find('ul.sub1>li').each(function( index )
          {
            if( $(this).find('ul.sub2').length > 0 )
            {
              html += '<li><div class="main-cat"><a href="'+$(this).find('a').attr('href')+'">' + $(this).find('a').html() + '</a><span class="open-sub"></span></div>';
            }
            else
            {
              html += '<li><a href="'+$(this).find('a').attr('href')+'">' + $(this).find('a').html() + '</a>';
            }
            
            if( $(this).find('ul.sub2').length > 0 )
            {
              html += '<ul>';
              
              $(this).find('ul.sub2>li').each(function( index )
              {
                 html += '<li><a href="'+$(this).find('a').attr('href')+'">' + $(this).find('a').html() + '</a></li>';
              });
              
              html += '</ul>';
            }
            
            html += '</li>';
          });
          
          html += '</ul>';
        }
        
        html += '</li>';
        
        $('.mobile-nav ul.categories').html( html );
      }
      
      //console.log( index + ": " + $( this ).text() );
    });
    
    $('.mobile-nav .open-sub').on('click', function()
    {
      if( $(this).parent().parent().find('ul').is(':visible') )
      {
        $(this).parent().parent().removeClass('active');
        $(this).parent().parent().find('ul:first').slideUp();
      }
      else
      {
        $(this).parent().parent().addClass('active');
        $(this).parent().parent().find('ul:first').slideDown();
      }
    });
    
    e.preventDefault();
  });
  
  $("#navbar nav .opensub").click( function()
  {
    //$(this).parent("li").toggleClass('hover');
    
  });
  
	$('body').on('touchmove','.modal-bg',function(e)
	{
  	
    e.preventDefault();
  });
  
  window.addEventListener( 'touchmove', function() {})
  
  $('.stocknotification').on('click', function(e)
	{
    e.preventDefault();
    
  	$('.loading').fadeIn(200);
    
    $('body').append('<div class="stock-notification-modal"></div>');
    $('.stock-notification-modal').append('<form action="'+mainUrl+'service/contactPost/" method="POST" class="stock-notification-form"></form>');
     $('.stock-notification-form').append('<h1>Product name</h1>');
    $('.stock-notification-form').append('<h1>Enter your email address and we\'ll let you know when this item is back in stock</h1>');
    $('.stock-notification-form').append('<input type="email" name="email" placeholder="your@emailadress.com">');
    $('.stock-notification-form').append('<input type="hidden" name="name" value="Stock Notification">');
    $('.stock-notification-form').append('<input type="hidden" name="subject" value="Stock Notification Product name">');
    $('.stock-notification-form').append('<input type="hidden" name="key" value="'+formKey+'">');
    $('.stock-notification-form').append('<input type="hidden" name="message" value="I would like to get a stock alert for productname">');
    $('.stock-notification-form').append('<input type="submit" name="submit" value="submit">');
  });
  
  //=============================================
  // Size chart function
  //=============================================
  $('.sizechart').on('click', function(e)
  {
    e.preventDefault();
    
    $('.modal-bg').fadeIn(200);
    
    $.get($(this).attr('href')+'?format=json', function(data)
    {
      //alert(data)
      $('.sizechart-content-holder .sizechart-title').html(data.textpage.title);
      $('.sizechart-content-holder .sizechart-content').html(data.textpage.content);
      $('.sizechart-holder').fadeIn();
    })
    
    $('.sizechart-holder .x, .modal-bg').on('click', function()
    {
      $('.sizechart-holder').fadeOut(200);
      $('.modal-bg').fadeOut(200);
    })
  });
  
	function expiredBlock(product)
  {
    $('.countdown-'+product+'>span').html(tDealExpired);
    $('div[data-pid="'+product+'"] h4').css('text-decoration', 'line-through');
    $('div[data-pid="'+product+'"] .quickshop').remove();
  }
  
  function expiredBlockAllow(product)
  {
    $('.countdown-'+product).countdown('destroy');
    $('.countdown-'+product).parent().hide();
  }
  
  $(document).on('click', ".qtyadd", function ()
  {
    $('.quantity').val( parseInt($('.quantity').val()) + 1 );
    $('.quantity').trigger('change');
    //$(this).parent().find('.quantity').val(  parseInt($(this).parent().find('.quantity').val()) + 1 );
  });
  
  $(".productpage-right .quantity").bind("keyup change", function(e)
  {
    if( $(this).val() != '' )
    {
    var val = parseInt($(this).val()) || 0;
    
    $('.productpage-right .quantity').val( parseInt(val) );
    }
  })
  
  $(document).on('click', ".qtyminus", function ()
  {
    if( parseInt($('.quantity').val()) > 1)
    //if( parseInt($(this).parent().find('.quantity').val()) > 1)
    {
      $('.quantity').val( parseInt($('.quantity').val()) - 1 );
      $('.quantity').trigger('change');
      //$(this).parent().find('.quantity').val(  parseInt($(this).parent().find('.quantity').val() - 1) );
    }
  });
  
  $('.qty-fast').on('click', function()
  {
    $(this).select();
  })
  
  /*$('ul.custom-filters>li>span').on('click', function(e)
	{
    var elem = $(this).parent().find('ul.custom-filters-content');
    
    $('ul.custom-filters-content').not(elem).fadeOut(200);
    
    //$(this).parent().toggleClass('active');
    elem.toggle(200);
  });*/
  
  //=============================================
  // Collection expand sidebar cats
  //=============================================
  
  /*$('.sub0 .expand-cat').on('click', function()
  {
    $(this).parent().children('ul.sub1').slideToggle(400, function()
    {
      $(this).parent().toggleClass('active');
    });
  });
  
  $('.sub1 .expand-cat').on('click', function()
  {
    $(this).parent().children('ul.sub2').slideToggle(400, function()
    {
      $(this).parent().toggleClass('active');
    });
  });*/
  
    $('.sidebar-cats .open-sub').on('click', function()
    {
      var parentLi = $(this).parent().parent();
      
      if( parentLi.find('ul').is(':visible') )
      {
        parentLi.find('ul:first').slideUp(300, function()
				{
          parentLi.removeClass('active');
        });
      }
      else
      {
        parentLi.find('ul:first').slideDown(300, function()
				{
          parentLi.addClass('active');
        });
      }
    });
  
  //=============================================
  // Collection content read more
  //=============================================
  if( $('.overflow-content-holder').length )
  {
    var overflowHolder = $('.overflow-content-holder');
    var overflowContent = overflowHolder.find('.overflow-content');
    var overflowFade = overflowHolder.find('.overflow-fade');
    
    var holderHeight = overflowHolder.height();
    var contentHeight = overflowContent.height();
    
    if( contentHeight > holderHeight )
    {
      overflowFade.fadeIn(100);
      $('.read-more').css('display', 'inline-block');
    }
    
    $('.read-more').on('click', function()
		{
      overflowFade.fadeOut();
      
      $('.overflow-content-holder').animate(
      {
        maxHeight: contentHeight
      }, 500, function()
      {
        $('.read-more').hide();
        
        $('.read-less').css('display', 'inline-block');
      })
    });
    
    $('.read-less').on('click', function()
		{

        overflowFade.fadeIn();
      
      $('.overflow-content-holder').animate(
      {
        maxHeight: holderHeight
      }, 500, function()
      {
        $('.read-less').hide();
        
        $('.read-more').css('display', 'inline-block');
      })
    });
  }
  
  if( $('.category-content-container').length )
  {
    var catHoldert = $('.category-content-holder');
    var catContent = $('.category-content');
    
    var catHolderHeight = $('.category-content-holder').height();
    var catContentHeight = $('.category-content').height();
    
    if( catContentHeight > catHolderHeight )
    {
      $('.read-more').css('display', 'inline-block');
    }
    
    $('.read-more').on('click', function()
    {
      $('.category-content-holder').animate(
      {
        maxHeight: catContentHeight
      }, 500, function()
      {
        $('.read-more').hide();
        
        $('.read-less').css('display', 'inline-block');
      })
        
    });
    
    $('.read-less').on('click', function()
    {
      $('.category-content-holder').animate(
      {
        maxHeight: catHolderHeight
      }, 500, function()
      {
        $('.read-less').hide();
        
        $('.read-more').css('display', 'inline-block');
      })
        
    });
  }
  
  //=============================================
  // Faq
  //=============================================
  if( $('.gui-div-faq-questions').length > 0 )
  {
    //$('.gui-div-faq-questions .gui-content-wysiwyg').hide();
    
    $('.gui-div-faq-questions .gui-content-wysiwyg:first').show();
    $('.gui-div-faq-questions .gui-content-subtitle:first').addClass('active');
    
    $('.gui-popover-content .gui-content-wysiwyg').show();  
    $(".gui-div-faq-questions").delegate('.gui-content-subtitle', 'click', function(){
      $(this).next(".gui-content-wysiwyg").slideToggle(200)
        .siblings(".gui-content-wysiwyg:visible").slideUp(200);
      $(this).toggleClass("active");
      $(this).siblings(".gui-content-subtitle").removeClass("active");
    });
  }
  
  //=============================================
  // Start product page
  //=============================================
  
  /*$('.share-toggle').on('click', function(e)
	{
    $('.share .content').toggle(300);
  	e.preventDefault();
  });*/
  
  //=============================================
  // End product page
  //=============================================    
  
  
    $('button[type="submit"].quick-cart, a.quick-cart').on('click', function(e)
    {      
      var button = $(this);
      var buttonHtml = button.html();
      var pid = $(this).attr('data-pid');
      var vid = $(this).attr('data-vid');
      
      var form = $(this).closest('form');
      
      if( form.length < 1 )
      {
        console.log('Quick add to cart: No form found. Trying #product_configure_form');
        form = $('#product_configure_form');
      }
      
      var formFields = form.serialize();
      var formAction = form.attr('action');
      
      $(this).html('<i class="fa fa-spinner fa-spin"></i>');
      
      $.post( formAction, formFields, function()
      {
        
      }).done( function(data)
      {
        console.log(data);
        
        var msgIndex = Math.floor((Math.random() * 1000) + 1);
        
        button.html( buttonHtml );
        var messages = $(data).find('div[class*="messages"] ul');
        var message = messages.first('li').text();
        var cartHtml = $(data).find('.cartheader').html();
        
        console.log(messages.html());
        console.log(message);
        
        var messageType = 'info';
        var messageIcon = 'info';
        
        if( messages.hasClass('error') || messages.hasClass('gui-error') )
        {
          messageType = 'error';
        }
        else if( messages.hasClass('success') || messages.hasClass('gui-success') )
        {
          messageType = 'success';
          messageIcon = 'check';
        }
        else if( message.toLowerCase().indexOf( tCart.toLowerCase() ) !== -1 )
        {
          messageType = 'success';
          messageIcon = 'check';
        }
        
        $('.cartheader').html( cartHtml );
        
        if( $('.live-message').length < 1 )
        {
        	$('body').prepend('<div class="messages live-message"></div>');
        }
        
        $('.live-message').prepend('<div class="message message-'+msgIndex+' '+messageType+'"><i class="fa fa-times"></i> <div class="message-content">'+message+'</div></div>');        
        
        if( messageType == 'success' )
        {
        	$('.message-'+msgIndex).append('<div class="btn-holder"><a href="'+cartUrl+'" class="continue">'+tProceedToCheckout+'</a></div>');
        }
        
        $('.message').slideUp();
        $('.message-'+msgIndex).slideDown();
        
        setTimeout( function()
        {
          $('.message-'+msgIndex).slideUp(300, function()
          {
            $(this).remove();
          });
        }, 6000);
      });
            
      e.preventDefault();
    });
     
    $('body').delegate('.message .fa-times', 'click', function(e)
		{
      //alert(1)
      //e.preventDefault();
      if( !$(e.target).hasClass('continue') )
      {
        $(this).parent().slideUp(300, function()
        {
          $(this).remove();
        });
      }
    });
  
  $('.dropdown-holder').on('show.bs.dropdown', function(e){
    
  //alert($(this).find('.dropdown-content').html());
});

$('.dropdown-holder').on('hide.bs.dropdown', function(e){
  
  //$(this).find('.dropdown-content').first().stop(true, true).slideUp(200);
});
  
  //=============================================
  // Some branding
  //=============================================
  console.log('* Lightspeed theme designed by Dyvelopment.nl *');
  console.log('* For custom design or other custom work contact us at www.dyvelopment.nl *');
});

(function( $ ){

	$.fn.labelauty = function( options )
	{
		/*
		 * Our default settings
		 * Hope you don't need to change anything, with these settings
		 */
		var settings = $.extend(
		{
			// Development Mode
			// This will activate console debug messages
			"development": false,

			// Trigger Class
			// This class will be used to apply styles
			"class": "labelauty",

			// Use icon?
			// If false, then only a text label represents the input
			"icon": true,

			// Use text label ?
			// If false, then only an icon represents the input
			"label": true,

			// Separator between labels' messages
			// If you use this separator for anything, choose a new one
			"separator": "|",

			// Default Checked Message
			// This message will be visible when input is checked
			"checked_label": "Checked",

			// Default UnChecked Message
			// This message will be visible when input is unchecked
			"unchecked_label": "Unchecked",

			// Force random ID's
			// Replace original ID's with random ID's,
			"force_random_id": false,

			// Minimum Label Width
			// This value will be used to apply a minimum width to the text labels
			"minimum_width": false,

			// Use the greatest width between two text labels ?
			// If this has a true value, then label width will be the greatest between labels
			"same_width": true
		}, options);

		/*
		 * Let's create the core function
		 * It will try to cover all settings and mistakes of using
		 */
		return this.each(function()
		{
			var $object = $( this );
			var selected = $object.is(':checked');
			var type = $object.attr('type');
			var use_icons = true;
			var use_labels = true;
			var labels;
			var labels_object;
			var input_id;
			
			//Get the aria label from the input element
			var aria_label = $object.attr( "aria-label" );
			
			// Hide the object form screen readers
			$object.attr( "aria-hidden", true );
			
			// Test if object is a check input
			// Don't mess me up, come on
			if( $object.is( ":checkbox" ) === false && $object.is( ":radio" ) === false )
				return this;

			// Add "labelauty" class to all checkboxes
			// So you can apply some custom styles
			$object.addClass( settings["class"] );
			
			// Get the value of "data-labelauty" attribute
			// Then, we have the labels for each case (or not, as we will see)
			labels = $object.attr( "data-labelauty" );
			
			use_labels = settings.label;
			use_icons = settings.icon;

			// It's time to check if it's going to the right way
			// Null values, more labels than expected or no labels will be handled here
			if( use_labels === true )
			{
				if( labels == null || labels.length === 0 )
				{
					// If attribute has no label and we want to use, then use the default labels
					labels_object = [settings.unchecked_label, settings.checked_label]
				}
				else
				{
					// Ok, ok, it's time to split Checked and Unchecked labels
					// We split, by the "settings.separator" option
					labels_object = labels.split( settings.separator );

					// Now, let's check if exist _only_ two labels
					// If there's more than two, then we do not use labels :(
					// Else, do some additional tests
					if( labels_object.length > 2 )
					{
						use_labels = false;
						debug( settings.development, "There's more than two labels. LABELAUTY will not use labels." );
					}
					else
					{
						// If there's just one label (no split by "settings.separator"), it will be used for both cases
						// Here, we have the possibility of use the same label for both cases
						if( labels_object.length === 1 )
							debug( settings.development, "There's just one label. LABELAUTY will use this one for both cases." );
					}
				}
			}

			/*
			 * Let's begin the beauty
			 */

			// Start hiding ugly checkboxes
			// Obviously, we don't need native checkboxes :O
			$object.css({ display : "none" });
						
			// We don't need more data-labelauty attributes!
			// Ok, ok, it's just for beauty improvement
			$object.removeAttr( "data-labelauty" );
			
			// Now, grab checkbox ID Attribute for "label" tag use
			// If there's no ID Attribute, then generate a new one
			input_id = $object.attr( "id" );

			if( settings.force_random_id || input_id == null || input_id.trim() === "")
			{
				var input_id_number = 1 + Math.floor( Math.random() * 1024000 );
				input_id = "labelauty-" + input_id_number;

				// Is there any element with this random ID ?
				// If exists, then increment until get an unused ID
				while( $( input_id ).length !== 0 )
				{
					input_id_number++;
					input_id = "labelauty-" + input_id_number;
					debug( settings.development, "Holy crap, between 1024 thousand numbers, one raised a conflict. Trying again." );
				}

				$object.attr( "id", input_id );
			}

			// Now, add necessary tags to make this work
			// Here, we're going to test some control variables and act properly
			
			var element = jQuery(create( input_id, aria_label, selected, type, labels_object, use_labels, use_icons ));
			
			element.click(function(){
				if($object.is(':checked')){
					$(element).attr('aria-checked', false);
				}else{
					$(element).attr('aria-checked', true);
				}
			});
			
			element.keypress(function(event){
				event.preventDefault();
				if(event.keyCode === 32 || event.keyCode === 13){		
					if($object.is(':checked')){
						$object.prop('checked', false);
						$(element).attr('aria-checked',false);
					}else{
						$object.prop('checked', true);
						$(element).attr('aria-checked', true);
					}
				}
			});
			
			$object.after(element);
			
			// Now, add "min-width" to label
			// Let's say the truth, a fixed width is more beautiful than a variable width
			if( settings.minimum_width !== false )
				$object.next( "label[for=" + input_id + "]" ).css({ "min-width": settings.minimum_width });

			// Now, add "min-width" to label
			// Let's say the truth, a fixed width is more beautiful than a variable width
			if( settings.same_width != false && settings.label == true )
			{
				var label_object = $object.next( "label[for=" + input_id + "]" );
				var unchecked_width = getRealWidth(label_object.find( "span.labelauty-unchecked" ));
				var checked_width = getRealWidth(label_object.find( "span.labelauty-checked" ));

				if( unchecked_width > checked_width )
					label_object.find( "span.labelauty-checked" ).width( unchecked_width );
				else
					label_object.find( "span.labelauty-unchecked" ).width( checked_width );
			}
		});
	};

	/*
	 * Tricky code to work with hidden elements, like tabs.
	 * Note: This code is based on jquery.actual plugin.
	 * https://github.com/dreamerslab/jquery.actual
	 */
	function getRealWidth( element )
	{
		var width = 0;
		var $target = element;
		var css_class = 'hidden_element';

		$target = $target.clone().attr('class', css_class).appendTo('body');
		width = $target.width(true);
		$target.remove();

		return width;
	}

	function debug( debug, message )
	{
		if( debug && window.console && window.console.log )
			window.console.log( "jQuery-LABELAUTY: " + message );
	}

	function create( input_id, aria_label, selected, type, messages_object, label, icon )
	{	
		var block;
		var unchecked_message;
		var checked_message;
		var aria = "";
		
		if( messages_object == null )
			unchecked_message = checked_message = "";
		else
		{
			unchecked_message = messages_object[0];

			// If checked message is null, then put the same text of unchecked message
			if( messages_object[1] == null )
				checked_message = unchecked_message;
			else
				checked_message = messages_object[1];
		}
		
		if(aria_label == null)
			aria = "";	
		else
			aria = 'tabindex="0" role="' + type + '" aria-checked="' + selected + '" aria-label="' + aria_label + '"';
		
		if( label == true && icon == true)
		{
			block = '<label for="' + input_id + '" ' + aria + '>' +
						'<span class="labelauty-unchecked-image"></span>' +
						'<span class="labelauty-unchecked">' + unchecked_message + '</span>' +
						'<span class="labelauty-checked-image"></span>' +
						'<span class="labelauty-checked">' + checked_message + '</span>' +
					'</label>';
		}
		else if( label == true )
		{
			block = '<label for="' + input_id + '" ' + aria + '>' +
				'<span class="labelauty-unchecked">' + unchecked_message + '</span>' +
				'<span class="labelauty-checked">' + checked_message + '</span>' +
				'</label>';
		}
		else
		{
			block = '<label for="' + input_id + '" ' + aria + '>' +
						'<span class="labelauty-unchecked-image"></span>' +
						'<span class="labelauty-checked-image"></span>' +
					'</label>';
		}
		
		return block;
	}

}( jQuery ));



!function(a){return"function"==typeof define&&define.amd?define(["jquery"],function(b){return a(b,window,document)}):"object"==typeof exports?module.exports=a(require("jquery"),window,document):a(jQuery,window,document)}(function(a,b,c){"use strict";var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H;z={paneClass:"nano-pane",sliderClass:"nano-slider",contentClass:"nano-content",enabledClass:"has-scrollbar",flashedClass:"flashed",activeClass:"active",iOSNativeScrolling:!1,preventPageScrolling:!1,disableResize:!1,alwaysVisible:!1,flashDelay:1500,sliderMinHeight:20,sliderMaxHeight:null,documentContext:null,windowContext:null},u="scrollbar",t="scroll",l="mousedown",m="mouseenter",n="mousemove",p="mousewheel",o="mouseup",s="resize",h="drag",i="enter",w="up",r="panedown",f="DOMMouseScroll",g="down",x="wheel",j="keydown",k="keyup",v="touchmove",d="Microsoft Internet Explorer"===b.navigator.appName&&/msie 7./i.test(b.navigator.appVersion)&&b.ActiveXObject,e=null,D=b.requestAnimationFrame,y=b.cancelAnimationFrame,F=c.createElement("div").style,H=function(){var a,b,c,d,e,f;for(d=["t","webkitT","MozT","msT","OT"],a=e=0,f=d.length;f>e;a=++e)if(c=d[a],b=d[a]+"ransform",b in F)return d[a].substr(0,d[a].length-1);return!1}(),G=function(a){return H===!1?!1:""===H?a:H+a.charAt(0).toUpperCase()+a.substr(1)},E=G("transform"),B=E!==!1,A=function(){var a,b,d;return a=c.createElement("div"),b=a.style,b.position="absolute",b.width="100px",b.height="100px",b.overflow=t,b.top="-9999px",c.body.appendChild(a),d=a.offsetWidth-a.clientWidth,c.body.removeChild(a),d},C=function(){var a,c,d;return c=b.navigator.userAgent,(a=/(?=.+Mac OS X)(?=.+Firefox)/.test(c))?(d=/Firefox\/\d{2}\./.exec(c),d&&(d=d[0].replace(/\D+/g,"")),a&&+d>23):!1},q=function(){function j(d,f){this.el=d,this.options=f,e||(e=A()),this.$el=a(this.el),this.doc=a(this.options.documentContext||c),this.win=a(this.options.windowContext||b),this.body=this.doc.find("body"),this.$content=this.$el.children("."+this.options.contentClass),this.$content.attr("tabindex",this.options.tabIndex||0),this.content=this.$content[0],this.previousPosition=0,this.options.iOSNativeScrolling&&null!=this.el.style.WebkitOverflowScrolling?this.nativeScrolling():this.generate(),this.createEvents(),this.addEvents(),this.reset()}return j.prototype.preventScrolling=function(a,b){if(this.isActive)if(a.type===f)(b===g&&a.originalEvent.detail>0||b===w&&a.originalEvent.detail<0)&&a.preventDefault();else if(a.type===p){if(!a.originalEvent||!a.originalEvent.wheelDelta)return;(b===g&&a.originalEvent.wheelDelta<0||b===w&&a.originalEvent.wheelDelta>0)&&a.preventDefault()}},j.prototype.nativeScrolling=function(){this.$content.css({WebkitOverflowScrolling:"touch"}),this.iOSNativeScrolling=!0,this.isActive=!0},j.prototype.updateScrollValues=function(){var a,b;a=this.content,this.maxScrollTop=a.scrollHeight-a.clientHeight,this.prevScrollTop=this.contentScrollTop||0,this.contentScrollTop=a.scrollTop,b=this.contentScrollTop>this.previousPosition?"down":this.contentScrollTop<this.previousPosition?"up":"same",this.previousPosition=this.contentScrollTop,"same"!==b&&this.$el.trigger("update",{position:this.contentScrollTop,maximum:this.maxScrollTop,direction:b}),this.iOSNativeScrolling||(this.maxSliderTop=this.paneHeight-this.sliderHeight,this.sliderTop=0===this.maxScrollTop?0:this.contentScrollTop*this.maxSliderTop/this.maxScrollTop)},j.prototype.setOnScrollStyles=function(){var a;B?(a={},a[E]="translate(0, "+this.sliderTop+"px)"):a={top:this.sliderTop},D?(y&&this.scrollRAF&&y(this.scrollRAF),this.scrollRAF=D(function(b){return function(){return b.scrollRAF=null,b.slider.css(a)}}(this))):this.slider.css(a)},j.prototype.createEvents=function(){this.events={down:function(a){return function(b){return a.isBeingDragged=!0,a.offsetY=b.pageY-a.slider.offset().top,a.slider.is(b.target)||(a.offsetY=0),a.pane.addClass(a.options.activeClass),a.doc.bind(n,a.events[h]).bind(o,a.events[w]),a.body.bind(m,a.events[i]),!1}}(this),drag:function(a){return function(b){return a.sliderY=b.pageY-a.$el.offset().top-a.paneTop-(a.offsetY||.5*a.sliderHeight),a.scroll(),a.contentScrollTop>=a.maxScrollTop&&a.prevScrollTop!==a.maxScrollTop?a.$el.trigger("scrollend"):0===a.contentScrollTop&&0!==a.prevScrollTop&&a.$el.trigger("scrolltop"),!1}}(this),up:function(a){return function(b){return a.isBeingDragged=!1,a.pane.removeClass(a.options.activeClass),a.doc.unbind(n,a.events[h]).unbind(o,a.events[w]),a.body.unbind(m,a.events[i]),!1}}(this),resize:function(a){return function(b){a.reset()}}(this),panedown:function(a){return function(b){return a.sliderY=(b.offsetY||b.originalEvent.layerY)-.5*a.sliderHeight,a.scroll(),a.events.down(b),!1}}(this),scroll:function(a){return function(b){a.updateScrollValues(),a.isBeingDragged||(a.iOSNativeScrolling||(a.sliderY=a.sliderTop,a.setOnScrollStyles()),null!=b&&(a.contentScrollTop>=a.maxScrollTop?(a.options.preventPageScrolling&&a.preventScrolling(b,g),a.prevScrollTop!==a.maxScrollTop&&a.$el.trigger("scrollend")):0===a.contentScrollTop&&(a.options.preventPageScrolling&&a.preventScrolling(b,w),0!==a.prevScrollTop&&a.$el.trigger("scrolltop"))))}}(this),wheel:function(a){return function(b){var c;if(null!=b)return c=b.delta||b.wheelDelta||b.originalEvent&&b.originalEvent.wheelDelta||-b.detail||b.originalEvent&&-b.originalEvent.detail,c&&(a.sliderY+=-c/3),a.scroll(),!1}}(this),enter:function(a){return function(b){var c;if(a.isBeingDragged)return 1!==(b.buttons||b.which)?(c=a.events)[w].apply(c,arguments):void 0}}(this)}},j.prototype.addEvents=function(){var a;this.removeEvents(),a=this.events,this.options.disableResize||this.win.bind(s,a[s]),this.iOSNativeScrolling||(this.slider.bind(l,a[g]),this.pane.bind(l,a[r]).bind(""+p+" "+f,a[x])),this.$content.bind(""+t+" "+p+" "+f+" "+v,a[t])},j.prototype.removeEvents=function(){var a;a=this.events,this.win.unbind(s,a[s]),this.iOSNativeScrolling||(this.slider.unbind(),this.pane.unbind()),this.$content.unbind(""+t+" "+p+" "+f+" "+v,a[t])},j.prototype.generate=function(){var a,c,d,f,g,h,i;return f=this.options,h=f.paneClass,i=f.sliderClass,a=f.contentClass,(g=this.$el.children("."+h)).length||g.children("."+i).length||this.$el.append('<div class="'+h+'"><div class="'+i+'" /></div>'),this.pane=this.$el.children("."+h),this.slider=this.pane.find("."+i),0===e&&C()?(d=b.getComputedStyle(this.content,null).getPropertyValue("padding-right").replace(/[^0-9.]+/g,""),c={right:-14,paddingRight:+d+14}):e&&(c={right:-e},this.$el.addClass(f.enabledClass)),null!=c&&this.$content.css(c),this},j.prototype.restore=function(){this.stopped=!1,this.iOSNativeScrolling||this.pane.show(),this.addEvents()},j.prototype.reset=function(){var a,b,c,f,g,h,i,j,k,l,m,n;return this.iOSNativeScrolling?void(this.contentHeight=this.content.scrollHeight):(this.$el.find("."+this.options.paneClass).length||this.generate().stop(),this.stopped&&this.restore(),a=this.content,f=a.style,g=f.overflowY,d&&this.$content.css({height:this.$content.height()}),b=a.scrollHeight+e,l=parseInt(this.$el.css("max-height"),10),l>0&&(this.$el.height(""),this.$el.height(a.scrollHeight>l?l:a.scrollHeight)),i=this.pane.outerHeight(!1),k=parseInt(this.pane.css("top"),10),h=parseInt(this.pane.css("bottom"),10),j=i+k+h,n=Math.round(j/b*i),n<this.options.sliderMinHeight?n=this.options.sliderMinHeight:null!=this.options.sliderMaxHeight&&n>this.options.sliderMaxHeight&&(n=this.options.sliderMaxHeight),g===t&&f.overflowX!==t&&(n+=e),this.maxSliderTop=j-n,this.contentHeight=b,this.paneHeight=i,this.paneOuterHeight=j,this.sliderHeight=n,this.paneTop=k,this.slider.height(n),this.events.scroll(),this.pane.show(),this.isActive=!0,a.scrollHeight===a.clientHeight||this.pane.outerHeight(!0)>=a.scrollHeight&&g!==t?(this.pane.hide(),this.isActive=!1):this.el.clientHeight===a.scrollHeight&&g===t?this.slider.hide():this.slider.show(),this.pane.css({opacity:this.options.alwaysVisible?1:"",visibility:this.options.alwaysVisible?"visible":""}),c=this.$content.css("position"),("static"===c||"relative"===c)&&(m=parseInt(this.$content.css("right"),10),m&&this.$content.css({right:"",marginRight:m})),this)},j.prototype.scroll=function(){return this.isActive?(this.sliderY=Math.max(0,this.sliderY),this.sliderY=Math.min(this.maxSliderTop,this.sliderY),this.$content.scrollTop(this.maxScrollTop*this.sliderY/this.maxSliderTop),this.iOSNativeScrolling||(this.updateScrollValues(),this.setOnScrollStyles()),this):void 0},j.prototype.scrollBottom=function(a){return this.isActive?(this.$content.scrollTop(this.contentHeight-this.$content.height()-a).trigger(p),this.stop().restore(),this):void 0},j.prototype.scrollTop=function(a){return this.isActive?(this.$content.scrollTop(+a).trigger(p),this.stop().restore(),this):void 0},j.prototype.scrollTo=function(a){return this.isActive?(this.scrollTop(this.$el.find(a).get(0).offsetTop),this):void 0},j.prototype.stop=function(){return y&&this.scrollRAF&&(y(this.scrollRAF),this.scrollRAF=null),this.stopped=!0,this.removeEvents(),this.iOSNativeScrolling||this.pane.hide(),this},j.prototype.destroy=function(){return this.stopped||this.stop(),!this.iOSNativeScrolling&&this.pane.length&&this.pane.remove(),d&&this.$content.height(""),this.$content.removeAttr("tabindex"),this.$el.hasClass(this.options.enabledClass)&&(this.$el.removeClass(this.options.enabledClass),this.$content.css({right:""})),this},j.prototype.flash=function(){return!this.iOSNativeScrolling&&this.isActive?(this.reset(),this.pane.addClass(this.options.flashedClass),setTimeout(function(a){return function(){a.pane.removeClass(a.options.flashedClass)}}(this),this.options.flashDelay),this):void 0},j}(),a.fn.nanoScroller=function(b){return this.each(function(){var c,d;if((d=this.nanoscroller)||(c=a.extend({},z,b),this.nanoscroller=d=new q(this,c)),b&&"object"==typeof b){if(a.extend(d.options,b),null!=b.scrollBottom)return d.scrollBottom(b.scrollBottom);if(null!=b.scrollTop)return d.scrollTop(b.scrollTop);if(b.scrollTo)return d.scrollTo(b.scrollTo);if("bottom"===b.scroll)return d.scrollBottom(0);if("top"===b.scroll)return d.scrollTop(0);if(b.scroll&&b.scroll instanceof a)return d.scrollTo(b.scroll);if(b.stop)return d.stop();if(b.destroy)return d.destroy();if(b.flash)return d.flash()}return d.reset()})},a.fn.nanoScroller.Constructor=q});