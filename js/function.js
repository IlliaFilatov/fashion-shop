

function tabController(target) {

    $('.tabs-controllers .btn').removeClass('active-controller');
    $('[data-target="'+target+'"]').addClass('active-controller');

    $('.active-tab').slideUp(300, showNextTab());

    function showNextTab() {

        $('.tab').removeClass('active-tab');
        $(target).slideDown(300, function() {
            $(this).addClass('active-tab');
        });

    }

};
//
//function dropdown(trigger) {
//    var dropdown = $(trigger).parent('.dropdown'),
//        content = $(dropdown).children().filter('.dropdown-content');
//
//    if($(dropdown).hasClass('active')) {
//        $(content).slideUp(250, function(){
//            $(dropdown).removeClass('active');
//        });
//    } else {
//        $(content).slideDown(250, function(){
//            $(dropdown).addClass('active');
//        });
//    }
//};
//
//(function ($) {
//    
//    var defaults = {
//            trigger  : 'hover',
//            speed    : 500,
//            animation: 'slide'
//        };
//    
//    $.fn.dropdown = function(options) {
//        
//        var config = $.extend({}, defaults, options);
//        var target;
//        var subTarget;
//        var insubTarget;
//        
//        $(function ddController(options, target) {
//            switch (config.trigger) {
//                case 'hover':
//                $('.dd-btn-container [data-dd]').mouseenter(function() {
//                    target = $(this).attr('data-dd');
//                    switch (config.animation) {
//                        case 'fade':
//                            $(target).fadeIn(config.speed, function() {
//                                $(this).addClass('active-dd');
//                            });
//                            break;
//                        case 'slide':
//                            $(target).slideDown(config.speed, function() {
//                                $(this).addClass('active-dd');
//                            });
//                            break;
//                        default:
//                        console.error(Error);
//                    }
//                    $('[data-dd="'+target+'"]'&&'.active-dd'&&'.active-sub-dd'&&'.active-insub-dd').mouseleave(function() {
//                        console.log($(target));
//                        switch (config.animation) {
//                            case 'fade':
//                                $('.active-dd').fadeOut(config.speed, function() {
//                                    $(this).removeClass('active-dd');
//                                });
//                                break;
//                            case 'slide':
//                                $('.active-dd').slideUp(config.speed, function() {
//                                    $(this).removeClass('active-dd');
//                                });
//                                break;
//                            default:
//                            console.error(Error);
//                        }  
//    //                    $('.active-dd'||'.active-sub-dd'||'.active-insub-dd').mouseenter(function() { 
//    //                    });
//    //                    $('.active-dd'&&'.active-sub-dd'&&'.active-insub-dd').mouseleave(function() { 
//    //                    })
//                    });
//                });
//                break;
//                case 'click':
//                $('.dd-btn-container [data-dd]').click(function() {
//                    target = (this).attr('data-dd');
//                    switch (config.animation) {
//                        case 'fade':
//                            $(target).fadeIn(config.speed, function() {
//                                (this).addClass('active-dd');
//                            })
//                            break;
//
//                        case 'slide':
//                            $(target).slideDown(config.speed, function() {
//                                (this).addClass('active-dd');
//                            })
//                            break;
//
//                        default:
//                        console.log(Error);
//                    }
//                });
//                $('[data-dd="'+target+'"]').mouseleave(function() {
//                    switch (config.animation) {
//                        case 'fade':
//                            $(target).fadeOut(config.speed, function() {
//                                (this).removeClass('active-dd');
//                            });
//                            break;
//                        case 'slide':
//                            $(target).slideUp(config.speed, function() {
//                                (this).removeClass('active-dd');
//                            });
//                            break;
//                        default:
//                        console.error(Error);
//                    }
//                })
//                break;
//                default:
//                console.error(Error);
//            }
//        });
//        $(function subDdController(options, target) {
//            switch (config.trigger) {
//                case 'hover':
//                $('.sub-dd-btn-container [data-sub-dd]').mouseenter(function() {
//                    subTarget = $(this).attr('data-sub-dd');
//                    switch (config.animation) {
//                        case 'fade':
//                            $(subTarget).fadeIn(config.speed, function() {
//                                $(this).addClass('active-sub-dd');
//                            });
//                            break;
//                        case 'slide':
//                            $(subTarget).slideDown(config.speed, function() {
//                                $(this).addClass('active-sub-dd');
//                            });
//                            break;
//                        default:
//                        console.error(Error);
//                    }
//                })
//                $('[data-sub-dd="'+subTarget+'"]'&&'.active-sub-dd'&&'.active-insub-dd').mouseleave(function() {
//                    switch (config.animation) {
//                        case 'fade':
//                            $('.active-sub-dd').fadeOut(config.speed, function() {
//                                $(this).removeClass('active-sub-dd');
//                            });
//                            break;
//                        case 'slide':
//                            $('.active-sub-dd').slideUp(config.speed, function() {
//                                $(this).removeClass('active-sub-dd');
//                            });
//                            break;
//                        default:
//                        console.error(Error);
//                    }   
////                    $('.active-sub-dd'||'.active-insub-dd').mouseenter(function() {
////                    });
////                    $('.active-sub-dd'&&'.active-insub-dd').mouseleave(function() {
////                    });
//                });
//                break;
//                case 'click':
//                $('.sub-dd-btn-container [data-sub-dd]').click(function() {
//                    subTarget = (this).attr('data-sub-dd');
//
//                    switch (config.animation) {
//                        case 'fade':
//                            $(subTarget).fadeIn(config.speed, function() {
//                                (this).addClass('active-sub-dd');
//                            });
//                            break;
//                        case 'slide':
//                            $(subTarget).slideDown(config.speed, function() {
//                                (this).addClass('active-sub-dd');
//                            });
//                            break;
//                        default:
//                        console.error(Error);
//                    }
//                })
//                $('[data-sub-dd="'+subTarget+'"]').mouseleave(function() {
//                    switch (config.animation) {
//                        case 'fade':
//                            $(subTarget).fadeOut(config.speed, function() {
//                                (this).removeClass('active-sub-dd');
//                            });
//                            break;
//                        case 'slide':
//                            $(subTarget).slideUp(config.speed, function() {
//                                (this).removeClass('active-sub-dd');
//                            });
//                            break;
//                        default:
//                        console.error(Error);
//                    }
//                });
//                break;
//                default:
//                console.error(Error);
//            }
//        });
//        $(function inSubDdController(options, target) {
//            switch (config.trigger) {
//                case 'hover':
//                $('.insub-dd-btn-container [data-insub-dd]').mouseenter(function() {
//                    insubTarget = $(this).attr('data-insub-dd');
//                    switch (config.animation) {
//                        case 'fade':
//                            $(insubTarget).fadeIn(config.speed, function() {
//                                $(this).addClass('active-insub-dd');
//                            });
//                            break;
//                        case 'slide':
//                            $(insubTarget).slideDown(config.speed, function() {
//                                $(this).addClass('active-insub-dd');
//                            });
//                            break;
//                        default:
//                        console.error(Error);
//                    }
//                })
//                $('[data-insub-dd="'+insubTarget+'"]').mouseleave(function() {
//                    $('.active-insub-dd').mouseenter(function() {
//                    });
//                    $('.active-insub-dd').mouseleave(function() {
//                        switch (config.animation) {
//                            case 'fade':
//                                $('.active-insub-dd').fadeOut(config.speed, function() {
//                                    $(this).removeClass('active-insub-dd');
//                                });
//                                break;
//                            case 'slide':
//                                $('.active-insub-dd').slideUp(config.speed, function() {
//                                    $(this).removeClass('active-insub-dd');
//                                });
//                                break;
//                            default:
//                            console.error(Error);
//                        }   
//                    })
//                });
//                break;
//                case 'click':
//                $('.insub-dd-btn-container [data-insub-dd]').click(function() {
//                    insubTarget = (this).attr('data-insub-dd');
//                    switch (config.animation) {
//                        case 'fade':
//                            $(insubTarget).fadeIn(config.speed, function() {
//                                (this).addClass('active-insub-dd');
//                            });
//                            break;
//                        case 'slide':
//                            $(insubTarget).slideDown(config.speed, function() {
//                                (this).addClass('active-insub-dd');
//                            });
//                            break;
//                        default:
//                        console.error(Error);
//                    }
//                })
//                $('[data-insub-dd="'+insubTarget+'"]').mouseleave(function() {
//                    switch (config.animation) {
//                        case 'fade':
//                            $(insubTarget).fadeOut(options.speed, function() {
//                                (this).removeClass('active-insub-dd');
//                            });
//                            break;
//                        case 'slide':
//                            $(insubTarget).slideUp(options.speed, function() {
//                                (this).removeClass('active-insub-dd');
//                            });
//                            break;
//                        default:
//                        console.error(Error);
//                    }
//                });
//                break;
//                default:
//                console.error(Error);
//            }
//        });
//    };
//})(jQuery);