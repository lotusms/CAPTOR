/*   
Documentation: http://www.seantheme.com/source-admin-v1.2/admin/
*/


var nice;


/* 01. Handle Sidebar - Menu
------------------------------------------------ */
var handleSidebarMenu = function () {
    "use strict";

    $('.sidebar .nav > .has-sub > a').click(function () {
        var target = $(this).next('.sub-menu');
        var otherMenu = '.sidebar .nav > li.has-sub > .sub-menu';

        if ($('.page-sidebar-minified').length === 0) {
            $(otherMenu).not(target).slideUp(250, function () {
                $(this).closest('li').removeClass('expand');
            });
            $(target).slideToggle(250, function () {
                var targetLi = $(this).closest('li');
                if ($(targetLi).hasClass('expand')) {
                    $(targetLi).removeClass('expand');
                } else {
                    $(targetLi).addClass('expand');
                }
            });
        }
    });
    $('.sidebar .nav > .has-sub .sub-menu li.has-sub > a').click(function () {
        if ($('.page-sidebar-minified').length === 0) {
            var target = $(this).next('.sub-menu');
            $(target).slideToggle(250);
        }
    });
};


/* 02. Handle Sidebar - Mobile View Toggle
------------------------------------------------ */
var handleMobileSidebarToggle = function () {
    "use strict";
    var sidebarProgress = false;
    $('.sidebar').bind('click touchstart', function (e) {
        if ($(e.target).closest('.sidebar').length !== 0) {
            sidebarProgress = true;
        } else {
            sidebarProgress = false;
            e.stopPropagation();
        }
    });

    $(document).bind('click touchstart', function (e) {
        if ($(e.target).closest('.sidebar').length === 0) {
            sidebarProgress = false;
        }
        if (!e.isPropagationStopped() && sidebarProgress !== true) {
            if ($('#page-container').hasClass('page-sidebar-toggled')) {
                sidebarProgress = true;
                $('#page-container').removeClass('page-sidebar-toggled');
            }
            if ($(window).width() <= 767) {
                if ($('#page-container').hasClass('page-right-sidebar-toggled')) {
                    sidebarProgress = true;
                    $('#page-container').removeClass('page-right-sidebar-toggled');
                }
            }
        }
    });

    $('[data-click=right-sidebar-toggled]').click(function (e) {
        e.stopPropagation();
        var targetContainer = '#page-container';
        var targetClass = 'page-right-sidebar-toggled';

        if ($(targetContainer).hasClass(targetClass)) {
            $(targetContainer).removeClass(targetClass);
            console.log("class removed");
        } else if (sidebarProgress !== true) {
            $(targetContainer).addClass(targetClass);
            console.log("class added");
        } else {
            sidebarProgress = false;
        }
    });

    $('[data-click=sidebar-toggled]').click(function (e) {
        e.stopPropagation();
        var sidebarClass = 'page-sidebar-toggled';
        var targetContainer = '#page-container';

        if ($(targetContainer).hasClass(sidebarClass)) {
            $(targetContainer).removeClass(sidebarClass);
        } else if (sidebarProgress !== true) {
            $(targetContainer).addClass(sidebarClass);
        } else {
            sidebarProgress = false;
        }
        if ($(window).width() < 1200) {
            $('#page-container').removeClass('page-right-sidebar-toggled');
        }
    });
};


/* 03. Handle Sidebar - Minify / Expand
------------------------------------------------ */
var handleSidebarMinify = function () {
    "use strict";
    $('[data-click=sidebar-minify]').click(function (e) {
        e.preventDefault();
        var sidebarClass = 'page-sidebar-minified';
        var targetContainer = '#page-container';
        $('#sidebar [data-scrollbar="true"]').css('margin-top', '0');
        $('#sidebar [data-scrollbar="true"]').removeAttr('data-init');
        $('#sidebar [data-scrollbar=true]').stop();
        if ($(targetContainer).hasClass(sidebarClass)) {
            $(targetContainer).removeClass(sidebarClass);
            if ($(targetContainer).hasClass('page-sidebar-fixed')) {
                if ($('#sidebar .slimScrollDiv').length !== 0) {
                    $('#sidebar [data-scrollbar="true"]').slimScroll({ destroy: true });
                    $('#sidebar [data-scrollbar="true"]').removeAttr('style');
                }
                generateSlimScroll($('#sidebar [data-scrollbar="true"]'));
                $('#sidebar [data-scrollbar=true]').trigger('mouseover');
            } else if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                if ($('#sidebar .slimScrollDiv').length !== 0) {
                    $('#sidebar [data-scrollbar="true"]').slimScroll({ destroy: true });
                    $('#sidebar [data-scrollbar="true"]').removeAttr('style');
                }
                generateSlimScroll($('#sidebar [data-scrollbar="true"]'));
            }
        } else {
            $(targetContainer).addClass(sidebarClass);

            if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                if ($(targetContainer).hasClass('page-sidebar-fixed')) {
                    $('#sidebar [data-scrollbar="true"]').slimScroll({ destroy: true });
                    $('#sidebar [data-scrollbar="true"]').removeAttr('style');
                }
                $('#sidebar [data-scrollbar=true]').trigger('mouseover');
            } else {
                $('#sidebar [data-scrollbar="true"]').css('overflow', 'visible');
            }
        }
        $(window).trigger('resize');
    });
};


/* 04. Handle Sidebar - Mobile Scrolling Feature
------------------------------------------------ */
var handleMobileSidebar = function () {
    "use strict";
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if ($('#page-container').hasClass('page-sidebar-minified')) {
            $('#sidebar [data-scrollbar="true"]').css('overflow', 'visible');
            $('.page-sidebar-minified #sidebar [data-scrollbar="true"]').slimScroll({ destroy: true });
            $('.page-sidebar-minified #sidebar [data-scrollbar="true"]').removeAttr('style');
            $('.page-sidebar-minified #sidebar [data-scrollbar=true]').trigger('mouseover');
        }
    }

    var oriTouch = 0;
    $('.page-sidebar-minified .sidebar [data-scrollbar=true] a').bind('touchstart', function (e) {
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        var touchVertical = touch.pageY;
        oriTouch = touchVertical - parseInt($(this).closest('[data-scrollbar=true]').css('margin-top'));
    });

    $('.page-sidebar-minified .sidebar [data-scrollbar=true] a').bind('touchmove', function (e) {
        e.preventDefault();
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            var touchVertical = touch.pageY;
            var elementTop = touchVertical - oriTouch;

            $(this).closest('[data-scrollbar=true]').css('margin-top', elementTop + 'px');
        }
    });

    $('.page-sidebar-minified .sidebar [data-scrollbar=true] a').bind('touchend', function (e) {
        var targetScrollBar = $(this).closest('[data-scrollbar=true]');
        var windowHeight = $(window).height();
        var sidebarTopPosition = parseInt($('#sidebar').css('top'));
        var sidebarContainerHeight = $('#sidebar').height();
        oriTouch = $(targetScrollBar).css('margin-top');

        var sidebarHeight = sidebarTopPosition;
        $('.sidebar').not('.sidebar-right').find('.nav').each(function () {
            sidebarHeight += $(this).height();
        });
        var finalHeight = -parseInt(oriTouch) + $('.sidebar').height();
        if (finalHeight >= sidebarHeight && windowHeight <= sidebarHeight && sidebarContainerHeight <= sidebarHeight) {
            var finalMargin = windowHeight - sidebarHeight - 20;
            $(targetScrollBar).animate({ marginTop: finalMargin + 'px' });
        } else if (parseInt(oriTouch) >= 0 || sidebarContainerHeight >= sidebarHeight) {
            $(targetScrollBar).animate({ marginTop: '0px' });
        } else {
            finalMargin = oriTouch;
            $(targetScrollBar).animate({ marginTop: finalMargin + 'px' });
        }
        return true;
    });
};


/* 05. Handle Sidebar - Clear Sidebar Selection
------------------------------------------------ */
var handleClearSidebarSelection = function () {
    $('.sidebar .nav > li, .sidebar .nav .sub-menu').removeClass('expand').removeAttr('style');
};

var handleClearSidebarMobileSelection = function () {
    $('#page-container').removeClass('page-sidebar-toggled');
};


/* 06. Handle Top Menu - Unlimited Top Menu Render
------------------------------------------------ */
var handleUnlimitedTopMenuRender = function () {
    "use strict";
    // function handle menu button action - next / prev
    function handleMenuButtonAction(element, direction) {
        var obj = $(element).closest('.nav');
        var marginLeft = parseInt($(obj).css('margin-left'));
        var containerWidth = $('.top-menu').width() - 88;
        var totalWidth = 0;
        var finalScrollWidth = 0;

        $(obj).find('li').each(function () {
            if (!$(this).hasClass('menu-control')) {
                totalWidth += $(this).width();
            }
        });

        switch (direction) {
            case 'next':
                var widthLeft = totalWidth + marginLeft - containerWidth;
                if (widthLeft <= containerWidth) {
                    finalScrollWidth = widthLeft - marginLeft + 128;
                    setTimeout(function () {
                        $(obj).find('.menu-control.menu-control-right').removeClass('show');
                    }, 150);
                } else {
                    finalScrollWidth = containerWidth - marginLeft - 128;
                }

                if (finalScrollWidth != 0) {
                    $(obj).animate({ marginLeft: '-' + finalScrollWidth + 'px' }, 150, function () {
                        $(obj).find('.menu-control.menu-control-left').addClass('show');
                    });
                }
                break;
            case 'prev':
                var widthLeft = -marginLeft;

                if (widthLeft <= containerWidth) {
                    $(obj).find('.menu-control.menu-control-left').removeClass('show');
                    finalScrollWidth = 0;
                } else {
                    finalScrollWidth = widthLeft - containerWidth + 88;
                }
                $(obj).animate({ marginLeft: '-' + finalScrollWidth + 'px' }, 150, function () {
                    $(obj).find('.menu-control.menu-control-right').addClass('show');
                });
                break;
        }
    }

    // handle page load active menu focus
    function handlePageLoadMenuFocus() {
        var targetMenu = $('.top-menu .nav');
        var targetList = $('.top-menu .nav > li');
        var targetActiveList = $('.top-menu .nav > li.active');
        var targetContainer = $('.top-menu');

        var marginLeft = parseInt($(targetMenu).css('margin-left'));
        var viewWidth = $(targetContainer).width() - 128;
        var prevWidth = $('.top-menu .nav > li.active').width();
        var speed = 0;
        var fullWidth = 0;

        $(targetActiveList).prevAll().each(function () {
            prevWidth += $(this).width();
        });

        $(targetList).each(function () {
            if (!$(this).hasClass('menu-control')) {
                fullWidth += $(this).width();
            }
        });

        if (prevWidth >= viewWidth) {
            var finalScrollWidth = prevWidth - viewWidth + 128;
            $(targetMenu).animate({ marginLeft: '-' + finalScrollWidth + 'px' }, speed);
        }

        if (prevWidth != fullWidth && fullWidth >= viewWidth) {
            $(targetMenu).find('.menu-control.menu-control-right').addClass('show');
        } else {
            $(targetMenu).find('.menu-control.menu-control-right').removeClass('show');
        }

        if (prevWidth >= viewWidth && fullWidth >= viewWidth) {
            $(targetMenu).find('.menu-control.menu-control-left').addClass('show');
        } else {
            $(targetMenu).find('.menu-control.menu-control-left').removeClass('show');
        }
    }

    // handle menu next button click action
    $('[data-click="next-menu"]').click(function (e) {
        e.preventDefault();
        handleMenuButtonAction(this, 'next');
    });

    // handle menu prev button click action
    $('[data-click="prev-menu"]').click(function (e) {
        e.preventDefault();
        handleMenuButtonAction(this, 'prev');

    });

    // handle unlimited menu responsive setting
    $(window).resize(function () {
        $('.top-menu .nav').removeAttr('style');
        handlePageLoadMenuFocus();
    });

    handlePageLoadMenuFocus();
};


/* 07. Handle Top Menu - Sub Menu Toggle
------------------------------------------------ */
var handleTopMenuSubMenu = function () {
    "use strict";
    $('.top-menu .sub-menu .has-sub > a').click(function () {
        var target = $(this).closest('li').find('.sub-menu').first();
        var otherMenu = $(this).closest('ul').find('.sub-menu').not(target);
        $(otherMenu).not(target).slideUp(250, function () {
            $(this).closest('li').removeClass('expand');
        });
        $(target).slideToggle(250, function () {
            var targetLi = $(this).closest('li');
            if ($(targetLi).hasClass('expand')) {
                $(targetLi).removeClass('expand');
            } else {
                $(targetLi).addClass('expand');
            }
        });
    });
};


/* 08. Handle Top Menu - Mobile Sub Menu Toggle
------------------------------------------------ */
var handleMobileTopMenuSubMenu = function () {
    "use strict";
    $('.top-menu .nav > li.has-sub > a').click(function () {
        if ($(window).width() <= 1000) {
            var target = $(this).closest('li').find('.sub-menu').first();
            var otherMenu = $(this).closest('ul').find('.sub-menu').not(target);
            $(otherMenu).not(target).slideUp(250, function () {
                $(this).closest('li').removeClass('expand');
            });
            $(target).slideToggle(250, function () {
                var targetLi = $(this).closest('li');
                if ($(targetLi).hasClass('expand')) {
                    $(targetLi).removeClass('expand');
                } else {
                    $(targetLi).addClass('expand');
                }
            });
        }
    });
};


/* 09. Handle Top Menu - Mobile Top Menu Toggle
------------------------------------------------ */
var handleTopMenuMobileToggle = function () {
    "use strict";
    $('[data-click="top-menu-toggled"]').click(function () {
        $('.top-menu').slideToggle(250);
    });
};


/* 11. Handle Plugins - Bootstrap Tooltip & Popover
------------------------------------------------ */
var handleTooltipInit = function () {
    "use strict";
    if ($('[data-toggle="tooltip"]').length !== 0) {
        $('[data-toggle="tooltip"]').tooltip();
    }
};

var handlePopoverInit = function () {
    if ($('[data-toggle="popover"]').length !== 0) {
        $('[data-toggle="popover"]').popover();
    }
};



/* 12. Handle Page Load - Show Content
------------------------------------------------ */
var handlePageLoad = function () {
    "use strict";
    $('#page-loader').addClass('hide');
    $('#page-container').addClass('in');

    $('.page2').css('visibility', 'hidden');
    $('[data-panel-link]').on('click', function () {

        var dest = $(this).data('panel-link');
        //$('.page2').css('display', 'inline');
        $('.page2').parent('#content').addClass('show-' + dest);
        $('.page2').css('visibility', 'visible');
    });

   $("html").niceScroll({
        disableoutline: true,
        cursorborder: "none",
        autohidemode: false,
        zindex: "auto" | 89999
    }).resize();
   $(".scroll-default").niceScroll({ autohidemode: false }).resize();
    $("#sidebar-right").niceScroll({
        disableoutline: true,
        cursorborder: "none",
        autohidemode: false,
        zindex: "auto" | 99999
    }).resize();
    $(".scroll-default").niceScroll({ autohidemode: false }).resize();

    
    $(".yearselect").niceScroll({
        disableoutline: false,
        cursorborder: "none",
    });

    nice = $("html").getNiceScroll();
    nice = $("#sidebar-right").getNiceScroll();
    
    nice = $(".monthselect").getNiceScroll();
    nice = $(".yearselect").getNiceScroll();
    nice.hide();


    $("html").backstretch("../Content/img/main-banner.png");
    $("html").backstretch("../../Content/img/main-banner.png");
    $("html").backstretch("../../../Content/img/main-banner.png");

    (function ($) {
        var $window = $(window),
            $container = $('#page-container');

        function resize() {
            if ($window.width() <= 1400) {
                return $container.removeClass('page-right-sidebar-toggled') && $container.addClass('page-sidebar-minified');

            }

        }

        $window
            .resize(resize)
            .trigger('resize');
    })(jQuery);

    /* Disables backspace key when outside of a form field
    ------------------------------------------------ */
    $(document).keydown(function (e) {
        var element = e.target.nodeName.toLowerCase();
        if ((element != 'input' && element != 'textarea') || $(e.target).attr("readonly") || (e.target.getAttribute("type") === "checkbox")) {
            if (e.keyCode === 8) {
                return false;
            }
        }
    });

};


/* 13. Handle Scroll To Top
------------------------------------------------ */
var handleScrollToTopButton = function () {
    "use strict";
    $('[data-click=scroll-top]').click(function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('body').offset().top
        }, 500);
    });
};



/* 15. Handle Theme - Color Theme Changing
------------------------------------------------ */
var handleThemePanel = function () {
    "use strict";

    $('[data-click="page-theme-selector"]').click(function (e) {
        e.preventDefault();

        var targetClass = $(this).attr('data-value');
        var targetContainer = 'body';
        var targetRemoveClass = $(targetContainer).attr('data-current-theme');

        if (!targetRemoveClass) {
            targetRemoveClass = '';
        }
        $('[data-click="page-theme-selector"]').not(this).closest('li').removeClass('active');
        $(this).closest('li').addClass('active');
        $(targetContainer).removeClass(targetRemoveClass);
        $(targetContainer).addClass(targetClass);
        $(targetContainer).attr('data-current-theme', targetClass);

        $.cookie('page-theme', targetClass);
    });

};


/* 16. Handle Theme - Page Load Theme Select
------------------------------------------------ */

var handlePageLoadThemeSelect = function () {
    "use strict";

    if ($.cookie && $.cookie('page-theme')) {
        if ($('body').length !== 0) {
            var targetClass = $.cookie('page-theme');
            var targetContainer = 'body';
            var targetRemoveClass = $(targetContainer).attr('data-current-theme');
            var targetLi = '[data-click="page-theme-selector"][data-value="' + targetClass + '"]';

            if (!targetRemoveClass) {
                targetRemoveClass = 'navbar-default';
            }
            $('[data-click="page-theme-selector"]').not(targetLi).closest('li').removeClass('active');
            $(targetLi).closest('li').addClass('active');
            $(targetContainer).removeClass(targetRemoveClass);
            $(targetContainer).addClass(targetClass);
            $(targetContainer).attr('data-current-theme', targetClass);
        }
    }

};


/* 18. Handle Header - Dropdown Set Message Status
------------------------------------------------ */

$('[data-click="set-message-status"]').on('click', function (e) {
    e.stopPropagation();
    e.preventDefault();

    var status = $(this).attr('data-status');
    var tooltipText = status === 'read' ? 'Mark as Unread' : 'Mark as Read';
    var newStatus = status === 'read' ? 'unread' : 'read';
    $(this).toggleClass('read', status !== 'read').attr('data-status', newStatus);
    $(this).prevAll('.media').first().toggleClass('bg-success', status !== 'read').attr('data-status', newStatus);

    $(this).tooltip('hide').attr('data-original-title', tooltipText).tooltip('fixTitle');
});

$('[data-click="set-message-status"]').each(function () {
    $(this).tooltip();
});


/* 19. Handle Header - Notification Read Status
------------------------------------------------ */
var handleNotificationClicked = function () {
    "use strict";

    $('[data-click="toggle-notify"]').on('click', function () {
        $(this).addClass('read');
    });

};


/* 20. Handle Right Sidebar - Calendar Render
------------------------------------------------ */
var handleScheduleCalendar = function () {
    "use strict";

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dayNames = ["S", "M", "T", "W", "T", "F", "S"];

    var now = new Date(),
        month = now.getMonth() + 1,
        year = now.getFullYear();

    var events = [
        //[
        //    '4/' + month + '/' + year,
        //    'Client Meeting',
        //    '#',
        //    '#17B6A4',
        //    '<address class="m-b-0 text-inverse f-s-12">' +
        //    '   <strong>Twitter, Inc.</strong><br />' +
        //    '   795 Folsom Ave, Suite 600<br />' +
        //    '   San Francisco, CA 94107 <br />' +
        //    '   P: (123) 456-7890' +
        //    '</address>'
        //],
        //[
        //    '7/' + month + '/' + year,
        //    'Bootstrap.com',
        //    'http://www.getbootstrap.com',
        //    '#30373e'
        //],
        //[
        //    '18/' + month + '/' + year,
        //    'Popover with HTML Content',
        //    '#',
        //    '#30373e',
        //    'Some contents here <div class="text-right"><a href="http://www.google.com">view more >>></a></div>'
        //]
    ];
    var calendarTarget = $('#schedule-calendar');
    $(calendarTarget).calendar({
        months: monthNames,
        days: dayNames,
        events: events,
        tooltip_options: {
            placement: 'top',
            html: true,
            container: 'body'
        },
        popover_options: {
            placement: 'top',
            html: true,
            container: 'body'
        }
    });
};



/* 22. Handle Calendar
------------------------------------------------ */

$('#external-events .fc-event').each(function () {
    $(this).data('event', {
        title: $.trim($(this).text()), // use the element's text as the event title
        stick: true // maintain when user navigates (see docs on the renderEvent method)
    });
    $(this).draggable({
        zIndex: 999,
        revert: true,      // will cause the event to go back to its
        revertDuration: 0  //  original position after the drag
    });
});

var date = new Date();
var currentYear = date.getFullYear();
var currentMonth = date.getMonth() + 1;
currentMonth = (currentMonth < 10) ? '0' + currentMonth : currentMonth;

$('#calendar').fullCalendar({
    header: {
        left: 'month,agendaWeek,agendaDay',
        center: 'title',
        right: 'prev,today,next '
    },
    droppable: true, // this allows things to be dropped onto the calendar
    drop: function () {
        $(this).remove();
    },
    selectable: true,
    selectHelper: true,
    select: function (start, end) {
        var title = prompt('Event Title:');
        var eventData;
        if (title) {
            eventData = {
                title: title,
                start: start,
                end: end
            };
            $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
        }
        $('#calendar').fullCalendar('unselect');
    },
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: [
        //{
        //    title: 'All Day Event',
        //    start: currentYear + '-' + currentMonth + '-01'
        //}, {
        //    title: 'Long Event',
        //    start: currentYear + '-' + currentMonth + '-07',
        //    end: currentYear + '-' + currentMonth + '-10'
        //}, {
        //    id: 999,
        //    title: 'Repeating Event',
        //    start: currentYear + '-' + currentMonth + '-09T16:00:00'
        //}, {
        //    id: 999,
        //    title: 'Repeating Event',
        //    start: currentYear + '-' + currentMonth + '-16T16:00:00'
        //}, {
        //    title: 'Conference',
        //    start: currentYear + '-' + currentMonth + '-11',
        //    end: currentYear + '-' + currentMonth + '-13'
        //}, {
        //    title: 'Meeting',
        //    start: currentYear + '-' + currentMonth + '-12T10:30:00',
        //    end: currentYear + '-' + currentMonth + '-12T12:30:00'
        //}, {
        //    title: 'Lunch',
        //    start: currentYear + '-' + currentMonth + '-12T12:00:00'
        //}, {
        //    title: 'Meeting',
        //    start: currentYear + '-' + currentMonth + '-12T14:30:00'
        //}, {
        //    title: 'Happy Hour',
        //    start: currentYear + '-' + currentMonth + '-12T17:30:00'
        //}, {
        //    title: 'Dinner',
        //    start: currentYear + '-' + currentMonth + '-12T20:00:00'
        //}, {
        //    title: 'Birthday Party',
        //    start: currentYear + '-' + currentMonth + '-13T07:00:00'
        //}, {
        //    title: 'Click for Google',
        //    url: 'http://google.com/',
        //    start: currentYear + '-' + currentMonth + '-28'
        //}
    ]

});


/* Application Controller
------------------------------------------------ */

var App = function () {
    "use strict";

    return {
        initSidebar: function () {
            handleSidebarMenu();
            handleMobileSidebarToggle();
            handleSidebarMinify();
            handleMobileSidebar();
        },
        initSidebarSelection: function () {
            handleClearSidebarSelection();
        },
        initSidebarMobileSelection: function () {
            handleClearSidebarMobileSelection();
        },
        initTopMenu: function () {
            handleUnlimitedTopMenuRender();
            handleTopMenuSubMenu();
            handleMobileTopMenuSubMenu();
            handleTopMenuMobileToggle();
        },
        initComponent: function () {
            handleTooltipInit();
            handlePopoverInit();
        },
        initPageLoad: function () {
            handlePageLoad();
        },
        init: function () {
            this.initTopMenu();
            this.initSidebar();
            this.initComponent();
            this.initPageLoad();
            handlePageLoadThemeSelect();
            handleThemePanel();
            //handleBootstrapNotificationAlerts();
        },
        initCalendar: function () {
            handleScheduleCalendar();
            handleCalendar();
        },
        scrollTop: function () {
            $('html, body').animate({
                scrollTop: $('body').offset().top
            }, 0);
        },
        initThemePanel: function () {
            handleThemePanel();
            handlePageLoadThemeSelect();
        },
        initRightSidebar: function () {
            handleScheduleCalendar();
        }
    };
}();
