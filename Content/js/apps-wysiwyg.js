/*   
Documentation: http://www.seantheme.com/source-admin-v1.2/admin/
*/


var handleTinyMCE = function () {
    "use strict";
  
    var max_chars = 5000; //max characters
    var max_for_html = 300; //max characters for html tags
    var allowed_keys = [16, 17, 18, 20, 33, 34, 35, 36, 37, 38, 39, 40, 46];
    var chars_without_html, chars_with_html = 0;
    function checkspace() {
        checkspace.counter = checkspace.counter + 1;
    }
    function checkenter() {
        checkenter.counter = checkenter.counter + 1;
    }
    function removespace() {
        removespace.counter = removespace.counter + 1;
    }


    checkspace.counter = 0;
    checkenter.counter = 0;
    removespace.counter = 0;

    $(function () {
        tinymce.init({
            selector: ".tinymce",
            theme: "modern", 
            skin: 'captor',
            plugins: "wordcount",
            wordcount_cleanregex: /[0-9.(),;:!?%#$?\x27\x22_+=\\/\-]*/g,
            menubar: false,

            setup: function (ed) {
                ed.on("KeyDown", function (ed, evt) {
                    chars_without_html = $.trim(tinyMCE.activeEditor.getContent().replace(/(<([^>]+)>)/ig, "")).length;
                    var findout = $.trim(tinyMCE.activeEditor.getContent().replace(/(<([^>]+)>)/ig, ""));
                    console.log(findout);
                    var removespace_value = $.trim(tinyMCE.activeEditor.getContent().replace(/(<([^>]+)>)/ig, "")).slice(-6);
                    console.log(removespace_value);
                    if ((removespace_value == "&nbsp;") && (ed.keyCode == 8 || ed.keyCode == 46))
                    {      
                        var removespace_counter = new removespace();
                    }
                    if (removespace.counter > 0) {
                        chars_without_html = chars_without_html - 5;
                        removespace.counter = 0;
                    }

                  
                    if (checkspace.counter > 0) {
                        if (chars_without_html > 5) {
                            chars_without_html = chars_without_html - 5;
                        }
                        if (chars_without_html == 4) {
                            chars_without_html = 4;
                        }
                        if (chars_without_html == 3) {
                            chars_without_html = 3;
                        }
                        if (chars_without_html == 2) {
                            chars_without_html = 2;
                        }
                        if (chars_without_html == 1) {
                            chars_without_html = 1;
                        }
                        if (chars_without_html == 0) {
                            chars_without_html = 1;
                        }
                        checkspace.counter = 0;
                    }
                    if (ed.keyCode == 32)
                    {
                        var checkspace_counter = new checkspace();
                    }
                    if (checkenter.counter > 0) {
                        if (chars_without_html > 5) {
                            chars_without_html = chars_without_html - 6;
                        }
                        if (chars_without_html == 5) {
                            chars_without_html = 5;
                        }
                        if (chars_without_html == 4) {
                            chars_without_html = 4;
                        }
                        if (chars_without_html == 3) {
                            chars_without_html = 3;
                        }
                        if (chars_without_html == 2) {
                            chars_without_html = 2;
                        }
                        if (chars_without_html == 1) {
                            chars_without_html = 1;
                        }
                        if (chars_without_html == 0) {
                            chars_without_html = 1;
                        }
                        checkenter.counter = 0;
                    }
                    if (ed.keyCode == 13) {
                        var checkenter_counter = new checkenter();
                    }
                    

                   
                    chars_with_html = tinyMCE.activeEditor.getContent().length;
                   var chars_whitespace = tinyMCE.activeEditor.getContent().replace(' ', "X").length;
                   console.log("chars_with_html: " + chars_with_html + " chars_whitespace: " + chars_whitespace + " chars_without_html: " + chars_without_html);
                    var key = ed.keyCode;
                    if ((chars_without_html > 4995) && key == 32) {
                        $('.counter').html(0 + " of " + max_chars + " characters remaining");
                    }
                    
                    else if ((chars_without_html <= 1) && (key ==8 || key == 46) ) {
                        $('.counter').html(0 + " of " + max_chars + " characters remaining");
                    }
                    else if (chars_without_html == 0) {
                        $('.counter').html(4999 + " of " + max_chars + " characters remaining");
                    }

                    else if ((chars_without_html > 5000) && key == 8) {
                        $('.counter').html(1 + " of " + max_chars + " characters remaining");
                    }
                    else if ((chars_without_html > 5000) && key == 46) {
                        $('.counter').html(1 + " of " + max_chars + " characters remaining");
                    }
                    else if ((chars_without_html > 4994) && key == 13) {
                        chars_without_html = 4995;
                        $('.counter').html(0 + " of " + max_chars + " characters remaining");
                    }
                    
                    else if (key == 8 || key == 46) {
                        $('.counter').html(max_chars - chars_without_html + 1 + " of " + max_chars + " characters remaining");
                    }
                    else if ((chars_without_html >= 4999) && (key == 8 || key == 46)) {
                        $('.counter').html(max_chars - chars_without_html - 2 + " of " + max_chars + " characters remaining");
                    }
                    else if (chars_without_html > 4999) {
                        $('.counter').html(0 + " of " + max_chars + " characters remaining");
                    }

                    else {
                        $('.counter').html(max_chars - chars_without_html - 1 + " of " + max_chars + " characters remaining");
                    }
                    if (allowed_keys.indexOf(key) != -1) {
                     

                        if ((chars_without_html > (max_chars - 5)) && (key == 8 || key == 46 )) {
                            $('.counter').css('color', '#AB2B3B'); //danger color
                        }else if ((chars_without_html > (max_chars - 6)) && (key == 8 || key == 46)) {
                            $('.counter').css('color', '#F8971D'); //warning color
                        }else if ((chars_without_html > (max_chars - 7)) && (key == 8 || key == 46)) {
                            $('.counter').css('color', '#F8971D'); //warning color
                        } 
						else if ((chars_without_html > (max_chars - 7)) && (key != 8 || key != 46)) {
						    $('.counter').css('color', '#AB2B3B'); //danger color
                        } 
						else if ((chars_without_html > (max_chars - 25)) && (key == 8 || key == 46)) {
						    $('.counter').css('color', '#F8971D'); //warning color
                             console.log("yellow limit");
                        }else if ((chars_without_html > (max_chars - 26)) && (key == 8 || key == 46)) {
                            $('.counter').css('color', '#bbbbbb'); //normal color
                             console.log("yellow limit");
                        }else if ((chars_without_html > (max_chars - 27)) && (key == 8 || key == 46)) {
                            $('.counter').css('color', '#bbbbbb'); //normal color
                             console.log("yellow limit");
                        }
                        else if ((chars_without_html > (max_chars - 27))  && (key != 8 || key != 46 )) {
                            $('.counter').css('color', '#F8971D'); //warning color
                        }  else {
                            $('.counter').css('color', '#bbbbbb'); //normal color
                        }
                        
                        return;
                    }

                    if (chars_with_html > (max_chars + max_for_html)) {
                        ed.stopPropagation();
                        ed.preventDefault();
                    } else if (chars_without_html > max_chars - 1 && key != 8 && key != 46) {
                        return false;
                    }
                    


                    if ((chars_without_html > (max_chars - 5)) && (key == 8 || key == 46 )) {
                        $('.counter').css('color', '#AB2B3B'); //danger color
                    }else if ((chars_without_html > (max_chars - 6)) && (key == 8 || key == 46)) {
                        $('.counter').css('color', '#F8971D'); //warning color
                        }else if ((chars_without_html > (max_chars - 7)) && (key == 8 || key == 46)) {
                            $('.counter').css('color', '#F8971D'); //warning color
                        } 
						else if ((chars_without_html > (max_chars - 7)) && (key != 8 || key != 46)) {
						    $('.counter').css('color', '#AB2B3B'); //danger color
                        } 
						else if ((chars_without_html > (max_chars - 25)) && (key == 8 || key == 46)) {
						    $('.counter').css('color', '#F8971D'); //warning color
                        }else if ((chars_without_html > (max_chars - 26)) && (key == 8 || key == 46)) {
                            $('.counter').css('color', '#bbbbbb'); //normal color
                        }else if ((chars_without_html > (max_chars - 27)) && (key == 8 || key == 46)) {
                            $('.counter').css('color', '#bbbbbb'); //normal color
                        }
                        else if ((chars_without_html > (max_chars - 27))  && (key != 8 || key != 46 )) {
                            $('.counter').css('color', '#F8971D'); //warning color
                        }  else {
                            $('.counter').css('color', '#bbbbbb'); //normal color
                        }
                   
                });
            },

            toolbar: "bold italic underline",
            style_formats: [
                {title: 'Bold text', inline: 'b'},
                //{title: 'Red text', inline: 'span', styles: {color: '#ff0000'}},
                //{title: 'Red header', block: 'h1', styles: {color: '#ff0000'}},
                {title: 'Example 1', inline: 'span', classes: 'example1'},
                {title: 'Example 2', inline: 'span', classes: 'example2'},
                {title: 'Table styles'},
                {title: 'Table row 1', selector: 'tr', classes: 'tablerow1'}
            ]
        });

        
    });


    $(function () {
        tinymce.init({
            selector: ".tinymcedisabled",
            theme: "modern", 
            skin: 'captor',
            menubar: false,
            readonly : true,
            toolbar: 'false',

            setup: function (ed) {
                ed.on("KeyDown", function (ed, evt) {
                    chars_without_html = $.trim(tinyMCE.activeEditor.getContent().replace(/(<([^>]+)>)/ig, "")).length;
                    var findout = $.trim(tinyMCE.activeEditor.getContent().replace(/(<([^>]+)>)/ig, ""));
                    console.log(findout);
                    var removespace_value = $.trim(tinyMCE.activeEditor.getContent().replace(/(<([^>]+)>)/ig, "")).slice(-6);
                    console.log(removespace_value);
                    if ((removespace_value == "&nbsp;") && (ed.keyCode == 8 || ed.keyCode == 46)) {
                        var removespace_counter = new removespace();
                    }
                    if (removespace.counter > 0) {
                        chars_without_html = chars_without_html - 5;
                        removespace.counter = 0;
                    }


                    if (checkspace.counter > 0) {
                        if (chars_without_html > 5) {
                            chars_without_html = chars_without_html - 5;
                        }
                        if (chars_without_html == 4) {
                            chars_without_html = 4;
                        }
                        if (chars_without_html == 3) {
                            chars_without_html = 3;
                        }
                        if (chars_without_html == 2) {
                            chars_without_html = 2;
                        }
                        if (chars_without_html == 1) {
                            chars_without_html = 1;
                        }
                        if (chars_without_html == 0) {
                            chars_without_html = 1;
                        }
                        checkspace.counter = 0;
                    }
                    if (ed.keyCode == 32) {
                        var checkspace_counter = new checkspace();
                    }
                    if (checkenter.counter > 0) {
                        if (chars_without_html > 5) {
                            chars_without_html = chars_without_html - 6;
                        }
                        if (chars_without_html == 5) {
                            chars_without_html = 5;
                        }
                        if (chars_without_html == 4) {
                            chars_without_html = 4;
                        }
                        if (chars_without_html == 3) {
                            chars_without_html = 3;
                        }
                        if (chars_without_html == 2) {
                            chars_without_html = 2;
                        }
                        if (chars_without_html == 1) {
                            chars_without_html = 1;
                        }
                        if (chars_without_html == 0) {
                            chars_without_html = 1;
                        }
                        checkenter.counter = 0;
                    }
                    if (ed.keyCode == 13) {
                        var checkenter_counter = new checkenter();
                    }



                    chars_with_html = tinyMCE.activeEditor.getContent().length;
                    var chars_whitespace = tinyMCE.activeEditor.getContent().replace(' ', "X").length;
                    console.log("chars_with_html: " + chars_with_html + " chars_whitespace: " + chars_whitespace + " chars_without_html: " + chars_without_html);
                    var key = ed.keyCode;
                    if ((chars_without_html > 4995) && key == 32) {
                        $('.counter').html(0 + " of " + max_chars + " characters remaining");
                    }

                    else if ((chars_without_html <= 1) && (key == 8 || key == 46)) {
                        $('.counter').html(0 + " of " + max_chars + " characters remaining");
                    }
                    else if (chars_without_html == 0) {
                        $('.counter').html(4999 + " of " + max_chars + " characters remaining");
                    }

                    else if ((chars_without_html > 5000) && key == 8) {
                        $('.counter').html(1 + " of " + max_chars + " characters remaining");
                    }
                    else if ((chars_without_html > 5000) && key == 46) {
                        $('.counter').html(1 + " of " + max_chars + " characters remaining");
                    }
                    else if ((chars_without_html > 4994) && key == 13) {
                        chars_without_html = 4995;
                        $('.counter').html(0 + " of " + max_chars + " characters remaining");
                    }

                    else if (key == 8 || key == 46) {
                        $('.counter').html(max_chars - chars_without_html + 1 + " of " + max_chars + " characters remaining");
                    }
                    else if ((chars_without_html >= 4999) && (key == 8 || key == 46)) {
                        $('.counter').html(max_chars - chars_without_html - 2 + " of " + max_chars + " characters remaining");
                    }
                    else if (chars_without_html > 4999) {
                        $('.counter').html(0 + " of " + max_chars + " characters remaining");
                    }

                    else {
                        $('.counter').html(max_chars - chars_without_html - 1 + " of " + max_chars + " characters remaining");
                    }
                    if (allowed_keys.indexOf(key) != -1) {


                        if ((chars_without_html > (max_chars - 5)) && (key == 8 || key == 46)) {
                            $('.counter').css('color', 'red');
                        } else if ((chars_without_html > (max_chars - 6)) && (key == 8 || key == 46)) {
                            $('.counter').css('color', 'yellow');
                        } else if ((chars_without_html > (max_chars - 7)) && (key == 8 || key == 46)) {
                            $('.counter').css('color', 'yellow');
                        }
                        else if ((chars_without_html > (max_chars - 7)) && (key != 8 || key != 46)) {
                            $('.counter').css('color', 'red');
                        }
                        else if ((chars_without_html > (max_chars - 25)) && (key == 8 || key == 46)) {
                            $('.counter').css('color', 'yellow');
                            console.log("yellow limit");
                        } else if ((chars_without_html > (max_chars - 26)) && (key == 8 || key == 46)) {
                            $('.counter').css('color', 'gray');
                            console.log("yellow limit");
                        } else if ((chars_without_html > (max_chars - 27)) && (key == 8 || key == 46)) {
                            $('.counter').css('color', 'gray');
                            console.log("yellow limit");
                        }
                        else if ((chars_without_html > (max_chars - 27)) && (key != 8 || key != 46)) {
                            $('.counter').css('color', 'yellow');
                        } else {
                            $('.counter').css('color', 'gray');
                        }

                        return;
                    }

                    if (chars_with_html > (max_chars + max_for_html)) {
                        ed.stopPropagation();
                        ed.preventDefault();
                    } else if (chars_without_html > max_chars - 1 && key != 8 && key != 46) {
                        return false;
                    }



                    if ((chars_without_html > (max_chars - 5)) && (key == 8 || key == 46)) {
                        $('.counter').css('color', 'red');
                    } else if ((chars_without_html > (max_chars - 6)) && (key == 8 || key == 46)) {
                        $('.counter').css('color', 'yellow');
                    } else if ((chars_without_html > (max_chars - 7)) && (key == 8 || key == 46)) {
                        $('.counter').css('color', 'yellow');
                    }
                    else if ((chars_without_html > (max_chars - 7)) && (key != 8 || key != 46)) {
                        $('.counter').css('color', 'red');
                    }
                    else if ((chars_without_html > (max_chars - 25)) && (key == 8 || key == 46)) {
                        $('.counter').css('color', 'yellow');
                    } else if ((chars_without_html > (max_chars - 26)) && (key == 8 || key == 46)) {
                        $('.counter').css('color', 'gray');
                    } else if ((chars_without_html > (max_chars - 27)) && (key == 8 || key == 46)) {
                        $('.counter').css('color', 'gray');
                    }
                    else if ((chars_without_html > (max_chars - 27)) && (key != 8 || key != 46)) {
                        $('.counter').css('color', 'yellow');
                    } else {
                        $('.counter').css('color', 'gray');
                    }

                });
            },
        });


    });
  
};


/* Application Controller
------------------------------------------------ */
var WYSIWYG = function () {
	"use strict";
	
	return {
		//main function
		init: function () {
            handleTinyMCE();
		}
    };
}();
