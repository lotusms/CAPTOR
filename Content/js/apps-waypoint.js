
          

var handleWaypoints = function () {
    "use strict";

    function checkhistory() {
        checkhistory.counter = checkhistory.counter + 1;
    }
    function historypush() {

        if (window.history && window.history.pushState) {
            var ourlocation = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
            window.history.pushState(null, null, './' + ourlocation);


        }
    }

    $(window).on('popstate', function () {
        if (checkhistory.counter > 0) {
            $(".btn-go-back").click();
            checkhistory.counter = 0;
        }
        else {
            window.history.back();
        }
    });

    $(".btn-backpage").click(function () {
        $(window).on('popstate');
    });

    checkhistory.counter = 0;




    $(".btn-go-forward").click(function () {
        historypush();
        var checkhistory_counter = new checkhistory();
    });

 


    $('html,body').scrollTop(top);
    //WAYPOINTS

    $(function () {

        var body = $('#content'),
            nav = $('.btn-waypoint, .btn-go-back'),
            panels = $('#content');

        nav.on('click', function (e) {
            e.preventDefault();
            var dest = $(this).data('panel-link');
            body
              .removeClass(function (index, css) {
                  // remove only classes start with show-
                  // http://stackoverflow.com/questions/2644299/jquery-removeclass-wildcard
                  return (css.match(/\bshow-\S+/g) || []).join(' ');
              })
              .addClass('show-' + dest);

            if (body.hasClass('show-' + dest) === true) {
               /* $('html,body').animate({
                    //scrollTop: $('body').offset().top
                    scrollTop: 0
                },1);*/
               $('html,body').scrollTop(top);
           
            }
        });

    }());

};


/* Application Controller
------------------------------------------------ */
var Waypoints = function () {
    "use strict";

    return {
        //main function
        init: function () {
            handleWaypoints();
        }
    };
}();
