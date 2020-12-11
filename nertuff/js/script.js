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
		dots: true,
		prevArrow: '<span class="slick-prev custom-slick-prev big"></span>',
		nextArrow: '<span class="slick-next custom-slick-next big"></span>',
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
	$("#team-slick-slider").slick({
		slidesToShow: 1,
		autoplay: true,
		autoplaySpeed: 3500,
		mobileFirst: true,
		prevArrow: '<span class="slick-prev custom-slick-prev big"></span>',
		nextArrow: '<span class="slick-next custom-slick-next big"></span>',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 1500,
				settings: {
					slidesToShow: 3
				}
			}
		]
	});
	$("#clients-slick-slider").slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		dots: true,
		mobileFirst: true,
		autoplay: true,
		autoplaySpeed: 1500,
		prevArrow: '<span class="slick-prev custom-slick-prev big"></span>',
		nextArrow: '<span class="slick-next custom-slick-next big"></span>',
		responsive: [
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					autoplaySpeed: 1750
				}
			},
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 2,
					autoplaySpeed: 2000
				}
			},
			{
				breakpoint: 1150,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 2,
					autoplaySpeed: 2500
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 3,
					autoplaySpeed: 3000
				}
			},
			{
				breakpoint: 1500,
				settings: {
					slidesToShow: 8,
					slidesToScroll: 3,
					autoplaySpeed: 3500
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
		duration: 1000,
		queue: false
	})
	$(".service-card").animate({
        top: 0
    }, {
        duration: 1000,
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
function firstnameCheck(){
	let firstname = $("#form_firstname").val();
	if(firstname.length < 3){
		$("#firstname-warning").removeClass("invisible");
		$("#firstname-error").text("Firstame must contain at least three letters!");
		return false;
	}
	if(!(/^[A-z]+$/).test(firstname)){
		$("#firstname-warning").removeClass("invisible");
		$("#firstname-error").text("Name must contain only letters!");
		return false;
	}
	if(!(/^[A-Z]/).test(firstname)){
		$("#firstname-warning").removeClass("invisible");
		$("#firstname-error").text("Name must begin with a capital letter!");
		return false;
	}
	if(!(/^[A-Z][a-z]+$/).test(firstname)){
		$("#firstname-warning").removeClass("invisible");
		$("#firstname-error").text("Name can only have one capital letter!");
		return false;
	}
	$("#firstname-warning").addClass("invisible");
	$("#firstname-error").text("");
	return true;
}
function lastnameCheck(){
	let lastname = $("#form_lastname").val();
	if(lastname.length < 4){
		$("#lastname-warning").removeClass("invisible");
		$("#lastname-error").text("Lastname must contain at least four letters!");
		return false;
	}
	if(!(/^[A-z]+$/).test(lastname)){
		$("#lastname-warning").removeClass("invisible");
		$("#lastname-error").text("Name must contain only letters!");
		return false;
	}
	if(!(/^[A-Z]/).test(lastname)){
		$("#lastname-warning").removeClass("invisible");
		$("#lastname-error").text("Name must begin with a capital letter!");
		return false;
	}
	if(!(/^[A-Z][a-z]+$/).test(lastname)){
		$("#lastname-warning").removeClass("invisible");
		$("#lastname-error").text("Name can only have one capital letter!");
		return false;
	}
	$("#lastname-warning").addClass("invisible");
	$("#lastname-error").text("");
	return true;
}
function emailCheck(){
	let pattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
	let email = $("#form_email").val();
	if(!pattern.test(email)){
		$("#email-warning").removeClass("invisible");
		$("#email-error").text("Please enter a valid email!");
		return false;
	}
	$("#email-warning").addClass("invisible");
	$("#email-error").text("");
	return true;
}
function messageCheck(){
	let message = $("#form_message").val();
	if(message.length == 0){
		$("#message-warning").removeClass("invisible");
		$("#message-error").text("This field cannot be empty!");
		return false;
	}
	$("#message-warning").addClass("invisible");
	$("#message-error").text("");
	return true;
}
function contactForm(){
	let fCheck = firstnameCheck();
	let lCheck = lastnameCheck();
	let eCheck = emailCheck();
	let mCheck = messageCheck();
	return fCheck && lCheck && eCheck && mCheck;
}
function newsletterCheck(){
	let pattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
	let email = $("#newsletterEmail").val();
	if(!pattern.test(email)){
		$("#newsletter-warning").removeClass("invisible");
		return false;
	}
	$("#newsletter-warning").addClass("invisible");
	return true;
}
$("#all-tab").click(function(){
	if($("#all-tab").hasClass("active")){return}
	else{
		$("#creative, #personal").fadeOut().promise().done(function(){
			$("#all").fadeIn();
			$("#all-tab").addClass("active");
			$("#creative-tab,#personal-tab").removeClass("active");
		});
		$
	}
});
$("#personal-tab").click(function(){
	if($("#personal-tab").hasClass("active")){return}
	else{
		$("#all,#creative").fadeOut().promise().done(function(){
			$("#personal").fadeIn();
			$("#personal-tab").addClass("active");
			$("#creative-tab,#all-tab").removeClass("active");
		});
	}
});
$("#creative-tab").click(function(){
	if($("#creative-tab").hasClass("active")){return}
	else{
		$("#all,#personal").fadeOut().promise().done(function(){
			$("#creative").fadeIn();
			$("#creative-tab").addClass("active");
			$("#personal-tab,#all-tab").removeClass("active");
		});
	}
});
$("#nertuff-scroll").click(function(){
	window.scrollTo(0,0);
})