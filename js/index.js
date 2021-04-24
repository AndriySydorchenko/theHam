
// OUR SERVICES TABS
$(".navbar-links .link-item").click(function () {
    $(this).closest(".navbar-links").find("a").removeClass("active");
    $(this).addClass("active");
});

$("ul .our-service-item").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
    $(this).closest(".our-services").find(".our-services-tab").removeClass("active").eq($(this).index()).addClass("active");
});


// OUR AMAZING WORKS
$(".our-amazing-works-img").hide().slice(0, 12).show();
$(".our-amazing-works-tab").click(function () {
    const filter = $(this).data("filter");
    $(this).addClass("active").siblings().removeClass("active")
    $(this).closest(".our-amazing-works").find(".our-amazing-works-img").hide().siblings(filter).slice(0, 12).show();
    if(filter === "*") {
        $(this).closest(".our-amazing-works").find("#load-more:hidden").show();
    } else {
        $(this).closest(".our-amazing-works").find("#load-more").hide();
    }
});
$("#load-more").click(function () {
    const elemClass = $(this).data("target");
    $(this).hide().closest(".our-amazing-works").find("#preloader").show();
    setTimeout( function() {
        $("#load-more").show().closest(".our-amazing-works").find("#preloader").hide();
        $(`${elemClass}:hidden`).slice(0, 12).show();
        if ($(`${elemClass}:hidden`).length === 0) {
            $("#load-more").hide();
        }
        $masonry.masonry('layout');
    }, 3000);
});

// THIS VARIANT WORK IS NOT CORRECT
// let innerHtml =  null;
// $(".our-amazing-works-items").on("mouseover", ".our-amazing-works-img", function () {
//     innerHtml = $(this).clone(true);
//     $(this).replaceWith(`
//         <div class="img-info d-flex flex-column flex-center">
//             <div class="d-flex flex-center" >
//                  <div class="circle d-flex flex-center">
//                      <i class="fas fa-link"></i>
//                  </div>
//                  <div class="circle d-flex flex-center">
//                      <i class="fas fa-search "></i>
//                  </div>
//             </div>
//             <h3 class="img-info-title">Creative design</h3>
//             <span class="img-info-desc">Web Design</span>
//         </div>
//     `);
// });
// $(".our-amazing-works-items").on("mouseout", ".img-info", function () {
//     $(this).replaceWith(innerHtml);
// });


let innerHtml = `
        <div class="img-info d-flex flex-column flex-center">
            <div class="d-flex flex-center" >
                 <div class="circle d-flex flex-center">
                     <i class="fas fa-link"></i>
                 </div>
                 <div class="circle d-flex flex-center">
                     <i class="fas fa-search "></i>
                 </div>
            </div>
            <h3 class="img-info-title">Creative design</h3>
            <span class="img-info-desc">Web Design</span>
        </div>
    `;

$(".our-amazing-works-img").hover(function () {
    // console.log(this);
    $(this).append(innerHtml);
},
    function () {
    $(this).find(".img-info").remove();
});


// COMMENT SLIDER SECTION

let slideNow = 1;
let slideCount = $('#slidewrapper').children().length;
let translateWidth = 0;
let translateWidthIcon = 0;

$("#next-btn").click(function() {
    nextSlide();
});

$("#prev-btn").click(function() {
    prevSlide();
});

function nextSlide() {
    if (slideNow >= slideCount || slideNow <= 0) {
        $('#slidewrapper').css({
            'transform': `translate( 0, 0)`,
            '-webkit-transform': `translate( 0, 0)`,
            '-ms-transform': `translate( 0, 0)`,
        });
        slideNow = 1;
        $("#nav-btns-wrapper").css({
            'transform': `translate( 0, 0)`,
            '-webkit-transform': `translate( 0, 0)`,
            '-ms-transform': `translate( 0, 0)`,
        });
        // translateWidth = 0;
        slideNow = 1;
    } else {
        translateWidth = -$('#viewport').width() * (slideNow);
        $('#slidewrapper').css({
            'transform': `translate( ${translateWidth}px, 0)`,
            '-webkit-transform': `translate( ${translateWidth}px, 0)`,
            '-ms-transform': `translate( ${translateWidth}px, 0)`,
        });
        if (slideNow >= 4){
            translateWidthIcon = -$("#nav-btns-wrapper").width()/(slideCount)*(slideNow-3);
            $("#nav-btns-wrapper").css({
                'transform': `translate( ${translateWidthIcon}px, 0)`,
                '-webkit-transform': `translate(  ${translateWidthIcon}px, 0)`,
                '-ms-transform': `translate(  ${translateWidthIcon}px, 0)`,
            });
        }
        slideNow++;
    }

    $(".nav-btn-face").removeClass("active").get(slideNow-1).classList.add("active");
}

function prevSlide() {
    if (slideNow === 1 || slideNow <= 0 || slideNow > slideCount) {
        translateWidth = -$('#viewport').width() * (slideCount-1);
        $('#slidewrapper').css({
            'transform': `translate( ${translateWidth}px, 0)`,
            '-webkit-transform': `translate( ${translateWidth}px, 0)`,
            '-ms-transform': `translate( ${translateWidth}px, 0)`,
        });
        translateWidthIcon = -$(".viewport-btns").width()*(slideCount - 4)/4;
        $("#nav-btns-wrapper").css({
            'transform': `translate( ${translateWidthIcon}px, 0)`,
            '-webkit-transform': `translate(  ${translateWidthIcon}px, 0)`,
            '-ms-transform': `translate(  ${translateWidthIcon}px, 0)`,
        });
        slideNow = slideCount;
    } else {
        translateWidth = -$('#viewport').width() * (slideNow - 2);
        $('#slidewrapper').css({
            'transform': `translate( ${translateWidth}px, 0)`,
            '-webkit-transform': `translate( ${translateWidth}px, 0)`,
            '-ms-transform': `translate( ${translateWidth}px, 0)`,
        });
        if (slideNow <= (slideCount - 3)){
            translateWidthIcon = -$("#nav-btns-wrapper").width()/(slideCount)*(slideNow-2);
            $("#nav-btns-wrapper").css({
                'transform': `translate( ${translateWidthIcon}px, 0)`,
                '-webkit-transform': `translate( ${translateWidthIcon}px, 0)`,
                '-ms-transform': `translate( ${translateWidthIcon}px, 0)`,
            });
        }
        slideNow--;
    }
    $(".nav-btn-face").removeClass("active").get(slideNow-1).classList.add("active");
}



let navBtnId = 0;
$('.nav-btn-face').click(function() {
    navBtnId = $(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    if (navBtnId + 1 !== slideNow) {
        translateWidth = -$('#viewport').width() * (navBtnId);
        $('#slidewrapper').css({
            'transform': `translate( ${translateWidth}px, 0)`,
            '-webkit-transform': `translate( ${translateWidth}px, 0)`,
            '-ms-transform': `translate( ${translateWidth}px, 0)`,
        });
        slideNow = navBtnId + 1;
    }
});

// BEST IMG using the Masonry plugin

let $masonry = $('.masonry-container').masonry({
    itemSelector: '.masonry-item',
    // columnWidth: '.masonry-item',
    // horizontalOrder: true,
    gutter: 15,
    transitionDuration: '0.2s'
});



let $masonryInMasonry = $('.masonry-container .masonry-in-masonry').masonry({
    itemSelector: '.masonry-in-masonry-img',
    columnWidth: 28,
    horizontalOrder: true,
    gutter: 3,
    // fitWidth: true
});
// $masonry.masonry('destroy');
// $masonryInMasonry.masonry('destroy');

$masonry.imagesLoaded().progress( function() {
    $masonryInMasonry.masonry('layout');
    $masonry.masonry('layout');

});

$(".masonry-container .masonry-item").hide().slice(0, 12).show();

$("#load-more-masonry").click(function () {
    const elemClass = $(this).data("target");
    $(this).hide().closest(".best-img").find("#preloader-masonry").show();
    setTimeout( function() {
        $("#load-more-masonry").show().closest(".best-img").find("#preloader-masonry").hide();
        $(`${elemClass}:hidden`).slice(0, 12).show();
        if ($(`${elemClass}:hidden`).length === 0) {
            $("#load-more-masonry").hide();
        }
        $masonry.masonry('layout');
        // $masonryInMasonry.masonry('layout');

    }, 3000);
});