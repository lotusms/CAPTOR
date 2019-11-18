/*   
Template Name: Source Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.5
Version: 1.2.0
Author: Sean Ngu
Website: http://www.seantheme.com/source-admin-v1.2/admin/
*/

var handleBootstrapNotificationAlerts = function () {
    $.notify({
        // This portion must feed from a database
        title: 'Case Note Updated',
        message: 'Offender P23000 Contact Uptated',
    }, {
        // settings
        type: 'info',
        delay: 3000,
        template:
            '<div class="col-xs-12 col-sm-2 col-md-2 bs-notify alert alert-{0}" role="alert" data-notify="container">' +
                '<div class="bs-body">' +
                    '<h5 class="title" data-notify="title">{1}</h5>' +
                    '<p class="message" data-notify="message">{2}</p>' +
                '</div>' +
                '<div class="bs-footer">' +
                    '<a class="btn btn-secondary btn-sm btn-round" href="../../pages/enterprise/email_detail.html"><i id="#go-notify" class="fa fa-fw fa-lg ion-link"></i></a>' +
                    '<a class="btn btn-secondary btn-sm btn-round" href="#"><i id="#read-notify" class="fa fa-fw fa-lg ion-eye"></i></a>' +
                    '<a class="btn btn-secondary btn-sm btn-round" href="#"><i id="#del-notify" class="fa fa-fw fa-lg ion-trash-b"></i></a>' +
                '</div>' +
                '<i class="fa fa-close notify-close pull-right" data-notify="dismiss"></i>' +
            '</div>'
    });
};


/* Application Controller
------------------------------------------------ */
var AlertNotifications = function () {
    "use strict";

    return {
        //main function
        init: function () {
            handleBootstrapNotificationAlerts();
        }
    };
}();