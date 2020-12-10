(function($) {

	/**
	 * Copyright 2012, Digital Fusion
	 * Licensed under the MIT license.
	 * http://teamdf.com/jquery-plugins/license/
	 *
	 * @author Sam Sehnert
	 * @desc A small plugin that checks whether elements are within
	 *     the user visible viewport of a web browser.
	 *     only accounts for vertical position, not horizontal.
	 */

	$.fn.visible = function(partial) {
		
		var $t            = $(this),
			$w            = $(window),
			viewTop       = $w.scrollTop(),
			viewBottom    = viewTop + $w.height(),
			_top          = $t.offset().top,
			_bottom       = _top + $t.height(),
			compareTop    = partial === true ? _bottom : _top,
			compareBottom = partial === true ? _top : _bottom;
		
		return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

	};
		
})(jQuery);

const sections = document.querySelectorAll("section[id]")
var win = $(window);
var allModsR = $(".module-r");
var allModsL = $(".module-l");

$(document).ready(function(){
	var $reviewSlider = $(".slick-slider").slick({
		arrows: false,
		dots: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					autoplay: true,
					autoplaySpeed: 2500
				}
			}
		]
	});
	$reviewSlider.parent().find(".control-next").on("click", function(){
		$reviewSlider.slick("slickNext");
	})
	$reviewSlider.parent().find(".control-prev").on("click", function(){
		$reviewSlider.slick("slickPrev");
	})
	$(".slick-team-slider").slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3500,
		prevArrow: '<span class="slick-prev custom-slick-prev big"></span>',
		nextArrow: '<span class="slick-next custom-slick-next big"></span>',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
})
win.scroll(function(event) {
	navHighlighter();
	allModsR.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) {
			el.addClass("come-in-r"); 
		} 
	});
	allModsL.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) {
			el.addClass("come-in-l"); 
		} 
	});
	if($("#counter").visible(true)){
		updateUsersCount();
	}
	if($("#service-cards").visible(true)){
		serviceCardsAnimation();
	}
	if(scrollY > 100){
		$("#nertuff-scroll").removeClass("d-none");
	}else{
		$("#nertuff-scroll").addClass("d-none");
	}
});
function updateUsersCount() {
    $('#count1').animate({
        counter: 2000
    },{
        duration: 3000,
        easing: 'swing',
        step: function(now) {
            $(this).text(Math.ceil(now));
        },
        complete: updateUsersCount
    });
    $('#count2').animate({
        counter: 150
    },{
        duration: 2500,
        easing: 'swing',
        step: function(now) {
            $(this).text(Math.ceil(now));
        },
        complete: updateUsersCount
	});
	$('#count3').animate({
        counter: 30
    },{
        duration: 2000,
        easing: 'swing',
        step: function(now) {
            $(this).text(Math.ceil(now));
        },
        complete: updateUsersCount
	});
	$('#count4').animate({
        counter: 20
    },{
        duration: 1900,
        easing: 'swing',
        step: function(now) {
            $(this).text(Math.ceil(now));
        },
        complete: updateUsersCount
    });
};
function serviceCardsAnimation(){
	$(".service-card").animate({
		opacity: 1
	},{
		duration: 2000,
		queue: false
	})
	$(".service-card").animate({
        top: 0
    }, {
        duration: 2000,
        queue: false
    });
}
function navHighlighter() {
	let scrollY = window.pageYOffset;
	sections.forEach(current => {
	  const sectionHeight = current.offsetHeight;
	  const sectionTop = current.offsetTop - 100;
	  sectionId = current.getAttribute("id");
	  if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
		document.querySelector(".navbar-nav a[href*=" + sectionId + "]").classList.add("active");
	  }
	  else {
		document.querySelector(".navbar-nav a[href*=" + sectionId + "]").classList.remove("active");
	  }
	});
  }
$("#all-tab").click(function(){
	if($("#all-tab").hasClass("active")){return}
	else{
		$("#creative, #personal").fadeOut("slow").promise().done(function(){
			$("#all").fadeIn("slow");
			$("#all-tab").addClass("active");
			$("#creative-tab,#personal-tab").removeClass("active");
		});
		$
	}
});
$("#personal-tab").click(function(){
	if($("#personal-tab").hasClass("active")){return}
	else{
		$("#all,#creative").fadeOut("slow").promise().done(function(){
			$("#personal").fadeIn("slow");
			$("#personal-tab").addClass("active");
			$("#creative-tab,#all-tab").removeClass("active");
		});
	}
});
$("#creative-tab").click(function(){
	if($("#creative-tab").hasClass("active")){return}
	else{
		$("#all,#personal").fadeOut("slow").promise().done(function(){
			$("#creative").fadeIn("slow");
			$("#creative-tab").addClass("active");
			$("#personal-tab,#all-tab").removeClass("active");
		});
	}
});
$("#nertuff-scroll").click(function(){
	window.scrollTo(0,0);
})