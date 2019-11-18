/*   
Documentation: http://www.seantheme.com/source-admin-v1.2/admin/
*/


/* 17. Custom Dropdowns
------------------------------------------------ */

function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.dropdown > li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}

DropDown.prototype = {
    initEvents: function (e) {
        var obj = this;

        obj.dd.on('click', function (event) {
            $(this).toggleClass('active');
            //event.stopPropagation();
            return false;
        });

        obj.opts.on('click', function () {
            var opt = $(this);
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
        });
    },
    getValue: function () {
        return this.val;
    },
    getIndex: function () {
        return this.index;
    }
}

$(function () {

    $('.custom-dropdown').each(function (index, value) {
        var dd = new DropDown($(value));
    });

    $(document).click(function () {
        // all dropdowns
        $('.wrapper-dropdown-3').removeClass('active');
        // dropdown closes by clicking outside
        $(".custom-dropdown ul").parent().removeClass('active');
    });

});


var handleToggles = function () {
    // only needed for bootstrap:
    $(function jq() {
        var $body = $("body");

        $body.on("change", "label.btn.toggle-radio input[type='radio']", function radioToggleChange() {
            var $radio = $(this);

            $body.find("input[type='radio'][name='" + $radio.attr("name") + "']").parent("label").removeClass("btn-primary").addClass("btn-default");
            $radio.parent("label").removeClass("btn-default").addClass("btn-primary");
        });

        // trigger once to initialize
        $body.find("label.btn.toggle-radio input[type='radio']:checked").trigger("change");
    });
};

var handleFormMaskedInput = function () {
    "use strict";

    $("#masked-input-date").mask("99/99/9999");
    $("#masked-input-phone").mask("(999) 999-9999");
    $("#masked-input-tid").mask("99-9999999");
    $("#masked-input-ssn").mask("999-99-9999");
    $("#masked-input-pno").mask("aaa-9999-a");
    $("#masked-input-pkey").mask("a*-999-a999");
};

var handleJqueryAutocomplete = function() {
    "use strict";

    var availableTags = [
        'THC-Marijuana',
        'COC-Cocaine',
        'MOR-Morphine',
        'AMP-Amphetamines',
        'PCP-PCP',
        'MAM- Monoacetylmorphine (Heroin)',
        'OXY-Oxycodone',
        'BZO-Benzoepenephrine',
        'BUP-Buprenorphine',
        'MTD-Methodone',
        'OPI-Opiates',
        'ALC-Alcohol',
        'BAR-Barbituates',
        'PPX-Propoxyphene (opioid)',
        'ETOH-Ethanol (Alcohol)'
    ];
    $('#jquery-autocomplete').tagit({
        autocomplete: {
            source: availableTags
        },

        beforeTagAdded: function (event, ui) {
            if ($.inArray(ui.tagLabel, availableTags) == -1) {
                return false;
            }
        }
    });
}

var handleTagsInput = function () {
    "use strict";

    $('.bootstrap-tagsinput input').focus(function () {
        $(this).closest('.bootstrap-tagsinput').addClass('bootstrap-tagsinput-focus');
    });
    $('.bootstrap-tagsinput input').focusout(function () {
        $(this).closest('.bootstrap-tagsinput').removeClass('bootstrap-tagsinput-focus');
    });
};

var handleJqueryTagIt = function () {
    "use strict";

    $('#jquery-tagIt-default').tagit({
        availableTags: ["SCI", "CCC/CCF", "Federal", "County", "PBPP"]
    });
};

var handleSelect2 = function () {
    "use strict";

    $(".default-select2").select2();
    $(".multiple-select2").select2({ placeholder: "Select a state" });
};

var handleDatepicker = function () {
    "use strict";

    $('#datepicker-default').datepicker({
        todayHighlight: true
    });
    $('#datepicker-inline').datepicker({
        todayHighlight: true
    });
    $('.input-daterange').datepicker({
        todayHighlight: true
    });
    $('#datepicker-disabled-past').datepicker({
        todayHighlight: true
    });
    $('#datepicker-autoClose').datepicker({
        todayHighlight: true,
        autoclose: true
    });

    $('.date').datepicker({
        todayHighlight: true,
        autoclose: true
    });
};

var handleIonRangeSlider = function () {
    "use strict";

    $('#default_rangeSlider').ionRangeSlider({
        min: 0,
        max: 5000,
        type: 'double',
        prefix: "$",
        maxPostfix: "+",
        prettify: false,
        hasGrid: true
    });
    $('#customRange_rangeSlider').ionRangeSlider({
        min: 1000,
        max: 100000,
        from: 30000,
        to: 90000,
        type: 'double',
        step: 500,
        postfix: " €",
        hasGrid: true
    });
    $('#customValue_rangeSlider').ionRangeSlider({
        values: [
            'January', 'February', 'March',
            'April', 'May', 'June',
            'July', 'August', 'September',
            'October', 'November', 'December'
        ],
        type: 'single',
        hasGrid: true
    });
};

var handleFormTimePicker = function () {
    "use strict";

    $('#timepicker').timepicker();
};

var handleDateRangePicker = function () {
    "use strict";

    $('#default-daterange').daterangepicker({
        opens: 'left',
        format: 'MM/DD/YYYY',
        separator: ' to ',
        startDate: moment().subtract(29, 'days'),
        endDate: moment(),
        minDate: '01/01/2012',
        maxDate: moment(),
    },
    function (start, end) {
        $('#default-daterange input').val(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
    });


    $('#advance-daterange').html(moment().subtract(29, 'days').format('MM/DD/YYYY hh:mm a') + ' - ' + moment().format('MM/DD/YYYY  hh:mm a'));

    $('#advance-daterange').daterangepicker({
        format: 'MM/DD/YYYY hh:mm a',
        startDate: moment().subtract(0, 'days'),
        endDate: moment(),
        //minDate: '01/01/2012',
        maxDate: moment(),
        dateLimit: { days: 60 },
        showDropdowns: true,
        showWeekNumbers: false,
        timePicker: true,
        timePickerIncrement: 5,
        timePicker12Hour: true,
        defaultTime: false,
        opens: 'left',
        drops: 'down',
        autoApply: true,
        buttonClasses: ['btn', 'btn-sm', 'no-icon', 'm-l-0', 'col-xs-12'],
        applyClass: 'btn-default',
        cancelClass: 'btn-secondary',
        separator: ' to ',
        locale: {
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            fromLabel: 'From',
            toLabel: 'To',
            customRangeLabel: 'Custom',
            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            firstDay: 1
        }
    }, function (start, end, label) {
        $('#advance-daterange').html(start.format('MM/DD/YYYY hh:mm a') + ' - ' + end.format('MM/DD/YYYY hh:mm a'));
    });

};

var handleDateTimePicker = function () {
    "use strict";

    $('#datetimepicker1').datetimepicker();
    $('#datetimepicker2').datetimepicker({
        format: 'LT'
    });
    $('#datetimepicker3').datetimepicker();
    $('#datetimepicker4').datetimepicker();
    $("#datetimepicker3").on("dp.change", function (e) {
        $('#datetimepicker4').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepicker4").on("dp.change", function (e) {
        $('#datetimepicker3').data("DateTimePicker").maxDate(e.date);
    });
};



/* Application Controller
------------------------------------------------ */

var FormPlugins = function () {
    "use strict";

    return {
        init: function () {
            handleToggles();
            handleDateTimePicker();
            handleDateRangePicker();
            handleDatepicker();
            //handleFormMaskedInput();
            handleJqueryAutocomplete();
            handleTagsInput();
            handleJqueryTagIt();
            //handleSelect2();
        }
    };
}();
