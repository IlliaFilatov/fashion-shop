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
//        var current;
//        
//        var timer = setInterval(heightController(), 10);
//        
//        $('[data-dd-trigger]').hover( function() {
//            ddController(config, this);
//        });
//        
//        function ddController(config, current) {
//            switch (config.trigger) {
//                case 'hover':
//                    $(current).mouseenter(function() {
//                        var trigger = $(this).attr('data-dd-trigger');
//                        openDropdown(config, trigger);
//                        heightController();
//                        
//                        $(current).parent('.dropdown').mouseleave(function() {
//                            closeDropdown(config, trigger);
//                            heightController();
//                        }); 
//                        
//                    });
//                    break;
//                case 'click':
//                    $(current).click(function() {
//                        var trigger = $(this).attr('data-dd-trigger');
//                        openDropdown(config, trigger);
//                        
//                        $(body).click(function(e) {
//                            if ($(e.target).closest(".dropdown").length == 0) {
//                                closeDropdown(config, trigger);
//                            }
//                        });
//                    });
//                    break;
//                default:
//                    console.log('suka blyat2');
//            }
//        };
//        
//        function openDropdown(config, trigger) {
//            switch(config.animation) {
//                case 'slide':
//                    $(trigger).slideDown(config.speed, function() {
//                        $(this).addClass('active-dropdown'); 
//                    });
//                    break;
//                case 'fade':
//                    $(trigger).fadeIn(config.speed, function() {
//                        $(this).addClass('active-dropdown'); 
//                    });
//                    break;
//                default:
//                    console.log('suka blyat pizdec');
//            }
//        };
//        function closeDropdown(config, trigger) {
//            switch(config.animation) {
//                case 'slide':
//                    $(trigger).slideUp(config.speed, function() {
//                        $(this).removeClass('active-dropdown'); 
//                    });
//                    break;
//                case 'fade':
//                    $(trigger).fadeOut(config.speed, function() {
//                        $(this).removeClass('active-dropdown'); 
//                    });
//                    break;
//                default:
//                    console.log('suka blyat pizdec');
//            }
//        };
//        function heightController() {
//            var navHeight = $('.active-dropdown').height();
//            navHeight += 54;
//            $('.dd-nav').css({'height' : navHeight});
//        };
//    };
//})(jQuery);



$.fn.dropdown = function(param) {
    
    var param       = param || {},
        selector    = this,
        speed       = param.speed || 300,
        collapse    = param.collapse,
        hover       = param.hover,
        firstAction = true;

    
    function mainMenuController(speed, action, target) {
        if (action == 'show') {
            selector.find('.static-nav a[data-m-target]').removeClass('active');
            selector.find('.static-nav a[data-m-target="' + target + '"]').addClass('active');
            selector.find('.sub-link-content').slideUp(speed);
            if (firstAction) {
                selector.find('.sub-nav-content').fadeIn(speed);
            }
            if (collapse && !firstAction) {
                setTimeout(function() {
                    selector.find('.sub-link-content' + target).slideDown(speed);
                }, speed);
            } else {
                selector.find('.sub-link-content' + target).slideDown(speed);
                firstAction = false;
            }
        } else if (action == 'hide') {
            selector.find('.static-nav a[data-m-target]').removeClass('active');
            selector.find('.sub-link-content').slideUp(speed);
            selector.find('.sub-nav-content').fadeOut(speed);
            firstAction = true;
        }
    }
    function subMenuController(speed, parent, target) {
        var contentHeight = 0;
        selector.find('.sub-link-content' + parent + ' > ul > li').each(function() {
            contentHeight += $(this).outerHeight();    
        });
        selector.find('.sub-link-content' + parent + ' .content > div' + target + ' > ul').css('height', contentHeight);
        contentHeight = 0;
        selector.find('.sub-link-content' + parent + ' a[data-s-target]').removeClass('active');
        selector.find('.sub-link-content' + parent + ' a[data-s-target="' + target + '"]').addClass('active');
        selector.find('.sub-link-content' + parent + ' .content > div').slideUp(speed);
        selector.find('.sub-link-content' + parent + ' .content > div' + target).slideDown(speed);
    }
    function subSubMenuController(speed, parent, target) {
        selector.find('.sub-sub-link-content' + parent + ' a[data-s-s-target]').removeClass('active');
        selector.find('.sub-sub-link-content' + parent + ' a[data-s-s-target="' + target + '"]').addClass('active');
        selector.find('.sub-sub-link-content' + parent + ' .sub-content > div').slideUp(speed);
        selector.find('.sub-sub-link-content' + parent + ' .sub-content ' + target).slideDown(speed);
    }
    
    
    $('[data-m-target]').click(function() {
        var target = $(this).attr('data-m-target');
        if ($(this).hasClass('active')) {
            mainMenuController(speed, 'hide', target);
        } else {
            mainMenuController(speed, 'show', target);
        }
    });
        
    $('[data-s-target]').click(function() {
        var target = $(this).attr('data-s-target'),
            parent = '#' + $(this).parent().parent().parent('.sub-link-content').attr('id');
        if (!($(this).hasClass('active'))) {
            subMenuController(speed, parent, target);
        }
    });
    $('[data-s-s-target]').click(function() {
        var target = $(this).attr('data-s-s-target'),
            parent = '#' + $(this).parent().parent().parent('.sub-sub-link-content').attr('id');
        if (!($(this).hasClass('active'))) {
            subSubMenuController(speed, parent, target);
        }
    });
    $(document).click(function (e) {
        if ($('.opu-nav').has(e.target).length === 0){
            mainMenuController(speed, 'hide');
        }
    });
    
    if (hover) {
        $('[data-m-target]').mouseenter(function() {
            var target = $(this).attr('data-m-target');
            if (!($(this).hasClass('active'))) {
                mainMenuController(speed, 'show', target);
            }
        });
        $('[data-m-target]').mouseleave(function() {
            if(!($('.sub-nav-content:hover').length > 0) && !($('.[data-m-target]:hover').length > 0)) {
                mainMenuController(speed, 'hide');
            }
        });
        $('.opu-nav').mouseleave(function() {
            var target = $(this).attr('data-m-target');
            mainMenuController(speed, 'hide', target);
        });
        $('[data-s-target]').mouseenter(function() {
            var target = $(this).attr('data-s-target'),
                parent = '#' + $(this).parent().parent().parent('.sub-link-content').attr('id');
            if (!($(this).hasClass('active'))) {
                subMenuController(speed, parent, target);
            }
        });
        $('[data-s-s-target]').mouseenter(function() {
            var target = $(this).attr('data-s-s-target'),
                parent = '#' + $(this).parent().parent().parent('.sub-sub-link-content').attr('id');
            subSubMenuController(speed, parent, target);
        });
    }
};
