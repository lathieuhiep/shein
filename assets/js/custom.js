/**
 * Custom js v1.0.0
 */
(function ($) {

    "use strict";

    $(document).ready(function () {

        /* Start back top */
        $('.back-top').on('click', function (e) {
            e.preventDefault();
            $('html').scrollTop(0);
        });
        /* End back top */

        // notice owl
        toggleAnimateNotice();

        // change placeholder input search
        inputPlaceholderChange('.search-box .control-search');

        // owl product flash
        $(document).general_owlCarousel_custom('.element-product-sale__slider', {
            margin: 20,
            nav: true,
            dots: false,
            responsive:{
                0:{
                    items: 1
                },
                576:{
                    items: 2
                },
                768:{
                    items: 3
                },
                992:{
                    items: 4
                },
                1200:{
                    items: 6,
                    slideBy: 6
                }
            }
        });

        // owl product list
        $(document).general_owlCarousel_custom('.product-list-owl', {
            margin: 20,
            nav: true,
            dots: false,
            responsive:{
                0:{
                    items: 1
                },
                576:{
                    items: 2
                },
                768:{
                    items: 3
                },
                992:{
                    items: 4
                },
                1200:{
                    items: 6,
                    slideBy: 6
                }
            }
        });

        // product list gallery
        $(document).general_owlCarousel_custom('.product-list-gallery', {
            margin: 20,
            nav: true,
            dots: false,
            responsive:{
                0:{
                    items: 1
                },
                576:{
                    items: 2
                },
                768:{
                    items: 3
                },
                992:{
                    items: 4
                },
                1200:{
                    items: 5,
                    slideBy: 6
                }
            }
        });

        // quick view gallery slider
        const ModalQuickViewGallery = document.getElementById('quick-view-gallery');
        if ( ModalQuickViewGallery ) {
            ModalQuickViewGallery.addEventListener('shown.bs.modal', function () {
                const quickViewGallerySlider = $('.quick-view-gallery-slider');

                if ( quickViewGallerySlider.length && !quickViewGallerySlider.hasClass('lightSlider-int') ) {
                    quickViewGallerySlider.lightSlider({
                        gallery: true,
                        item: 1,
                        loop: true,
                        thumbItem: 5,
                        slideMargin: 0,
                        enableDrag: false,
                    });

                    quickViewGallerySlider.addClass('lightSlider-int');
                }
            });
        }

        // event click product attr
        $('body').on('click', '.item-product-attr', function () {
            const parentElement = $(this).closest('.intro-box');
            const hasClassActive = $(this).hasClass('active');

            if ( !hasClassActive ) {
                const hasClassColor = $(this).hasClass('color-inner');

                parentElement.find('.item-product-attr').removeClass('active');
                $(this).addClass('active');

                if ( hasClassColor ) {
                    const textColor = $(this).data('label');

                    parentElement.find('.intro-header .text-color').text(textColor);
                }
            }
        })

        // event click list-tags
        $('.list-tags__item').on('click', function () {
            const hasActive = $(this).hasClass('active');
            $(this).closest('.list-tags').find('.list-tags__item').removeClass('active');

            if ( !hasActive ) {
                $(this).addClass('active');
            }
        })

        // event click sort product
        $('.sort-list__item').on('click', function () {
            const hasActive = $(this).hasClass('active');

            if ( !hasActive ) {
                const textSort = $(this).text();

                $(this).closest('.sort-product').find('.select-only .text').text(textSort);
                $(this).closest('.sort-product').find('.sort-list__item').removeClass('active');
                $(this).addClass('active');
            }
        })

        // event filter product toggle
        $('.filter-product-toggle').on('click', function () {
            $(this).toggleClass('active');
            $(this).closest('.filter-product-item').find('.list-filter').slideToggle(600);
        })

        $('.filter-view-more').on('click', function () {
            const heightContent = $(this).closest('.list-filter').find('.group-box-filter');
            const getHeightContent = heightContent.prop("scrollHeight");

            heightContent.animate({
                'height': getHeightContent
            }, 400, function () {
                heightContent.css('height','auto');
            });

            $(this).remove();
        })

        // price range
        const priceRange = $('#price-range');
        if ( priceRange.length ) {
            priceRange.slider({
                step: 500,
                range: true,
                min: 0,
                max: 20000,
                values: [0, 20000],
                slide: function(event, ui) {
                    $('#price-range-lower').text( ui.values[0] );
                    $('#price-range-upper').text( ui.values[1] );
                }
            });

            $('#price-range-lower').text( priceRange.slider("values", 0) );
            $('#price-range-upper').text( priceRange.slider("values", 1) );
        }

        // product detail gallery
        const productGalleryItem = $('.product-gallery-item');
        if ( productGalleryItem.length ) {
            productGalleryItem.lightSlider({
                gallery: true,
                item: 1,
                loop: true,
                thumbItem: 6,
                slideMargin: 0,
                enableDrag: true,
            });
        }

        // product sale countdown
        const productSaleCountdown = $('.product-sale-countdown');
        if ( productSaleCountdown.length ) {
            productSaleCountdown.each(function () {
                const dataTime = $(this).data('time');

                $(this).countdown(dataTime, function(event) {
                    const totalHours = event.offset.totalDays * 24 + event.offset.hours;
                    $(this).html(event.strftime(totalHours + 'h : %Mm : %Ss'));
                });

            })
        }

        /* Quantity  */
        const productQuantity = $('.product-quantity');

        if ( productQuantity.length ) {
            let productInputQty = $('.product-quantity .input-qty');

            productInputQty.keypress(function (event) {
                if (event.which !== 8 && event.which !== 0 && event.which < 48 || event.which > 57) {
                    return false;
                }
            });

            $('.product-quantity__calc').on('click', function (event) {
                event.preventDefault();

                const hasClassAdd = $(this).hasClass('add');
                const parentProductQuantity = $(this).closest('.product-quantity').find('.input-qty');
                const valQuantity = parseInt( parentProductQuantity.val() );

                if ( hasClassAdd ) {
                    parentProductQuantity.val(valQuantity + 1);
                } else {
                    if ( valQuantity > 1 ) {
                        parentProductQuantity.val(valQuantity - 1);
                    } else {
                        parentProductQuantity.val(1);
                    }
                }

            })

            productInputQty.keyup(function () {
                const valQuantity = $(this).val();

                if ( valQuantity < 1 ) {
                    $(this).val(1);
                }
            });

        }

        /* select order */
        $('.select-box__list li').on('click', function () {
            const textSelect = $(this).text();

            $(this).closest('.select-box').find('.text-input').text(textSelect);
        })

        /* show form forget password */
        $('.forget-password').on('click', function (e) {
            e.preventDefault();

            $(this).closest('.template-login').find('.login-content').addClass('d-none');
            $(this).closest('.template-login').find('.forget-content').removeClass('d-none');
        })

        $('.btn-cancel-forget').on('click', function () {
            $(this).closest('.template-login').find('.login-content').removeClass('d-none');
            $(this).closest('.template-login').find('.forget-content').addClass('d-none');
        })

    });

    // scroll event
    let timer_clear;

    $( window ).scroll( function() {
        if ( timer_clear ) clearTimeout(timer_clear);

        timer_clear = setTimeout( function() {
            /* Start scroll back top */
            let $scrollTop = $(this).scrollTop();

            if ( $scrollTop > 200 ) {
                $('.back-top').addClass('active');
            }else {
                $('.back-top').removeClass('active');
            }
            /* End scroll back top */

        }, 100 );
    });

    // function call owlCarousel
    $.fn.general_owlCarousel_custom = function (class_item, options) {
        let class_item_owlCarousel = $(class_item);

        if (class_item_owlCarousel.length) {

            class_item_owlCarousel.each(function () {
                let slider = $(this);

                if ( !slider.hasClass('owl-carousel-init') ) {
                    let defaults = {
                        autoplaySpeed: 600,
                        navSpeed: 600,
                        dotsSpeed: 600,
                        autoHeight: false,
                        navText: ['<i class="material-icons-outlined">chevron_left</i>','<i class="material-icons-outlined">chevron_right</i>']
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

    // input placeholder that change
    function inputPlaceholderChange(nameClass) {
        const inputChange = $(nameClass);

        if ( inputChange.length ) {
            const placeHolder = ['Crop Top', 'Bikini', 'Jeans', 'Boots', 'Dress'];
            let n = 0;
            const loopLength = placeHolder.length;

            setInterval(function() {
                if( n < loopLength ){
                    const newPlaceholder = placeHolder[n];
                    n++;
                    inputChange.attr('placeholder',newPlaceholder);
                } else {
                    inputChange.attr('placeholder',placeHolder[0]);
                    n = 0;
                }
            },2000);
        }
    }

})(jQuery);