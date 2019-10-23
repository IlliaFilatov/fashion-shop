(function($){

    var defaults = {
        shift: 0,
        step: 1,
        cycling: false,
        swipe: false,
        prevBtn: '.controller.prev',
        nextBtn: '.controller.next',
        imgSize: 'cover',
        animation: {
            type: 'fade',
            speed: 300,
            together: true
        },
        pagination: {
            paginator: '',
            preview: false,
            previewSize: 'cover',
        },
        autoPlay: {
            timeOut: 0,
            direction: 'right',
            hoverPrevent: true
        },
        visible: {
            xs: 1,
            sm: 1,
            md: 1,
            lg: 1
        }
    }

    $.fn.slider = function(options){
        var settings     = $.extend({}, defaults, options),
            slider       = $(this),
            content      = $(slider).find('.slider-content'),
            slides       = $(content).find('.slide'),
            prevBtn      = $(slider).find('' + settings.prevBtn + ':not(.disabled)'),
            nextBtn      = $(slider).find('' + settings.nextBtn + ':not(.disabled)'),
            paginator    = $(slider).find(settings.pagination.paginator),
            pages        = $(paginator).children(),
            currSlides   = [],
            imgs         = [],
            previews     = [],
            visible      = 1,
            stream       = 0,
            queue        = 0,
            timerId      = 0;

        console.log(slides);
        $(prevBtn).addClass('controller');
        $(nextBtn).addClass('controller');
        $(paginator).addClass('paginator');

        // preventing errors in visible area
        if(settings.shift + visible > slides.length) settings.shift = slides.length - visible;

        // setting amount of visible slides
        setVisible();

        // marking current slides
        $.each(slides, function(i, slide) {
            $(slide).attr('data-slide', i);
            if(i >= settings.shift && i < settings.shift + visible) currSlides[currSlides.length] = slide;
            var childrens = $(slide).children();
            $.each(childrens, function(key, child){
                if($(childrens)[key].tagName == 'IMG') imgs[imgs.length] = child;
            });
        });

        if(settings.animation.type == 'scroll') {
            $(content).wrapInner('<div class="tape"></div>');
            content = $(content).find('.tape');
        } else if(settings.animation.type != 'fade' && settings.animation.type != 'scroll') {
            console.error('Plugin does not support this type of animation: ' + settings.animation.type + '. Used default type.');
            settings.animation.type = 'fade';
            settings.step = 1;
        }
        fitContent();
        setVisibleSlides();
        isEdge();

        // creating pagination
        if(paginator.length != 0) createPagination();
        adaptImages();


        /* HANDLERS */


        prevBtn.click(function(){
            slide('prev');
        });
        nextBtn.click(function(){
            slide('next');
        });
        if(settings.swipe) {
            $(slides).on('swiperight', function(){
                slide('prev');
            });
            $(slides).on('swipeleft', function(){
                slide('next');
            });
        }
        $.each(pages, function(key, btn){
            $(this).click(function(){
                if(!($(btn).hasClass('active'))) {
                    $(btn).addClass('active');
                    slide(key);
                }
            });
        });
        $(window).resize(function(){
            clearInterval(timerId);
            if(settings.shift + visible > slides.length) settings.shift = slides.length - visible;
            if(settings.animation.type == 'scroll') {
                setVisible();
                setVisibleSlides();
            }
            markPages();
            fitContent();
            setTimer();
        });
        if(settings.autoPlay.timeOut) {
            setTimer();
            if(settings.autoPlay.hoverPrevent) {
                $(slides).hover(function(){ clearInterval(timerId); }, function(){ setTimer(); });
                $(prevBtn).hover(function(){ clearInterval(timerId); }, function(){ setTimer(); });
                $(nextBtn).hover(function(){ clearInterval(timerId); }, function(){ setTimer(); });
                $(pages).hover(function(){ clearInterval(timerId); }, function(){ setTimer(); });
            }
        }


        /* FUNCTIONS */


        function setTimer() {
            if(settings.autoPlay.timeOut != 0) {
                timerId = setInterval(function(){
                    slide(settings.autoPlay.direction);
                }, settings.autoPlay.timeOut);
            }
        }
        function setVisible() {
            if($(window).width() < 600) visible = settings.visible.xs;
            else if($(window).width() < 900) visible = settings.visible.sm;
            else if($(window).width() < 1200) visible = settings.visible.md;
            else if($(window).width() >= 1200) visible = settings.visible.lg;
        }
        function setVisibleSlides() {
            switch(settings.animation.type) {
                case 'fade':
                    $(slides).hide().css('z-index', 0);
                    $(currSlides[0]).show().css('z-index', '1');
                    break;
                case 'scroll':
                    $.each(slides, function(i, slide){
                        if(i >= settings.shift && i < settings.shift + visible) $(slide).css('opacity', '1');
                        else $(slide).css('opacity', '0');
                    });
                    break;
                default:
                    return;
            }
        }
        function fitContent() {
            $(slides).css('width', $(slider).width()/visible + 'px');
            if(settings.animation.type == 'scroll') {
                $(content).css('width', slides.length * $(slider).width()/visible);
                $(content).css('left', -($(slider).width()/visible * settings.shift));
            }
            adaptImages();
        }
        function adaptImages() {
            // adapt slides backgrounds
            if(imgs.length != 0) {
                var slideRatio = $(slides[0]).width() / $(slides[0]).height();
                if(settings.imgSize == 'cover') {
                    $.each(imgs, function(i, img){
                        $(img).removeClass('wide').removeClass('tall');
                        var imgRatio = $(img)[0].naturalWidth / $(img)[0].naturalHeight;
                        if(imgRatio > slideRatio) $(img).addClass('wide');
                        else if(imgRatio < slideRatio) $(img).addClass('tall');
                    });
                } else if(settings.imgSize == 'contain') {
                    $(imgs).addClass('contain');
                }
            }
            // adapt paginator images
            if(previews.length != 0) {
                var pageRatio = $(pages[0]).width() / $(pages[0]).height();
                if(settings.pagination.previewSize == 'cover') {
                    $.each(previews, function(i, preview){
                        $(preview).removeClass('wide').removeClass('tall');
                        var previewRatio = $(preview).width() / $(preview).height();
                        if(previewRatio > pageRatio) $(preview).addClass('wide');
                        else if(previewRatio < pageRatio) $(preview).addClass('tall');
                    });
                } else if(settings.pagination.previewSize == 'contain') {
                    $(previews).addClass('contain');
                }
            }
        }
        function createPagination() {
            if(settings.pagination.preview && imgs.length != slides.length) {
                console.error('Not all slides have images inside. Used default type of pagination.');
                settings.pagination.preview = false;
            }
            $(paginator).wrap('<div class="paginator-box"></div>');
            switch(settings.pagination.preview) {
                case true:
                    $.each(imgs, function(i, img){
                        var pageItem = $('<div />', {
                            "class": 'page preview',
                            "data-page": i
                        });
                        previewImg = $(img).clone();
                        $(pageItem).append(previewImg);
                        $(paginator).append(pageItem);
                        previews[i] = $(paginator).find('.preview').find('img');
                    });
                    break;
                case false:
                    if(pages.length == 0) {
                        $.each(slides, function(i, value){
                            var pageItem = $('<button />', {
                                "class": 'page',
                                "data-page": i,
                                text: i + 1
                            });
                            paginator.append(pageItem);
                        });
                    } else {
                        $.each(pages, function(i){
                            $(this).attr('data-page', i);
                        });
                    }
                    break;
            }
            pages = $(paginator).children();
            markPages();
        }
        function markPages() {
            currSlides = [];
            $(pages).removeClass('active');
            $.each(slides, function(i, slide){
                if(i >= settings.shift && i < settings.shift + visible) currSlides[currSlides.length] = slide;
            });
            $.each(pages, function(i, btn){
                $.each(currSlides, function(key, slide){
                    if(i === parseInt($(slide).attr('data-slide'))) $(btn).addClass('active');
                });
            });
        }
        function slide(direction) {
            if(!settings.cycling && direction === isEdge()) return;
            switch(settings.animation.type) {
                case 'fade':
                    var newSlide = slides[settings.shift];
                    if(direction == 0 || direction > 0) {
                        newSlide = slides.filter('[data-slide='+direction+']');
                        settings.shift = slides.filter('[data-slide='+direction+']').index();
                    } else if(direction == 'prev') {
                        settings.shift--;
                        newSlide = slides[settings.shift];
                    } else if(direction == 'next') {
                        settings.shift++;
                        newSlide = slides[settings.shift];
                    }
                    fadeSlide(currSlides[0], newSlide);
                    break;
                case 'scroll':
                    if(direction == 0 || direction > 0) {
                        if(direction < settings.shift) settings.shift = direction;
                        else settings.shift = direction - visible + 1;
                    } else if(direction == 'prev') {
                        if(settings.shift == 0) {
                            settings.shift = slides.length - visible;
                        } else {
                            if(settings.step > visible) settings.shift -= visible;
                            else settings.shift -= settings.step;
                            if(settings.shift < 0) settings.shift = 0;
                        }
                    } else if(direction == 'next') {
                        if(settings.shift + visible == slides.length) {
                            settings.shift = 0;
                        } else {
                            if(settings.step > visible) settings.shift += visible;
                            else settings.shift += settings.step;
                            if(settings.shift + visible > slides.length) settings.shift = slides.length - visible;
                        }
                    }
                    $(slides).css('opacity', '1');
                    scrollSlide();
                    break;
            }
            isEdge();
        }
        function fadeSlide(currSlide, newSlide) {
            stream++;
            queue++;
            $(newSlide).css('z-index', queue + 1);
            if(settings.animation.together) $(currSlide).fadeOut(settings.animation.speed);
            $(newSlide).fadeIn(settings.animation.speed, function(){
                $(currSlide).hide();
                stream--;
                if(stream == 0) {
                    $(slides).css('z-index', '0');
                    $(this).css('z-index', '1');
                    queue = 0;
                }
            });
            markPages();
        }
        function scrollSlide() {
            var scroll = -($(slider).width()/visible * settings.shift);
            content.stop().animate({left: scroll}, settings.animation.speed, function(){
                $(pages).removeClass('active');
                setVisibleSlides();
                markPages();
            });
        }
        function isEdge() {
            if(settings.animation.type == 'fade' && settings.cycling) {
                if(settings.shift == 0) removeSlide('left');
                else if(settings.shift == slides.length - 1) removeSlide('right');
            }
            prevBtn.removeClass('disabled');
            nextBtn.removeClass('disabled');
            if(settings.shift == 0 && !settings.cycling) {
                prevBtn.addClass('disabled');
                return 'prev';
            } else if(settings.shift == slides.length - visible && !settings.cycling) {
                nextBtn.addClass('disabled');
                return 'next';
            } else {
                return false;
            }
        }
        function removeSlide(direction) {
            if(direction == 'left') {
                $(content).prepend(slides.last());
                settings.shift++;
            } else if(direction == 'right') {
                $(content).append(slides.first());
                settings.shift--;
            }
            slides = $(content).find('.slide');
            currSlides[0] = slides[settings.shift];
        }
    }

}(jQuery));
