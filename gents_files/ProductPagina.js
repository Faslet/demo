var ProductPagina = {
    listeners: "",
    slider: '',
    rtime: new Date(),
    timeout: false,
    delta: 200,
    init: function(vars) {
        var self = this;
        self.setListeners();
        EventHandler.addListeners(self.listeners);
        self.makeResonsiveTables();
//        self.preloadPicture();
    },
    setListeners: function() {
        var self = this;
        self.listeners = [
            {parent: '.container', child: '', event: 'swiperight swipeleft', functie: function(event) {
                    self.swipe(event);
                }},
            {parent: '#jq-add-to-cart', child: '', event: 'submit', functie: function(e){
                e.preventDefault();
                
                $.each($('#jq-add-to-cart input'), function(key, valueObj) {
                    var name = $(valueObj).prop('name');
                    if(name.match(/_reserveren/ig))
                    {
                        $(valueObj).val('0');
                    }
                });
                self.inWinkelMandje();
            }},
            {parent: '#jq-add-to-cart-dialog', child: '', event: 'submit', functie: function(e){
                e.preventDefault();
                
                $.each($('#jq-add-to-cart-dialog input'), function(key, valueObj) {
                    var name = $(valueObj).prop('name');
                    if(name.match(/_reserveren/ig))
                    {
                        $(valueObj).val('0');
                    }
                });
                self.inWinkelMandje();
            }},
            {parent: '.jq-product-add-to-wishlist', child: '', event: 'click', functie: self.addToWishlist},
            {parent: '#jq-add-to-wishlist', child: '', event: 'click', functie: self.inVerlangLijstje},
            {parent: '#jq-reserveren', child: '', event: 'click', functie: self.Reserveren},
             {parent: '.jq-maatadvies-popup', child: '', event: 'click', functie: self.MaatadviesPopup},
             {parent: '.stock-text', child: '', event: 'click', functie: self.showStockForSize},
            {parent: '.jq-zoomafbeelding-thumbnail a', child: '', event: 'click', functie: self.switchPicture},
            {parent: '#jq-winkel-voorraad-popup', child: '', event: 'click', functie: self.popupWinkelVoorraad},
            {parent: '.jq-popup-zoom', child: '', event: 'click', functie: self.showPopupZoomImage},
            {parent: '#jq-add-to-reserve', child: '', event: 'click', functie: function(e){
                e.preventDefault();
                    
                $.each($('#jq-add-to-cart input'), function(key, valueObj) {
                    var name = $(valueObj).prop('name');
                    if(name.match(/_reserveren/ig))
                    {
                        $(valueObj).val('1');
                    }
                });
                self.inWinkelMandje();
            }},
            {parent: '#jq-shirt', child: '#jq-shirt-bedrukken', event: 'change', functie: self.toggleBedrukken},
            {parent: '.jq-zoomafbeelding', child: '.jq-zoomafbeeling-thumbnail', event: 'mouseenter', functie: self.switchPicture},
            {parent: '.jq-zoomafbeelding.jq-zoomer', child: '.jq-zoomafbeeling-thumbnail.jq-zoomer', event: 'mouseenter', functie: self.switchPictureZoomer},
            {parent: '#jq-article-reviews form', child: '', event: 'submit', functie: self.productReviewOpslaan},
            {parent: '#jq-clear-recent-viewed', child: '', event: 'click', functie: self.wisLaatstBekeken}
        ];
    },
    swipe: function(event)
    {
        console.log('swipe');
        var swipelink = $('#jq-articleSpecs').children('a');
        var next = window.swipenext;
        var prev = window.swipeprev;

        if (event.type === 'swiperight') {
            if (prev !== "") {
                window.location = prev;
            }
        }
        else if (event.type === 'swipeleft') {
            if (next !== "") {
                window.location = next;
            }
        }
    },
    

//    showStockForSize: function(size) {
//        
//        
//     
//        var table = $('.voorraadTabel'),
//            tbody = table.children('tbody'),
//            trs = tbody.children('tr'),
//            output = $('#size_in_shop'),
//            dummy = $('#filiaal_dummy').html();
//            selectedSize = $( ".selected" ).html();
//            alert(selectedSize);
//        
//        // clear data
//        output.html('');
//        
//        // Hide select message
//        if (output.prev('p').is(' :visible')) {
//			output.prev('p').hide();
//		}
//        
//        for (var i = 0; i < trs.length; i++) {
//            var $tr = $(trs[i]);
//            var newDummy = $(dummy).clone();
//            var stock = ProductPagina.getSizeStock(size, $tr);
//            newDummy.find('.filiaal').text($tr.attr('data-filiaal'));
//            console.log('stock: ' + stock);
//            newDummy.find('.count').text(stock);
//            if (stock === '0') {
//                newDummy.find('.count').addClass('out-of-stock');
//            }
//            output.append(newDummy);
//        }
//            
//        
//    },
//    getSizeStock: function(size, row) {
//        var sizes = row.find('td:not(.filiaal)');
//        for (var i = 0; i < sizes.length; i++) {
//            var $size = $(sizes[i]),
//                name = $size.attr('data-size');
//            
//            if (name === size) {
//                return $size.attr('data-stock');
//            }
//        }
//        
//        return '';
//    },
    setProductSelected: function(setMerk, deSelectClassName, className, setId, setEan, setProductcode, voorraad, maatnaam)
    {
        var self = ProductPagina;
        
       // self.showStockForSize(maatnaam);
            $('.stock-text').html('Klik hier om te zien in welke winkels we maat '+maatnaam+' op voorraad hebben.');
            $('.stock-text').addClass('active');
        $('.'+deSelectClassName).removeClass('selected');

        var exploded = className.split('_');
        var productid = exploded[0];
        var match = className.match(/_kleur/i);

        // zoomafbeelding switchen als die bestaat
        if($('#jq-'+setEan+'_zoomafbeelding').length > 0)
        {
            $('.jq-zoomafbeelding').hide();
            $('#jq-'+setEan+'_zoomafbeelding').show();
        }

        if($('.'+className).hasClass('selected'))
        {
            $('.'+className).removeClass('selected');
            $('.'+className).blur();
            $('input[name$='+deSelectClassName+']').val('');

            if(match && setEan != '') // klik op de kleur
            {
                $('input[name$='+productid+'_ean]').val('');
                $('input[name$="'+productid+'_maat"]').val('');
                
                if(!self.maatPreSelect)
                {
                    AjaxRequest.request(true, {'mode':'productDetails', 'actie': 'ProductPagina.', 'mid': setMerk, 'ean': setEan, 'productid': productid, 'maatTXT': maatTXT, 'productcode': setProductcode}, 'htmlarray');
                }
            }

            $('.'+productid+'_bestel').prop('checked', false);
            $('#uniform-'+productid+'_bestel span').removeClass('checked');
        }
        else
        {
            $('.'+className).focus();
            $('.'+className).addClass('selected');
            

            // maatTXT ontvangen.. dit is gewoon de textuele maat, in welke vorm dan ook (wat de standaard is)..
            var maatTXT = $('a.'+productid+'_maat.selected span.primary').text();

            $('input[name$='+deSelectClassName+']').val(setId);

            if(match && setEan != '') // klik op de kleur
            {
                $('input[name$='+productid+'_ean]').val(setEan);

                $('input[name$="'+productid+'_maat"]').val('');
                
                AjaxRequest.request(true, {'mode':'productDetails', 'actie': 'ProductPagina.', 'mid': setMerk, 'ean': setEan, 'productid': productid, 'maatTXT': maatTXT, 'productcode': setProductcode}, 'htmlarray');
            }
            
            $('.'+productid+'_bestel').prop('checked', true);
            $('#uniform-'+productid+'_bestel span').addClass('checked');
        }
        
        self.maatPreSelect = false;
        self.checkProductSelected(productid, true);

        // Retrieve current selected size
        size=$('.'+className).text();
        self.ShowLocationStocks(productid, size);        
        
        // Toon vestigingen en actuele voorraad lijst 
        $('#locations-and-stocks').removeClass('active');
        $('#showlocationstocks').show();        
    },
    checkProductSelected: function(productid, noMessage)
    {
        if($('input[name$="'+productid+'_kleur"]').val() == '')
        {
            $('.'+productid+'_bestel').prop('checked', false);
            $('#uniform-'+productid+'_bestel span').removeClass('checked');
            if(noMessage == false)
            {
                Dialog.popupDialog('confirmation', window.LANG_KIESKLEUR);
            }
        }
        else if($('input[name$="'+productid+'_maat"]').val() == '')
        {
            $('.'+productid+'_bestel').prop('checked', false);
            $('#uniform-'+productid+'_bestel span').removeClass('checked');
            if(noMessage == false)
            {
                Dialog.popupDialog('confirmation', window.LANG_KIESMAAT);
            }
        }
        else if($('input[name$="'+productid+'_ean"]').val() != '' && $('input[name$="'+productid+'_kleur"]').val() != '' && $('input[name$="'+productid+'_maat"]').val() != '' && noMessage == true)
        {
            $('#jq-add-to-cart button').prop('disabled',false);
            $('.'+productid+'_bestel').prop('checked', true);
            $('#uniform-'+productid+'_bestel span').addClass('checked');
            
            AjaxRequest.request(true, {'mode':'maxAantalPerMaat', 'productid': productid, 'maatid': $('input[name$="'+productid+'_maat"]').val()}, ProductPagina.setMaxAantalPerMaat);
        }
    },
    setMaxAantalPerMaat: function(data)
    {
        var data = JSON.parse(data);
        if (data['voorraad'] > 0)
        {
            $aantalSelected = parseInt($('#jq-add-to-cart .aantal').val());
            if($aantalSelected > data['voorraad']){
                $('#jq-add-to-cart .aantal').val(data['voorraad']);
            }
            $('#jq-add-to-cart .aantal').attr('max',data['voorraad']);
            $('#jq-totaal-op-voorraad .jq-value').html(data['voorraad']);
            $('#jq-totaal-op-voorraad').removeClass('hidden');
        }
    },
    showStockForSize: function(size) {
        var table = $('.voorraadTabel'),
            tbody = table.children('tbody'),
            trs = tbody.children('tr'),
            output = $('#size_in_shop'),
            dummy = $('#filiaal_dummy').html();
            size = $(".selected" ).html();

        output.html('');
        
        
        // Hide select message
//        if (output.prev('p').is(' :visible')) {
//			output.prev('p').hide();
//		}
        
        for (var i = 0; i < trs.length; i++) {
            var $tr = $(trs[i]);
            var newDummy = $(dummy).clone();
            var stock = ProductPagina.getSizeStock(size, $tr);
            newDummy.find('.filiaal').text($tr.attr('data-filiaal'));
            newDummy.find('.count').addClass( "fa fa-check" );
            if (stock === '0') {
                newDummy.find('.count').addClass('out-of-stock');
                newDummy.find('.count').addClass( "fa fa-times" );
            }
            
        
      
            output.append(newDummy);
            //alert(newDummy);
            //alert(output);
        }
         output.prepend('<p>'+window.LANG_ONZEVOORRAAD+'</p>');
        output.prepend('<h2>'+window.LANG_VOORRAADHEAD+'</H2>');
       
        output.append('<p>'+window.LANG_VOORRAADTOELICHTING+'</p>');
             Dialog.popupDialog('stock', output, false, false, '');
        
    },
    getSizeStock: function(size, row) {
        var sizes = row.find('td:not(.filiaal)');
        for (var i = 0; i < sizes.length; i++) {
            var $size = $(sizes[i]),
                name = $size.attr('data-size');
                
            if (name == size) {
                return $size.attr('data-stock');
            }
        }
        
        return '';
    },
    inVerlangLijstje: function()
    {
        var self = ProductPagina;
        
        var extraData = {
                    'mode' : 'inVerlangLijstje'
                    };
        // setup some local variables
        var $form = $('#jq-add-to-cart');
        // let's select and cache all the fields
        $inputs = $form.find('input, select, button, textarea');
        // serialize the data in the form
        serializedData = $form.serialize() + '&' + $.param(extraData);

        // custom checkje of er wel een bestel checkbox aangevinkt is
        if(!$form.find(':checkbox').is(':checked'))
        {
            if($form.find('input[name$="actie"]').val() == 'product')
            {
                Dialog.popupDialog('confirmation', window.LANG_KIESMAAT);
            }
            else if($form.find('input[name$="actie"]').val() == 'lookbook')
            {
                Dialog.popupDialog('confirmation', window.LANG_GEENARTIKELENGESELECTEERD);
            }
        }
        else
        {
            // let's disable the inputs for the duration of the ajax request
            $inputs.prop('disabled', 'disabled');

            // fire off the request
            AjaxRequest.request(false, serializedData, 'popuparray');

            $inputs.removeAttr('disabled');
        }
    },
    Reserveren: function()
    {
        var self = ProductPagina;
        
        var extraData = {
                    'mode' : 'reserveren'
                    };
        // setup some local variables
        var $form = $('#jq-add-to-cart');
        // let's select and cache all the fields
        $inputs = $form.find('input, select, button, textarea');
        // serialize the data in the form
        serializedData = $form.serialize() + '&' + $.param(extraData);

        // custom checkje of er wel een bestel checkbox aangevinkt is
        if(!$form.find(':checkbox').is(':checked'))
        {
            if($form.find('input[name$="actie"]').val() == 'product')
            {
                Dialog.popupDialog('confirmation', window.LANG_KIESMAAT);
            }
            else if($form.find('input[name$="actie"]').val() == 'lookbook')
            {
                Dialog.popupDialog('confirmation', window.LANG_GEENARTIKELENGESELECTEERD);
            }
        }
        else
        {
            // let's disable the inputs for the duration of the ajax request
            $inputs.prop('disabled', 'disabled');

            // fire off the request
            AjaxRequest.request(false, serializedData, 'popuparray');

            $inputs.removeAttr('disabled');
        }
    },
    addToWishlist: function() {
        $ean = $(this).attr('data-ean');
        var extraData = {
            'mode' : 'inVerlangLijstjeZonderMaat',
            'ean' : $ean
        };
        
        AjaxRequest.request(false, extraData, 'popuparray');
    },
    inWinkelMandje: function()
    {        
        var self = ProductPagina;
                
       
        // setup some local variables
        var $form = $('#jq-add-to-cart');
        // let's select and cache all the fields
        $inputs = $form.find('input, select, button, textarea');
        // serialize the data in the form

        // custom checkje of er wel een bestel checkbox aangevinkt is
        if(!$form.find(':checkbox').is(':checked'))
        {
            var extraData = {
                    'mode' : 'geenMaatGeselecteerd'
            };
                    
            serializedData = $form.serialize() + '&' + $.param(extraData);
            
            if($form.find('input[name$="actie"]').val() == 'product')
            {
                AjaxRequest.request(false, serializedData, 'popuparray');
            }
            else if($form.find('input[name$="actie"]').val() == 'lookbook')
            {
                Dialog.popupDialog('confirmation', window.LANG_GEENARTIKELENGESELECTEERD);
            }
        }
        else
        {
            var extraData = {
                    'mode' : 'inWinkelMandje'
            };
                  
            if (typeof($('#jq-sendProductenToGoogle')[0]) == 'object') {
                sendOrderToGoogle($('input[name='+$form.find(':checkbox').val()+'_maat]')[0].value);
            }
            serializedData = $form.serialize() + '&' + $.param(extraData);
                    
            // let's disable the inputs for the duration of the ajax request
            $inputs.prop('disabled', 'disabled');
            
            //sluiten van maat selecteren dialog
            Dialog.popupDialogSluit();            
            
             if($(window).width() < 768){
                    Dialog.popupDialog('confirmation',window.LANG_PRODUCTTOEGEVOEGD);
                    setTimeout(function() {
                        Dialog.popupDialogSluit();
                    }, 2000);
                }
            // fire off the request
            AjaxRequest.request(false, serializedData, self.inWinkelMandjeVerwerk);
             

            $inputs.removeAttr('disabled');
        }
    },
    inWinkelMandjeVerwerk: function(data)
    {
        var data = JSON.parse(data);
        if(data['succes'])
        {
            $.each(data, function(key, value) {
                if (key.match(/#/i)) {
                    $(key).html(value);
                }
            });
            
            WinkelMandjeKlein.animatie();
        }
        if(data['popup'] && data['popup']  != '')
        {
            Dialog.popupDialog('', data['popup']);
        }
    },
    productMaatTabel: function(maattabelid){
        AjaxRequest.request(false, {'mode':'productMaatTabel', 'maattabelid': maattabelid}, 'popuparray');
    },
    productAlleMatenPerFiliaal: function(ean)
    {
        AjaxRequest.request(true, {'mode':'productAlleMatenPerFiliaal', 'ean': ean}, 'popuparray');
    },
    preloadPicture: function() {
        $.each($('.jq-zoomafbeelding a'), function(key,valueObj){
                var picture = $(valueObj).prop('href');
                $('<img/>')[0].src = picture;
            });
    },
    switchPicture: function(e)
    {
        $('#thumbnails a').removeClass('active');
        $(this).addClass('active');
        var Picture = $(this).attr('data-img');
        $('.jq-zoomafbeelding-picture img').prop('src', Picture);
    },
    showPopupZoomImage: function(e){
        e.preventDefault();
        ean = $(this).attr('data-ean');
        AjaxRequest.request(false, {'mode':'productZoomerNieuw', 'ean': ean}, 'popuparray');  
    },
    switchPictureZoomer: function(e)
    {
        var Picture = $(this).find('a').attr('data-img');
        $('.jq-zoomafbeeling-picture img').prop('src', Picture);
    },
    popupPicture: function(e)
    {
        var self = ProductPagina;
        e.preventDefault();
        
        var picture = $(this).prop('href');
        var rel = 'jq-zoomafbeeling-picture';
                
        Dialog.popupDialog('zoompicture', '<a href="javascript:void(0);" class="jq-zoomafbeelding-previous" style="display:none;">'+window.LANG_VORIGE+'</a><img src="'+picture+'" alt="" title="" /><a href="javascript:void(0);" class="jq-zoomafbeelding-next" style="display:none;">'+window.LANG_VOLGENDE+'</a>', false, false, 800);
        
        var pictures = new Array();
        var i = 0;
        var huidigepicture = 0;
        $.each($('.jq-zoomafbeelding').find('a[href][rel='+rel+']'), function(key, valueObj) {
                pictures[i] = $(valueObj).prop('href');
                if(picture === pictures[i])
                {
                    huidigepicture = i;
                }
                i++;
            });
                
        // 500 miliseconde om te laden!
        $('#jq-dialog-message img, #jq-dialog-message .jq-zoomafbeelding-previous, #jq-dialog-message .jq-zoomafbeelding-next').unbind('click');
        var timeoutId = setTimeout(function(){            
                        $('.jq-zoomafbeelding-previous').fadeIn(250).on('click', function(e){
                                self.popupPicturePrevious(huidigepicture, pictures);
                            });
                        $('.jq-zoomafbeelding-next').fadeIn(250).on('click', function(e){
                                self.popupPictureNext(huidigepicture, pictures);
                            });
                        $('#jq-dialog-message img').on('click', function(e){
                                self.popupPictureNext(huidigepicture, pictures);
                            });
                    }, 100);
        $(document).data('timeoutId_zoomafbeelding', timeoutId); 
    },
    productZoomer: function(ean)
    {
         AjaxRequest.request(false, {'mode':'productZoomer', 'ean': ean}, 'popup');
         $('#jq-dialog-box').addClass('zoompicture');
         $('#jq-dialog-overlay').addClass('zoompicture');
    },
    popupPicturePrevious: function(huidigepicture, pictures)
    {
        var self = ProductPagina;
        var previouspicture = huidigepicture-1;
        
        if(!pictures[previouspicture] || pictures[previouspicture] === undefined)
        {
            previouspicture = (pictures.length-1);
        }
                
        $.each(pictures, function(i, picture) {
            if(i === previouspicture)
            {
                $('#jq-dialog-message').html('<a href="javascript:void(0);" class="jq-zoomafbeelding-previous">'+window.LANG_VORIGE+'</a><img src="'+picture+'" alt="" title="" /><a href="javascript:void(0);" class="jq-zoomafbeelding-next">'+window.LANG_VOLGENDE+'</a>').hide().fadeIn('fast');
                return;
            }
        });
        
        $('#jq-dialog-message img, #jq-dialog-message .jq-zoomafbeelding-previous, #jq-dialog-message .jq-zoomafbeelding-next').unbind('click');
        $('#jq-dialog-message .jq-zoomafbeelding-previous').on('click', function(e){
                e.preventDefault();
                self.popupPicturePrevious(previouspicture, pictures);
            });
        $('#jq-dialog-message .jq-zoomafbeelding-next').on('click', function(e){
                e.preventDefault();
                self.popupPictureNext(previouspicture, pictures);
            });
        $('#jq-dialog-message img').on('click', function(e){
                self.popupPictureNext(previouspicture, pictures);
            });
    },
    popupPictureNext: function(huidigepicture, pictures)
    {
        var self = ProductPagina;
        var nextpicture = huidigepicture+1;
        if(pictures[nextpicture] === undefined)
        {
            nextpicture = 0;
        }
        $.each(pictures, function(i, picture) {
            if(i === nextpicture)
            {
                $('#jq-dialog-message').html('<a href="javascript:void(0);" class="jq-zoomafbeelding-previous">'+window.LANG_VORIGE+'</a><img src="'+picture+'" alt="" title="" /><a href="javascript:void(0);" class="jq-zoomafbeelding-next">'+window.LANG_VOLGENDE+'</a>').hide().fadeIn('fast');
                return;
            }
        });
        
        $('#jq-dialog-message img, #jq-dialog-message .jq-zoomafbeelding-previous, #jq-dialog-message .jq-zoomafbeelding-next').unbind('click');
        $('#jq-dialog-message .jq-zoomafbeelding-previous').on('click', function(e){
                e.preventDefault();
                self.popupPicturePrevious(nextpicture, pictures);
            });
        $('#jq-dialog-message .jq-zoomafbeelding-next').on('click', function(e){
                e.preventDefault();
                self.popupPictureNext(nextpicture, pictures);
            });
        $('#jq-dialog-message img').on('click', function(e){
                self.popupPictureNext(nextpicture, pictures);
            });
    },
     MaatadviesPopup: function(){
        var docid = $(this).attr('popup-data');
        var extraData = {
                    'mode' : 'productMaatTabel',
                    'maattabelid': docid
                    };

        AjaxRequest.request(true, extraData, 'popuparray');

    },
    socialShareMailDialog: function(artikelURL)
    {
        AjaxRequest.request(true, {'mode':'socialShareMailForm', 'artikelURL': artikelURL}, 'popuparray')
    },
    socialShareMailVerstuur: function()
    {
        // setup some local variables
        var $form = $('#dialogForm');

        var extraData = {
                    'mode' : 'socialShareMailVerstuur'
                    };

        // let's select and cache all the fields
        $inputs = $form.find('input, select, textarea');

        // serialize the data in the form
        serializedData = $form.serialize() + '&' + $.param(extraData);

        // alle velden valideren..
        if(Formulier.valideer($inputs) == false)
        {
            AjaxRequest.request(true, serializedData, 'popuparray');
        }
        else
        {
            // $('html, body').animate({scrollTop:0}, 'slow');
            var p = $("p.error:first");
            var position = p.offset();
            $('html, body').animate({scrollTop:position.top}, 'slow');
        }        
    },
    productReviewOpslaan: function(e){
        e.preventDefault();

        var extraData = {
            'mode': 'productReviewOpslaan'
        };
        // setup some local variables
        var $form = $(this);
        // let's select and cache all the fields
        $inputs = $form.find('input, select, textarea');
        // serialize the data in the form
        serializedData = $form.serialize() + '&' + $.param(extraData);

        // alle velden valideren..
        if(Formulier.valideer($inputs) == false)
        {
            AjaxRequest.request(true, serializedData, 'popuparray');
            var p = $("#jq-article-reviews");
        }
        else
        {
            // $('html, body').animate({scrollTop:0}, 'slow');
            var p = $("p.error:first");
        }
        
        var position = p.offset();
            $('html, body').animate({
                scrollTop:position.top
                }, 'slow');
    },
    productReviewsHerladen: function(ean, aantal)
    {
        AjaxRequest.request(false, {mode: 'productReviewHerladen', 'ean': ean, 'aantal': aantal}, 'htmlarray');
    },
    wisLaatstBekeken: function()
    {
        // fire off the request to /form.php
        AjaxRequest.request(false, {mode:'wisLaatstBekeken'});
        
        $('#jq-recent-viewed ul').html('<li><p>'+window.LANG_LAATSTBEKEKENWISSEN+'</p</li>');
        //$('#jq-recent-viewed ').append("<p>U heeft de laatst bekeken artikelen gewist.</p>");
        $('#jq-clear-recent-viewed').hide();
    },
    toggleBedrukken: function() {
        $('#jq-shirt #jq-shirt-bedrukken-data').toggle();
    },
    ReserveringLogin: function(){
        var $form = $('#jq-reserveringLogin');
        
        var extraData = {
                    'mode' : 'reserveringLogin'
                    };

        // let's select and cache all the fields
        $inputs = $form.find('input, select, textarea');

        // serialize the data in the form
        serializedData = $form.serialize() + '&' + $.param(extraData);

        // alle velden valideren..
        if(Formulier.valideer($inputs) == false)
        {
            AjaxRequest.request(true, serializedData, 'popuparray');
        }
        else
        {
            // $('html, body').animate({scrollTop:0}, 'slow');
            var p = $("p.error:first");
            var position = p.offset();
            $('html, body').animate({scrollTop:position.top}, 'slow');
        }     
    },
    ReserveringAanmeld: function(){
        var $form = $('#jq-reserveringAanmeld');
        
        var extraData = {
                    'mode' : 'reserveringAanmeld'
                    };

        // let's select and cache all the fields
        $inputs = $form.find('input, select, textarea');

        // serialize the data in the form
        serializedData = $form.serialize() + '&' + $.param(extraData);

        // alle velden valideren..
        if(Formulier.valideer($inputs) == false)
        {
            AjaxRequest.request(true, serializedData, 'popuparray');
        }
        else
        {
            // $('html, body').animate({scrollTop:0}, 'slow');
            var p = $("p.error:first");
            var position = p.offset();
            $('html, body').animate({scrollTop:position.top}, 'slow');
        }     
    },
    popupWinkelVoorraad: function(e)
    {
        e.preventDefault();
        $ean = $(this).attr('data-ean');
        
        AjaxRequest.request(false, {'mode':'popupWinkelVoorraad','ean':$ean}, 'popuparray');
    },
    
    makeResonsiveTables: function () {
        var $tables = $('body').find('table');
        var wrap = $('<div class="responsive-table"/>');

        for (var i = 0; i < $tables.length; i++) {
          var $table = $($tables[i]);
          if ($table.parent('.responsive-table').length === 0) {
              $table.wrap(wrap);
            }
        }
    },
    
    ShowLocationStocks: function(productID, size) {
        
        // Extract location options from select 
        var locations=document.getElementById('voorraadfiliaal').options;
        
        // Iterate locations
        html='';
        for(i=0; i<locations.length; i++) {
            if(i>0) {
                value=locations[i].value;
                name=locations[i].text;
                $('div', $('#jq-filiaalmaten-'+value)).each(function () {
                    text=this.innerHTML;
                    if(text.indexOf(' '+size+':')>-1) {
                        parts=text.split(':');
                        if(parts.length>1) {
                            html+=name+'&nbsp;'+$.trim(parts[1])+'<br />';
                        }
                    }
                });                
            }
        }        
        
        $('#locations-and-stocks').html('');
        if(html>'') {
            $('#locations-and-stocks').html(html);
        }
        $('#showlocationstocks').hide();        
        
        $('#showlocationstocks').on( "mouseenter", function( event ) {
            $('#locations-and-stocks').addClass('active');
        });        
        $('#showlocationstocks').on( "mouseleave", function( event ) {
            $('#locations-and-stocks').removeClass('active');
        });        
    },
    back: function () {
        window.location=document.referrer;
    }
};

$(document).ready(function(){
    ProductPagina.init();    
});