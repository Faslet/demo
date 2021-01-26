jQuery(document).ready(function($){
	var siteHeader   = $('.site-header'),
		body           = $('body'),
		html           = $('html'),
		cartContainer  = $('.cart-sidebar');

  // Fade page in
  body.addClass('show-page');

  // Open cart sidebar
	$('.cart-trigger').on('click', function(e) {
		e.preventDefault();
		body.addClass('cart-active');
		html.addClass('with-featherlight');
	});
  
  // Close cart sidebar
	$('.cart-sidebar-close').on('click', function(e) {
		body.removeClass('cart-active');
		html.removeClass('with-featherlight');
	});
  
  // Close cart sidebar
  $(document).mouseup(function(e) {
    if (!cartContainer.is(e.target) && cartContainer.has(e.target).length === 0) {
      body.removeClass('cart-active');
      html.removeClass('with-featherlight');
    }
	});
  
  // Megamenu opener
  $(".mega-menu-header .main-nav > ul > li.has-child").hover(
    function () {
      body.addClass("mega-menu-open");
      var menuheight = $(this).children('ul').position().top + $(this).children('ul').offset().top + $(this).children('ul').outerHeight(true);
      $('.mobile-nav-overlay').height(menuheight);
    },
    function () {
      body.removeClass("mega-menu-open");
      $('.mobile-nav-overlay').height(0);
    }
  );
  
  if ( $('.notification-bar') ) {
    setTimeout( function() {
      $('.notification-bar').addClass('active');
    }, 1000);
  }
  
  // Mobile menu open sub menus on click
  $('.mobile-menu-subopen').on('click touchend', function(e) {
    e.preventDefault();
    if ( $(this).parent().hasClass('submenu-open') ) {
    	$(this).parent().removeClass('submenu-open');
    } else {
      $(this).parent().parent().find('.submenu-open').removeClass('submenu-open');
    	$(this).parent().toggleClass('submenu-open');
    }
  })
  
  // Youtube video popup trigger 
  $(".video-trigger-wrapper a").grtyoutube({ autoPlay:true });
  
  // Lazy load images
  function lazyProducts() {
    $('.lazy').Lazy({
    	threshold: 400,
    });
  	$('.lazy-product').Lazy({
      threshold: 400,
      visibleOnly: true,
    	afterLoad: function(element) {
        // Load the second product image if needed
        if ( element.parent().find('img').length < 2 ) {
          var wrapper = element.parent();
          var url = wrapper.attr('href').replace('.html', '.ajax');
          var url2 = wrapper.attr('href').replace('.html', '.html?format=json');
          if (location.protocol == 'https:') {
            url = url.replace('http:', 'https:');
            //URL 2 returns more info
            url2 = url2.replace('http:', 'https:');
					}
          
          //Just testing URL2
          //$.get(url2, function(producttest) {
          //  console.log(producttest);
          //});
          
          $.get(url, function(product){
            if (product.images[1]) {
              var imgUrl = product.images[1].replace('50x50x2', product_image_size);
              wrapper.append('<span class="secondary-image"><img src="'+imgUrl+'"></span>').addClass('second-image-loaded');
            }
            
            var elVars = product.variants;
            console.log(product.variants);
            // Get new variables
            if (elVars.length != 0 ) {
              var variantTypesCount = 0;
              $.each(elVars, function(index, elVar){
                var elVarList = elVar.title.split(",");
                variantTypesCount = elVarList.length;
                console.log(elVarList);
              });
              
              var customVariantActive = false;
              if ( ( display_variant_picker_on == 'all' && product.data_03 != 'disabled' ) || ( display_variant_picker_on == 'specific' && product.data_03 != 'false' && product.data_03 ) ) {
              	customVariantActive = true;
              }
              
              if ( variantTypesCount == 1 && show_variant_picker && customVariantActive ) {
                wrapper.parent().find('.product-actions-items').prepend( '<div class="clearfix product-list-custom-variants">' + getCustomVariable(product) + '</div>' );
                wrapper.parent().find('.product-custom-variants-options a').on('click', function(e) {
                	e.preventDefault();
                  if ( $(this).hasClass('unavailable') ) {
                  	//console.log('This product is unavailable');
                  } else {
                    wrapper.parent().find('.product-custom-variants-options li').removeClass('active');
                    var urlCart = $(this).data('cart-url');
                    
                    $(this).parent().addClass("active");
                    $(this).closest('.product-actions').find('.quickAddCart').attr('action', urlCart);      
                    updateModalForm($(this));
                  }
                })
              } else if ( variantTypesCount > 1 && show_variant_picker && customVariantActive ) {
                wrapper.parent().find('.product-actions-items').prepend( '<div class="clearfix product-list-custom-variants"><a href="' + product.url + '" class="more-variants-link">' + product_multiple_variant_label + '</a></div>' );
              }
            }
          });
        }
      }
    });
  }
  $(function() {
    $('.lazy').Lazy();
    lazyProducts();
  });
  
  // Open mobile menu
  $('.burger').on('click', function(e) {
  	e.preventDefault();
		body.toggleClass('menu-visible');
  })
	
  // Open search form
	$('.search-trigger').on('click', function(e) {
		e.preventDefault();
    if ( !body.hasClass('search-active') ) {
      body.addClass('search-active');
      setTimeout( function() {
        $('.search-header input').focus();
      }, 200);
    } else {
      body.removeClass('search-active');
    }
	});
  
  // Close search form
	$('.search-close').on('click', function(e) {
		body.removeClass('search-active');
	});
  
  // Trigger the ajax search
	$('.ajax-enabled input').keyup(function(e){
    if(e.keyCode != 27) {
      ajaxLoadResults();
    }    
  });
  
  // Ajax Search function
  function ajaxLoadResults(){
    var query = $('#searchForm input').val();
    query = encodeURIComponent(query.replace('/', '-slash-')).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
      replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
    
    if (query.length > 0) {
      $('#searchForm').attr("method", "get");
    } else {
      $('#searchForm').attr("method", "post");
    }
    if (query.length > 2) {
      if (location.protocol == 'https:') {
        var url = search_url + query + '/page1.ajax?limit=4'; 
        url = url.replace('http:', 'https:');
      } else {
        var url = search_url + query + '/page1.ajax?limit=4'; 
      }
      $.getJSON(url, function(json) {
        if (json.count > 0) {        
          var resultsHtml = [];
          $.each(json.products, function(index, product){
            var resultItem = '<div class="search-result-item clearfix">' +
                '<a href="' + product.url + '" title="' + product.fulltitle + '"><img src="' + product.image.replace('50x50x2', product_image_thumb) + '" width="40" alt="' + product.fulltitle + '" /><div class="content">' +
                '<div class="title">' + product.title + '</div>' ;
                var resultItemPrice = formatCurrency(product.price.price);
              
                if (product.price.price_old) {                  
                  resultItem += '<span class="price"><span class="old-price">' + product.price.price_old_money_without_currency + '</span>' + currency_format + product.price.price_money_without_currency + '</span>';
                } else {
                  resultItem += '<span class="price">' + resultItemPrice + '</span>';
                }

                resultItem += '</div></a></div>';
                resultsHtml.push(resultItem);
          });
          resultsHtml = resultsHtml.join('');

          $('#searchForm .search-results').html(resultsHtml);
          $('#searchForm .search-results').append('<div class="view-all-results"><a class="button button-solid button-arrow" href="'+json.url+'">' + view_all_results + '<span class="results-count">' + json.count + '</span></a></div>');
          $('#searchForm .search-results').remove('li.search-empty');
        } else {
          $('#searchForm .search-results').html('<div class="search-empty">' + search_empty + '</div>');
        }
        $('#searchForm').addClass('search-ready');
      });
    } else {
      $('#searchForm').removeClass('search-ready');
    }
  }
  
  // Show and hide collection subcategories
  $('.toggle-sub-cats').on('click', function(e) {
    e.preventDefault();
    $(this).parent().toggleClass('active');
    recalcColumns();
  });
  
  // Check cookies to see if the user previously closed the sidebar
  var sidebarWrapper = $('.collection-products');
  if ( Cookies.get('show_filters' ) == 'false' ) {
    sidebarWrapper.addClass('collection-sidebar-hidden');
  } else {
    sidebarWrapper.removeClass('collection-sidebar-hidden');
  }

  // Check cookies to see if the user previously closed the sidebar filters blocks
  $('.filter-wrap').each(function(index) {
    var id = $(this).attr('id');
    if ( Cookies.get(id) == 'true' ) {
      $(this).addClass('active');
    } else if ( Cookies.get(id) == 'false' ) {
      $(this).removeClass('active');
    }
  });
  
  // Open product filters on mobile
  $('.filter-open-mobile').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    body.toggleClass('collection-sidebar-mobile-open');
  });
  
  // Close product filters by clicking anywhere else
  body.on('click', function(e){
    if(!$(e.target).is("collection-sidebar") && !$(".collection-sidebar").has(e.target).length) {
        body.removeClass('collection-sidebar-mobile-open');
    }
	});
  
  // Close product filters
  $('.filter-close-mobile').on('click', function(e) {
		e.preventDefault();
    body.removeClass('collection-sidebar-mobile-open');
	});
  
  // Enable Selectric plugin for dropdown menus (select)
  if ($.fn.selectric) {
    $('.single-product-content .product-configure-variants select, .single-product-content .product-configure-options select, .addon-product-select, .gui-selects select, .product-configure-custom-option select').selectric();
  }

  // Simple tabs
	$('.tabs-nav a').on('click', function(e){
		e.preventDefault();
		var tab_id = $(this).attr('href');
		$('.tabs-nav li').removeClass('active');
		$('.tabs-element').removeClass('active');
		$(this).parent().addClass('active');
		$(tab_id).addClass('active');
    lazyProducts();
	})
	
  // Yotpo click
	$('.single-product-content .yotpo.bottomLine').on('click', function(e){
		e.preventDefault();
		$('.tabs-nav li').removeClass('active');
		$('.tabs-element').removeClass('active');
		//$(this).parent().addClass('active');
    $('.tabs-nav li a[href="#product-review"]').parent().addClass('active');
		$('#product-review').addClass('active');
	})
  
  // On mobile, animate horizontally the USP
  if ( $(".selling-points") ) {
    if ($(window).width() < 768) {
      setTimeout(function() { 
       $(".selling-points").wrapInner( "<div class='ti_wrapper'><div class='ti_slide'><div class='ti_content'><div class='ti_news'></div></div></div></div>");
  		 $(".selling-points").newsTicker();
      }, 350);
    }
  }
  
  // Mailchimp validator options
  validatorOptions = {
      // Set error HTML: <div class="mce_inline_error"></div>
      errorClass: "mce_inline_error", 
      errorElement: "div", 

      // Validate fields on keyup, focusout and blur. 
      onkeyup: false,
      onfocusout: function(element) { 
        if (!isTooEarly(element)) {
          $(element).valid();
        }
      },
      onblur: function(element) { 
        if (!isTooEarly(element)) {
          $(element).valid();
        }
      },
      // Place a field's inline error HTML just before the div.mc-field-group closing tag 
      errorPlacement: function(error, element) {
        element.closest('.mc-field-group').append(error);
      },
      // Submit the form via ajax (see: jQuery Form plugin)
      submitHandler: function(form) {
        currentForm = form;
        $(form).ajaxSubmit({ 
          url: getAjaxSubmitUrl(form), 
          type: 'GET', 
          dataType: 'json', 
          contentType: "application/json; charset=utf-8",
          success: function(resp){
                $(form).find('#mce-success-response').hide();
                $(form).find('#mce-error-response').hide();

                // On successful form submission, display a success message and reset the form
                if (resp.result == "success"){
                    $(form).find('#mce-'+resp.result+'-response').show();
                    $(form).find('#mce-'+resp.result+'-response').html(resp.msg);
                    $(form).each(function(){
                        this.reset();
                  });

                // If the form has errors, display them, inline if possible, or appended to #mce-error-response
                } else {
                if (resp.msg === "captcha") {
                  var url = form.attr("action");
                  var parameters = $.param(resp.params);
                  url = url.split("?")[0];
                  url += "?";
                  url += parameters;
                  window.open(url);
                };
                // Example errors - Note: You only get one back at a time even if you submit several that are bad. 
                // Error structure - number indicates the index of the merge field that was invalid, then details
                // Object {result: "error", msg: "6 - Please enter the date"} 
                // Object {result: "error", msg: "4 - Please enter a value"} 
                // Object {result: "error", msg: "9 - Please enter a complete address"} 

                // Try to parse the error into a field index and a message.
                // On failure, just put the dump thing into in the msg variable.
                    var index = -1;
                    var msg;
                    try {
                        var parts = resp.msg.split(' - ',2);
                        if (parts[1]==undefined){
                            msg = resp.msg;
                        } else {
                            i = parseInt(parts[0]);
                            if (i.toString() == parts[0]){
                                index = parts[0];
                                msg = parts[1];
                            } else {
                                index = -1;
                                msg = resp.msg;
                            }
                        }
                    } catch(e){
                        index = -1;
                        msg = resp.msg;
                    }

                    try {
                      // If index is -1 if means we don't have data on specifically which field was invalid.
                      // Just lump the error message into the generic response div.
                        if (index == -1){
                            $(form).find('#mce-'+resp.result+'-response').show();
                            $(form).find('#mce-'+resp.result+'-response').html(msg);      

                        } else {
                            var fieldName = $("input[name*='"+fnames[index]+"']").attr('name'); // Make sure this exists (they haven't deleted the fnames array lookup)
                            var data = {};
                            data[fieldName] = msg;
                            form.showErrors(data);
                        }
                    } catch(e){
                        $(form).find('#mce-'+resp.result+'-response').show();
                        $(form).find('#mce-'+resp.result+'-response').html(msg);
                    }
                }
            }
        });
      }
  }
  
  // Validate Mailchimp forms
  $(".mc-voila-subscribe-form").each(function() { 
      $(this).validate(validatorOptions);
  });
  
  function isTooEarly(element) {
    var fields = $('input:not(:hidden)' , $(element).closest(".mc-field-group"));
    return ($(fields).eq(-1).attr('id') != $(element).attr('id'));
  }
  
  function getAjaxSubmitUrl(form) {
    var url = $(form).attr("action");
    url = url.replace("/post?u=", "/post-json?u=");
    url += "&c=?";
    return url;
  }
  
  // Open promo modal signup
  if ( show_newsletter_promo_popup && !$('.main-content .gui.gui-challenge').length ) {   
    var hide_until = parseInt(newsletter_promo_hide_until);
    var show_delay = parseInt(newsletter_promo_delay);
    if ( !Cookies.get('promo_popup_filled') && !Cookies.get('promo_popup_closed') ) {
			var modalVariant = 'promo-modal-wrapper';
      if ( $('#promoModal').hasClass('promo-modal-no-image') ) {
        modalVariant = 'promo-modal-wrapper-no-image';
      }
      setTimeout( function() {
        $.featherlight($('#promoModal'), {
          variant: modalVariant,
          afterOpen: function(event){
            $(".featherlight-content #mc-embedded-subscribe-form-popup").validate(validatorOptions);
            $('.newsletter-promo-form a.button').on('click', function(e) {
            	Cookies.set('promo_popup_filled', true);
            });
            $('.newsletter-promo-form').on('submit', function(e) {
            	Cookies.set('promo_popup_filled', true);
            });
            $('.promo-modal-wrapper .close-promo, .promo-modal-wrapper-no-image .close-promo').on('click', function() {
            	$('.promo-modal-wrapper .featherlight-close, .promo-modal-wrapper-no-image .featherlight-close').click();
            });
          },
          afterClose: function(event){
            Cookies.set('promo_popup_closed', true, { expires: hide_until });
          }
        });
      }, show_delay);
    } 
  }
  
  // Update product price with bundles/addons
  function updatePrice() {
    var initialPrice = $('.price-update').data('price');
    var total = initialPrice;
    $('.addon-product .checkbox input:checked').each( function() {
      total += $(this).closest('.addon-product').find('.addon-variant-price').data('price');
    });
    $('.price-update').html( formatCurrency( total ) ).addClass('emphasis');
    setTimeout(function() {
      $('.price-update').removeClass('emphasis');
    }, 150);
  }
  
  // Add product addon to subtotal
  $('.addon-product').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var checkbox = $(this).find('.checkbox input');
    if ( checkbox.attr('checked') ) {
      checkbox.removeAttr('checked');
    } else {
      checkbox.attr('checked','checked');
    }
    updatePrice();
  });
  
  // Change product addon variable on product page
  $('.addon-product-select').on('change', function() {
    var newPrice = $(this).find(':selected').data('variant-price');
    var newId = $(this).val();
    $(this).closest('.addon-product').find('.addon-variant-price').html( formatCurrency( newPrice ) );
    $(this).closest('.addon-product').find('.checkbox input').attr('value', newId ).attr('data-price', newPrice );
    $(this).closest('.addon-product').find('.addon-variant-price').data('price', newPrice);
    updatePrice();
  });
  
  // Add addon/bundle to cart
  $('.add-to-cart-trigger').on('click', function(e) {
  	e.preventDefault();
    if ( $('.addon-product .checkbox input:checked').length && $('.addon-product .checkbox input:checked').length != $('.addon-product .checkbox input').length ) {
      $('#product_configure_form').attr('action', $('#product_configure_form').data('cart-bulk-url') );
      $('#product_configure_form').submit();
      return false;
    } else if ( $('.addon-product .checkbox input:checked').length > 0 && $('.addon-product .checkbox input:checked').length == $('.addon-product .checkbox input').length) {
      e.stopPropagation();
      $('.add-bundle-btn').click();
      return false;
    } else {
      $('#product_configure_form').submit();
    }
  });
  
  // Validate popup forms to make sure they go through correctly
  $('.popup-validation').on('click', function(e){
    e.preventDefault();
    var form = $(this).closest('form');
    var isValid = true;
    var required = form.find('.required');
    required.each( function() {
    	if ( $(this).val() == "" || $(this).val() == " " ) {
        $(this).addClass('error');
        isValid = false;
      }
    });
    if ( !isValid ) {
      return false;
    }
    form.submit();
    return false;
  });
  
  // Enable product list carousel
  if ( $('.product-list-carousel') ) {
    
    if ( $('.product-list-carousel > div').hasClass('col-md-3') ) {
      var slidesCount = 4;
    } else if ( $('.product-list-carousel > div').hasClass('col-md-6') ) {
      var slidesCount = 2;
    } else {
      var slidesCount = 3;
    }
    $('.product-list-carousel').slick({
			infinite: false,
			slidesToShow: slidesCount,
			slidesToScroll: slidesCount,
      arrows: false,
			dots: true,
			responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesCount,
          slidesToScroll: slidesCount,
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
			}]
		});
    $('.product-list-carousel').on('afterChange', function(slick, slide){
    	lazyProducts();
    });
  }
  
  // Enable carousel on mobile for blog
  if ( $('.featured-blog-elements') ) {
		$('.featured-blog-elements').slick({
			infinite: false,
			slidesToShow: 3,
			slidesToScroll: 3,
      arrows: false,
			dots: true,
			responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
			}]
		});
	}
  
  // Enable carousel for Headlines
  if ( $('.headline-slider') ) {
    var headlineSlider = $('.headline-slider'),
        columnsLarge = 2,
        columnsMedium = 2,
        columnsMobile = 1;
    
    if ( headlineSlider.data('columns') == 2 ) {
      var columnsLarge = 2,
          columnsMedium = 2,
          columnsMobile = 1;
    } else if ( headlineSlider.data('columns') == 1 ) {
      var columnsLarge = 1,
          columnsMedium = 1,
          columnsMobile = 1;
    } else if ( headlineSlider.data('columns') == 3 ) {
      var columnsLarge = 3,
          columnsMedium = 2,
          columnsMobile = 1;
    } else if ( headlineSlider.data('columns') == 4 ) {
      var columnsLarge = 4,
          columnsMedium = 2,
          columnsMobile = 1;
    }
		headlineSlider.slick({
			infinite: true,
			slidesToShow: columnsLarge,
			slidesToScroll: 1,
      arrows: false,
			dots: true,
			responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: columnsMedium,
          slidesToScroll: 1,
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: columnsMobile,
          slidesToScroll: 1
        }
			}]
		});
	}
  
  // Enable the zoom on images
  if ( $('.enable-zoom .product-image a').length ) {
    $('.enable-zoom .product-image a').each( function () {
      $(this).zoom({
        url: $(this).attr('href'),
        magnify: 1.3
      });
    });
  }
  
  
  // Enable carousel for product images
  if ( $('.product-images:not(.no-slider)').length ) { 
    var slider = $('.product-images');
    slider.on('init', function(){
      
    });
    slider.slickLightbox({
        itemSelector : '.product-image a',
        navigateByKeyboard : true
    });
    slider.slick({
        fade: true,
        dots: true,
        arrows: false,
        customPaging : function(slider, i) {
            var thumb = $(slider.$slides[i]).find('img').data('thumb');
            return '<a><img src="'+thumb+'"></a>';
        }
    });
	}
  

  // Enable carousel for Hero banner
	if ( $('.hero .hero-element').length > 1 ) {
		var slider = $('.hero-elements-wrapper');
    slider.on('init', function() {
			$('.my-background-video').bgVideo({
        fadeIn: 300
      });
      if ( $('.jquery-background-video').length ) {
      	$('.jquery-background-video').get(0).play();
      }
      if ( slider.find('.slick-active').hasClass('content-light') ) {
        setTimeout( function() {
          slider.find('.slick-dots').addClass('content-light');
          if ( slider.parent('.hero').hasClass('hero-full') ) {
            siteHeader.addClass('content-light');
          }
        }, 150);
      };
    });
	 	slider.slick({
	 		arrows: false
	 	});
	 	slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
		  	if ( $( slick.$slides.get(nextSlide) ).hasClass('content-light') ) {
		  		setTimeout( function() {
		  			slider.find('.slick-dots').addClass('content-light');
			  		if ( slider.parent('.hero').hasClass('hero-full') ) {
			  			siteHeader.addClass('content-light');
			  		}
		  		}, 150);
		  	} else {
		  		setTimeout( function() {
			  		slider.find('.slick-dots').removeClass('content-light');
			  		siteHeader.removeClass('content-light');
		  		}, 150);
		  	}
      $('.lazy').Lazy({
        threshold: 400,
      });
		});
	} else if ( $('.hero.hero-full .hero-element').length == 1 && $('.hero .hero-element').hasClass('content-light') ) {
  	siteHeader.addClass('content-light');
    $('.my-background-video').bgVideo({
      fadeIn: 300
    });
  } else if ( $('.my-background-video').length ) {
  	$('.my-background-video').bgVideo({
      fadeIn: 300
    });
  }
  
  // Make the collection sidebar filter sticky
  if ( $('.collection-sidebar-wrapper').length ) {
		$(".collection-sidebar-wrapper").stick_in_parent({
    	recalc_every: 3
    });
	}
  
   // Function to recalc product collections height
  var columnResize = $('.collection-content'),
      columnGuide  = $('.collection-sidebar-wrapper');
  function recalcColumns() {
    console.log('boo');
  	$('.collection-content').css('min-height', columnGuide.height() + 60 + 'px');
  }
  
  // Calculate on load
  recalcColumns();
	
  // Make the sticky work with bootstrap columns
  if ( $('.stick-it-in').length || $('.collection-sidebar-wrapper').length ) {
    function activeStickyKit() {
      $(".stick-it-in, .collection-sidebar-wrapper").stick_in_parent();
      // bootstrap col position
      $(".stick-it-in")
      .on('sticky_kit:bottom', function(e) {
          $(this).parent().css('position', 'static');
      })
      .on('sticky_kit:unbottom', function(e) {
          $(this).parent().css('position', 'relative');
      });
    };

    // Remove sticky kit
    function detachStickyKit() {
        $(".stick-it-in, .collection-sidebar-wrapper").trigger("sticky_kit:detach");
    };

    var screen = 992;
    var windowHeight, windowWidth;
    windowWidth = $(window).width();
    if ((windowWidth < screen)) {
        detachStickyKit();
    } else {
        setTimeout( function() {
          activeStickyKit();
        }, 300);
    }

    // windowSize
    // window resize
    function windowSize() {
        windowHeight = window.innerHeight ? window.innerHeight : $(window).height();
        windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
    }
    windowSize();

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    $(window).resize(debounce(function(){
        windowSize();
        $(document.body).trigger("sticky_kit:recalc");
        if (windowWidth < screen) {
            detachStickyKit();
        } else {
            activeStickyKit();
        }
    }, 250));
	}
  
  // Open product filters and set cookie for user preferences
  $('.filter-open').on('click', function(e) {
		e.preventDefault();
    if ($(this).parents('.collection-products').hasClass('collection-sidebar-hidden')) {
      Cookies.set('show_filters', true, { expires: 7 });
    } else {
      Cookies.set('show_filters', false, { expires: 7 });
    }
    $('.collection-products').toggleClass('collection-sidebar-hidden');
	});

  // Open/close filter sections
	$('.filter-title').on('click', function() {
    if ( $(this).closest('.filter-wrap').hasClass('active') ) {
      $(this).closest('.filter-wrap').removeClass('active');
    	Cookies.set($(this).closest('.filter-wrap').attr('id'), false, { expires: 7 });
    } else {
      $(this).closest('.filter-wrap').addClass('active');
      Cookies.set($(this).closest('.filter-wrap').attr('id'), true, { expires: 7 });
    }
		setTimeout( function() {
      recalcColumns();
			$(document.body).trigger("sticky_kit:recalc");
		}, 50)	
	});
  
  // Open the add new review popup
  $('.review-trigger').on('click', function(e) {
    e.preventDefault();
    $.featherlight($('#reviewModal'), {
        afterOpen: function(event){
            this.$content.find('.form-row select').selectric();
        }
    });
  });
  
  // Open the size guide modal and fetch the content
  $('.size-guide-trigger').on('click', function(e) {
    e.preventDefault();
    var guideUrl = 'size-guide';
    if ( $(this).data('custom-size-guide') ) {
    	guideUrl = $(this).data('custom-size-guide');
    }
    if (location.protocol == 'https:') {
      shop_url = shop_url.replace('http:', 'https:');
    }
    $.get(shop_url+'service/' + guideUrl + '?format=json', function(data) {
      console.log(data);
      $('.size-guide-wrapper .size-guide-title').html(data.textpage.title);
      $('.size-guide-wrapper .size-guide-content').html(data.textpage.content);
    }).done(function(){
      $.featherlight($('#sizeGuideModal'), {});
    });
  });
  
  // Format currency
  function formatCurrency(number) {
    if (number) {
      var formatterNumber = currency_format+''+ numeral(number).format(number_format);
    } else {
      var formatterNumber = '';
    }
    return formatterNumber;
  }
  
  function getCustomVariable(el) {
    var html = '<ul class="product-custom-variants-options">';
    
    var i = 0;
    var customEl = false;
    var customValues = false;
    if ( el.data_03 && el.data_03 != '' ) {
      customValues = el.data_03.split(",");
      if ( customValues.length > 1 ) {
        customEl = true;
      }
    }
    $.each(el.variants, function(index, elVar){
      
      if (elVar.title.indexOf(':') > -1) {
        //var elVarItemTitle = elVar.title.split(":")[0].trim();
      	var elVarItemValue = elVar.title.split(":")[1].trim();
      } else {
      	var elVarItemValue = elVar.title;
      }
      var elStyleType = 'other';
      var elStyles = '';
      if ( customValues.length > 1 ) {
        if ( customValues && customValues[i].trim().match("^#") ) {
          elStyleType = 'color';
          elStyles = 'background-color: ' + customValues[i].trim() + ';';
        } else if ( customValues && customValues[i].trim().match("^http") ) {
          elStyleType = 'image';
          elStyles = 'background-image: url(' + customValues[i].trim() + ');';
        } else if ( customValues && ( customValues[i].trim().indexOf(".jpg") >= 0 || customValues[i].trim().indexOf(".png") >= 0 || customValues[i].trim().indexOf(".jpeg") >= 0 ) ) {
          elStyleType = 'image';
          elStyles = 'background-image: url(https://cdn.webshopapp.com/shops/' + shop_id + '/files' + customValues[i].trim() + ');';
        }
      }
      if (elVar.stock.available) {
        var available = true;
      } else {
        var available = false;
      } 
      html += '<li class="product_configure_variant_' + elVar.id + (customEl ? ' custom-variant-picker custom-variant-picker-'+elStyleType  : '') + ( (elVar.title == el.variant || elVar.default) ? ' active' : '') + '"><a href="#" data-cart-url="' + shop_url + 'cart/add/' + elVar.id + '/" data-price="' + formatCurrency(elVar.price.price) + '" data-old-price="' + formatCurrency(elVar.price.price_old) + '" data-available="' + available + '" data-stock="' + elVar.stock.level + '" style="' + elStyles + '" class="' + (elVar.stock.available == false ? 'unavailable' : '') + '">' +  elVarItemValue + '</a></li>'; 
      i ++;
    });
    html += '</ul>';
    
    return html;
	}
  
  function updateModalForm(option) {
    if (option.is('select') ) {
      var url = option.find('option:selected').attr('data-cart-url'),
          available = option.find('option:selected').attr('data-available'),
          priceNew = option.find('option:selected').attr('data-price'),
          priceOld = option.find('option:selected').attr('data-old-price'),
          variantStock = parseInt(option.find('option:selected').attr('data-stock'));
    } else {
      var url = option.attr('data-cart-url'),
          available = option.attr('data-available'),
          priceNew = option.attr('data-price'),
          priceOld = option.attr('data-old-price'),
          variantStock = parseInt(option.attr('data-stock'));
    }
    if ( option.closest('.product-element').length ) {
      var 	priceWrapper = option.closest('.product-element').find('.product-price-change');
      priceWrapper.html('<span class="product-price-initial">' + priceOld + '</span><span class="new-price">' + priceNew + '</span>').addClass('emphasis');
      setTimeout(function() {
        priceWrapper.removeClass('emphasis');
      }, 150);
      
    } else {
      var 	availabiltyWrapper = option.closest('.product-modal-content').find('.stock'),
          	priceWrapper = option.closest('.product-modal-content').find('.price');
      
      if (available == 'true' && variantStock != 0) {
        if (availabiltyWrapper.length && availabiltyWrapper.hasClass('show-stock-level') ) {
          availabiltyWrapper.html('<div>' + variantStock + ' ' +  product_in_stock_label + '</div>');
        } else {
          availabiltyWrapper.html('<div>' +  product_in_stock_label + '</div>');
        }
      } else if (available == 'true' && variantStock == 0) {
        availabiltyWrapper.html('<div>' + product_backorder_label + '</div>');
      } else {
        availabiltyWrapper.html('<div>' + product_out_of_stock_label + '</div>');
      }
      priceWrapper.html('<span class="old-price">' + priceOld + '</span><span class="new-price">' + priceNew + '</span>');
      priceWrapper.find('.new-price').addClass('emphasis');
      setTimeout(function() {
        priceWrapper.find('.new-price').removeClass('emphasis');
      }, 150);
      option.closest('form').attr('action', url);
    }
	}
  
  // Open quickview popop and fetch content
  $('.quickview-trigger').featherlight({
    variant: 'product-modal-wrapper',
    targetAttr: 'href',
    afterContent: function() {
      var url = this.$currentTarget.attr('data-product-url').replace('.html', '.ajax');
      if (location.protocol == 'https:') {
        url = url.replace('http:', 'https:');
      }
      var content = this.$content;
      $.get(url, function(el){
        console.log(el);
        var elVars = el.variants,
        		elImgs = el.images;
				
        // Get new images
        if (elImgs.length != 0 ) {
          content.find('.product-modal-media').empty();
          $.each(elImgs, function(index, image){
            var image = image.replace('50x50x2', product_image_size);
            content.find('.product-modal-media').append('<div class="product-figure"><img src="'+image+'"></div>');
          });
        }
        // Get new variables
        if (elVars.length != 0 ) {
          
          content.find('.product-configure').removeClass('modal-variants-waiting');
          
          var variantTypesCount = 0;
          var elVarTitles = [];
          var items= [];
          
          $.each(elVars, function(index, elVar){
            var elVarList = elVar.title.split(",");
            variantTypesCount = elVarList.length;
          });
          
          var customVariantActive = false;
          if ( ( display_variant_picker_on == 'all' && el.data_03 != 'disabled' ) || ( display_variant_picker_on == 'specific' && el.data_03 != 'false' && el.data_03 ) ) {
            customVariantActive = true;
          }
          
          if ( variantTypesCount == 1 && show_variant_picker && customVariantActive ) {
            content.find('.product-configure-variants').remove();
            content.find('.product-configure').prepend( getCustomVariable(el) );
            content.find('.product-custom-variants-options a').on('click', function(e) {
              e.preventDefault();
              if ( $(this).hasClass('unavailable') ) {
                //console.log('This product is unavailable');
              } else {
                content.find('.product-custom-variants-options li').removeClass('active');
                var urlCart = $(this).data('cart-url');
            
                updateModalForm($(this));
                
                $(this).parent().addClass("active");
                $(this).closest('.product_configure_form').attr('action', urlCart);
                
              }
            })
          } else {
            $.each(elVars, function(index, elVar){
              /*var elVarList = elVar.title.split(",");
              variantTypesCount = elVarList.length;
              $.each(elVarList, function(index, elVarItem){
                elVarItem.split(":");
                var elVarItemTitle = elVarItem.split(":")[0].trim();
                var elVarItemValue = elVarItem.split(":")[1].trim();
                if ( items[elVarItemTitle] ) {
                  var found = $.inArray(elVarItemValue, items[elVarItemTitle]);
                  if (found == -1) {
                      items[elVarItemTitle].push(elVarItemValue);
                  }
                } else {
                  items[elVarItemTitle] = [];
                  items[elVarItemTitle].push(elVarItemValue);
                }
                console.log(items);
              })*/

              if (elVar.stock.available) {
                var available = 'true';
              } else {
                var available = 'false';
              } 
              content.find('.product-options-input').append('<option ' +
                ( (el.vid == elVar.id) ? 'selected="selected" ' : '') +
                'data-cart-url="'+shop_url+'cart/add/'+elVar.id+'/" ' +
                'data-available="'+available+'" ' +
                'data-price="'+formatCurrency(elVar.price.price)+'" ' +
                'data-old-price="'+formatCurrency(elVar.price.price_old)+'" ' +
                'data-stock="'+elVar.stock.level+'">'+ elVar.title +' - '+formatCurrency(elVar.price.price) + 
                '</option>');
            });
          }
          
          
        }
      }).done(function(){
        if ($.fn.selectric) {
          content.find('.product-configure-variants select').selectric();
        }
        content.find('.product-modal-media').slick({
          fade: true,
          dots: true,
          arrows: false
        });
        if (!content.find('.product-configure').hasClass('modal-variants-waiting')) {
          updateModalForm(content.find('select'));
        }
      });

      $('.product-modal-wrapper select').on('change', function(){
        updateModalForm($(this));
      });
    }
  });
});

jQuery(window).on("load", function($) {
  // Recalc sticky kit once images are all loaded
	jQuery(document.body).trigger("sticky_kit:recalc");
});

function pad(str, max) {
	str = str.toString();
	return str.length < max ? pad("0" + str, max) : str;
}

// Update cart quantities
function changeQuantity(way, el){
  	var qty = parseInt(el.closest('.input-wrap').find('input').val());
    if (way == 'add'){
    	qty++;
    } else {
    	if (qty > 1){
        	qty--;
    	}
    }
    el.closest('.input-wrap').find('input').val(qty);
}

// Initiate blog laod more
var moreContent = false,
		pageManual = false,
		blogPage = 1,
		pageRemaining = 0,
		loading = false;

function initBlog(url, page, mode){
	moreContent = true;
  if ( $('.article-list').length ) {
    $('.article-list').imagesLoaded( function() {
      var grid = $('.article-list').masonry({
        isAnimated: false,
        transitionDuration: 0,
        itemSelector: '.blog-element-wrapper',
        columnWidth: '.grid-sizer',
        percentPosition: true
      });
      $('.article-list').addClass('active');
    });
	}
	$('.load-more-blog').click(function(){
		blogLoader(url, mode);
		return false;
	});
	$(document).ready( function() {
		blogLoader(url, mode);
	});
}

// Load blog articles
function blogLoader(url, mode){
	if ( !loading ) {
    blogPage++;
    if ( blogPage > 2 ) {
      loading = true;
      url = url.replace('page1.ajax', 'page' + blogPage + '.html?format=json');
      $.getJSON(url, function(json){
        if ( json.blog.articles ) {
          pageRemaining = 5 - (json.blog.pagination.page * 5);
          if ( pageRemaining < 5 ) {
            $('.load-more-blog').text(pageRemaining);
          }
          if ( json.blog.pagination.pages <= blogPage ) {
            moreContent = false;
            $('.blog-footer').remove();
          }
          if ( blogPage > 100) {
            blogRemaining = true;
            $('.blog-footer').addClass('manual');
          }
          var counter = 1,
              sortArticles = {},
              count = 1;

          $.each(json.blog.articles, function(index, article) {
            var thisDate = article.date.replace(' ', '-').replace(':', '-') + count++;
            sortArticles[thisDate] = article;
          });
          
          var articles = {},
              number = 5;
          $.each(sortArticles, function(index, article) {
            articles[number--] = article;
          });
          $.each(articles, function(index, article) {
            var container = $('.article-list'),
              	postTitle = article.title,
              	postUrl = article.url,
              	postSummary = article.summary,
              	postThumbnailId = article.image,
              	publishDate = article.dat;
            
            console.log(article);
            //var articleObject  = $('<div class="col-xs-12 col-sm-4 col-md-4 col-xs-12 blog-col">').appendTo(container);
            var article = $('<div class="blog-element-wrapper">').appendTo(container);
            var articleContent = $('<article class="blog-element">').appendTo(article);
            if ( !postThumbnailId ) {
            	articleContent.addClass('blog-element-no-image');
              articleContent = $('<div class="blog-elem-wrapper">').appendTo(articleContent);
            };
            var imageLink = $('<a href="'+ basicShopUrl + postUrl +'">').appendTo(articleContent);

            if ( postThumbnailId ) {
              postThumbnailId = pad(postThumbnailId, 9);
              var imgstring = '<img src="'+staticUrl+'files/000000000/1000x650x1/image.jpg" width="100%" height="auto" />';
              img = imgstring.replace("000000000", postThumbnailId);
              var artimg = $(img).appendTo(imageLink);
            } else {
              //var artimg = $('<img src="'+assetsUrl+'no-article.jpg" width="100%">').appendTo(imageLink);
            };

            var title = $('<a href="'+ basicShopUrl + postUrl +'"><h3>'+ postTitle +'</h3></a>').appendTo(articleContent);
            var publishDate = $('<div class="hint-text entry-date">'+ publishDate +'</div>').appendTo(articleContent);

            if (showDesc) {
              var points = '';
              if( postSummary.length > 160 ) {
                var points = '...';
              }
              var description = $('<div class="entry-content">'+ postSummary.substring(0,160) + ' ' + points +'</div>').appendTo(articleContent);
            }
            var readMore = $('<div class="entry-footer"><a href="'+ basicShopUrl + postUrl +'" class="button">Read more</a></div>').appendTo(articleContent);

            counter++;       
          });
        }
        loading = false;
      }).done(function(){
        $('.article-list').imagesLoaded( function() {
          $('.article-list').masonry('reloadItems');
          $('.article-list').masonry('layout');
    		});
        $(document).scroll();
      });
    }
	}
}