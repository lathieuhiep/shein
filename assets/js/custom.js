/**
 * Custom js v1.0.0
 */
(function ($) {

    "use strict";

    $(document).ready(function () {

        /* Start back top */
        $('#back-top').on('click', function (e) {
            e.preventDefault();
            $('html').scrollTop(0);
        });
        /* End back top */

        // notice owl
        toggleAnimateNotice();
    });

    // function call owlCarousel
    $.fn.general_owlCarousel_custom = function (class_item, options) {
        let class_item_owlCarousel = $(class_item);
        console.log(class_item_owlCarousel);
        if (class_item_owlCarousel.length) {

            class_item_owlCarousel.each(function () {
                let slider = $(this);

                if ( !slider.hasClass('owl-carousel-init') ) {
                    let defaults = {
                        autoplaySpeed: 800,
                        navSpeed: 800,
                        dotsSpeed: 800,
                        autoHeight: false,
                    };

                    let config = $.extend( defaults, options );

                    slider.owlCarousel( config ).addClass( 'owl-carousel-init' );
                }
            })

        }

    }

    // canvas menu mobile
    const canvasMenuMobile = $('#menu-mobile');
    if (canvasMenuMobile.length) {
        const bsCanvasMenuMobile = new bootstrap.Offcanvas(canvasMenuMobile);

        $(window).on('resize', function () {
            const widthScreen = $(window).width();

            if (widthScreen >= 992) {
                bsCanvasMenuMobile.hide();
            }

        })
    }

    // toggle animate notice
    let counter = 0;
    function toggleAnimateNotice() {
        const boxes = $('.notice__item');
        const boxesLength = boxes.length;

        if (counter === boxesLength) {
            counter = 0;
        }

        $.each(boxes, function(index, value) {
            $(value).addClass('d-none').removeClass('animate__animated animate__flipInX');

            if (index === counter) {
                $(value).removeClass('d-none').addClass('animate__animated animate__flipInX');
            }
        });

        counter++;

        setTimeout(function() {
            toggleAnimateNotice();
        }, 3000);
    }

})(jQuery);