$(function () {

    $('.tabs-controllers .btn').click(function() {
        var target = $(this).attr('data-target');
        tabController(target);
    });
    
    $('.mob-menu span').click(function () {
        $('.mob-menu ul').slideToggle(350);
    });

    $('.xmob-menu .open-menu').click(function() {
        $('.xmob-menu ul').slideDown(450, function() {
            $('.xmob-menu ul .close-menu').click(function() {
                $('.xmob-menu ul').slideUp(450);
            })
        })
    });

//    $('.dropdown').hover(function(){
//        dropdown($(this).children().filter('.dropdown-content'));
//    }, function(){
//        dropdown($(this).children().filter('.dropdown-content'));
//    });
    
    $('.dd-nav').dropdown({
        'speed'       : 150,
        'hover'       : true
    });

    $('.banner').slider({
        prevBtn: ".ctrl-left",
        nextBtn: ".ctrl-right",
        animation: {
            type: "scroll"
        }
    });
    $('.product-slider').slider({
        pagination: {
            paginator: ".pagers"
        }
    });
    $('#products-1').slider({
        prevBtn: "#prev-1",
        nextBtn: "#next-1",
        step: 2,
        animation: {
            type: "scroll"
        },
        visible: {
            lg: 4,
            md: 3,
            sm: 2,
            xs: 1
        }
    });
    $('#products-2').slider({
        prevBtn: "#prev-2",
        nextBtn: "#next-2",
        step: 2,
        animation: {
            type: "scroll"
        },
        visible: {
            lg: 4,
            md: 3,
            sm: 2,
            xs: 1
        }
    });
    $('#products-3').slider({
        prevBtn: "#prev-3",
        nextBtn: "#next-3",
        step: 2,
        animation: {
            type: "scroll"
        },
        visible: {
            lg: 4,
            md: 3,
            sm: 2,
            xs: 1
        }
    });
    $('#products-4').slider({
        prevBtn: "#prev-4",
        nextBtn: "#next-4",
        step: 2,
        animation: {
            type: "scroll"
        },
        visible: {
            lg: 4,
            md: 3,
            sm: 2,
            xs: 1
        }
    });
    $('#brands').slider({
        prevBtn: "#prev-5",
        nextBtn: "#next-5",
        step: 1,
        animation: {
            type: "scroll"
        },
        visible: {
            lg: 5,
            md: 3,
            sm: 2,
            xs: 1
        }
    });

});
