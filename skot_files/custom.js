jQuery(document).ready(function($){

    var x = document.referrer;

    function set_cece_cookie() {
        // Set cookie expiration date in 30 days
        var expiration = new Date();
        expiration.setTime(expiration.getTime() + (30*24*60*60*1000));

        document.cookie = "refpartner=projce; expires=" + expiration.toUTCString() + "; path=/";
    }

    // Check if visitor was referred from a projectcece. page
    if (x.indexOf('projectcece.') > -1) {

        // Set cookie if cookies have been accepted   
        set_cece_cookie();

        // Set session variable in case cookies have not been accepted yet
        if (window.sessionStorage){ 
            sessionStorage.setItem("refpartner", "projce");
      }
    }

    // Check if this session was started from projectcece and no cookies
    if (window.sessionStorage){ 
        if (sessionStorage.getItem("refpartner")) {
            if (document.cookie.indexOf('refpartner=projce') < 0) {
                set_cece_cookie();
            }
        }
    }
});
