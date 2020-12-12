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

var menu = ["Home", "About", "Services", "Work", "Testimonies", "Team", "Clients", "Contact"];
var menuLink = ["#home", "#about", "#services", "#work", "#testimonies", "#team", "#clients", "#contact"];
var workImage = ["images/office1.jpg", "images/project1.jpg", "images/office2.jpg", "images/project2.jpg", "images/office3.jpg", "images/project3.jpg"];
var workImageAlt = ["office", "client site", "office", "client site", "office", "client site"]
var testimony = ["Nertuff is one of the most professional consulting companies out there. Great experience working with them and I'm looking forward to continuing working with them in the future.", "The people at Nertuff are great to work with, their advice and solutions are top-of-the-line and were excelently implemented for our use case.", "Having appropriate business solutions and timely advice Nertuff consulting has made our company much more efficient and better at handling future difficulties."];
var testimonyName = ["Marcus Johnson", "Richard Head", "Mary Jane Dawson"];
var testimonyPosAndCompany = ["CEO, Johnson Ltd.", "CEO, Sky Sports co.", "CEO, SpaceCube Ltd."];
var testimonyImage = ["images/testimony1.jpg", "images/testimony2.jpg", "images/testimony3.jpg"]
var testimonyImageAlt = ["testimony1", "testimony2", "testimony3"]
var teamImage = ["images/portrait1big.jpg", "images/portrait2big.jpg", "images/portrait3big.jpg", "images/portrait4big.jpg",];
var teamImageSmall = ["images/portrait1small.jpg", "images/portrait2small.jpg", "images/portrait3small.jpg", "images/portrait4small.jpg"]
var teamImageAlt = ["team member 1", "team member 1", "team member 2", "team member 2", "team member 3", "team member 3", "team member 4", "team member 4"]
var teamName = ["Marko Markovic", "Ivana Ivanovic", "Djordje Djordjevic", "Marina Marinkovic"];
var teamPos = ["CEO", "Sales consultant", "Legal consultant", "PR consultant"];
var teamNumber = ["+381/69 4562135", "+381/65 7434538", "+381/61 46384532", "+381/66 3149275"]
var teamMail = ["m.markovic@nertuff.com", "i.ivanovic@nertuff.com", "dj.djordjevic@nertuff.com", "m.marinkovic@nertuff.com"];
var clientImage = ["images/company1.svg", "images/company2.svg", "images/company3.svg", "images/company4.svg", "images/company5.svg", "images/company6.svg", "images/company7.svg", "images/company8.svg", "images/company9.svg", "images/company10.svg", "images/company11.svg", "images/company12.svg"];
var clientImageAlt = ["client 1", "client 2", "client 3", "client 4", "client 5", "client 6", "client 7", "client 8", "client 9", "client 10", "client 11", "client 12"];
var linkListLink = ["https://www.instagram.com/", "https://www.facebook.com/", "https://www.twitter.com/", "https://www.whatsapp.com/", "https://www.reddit.com/"];
var linkListClass = ["fab fa-instagram fa-lg mr-2", "fab fa-facebook-f fa-lg mr-2", "fab fa-twitter fa-lg mr-2", "fab fa-whatsapp fa-lg mr-2", "fab fa-reddit-alien fa-lg"]

$(document).ready(function(){
	for (let index = 0; index < 8; index++) {
		$(".navbar-nav").append(`<li class="nav-item"><a class="nav-link nertuff-nav-link d-inline-block px-2" href="${menuLink[index]}">${menu[index]}</a></li>`);
	}
	for (let index = 0; index < 6; index++) {
		$("#all-images").append(`<div class="col-sm-9 col-md-5 col-xl-3 p-0 card nertuff-color nertuff-zoom rounded-0"><img src="${workImage[index]}" class="card-img mx-auto rounded-0" alt="${workImageAlt[index]}"></div>`);
	}
	for (let index = 1; index < 6; index+=2) {
		$("#clients-images").append(`<div class="col-sm-9 col-md-5 col-xl-3 p-0 card nertuff-color nertuff-zoom rounded-0"><img src="${workImage[index]}" class="card-img mx-auto rounded-0" alt="${workImageAlt[index]}"></div>`);
	}
	for (let index = 0; index < 6; index+=2) {
		$("#office-images").append(`<div class="col-sm-9 col-md-5 col-xl-3 p-0 card nertuff-color nertuff-zoom rounded-0"><img src="${workImage[index]}" class="card-img mx-auto rounded-0" alt="${workImageAlt[index]}"></div>`);
	}
	for (let index = 0; index < 3; index++) {
		$("#dynamic-testimony").append(`<div class="slick-item py-2 px-2 px-md-5 d-flex">
								<div class="pr-3">
									<p class="nertuff-testimonies-3">
										<sup><i class="fas fa-quote-left"></i></sup>${testimony[index]}<sup><i class="fas fa-quote-right text-"></i></sup>
									</p>
									<p class="m-0">
										<i class="fa fa-star text-warning"></i>
										<i class="fa fa-star text-warning"></i>
										<i class="fa fa-star text-warning"></i>
										<i class="fa fa-star text-warning"></i>
										<i class="fa fa-star text-warning"></i>
									</p>
									<h5 class="mb-0">${testimonyName[index]}</h5>
									<small>${testimonyPosAndCompany[index]}</small>
								</div>
								<div>
									<img src="${testimonyImage[index]}" class="nertuff-testimonies-img" alt="${testimonyImageAlt[index]}">
								</div>
							</div>`);
	}
	for (let index = 0; index < 4; index++) {
		$("#team-slick-slider").append(`<div class="slick-item nertuff-team-2 pt-5">
										<img class="d-block d-md-none d-lg-block mx-auto" src="${teamImage[index]}" alt="${teamImageAlt[index]}">
										<img class="d-none d-md-block d-lg-none mx-auto" src="${teamImageSmall[index]}" alt="${teamImageAlt[index]}">
										<div class="p-2 p-sm-3 p-md-3 p-lg-3 p-xl-4">
											<h4>${teamName[index]} <small>${teamPos[index]}</small></h4>
											<p class="nertuff-link-1"><i class="fas fa-phone-alt"></i>${teamNumber[index]}</p>
											<p><a href="mailto:${teamMail[index]}" class="nertuff-link-1"><i class="fas fa-envelope-open"></i>${teamMail[index]}</a></p>
											<ul class="list-unstyled list-inline dynamic-link-list"></ul>
										</div>
									</div>`)
	}
	for (let index = 0; index < 12; index++) {
		$("#clients-slick-slider").append(`<img class="slick-item px-2" src="${clientImage[index]}" alt="${clientImageAlt[index]}">`);
	}
	$(".dynamic-link-list").each(function(){
		for (let index = 0; index < 5; index++) {
			$(this).append(`<li class="list-inline-item"><a href="${linkListLink[index]}" class="nertuff-link-1"><i class="${linkListClass[index]}"></i></a></li>`)
		}
	})

	var $testimonySlider = $(".slick-slider").slick({
		dots: true,
		prevArrow: '<span class="slick-prev custom-slick-prev big text-right"></span>',
		nextArrow: '<span class="slick-next custom-slick-next big"></span>',
		autoplay: true,
		autoplaySpeed: 3500
	});
	$testimonySlider.parent().find(".control-next").on("click", function(){
		$testimonySlider.slick("slickNext");
	})
	$testimonySlider.parent().find(".control-prev").on("click", function(){
		$testimonySlider.slick("slickPrev");
	})
	$("#team-slick-slider").slick({
		slidesToShow: 1,
		autoplay: true,
		autoplaySpeed: 3500,
		mobileFirst: true,
		prevArrow: '<span class="slick-prev custom-slick-prev big text-right"></span>',
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
		prevArrow: '<span class="slick-prev custom-slick-prev big text-right"></span>',
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
	let pattern = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/; //https://tools.ietf.org/html/rfc3696#section-3
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
	let pattern = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/; //https://tools.ietf.org/html/rfc3696#section-3
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
		$("#clients-img, #office-img").fadeOut().promise().done(function(){
			$("#all").fadeIn();
			$("#all-tab").addClass("active");
			$("#clients-tab,#office-tab").removeClass("active");
		});
		$
	}
});
$("#office-tab").click(function(){
	if($("#office-tab").hasClass("active")){return}
	else{
		$("#all,#clients-img").fadeOut().promise().done(function(){
			$("#office-img").fadeIn();
			$("#office-tab").addClass("active");
			$("#clients-tab,#all-tab").removeClass("active");
		});
	}
});
$("#clients-tab").click(function(){
	if($("#clients-tab").hasClass("active")){return}
	else{
		$("#all,#office-img").fadeOut().promise().done(function(){
			$("#clients-img").fadeIn();
			$("#clients-tab").addClass("active");
			$("#office-tab,#all-tab").removeClass("active");
		});
	}
});
$("#nertuff-scroll").click(function(){
	window.scrollTo(0,0);
})
$(document).click(function(event){
	if(!$(event.target).is(".navbar-collapse *")||$(event.target).is(".nav-link")){
		$(".navbar-collapse").collapse("hide");
	}
})