// 2021-02-23 11:03:35

// Lightspeed eCom APPs by © VIEWSION.net
// @license: www.golifeline.nl

if (typeof($vA) === 'undefined') { var $vA = {}; 


// ####################################### Libs / Tools  


$vA.lang=document.documentElement.getAttribute("lang")||"en";var $vT={};$vT.cLoc=window.location,$vT.cLocP=$vT.cLoc.pathname,/\.html$/.test($vT.cLocP)?/\/page([1-9]|[1-9][1-9])\.html/.test($vT.cLocP)?$vT.cPType="catPageNext":$vT.cPType="product":/\/cart\/$/.test($vT.cLocP)?$vT.cPType="cart":/\/checkout\//.test($vT.cLocP)?$vT.cPType="checkout":/\/account\/ordersView\//.test($vT.cLocP)&&($vT.cPType="ordersView"),$vT.Trace=function(c){window.console&&window.console.log("VSNAPP LOG: "+c)},$vT.Log=function(c,e,o,t){$('<img src="https://seoshop.viewsion.net/apps/log/?uid='+c+"&ec="+e+"&ea="+o+"+&el="+t+'">').load()};


// ####################################### Apps  


// Trusted Shops 2.0
$(document).ready((function(){var a=["nl","de","en"],e=$vA.lang.split("-")[0];$.inArray(e,a)>-1?($.ajaxSetup({cache:!0}),$vT.Trace("https://seoshop.viewsion.net/apps/js/c/dc635/trustbadge/vts__"+e+".js?v=1614074615"),$.getScript("https://seoshop.viewsion.net/apps/js/c/dc635/trustbadge/vts__"+e+".js?v=1614074615").done((function(){}))):$vT.Trace("No Trusted Shop ID for this language ("+e+") found!")}));

$(document).ready(function(){ $(".vJsChk").removeClass('vJsChk'); });	

}