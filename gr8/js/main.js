$(document).ready(function(){
	$("header").next().css("margin-top", parseInt($("header").height()))
	var categories, brands, products, filteredProducts, filterSearch = "", filterCategories = [], filterBrand = null, filterPrice = [1, 1000000], sortType = 0, showNumber = 20, currentPage = 1, slickIndex = 1;
	ajaxGet("categories", "json", populateCategories);
	ajaxGet("brands", "json", populateBrands);
	ajaxGet("products", "json", loadProducts);

	checkCookies()

	hotDeal()
	var prevScrollpos = window.pageYOffset;
	window.onscroll = function() {
		var currentScrollPos = window.pageYOffset;
		if (prevScrollpos > currentScrollPos) {
			$("header").css("top", "0px")
		} else {
			$("header").css("top", "-" + parseInt($("#top-header").outerHeight()) + "px")
		}
		prevScrollpos = currentScrollPos;
	}

	$("#first-name").on("blur", fNameCheck)
	function fNameCheck(){
		let el = $("#first-name")
		var good = textCheck($(el));
		if(good)
			$(`label[for="${$(el).prop("id")}"]`).html("")
		else
			$(`label[for="${$(el).prop("id")}"]`).html("<p class='text-danger'>Invalid first name. Example: Michael</p>")
		return good;
	}
	$("#last-name").on("blur", lNameCheck)
	function lNameCheck(){
		let el = $("#last-name")
		var good = textCheck($(el));
		if(good)
			$(`label[for="${$(el).prop("id")}"]`).html("")
		else
			$(`label[for="${$(el).prop("id")}"]`).html("<p class='text-danger'>Invalid last name. Example: Stevens</p>")
		return good;
	}
	$("#email").on("blur", emailFieldCheck)
	function emailFieldCheck(){
		let el = $("#email")
		var good = emailCheck($(el));
		if(good)
			$(`label[for="${$(el).prop("id")}"]`).html("")
		else
			$(`label[for="${$(el).prop("id")}"]`).html("<p class='text-danger'>Invalid email. Example: anEmail@service.com</p>")
		return good;	
	}
	$("#address").on("blur", addressFieldCheck)
	function addressFieldCheck(){
		let el = $("#address")
		var good = addressCheck($(el));
		if(good)
			$(`label[for="${$(el).prop("id")}"]`).html("")
		else
			$(`label[for="${$(el).prop("id")}"]`).html("<p class='text-danger'>Invalid address. Example: Zdravka Celara 16</p>")
		return good;
	}
	$("#city").on("blur", cityCheck)
	function cityCheck(){
		let el = $("#city")
		var good = textCheck($(el));
		if(good)
			$(`label[for="${$(el).prop("id")}"]`).html("")
		else
			$(`label[for="${$(el).prop("id")}"]`).html("<p class='text-danger'>Invalid city. Example: Belgrade</p>")
		return good;
	}
	$("#country").on("blur", countryCheck)
	function countryCheck(){
		let el = $("#country")
		var good = textCheck($(el));
		if(good)
			$(`label[for="${$(el).prop("id")}"]`).html("")
		else
			$(`label[for="${$(el).prop("id")}"]`).html("<p class='text-danger'>Invalid country. Example: Serbia</p>")
		return good;
	}
	$("#zip-code").on("blur", zipCheck)
	function zipCheck(){
		let el = $("#zip-code")
		var good = numberCheck($(el));
		if(good)
			$(`label[for="${$(el).prop("id")}"]`).html("")
		else
			$(`label[for="${$(el).prop("id")}"]`).html("<p class='text-danger'>Invalid ZIP code. Example: 11000</p>")
		return good;
	}
	$("#tel").on("blur", telCheck)
	function telCheck(){
		let el = $("#tel")
		var good = numberCheck($(el));
		if(good)
			$(`label[for="${$(el).prop("id")}"]`).html("")
		else
			$(`label[for="${$(el).prop("id")}"]`).html("<p class='text-danger'>Invalid telephone number. Example: +381691234567</p>")
		return good;
	}
	$("#send-order").on("click", function(){
		var errorList = [], payment = false, checked = false;;
		errorList.push(fNameCheck());
		errorList.push(lNameCheck());
		errorList.push(emailFieldCheck());
		errorList.push(addressFieldCheck());
		errorList.push(cityCheck());
		errorList.push(countryCheck());
		errorList.push(zipCheck());
		errorList.push(telCheck());
		if($(`input[name="payment"]:checked`).val() != undefined){
			$(`label[for="payment"]`).html("");
			payment = true;
		}
		else{
			$(`label[for="payment"]`).html("<p class='text-danger'>Please select a payment option</p>")
		}
		if($("#terms").prop("checked") == true){
			$(`label[for="terms-error"]`).html("")
			checked = true;
		}
		else{
			$(`label[for="terms-error"]`).html("<p class='text-danger'>Please accept terms and conditions</p>")
		}
		if(!errorList.includes(false) && payment && checked){
			window.location = `/gr8/index.html?successPage`
		}
	})



	$("#filter-toggle").on("click", function(e){
		e.preventDefault();
		$("#aside").slideToggle()
	})

	$("#cart-dropdown").click(function(e){
		e.stopPropagation();
	})
	$("#categories").on("change", "input[type=checkbox]", function(){
		categoriesChange();
	})
	$("#brands").on("change", "input[type=checkbox]", function(){
		if($(this).is(":checked")){
			$(`input:checkbox[name=brand]`).prop("checked", false);
			$(this).prop("checked", true);
		}
		else{
			$(this).prop("checked", false);
		}
		brandChange();
	})
	$("#search").on("keyup", searchChange);
	$("#price-min,#price-max").on("keyup", priceChange);

	$("#sort-by").on("change", sortChange);
	$("#number-products").on("change", showChange);

	$(".store-pagination").on("click", "li a", function(){
		currentPage = $(this).attr("data-page");
		modifyProducts()
		pagination()
	})

	$(document).on("mouseup", ".open-product", function(){
		localStorage.setItem("product-id", $(this).attr("data-id"))
	})
	$("#cart-dropdown").on("mouseup", ".open-product", function(){
		localStorage.setItem("product-id", $(this).attr("data-id"))
	})

	if(window.location.pathname.indexOf("store.html") !== -1){
		if(window.location.search)
			storeRedirect();
		if(localStorage.getItem("sort")){
			sortType = localStorage.getItem("sort")
			$("#sort-by").val(sortType)
		}
		if(localStorage.getItem("showing")){
			showNumber = localStorage.getItem("showing")
			$("#number-products").val(showNumber)
		}
		$(window).on("resize", function(){
			if(!$("#aside").is(":visible") && window.innerWidth > 992){
				$("#aside").show()
			}
		})
	}

	$("body").on("click", ".add-to-cart-btn", function(){
		var id = $(this).attr("data-id");
		var cartCookie = document.cookie.split("; ").find(el => el.startsWith("cart="))
		var found = false;
		if(cartCookie){
			var cart = JSON.parse(cartCookie.split("=")[1]);
			for(item of cart){
				if(item.id == id){
					if($(this).parent().find("#add-qty").length)
						item.qty = item.qty + parseInt($("#add-qty").val());
					else
						item.qty = item.qty + 1;
					found = true;
					setCookie("cart", JSON.stringify(cart), 7);
					cartUpdate();
				}
			}
			if(!found){
				if($(this).parent().find("#add-qty").length){
					cart.push(
						{
							"id": id,
							"qty": parseInt($("#add-qty").val())
						}
					)
				}
				else{
					cart.push(
						{
							"id": id,
							"qty": 1
						}
					)
				}
				setCookie("cart", JSON.stringify(cart), 7);
				cartUpdate();
			}
		}
		else{
			if($(this).parent().find("#add-qty").length)
				var cart = [{"id": id, "qty": parseInt($("#add-qty").val())}]
			else
				var cart = [{"id": id, "qty": 1}]
			setCookie("cart", JSON.stringify(cart), 7);
			cartUpdate();
		}
	})

	$("#cart-dropdown,.order-summary").on("click", ".delete", function(){
		var id = $(this).attr("data-id");
		var cart = JSON.parse(document.cookie.split("; ").find(el => el.startsWith("cart=")).split("=")[1])
		var removeItem = cart.filter(function(el){
			return el.id != id;
		})
		if(removeItem.length != 0){
			setCookie("cart", JSON.stringify(removeItem), 7)
		}
		else{
			setCookie("cart", "", -7)
		}
		cartUpdate()
	})

	$("#cart-dropdown").on("click", ".empty-cart", function(){
		setCookie("cart", "", -7);
		cartUpdate();
	})

	$(`.tab-link`).on("click", function(){
		$(this).closest("ul").find("li").removeClass("active");
		$(this).parent().addClass("active");
		tabsHideInactive()
	})

	function checkCookies(){
		var allow = localStorage.getItem("allowCookies");
		if(allow == null){
			var html = `<div id="allow-cookies" class="d-flex justify-content-center align-items-center px-3 py-4">
							<h5 class="m-0 text-center">This site uses cookies to help it run, by continuing you're consenting and acknowledging their use.</h5>
							<button id="allow-cookies-btn" class="primary-btn m-0 ms-4">Ok</button>
						</div>`;
			$("body").append(html)
			$("body").on("click", "#allow-cookies-btn", function(){
				localStorage.setItem("allowCookies", true)
				$("#allow-cookies").fadeOut("slow", function(){
					$("#allow-cookies").attr("style", "display: none !important")
				})
			})
		}
	}

	function ajaxGet(filename, type, callback){
		$.ajax({
			url: `data/${filename}.json`,
			type: 'GET',
			datatype: type,
			success: function(data){
				callback(data);
			}
		})
	}

	function setCookie(name, value, expires){
		date = new Date()
		date.setDate(date.getDate() + expires)
		document.cookie = `${name}=${value}; expires=${date}`
	}

	function cartUpdate(){
		var html = `<div class="cart-list">`;
		var cartCookie = document.cookie.split("; ").find(el => el.startsWith("cart="))
		if(cartCookie){
			var cart = JSON.parse(cartCookie.split("=")[1]);
			for(item of cart){
				var product;
				for(current of products){
					if(current.id == item.id)
						product = current;
				}
				html += `<div class="product-widget">
							<div class="product-img">
								<img src="./img/product${product.id}/0.webp" alt="${product.name}">
							</div>
							<div class="product-body">
								<h3 class="product-name"><a class="open-product" data-id="${product.id}" href="product.html">${brandFunc(product)} ${product.name}</a></h3>
								<h4 class="product-price"><span class="qty">${item.qty}x</span>${addDots(product.price.current)} RSD</h4>
							</div>
							<button data-id="${product.id}" class="delete"><i class="fa fa-close"></i></button>
						</div>`
			}
			html += `</div>
					<div id="cart-summary">
						<small>${cart.length} Item(s) selected</small>
						<h5>TOTAL: ${addDots(totalFunc(cart))} RSD</h5>
					</div>
					<div class="cart-btns d-flex">
						<a class="empty-cart" href="#">Empty cart <span class="fa fa-times"></span></a>
						<a href="checkout.html">Checkout  <i class="fa fa-arrow-circle-right"></i></a>
					</div>`
			$("#cart-dropdown-button").html(`${$("#cart-dropdown-button").html()}<div class="qty">${cart.length}</div>`);
		}
		else{
			html += `<h6 class="text-center mb-0 mt-2">Your cart is empty.</h6>
					</div>`
			$("#cart-dropdown-button").find("div.qty").remove()
		}
		$("#cart-dropdown").html(html);
		if(window.location.pathname.indexOf("checkout") !== -1){
			var order = "";
			if(cartCookie){
				$(".order-summary .order-col").html(`<div><strong>PRODUCT</strong></div>
														<div class="pe-3"><strong>PRICE</strong></div>`)
				var cart = JSON.parse(cartCookie.split("=")[1]);
				for(item of cart){
					var product;
					for(current of products){
						if(current.id == item.id)
							product = current;
					}
					order += `  <div class="order-col">
									<div><b>${item.qty}x</b><a class="open-product" data-id="${product.id}" href="product.html"> ${brandFunc(product)} ${product.name}</a></div>
									<div>${addDots(product.price.current)} RSD <button data-id="${product.id}" class="delete"><i class="fa fa-close"></i></button></div>
								</div>`
				}
				var shipping;
				if(totalFunc(cart)>5000){
					shipping = `<div class="pb-3 d-flex justify-content-between">
									<div>Shipping</div>
									<div><strong>FREE</strong></div>
								</div>
								<div class="d-flex justify-content-between">
									<div><h4><strong>TOTAL</strong></h4></div>
									<div><h4><strong class="order-total">${addDots(totalFunc(cart))} RSD</strong></h4></div>
								</div>`

				}
				else{
					shipping = `<div class="pb-3 d-flex justify-content-between">
									<div>Shipping</div>
									<div><strong>399 RSD</strong></div>
								</div>
								<div class="d-flex justify-content-between">
									<div><strong>TOTAL</strong></div>
									<div><strong class="order-total">${addDots(totalFunc(cart)+399)} RSD</strong></div>
								</div>`
				}
				$(".order-fee-total").html(shipping)
			}
			else{
				$(".order-fee-total").html("")
				$(".order-summary .order-col").html(`<h6 class="text-center">Your cart is empty. </h6>
																 <p class="text-center"><a class="primary-btn" href="store.html">Shop now</a></p>`)
				$("#send-order").attr("disabled", true)
			}
			$(".order-products").html(order)
		}
	}
	function totalFunc(cart){
		var html = 0;
		for(item of cart){
			for(product of products){
				if(product.id == item.id){
					html += product.price.current * item.qty
				}
			}
		}
		return html;
	}

	function populateCategories(data){
		var html = "";
		categories = data;
		if(window.location.pathname.indexOf("store") !== -1){
			for(cat of categories){
				html+=`	<div class="input-checkbox">
							<input type="checkbox" name="category" id="category-${cat.id}">
							<label for="category-${cat.id}"><span></span>${cat.name}</label>
						</div>`
			}
			$("#categories").html(html);
		}
	}

	function populateBrands(data){
		var html = "";
		brands = data;
		if(window.location.pathname.indexOf("store") !== -1){
			for(br of brands){
				html+=`	<div class="input-checkbox">
							<input type="checkbox" name="brand" id="brand-${br.id}">
							<label for="brand-${br.id}"><span></span>${br.name}</label>
						</div>`
			}
			$("#brands").html(html);
		}
	}

	function loadProducts(data){
		products = data;
		setTimeout(() => {
			modifyProducts(data);
		}, 100);
		cartUpdate();
	}

	function populateProducts(data){
		var html = "";
		if(window.location.pathname.indexOf("store") !== -1){
			for(let i = (currentPage-1)*showNumber; i < currentPage*showNumber && i < data.length; i++){
				html +=`<div class="mw-100 mw-md-47 mw-xl-31 mx-2">
							<div class="product">
								<a data-id="${data[i].id}" href="product.html" class="open-product">
									<div class="product-img">
										<img src="./img/product${data[i].id}/0.webp" alt="${data[i].name}">
										<div class="product-label">
											${discountFunc(data[i])}
											${isNewFunc(data[i])}
										</div>
									</div>
									<div class="product-body">
										<p class="product-category">${catFunc(data[i])}</p>
										<h4 class="product-brand">${brandFunc(data[i])}</h4>
										<h3 class="product-name">${data[i].name}</h3>
										<h4 class="product-price">${addDots(data[i].price.current)} RSD <del class="product-old-price"><sup>${oldPriceFunc(data[i])} RSD</sup></del></h4>
										${ratingFunc(data[i])}
									</div>
								</a>
								<div class="add-to-cart">
									<button data-id="${data[i].id}" class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> <small>add to cart</small></button>
								</div>
							</div>
						</div>`
			}
			$("#store-products").html(html)
			showing();
		}
		else if(window.location.pathname.indexOf("product") !== -1){
			for(product of products){
				if(product.id == localStorage.getItem("product-id")){
					document.title = `GR8 - ${brandFunc(product)} ${product.name}`;
					$(".product-name").html(`${brandFunc(product)} ${product.name}`);
					$(".rating").html(ratingFunc(product));
					$(".product-details .product-price").html(`${addDots(product.price.current)} RSD <del class="product-old-price"><sup>${oldPriceFunc(product)} RSD</sup></del>`);
					$(".description").html(product.description);
					$(".size-choice").html(choiceFunc(product, "sizes"));
					$(".color-choice").html(choiceFunc(product, "colors"));
					$("#product-categories").html(putPCategories(product))
					loadProductImg(product, "#product-main-img");
					loadProductImg(product, "#product-imgs");
					$(".product-details .add-to-cart-btn").attr("data-id", String(product.id))
					$(".breadcrumb-tree").html(breadcrumbFunc(product));
					$("#related-products").html(relatedFunc(product));
				}
			}
		}
		else if(window.location.pathname.indexOf("index") !== -1 || window.location.pathname == "/gr8/"){
			tabsFunc("#new-products-tabs")
			tabsFunc("#top-selling-tabs")
			tabsHideInactive();
			if(window.location.search == "?successPage"){
				$("#successfulPurchase").modal("toggle")
				window.history.pushState({},"","/gr8/index.html")
				setCookie("cart", "", -7)
				cartUpdate();
			}
			
		}
	}
	function discountFunc(product){
		var html = "";
		if(product.price.discount != null){
			html +=`<span class="sale">-${product.price.discount}%</span>`
		}
		return html;
	}
	function isNewFunc(product){
		var html = "";
		if(product.isNew){
			html +=`<span class="new">NEW</span>`
		}
		return html;
	}
	function catFunc(product){
		var html = "";
		for(cat of product.catId){
			for(category of categories){
				if(cat == category.id && cat != product.catId[product.catId.length-1])
					html += `${category.name}, `;
				else if(cat == category.id)
					html += `${category.name}`
			}
		}
		return html;
	}
	function brandFunc(product){
		var html = "";
		for(brand of brands){
			if(brand.id == product.brandId)
				html += brand.name;
		}
		return html;
	}
	function oldPriceFunc(product){
		var html = "";
		if(product.price.old != null){
			html += `${addDots(product.price.old)}`
		}
		return html;
	}
	function ratingFunc(product){
		var html = "";
		if(product.stars > 0)
		{
			html = `<div class="product-rating">`
			for(i=0; i < product.stars; i++){
				html += `<i class="fa fa-star"></i>`
			}
			html += `</div>`
		}
		return html;
	}
	function choiceFunc(product, type){
		var html = "";
		if(product[type].length > 0){
			for(index in product[type]){
				html += `<option value="${index}">${product[type][index]}</option>`
			}
		}
		else
			html = `<option value="0">X</option>`;
		return html;
	}
	function breadcrumbFunc(product){
		var html = `<li><a href="index.html">Home</a></li>
					<li><a href="store.html">All Categories</a></li>`;
		for(catId of product.catId){
			for(cat of categories){
				if(cat.id == catId){
					html += `<li><a href="store.html">${cat.name}</a></li>`
				}
			}
		}
		return html;
		
	}
	function relatedFunc(product){
		var html = `<div class="section-title text-center">
						<h3 class="title">Related Products</h3>
					</div>
					<div id="slick-nav-5" class="products-slick-nav"></div>
					<div class="products-slick" data-nav="#slick-nav-5">`;
		var catId = product.catId[product.catId.length-1];
		var i = 0;
		for(prod of products){
			if(prod.catId.includes(catId)){
				html += `<div class="mw-100 mw-md-47 mw-xl-31 mx-2">
							<div class="product">
								<a data-id="${prod.id}" href="product.html" class="open-product">
									<div class="product-img">
										<img src="./img/product${prod.id}/0.webp" alt="${prod.name}">
										<div class="product-label">
											${discountFunc(prod)}
											${isNewFunc(prod)}
										</div>
									</div>
									<div class="product-body">
										<p class="product-category">${catFunc(prod)}</p>
										<h4 class="product-brand">${brandFunc(prod)}</h4>
										<h3 class="product-name">${prod.name}</h3>
										<h4 class="product-price">${addDots(prod.price.current)} RSD <del class="product-old-price"><sup>${oldPriceFunc(prod)} RSD</sup></del></h4>
										${ratingFunc(prod)}
									</div>
								</a>
								<div class="add-to-cart">
									<button data-id="${prod.id}" class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> <small>add to cart</small></button>
								</div>
							</div>
						</div>`
			}
		}
		html += `</div>`
		return html;
	}

	function tabsFunc(div){
		var html = "";
		
		$(`a[href="${div.substring(0, div.indexOf("-tabs"))}"]`).each(function(){
			html += `<div id="slick-nav-${slickIndex}" class="products-slick-nav"></div>
					<div class="products-slick" data-nav="#slick-nav-${slickIndex}" data-tab="${$(this).attr("data-cat")}">`
			for(prod of products){
				if(prod.catId.includes(parseInt($(this).attr("data-cat")))){
					html += `<div class="mw-100 mw-md-47 mw-xl-31 mx-2">
								<div class="product">
									<a data-id="${prod.id}" href="product.html" class="open-product">
										<div class="product-img">
											<img src="./img/product${prod.id}/0.webp" alt="${prod.name}">
											<div class="product-label">
												${discountFunc(prod)}
												${isNewFunc(prod)}
											</div>
										</div>
										<div class="product-body">
											<p class="product-category">${catFunc(prod)}</p>
											<h4 class="product-brand">${brandFunc(prod)}</h4>
											<h3 class="product-name">${prod.name}</h3>
											<h4 class="product-price">${addDots(prod.price.current)} RSD <del class="product-old-price"><sup>${oldPriceFunc(prod)} RSD</sup></del></h4>
											${ratingFunc(prod)}
										</div>
									</a>
									<div class="add-to-cart">
										<button data-id="${prod.id}" class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> <small>add to cart</small></button>
									</div>
								</div>
							</div>`
				}
			}
			html += `</div>`
			slickIndex++;
		})
		$(div).html(html)
	}
	function tabsHideInactive(){
		$(".products-slick,.products-slick-nav").each(function(){
			$(this).hide()
		})
		$(".tab-link").each(function(){
			var href = $(this).attr("href")
			var id = $(this).attr("data-cat")
			if($(this).parent().hasClass("active")){
				var pslick = $(`${href}`).find(`.products-slick[data-tab="${id}"]`)
				pslick.show()
				if(pslick.hasClass("slick-initialized"))
					pslick.slick("setPosition")
				$(pslick.attr("data-nav")).show()
			}
		})
	}

	function putPCategories(product){
		var html = "";
		for(cat in product.catId){
			for(categ of categories){
				if(product.catId[cat] == categ.id){
					html +=`<li class="ms-2"><a href="store.html">${categ.name}</a></li>`
				}
			}
		}
		return html;
	}
	function loadProductImg(product, divId){
		console.log("in loadProduct")
		var html = "";
		var i = 0;
		imgLoad();
		function imgLoad(){
			console.log("in imgLoad")
			let img = new Image();
			img.onload = imgSuccess;
			img.onerror = imgFail;
			img.src = `./img/product${product.id}/${i}.webp`;
		}
		function imgSuccess(){
			console.log("in imgSuccess")
			html+=`<div class="product-preview">
						<img src="./img/product${product.id}/${i}.webp" alt="${product.name}">
					</div>`
			i++;
			imgLoad();
		}
		function imgFail(){
			console.log("in imgFail")
			$(divId).html(html);
		}
	}

	function storeRedirect(){
		var query;
		var winSearch = window.location.search.split("&");
		var urlSearch = winSearch.filter(function(el){
			return el.indexOf("s=") > -1
		});
		if(urlSearch.length > 0){
			search = urlSearch[0].split("=")[1];
			query = search.replace("+", " ");
			setTimeout(() => {
				$("#search").val(query)
				searchChange()
			}, 250);
		}
	}

	function addDots(nStr)
	{
		nStr += '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(nStr)) {
			nStr = nStr.replace(rgx, '$1' + '.' + '$2');
		}
		return nStr;
	}

	function searchChange(){
		filterSearch = $("#search").val();
		currentPage = 1;
		modifyProducts();
	}
	function priceChange(){
		filterPrice = [$("#price-min").val(), $("#price-max").val()];
		currentPage = 1;
		modifyProducts();
	}
	function categoriesChange(){
		filterCategories = []
		$("input[name=category]").each(function(){
			if($(this).prop("checked") == true){
				let val = $(this).prop("id");
				filterCategories.push(val.substr(val.indexOf("-")+1, val.length-val.indexOf("-")-1))
			}
		})
		currentPage = 1;
		modifyProducts();
	}
	function brandChange(){
		filterBrand = null
		$("input[name=brand]").each(function(){
			if($(this).prop("checked") == true){
				let val = $(this).prop("id");
				filterBrand = val.substr(val.indexOf("-")+1, val.length-val.indexOf("-")-1)
			}
		})
		currentPage = 1;
		modifyProducts();
	}
	function sortChange(){
		sortType = $("#sort-by").val()
		localStorage.setItem("sort", $("#sort-by").val())
		currentPage = 1;
		modifyProducts()
	}
	function showChange(){
		showNumber = $("#number-products").val()
		localStorage.setItem("showing", $("#number-products").val())
		currentPage = 1;
		showing();
		modifyProducts()
	}
	function showing(){
		var html = "Showing ";
		try {
			html += (currentPage-1)*showNumber+1;

			if(currentPage*showNumber < filteredProducts.length)
				html+= "-" + currentPage*showNumber
			else
				html += "-" + filteredProducts.length;
			html+=" of " + filteredProducts.length + " total products"
		} catch (error) {
			html = "Showing "
			html += (currentPage-1)*showNumber+1;

			if(currentPage*showNumber+1 < products.length)
				html+= "-" + currentPage*showNumber
			else
				html += "-" + products.length;
			html+=" of " + products.length + " total products"
		}
		
		$("#showing").html(html);
		pagination()
	}
	function modifyProducts(){
		filteredProducts = JSON.parse(JSON.stringify(products));
		if(filterSearch != ""){
			filteredProducts = filteredProducts.filter(function(el){
				return el.name.toUpperCase().includes(filterSearch.toUpperCase());
			});
		}
		filteredProducts = filteredProducts.filter(function(el){
			return el.price.current > filterPrice[0] && el.price.current < filterPrice[1];
		})
		if(filterCategories.length != 0){
			filteredProducts = filteredProducts.filter(function(el){
				for(id of el.catId){
					for(filterId in filterCategories){
						if(id == filterCategories[filterId])
							return true;
					}
				}
				return false;
			})
		}
		if(filterBrand != null){
			filteredProducts = filteredProducts.filter(function(el){
				return el.brandId == filterBrand;
			})
		}
		if(sortType == 1){
			filteredProducts.sort(function(a, b){
				if(a.name < b.name)
					return -1
				else	
					return 1
			})
		}
		if(sortType == 2){
			filteredProducts.sort(function(a, b){
				if(a.name < b.name)
					return 1
				else	
					return -1
			})
		}
		if(sortType == 3){
			filteredProducts.sort(function(a, b){
				if(a.price.current < b.price.current)
					return -1
				else	
					return 1
			})
		}
		if(sortType == 4){
			filteredProducts.sort(function(a, b){
				if(a.price.current < b.price.current)
					return 1
				else	
					return -1
			})
		}

		populateProducts(filteredProducts);
		if(filteredProducts.length == 0){
			$("#store-products").html("<h3>No products fit the selected criteria <span class='fa fa-frown-o'></span></h3>")
			$("#showing").html("")
		}
	}
	function pagination(){
		var html = "";
		try {
			var number = Math.ceil(filteredProducts.length / showNumber);
			
		} catch (error) {
			var number = Math.ceil(products.length / showNumber);
		}

		var i;
		if(currentPage <= 3){
			i = 1
		}
		else
			i = currentPage - 2
		var j = 2 + parseInt(currentPage);
		if(i > 1)
			html += `<li><a data-page="1" href="#breadcrumb"><span class="fa fa-angle-double-left"></span></a></li>`
		for(; i <= number && i <=j; i++){
			if(i == currentPage)
				html += `<li class="active"><a data-page="${i}" href="#breadcrumb">${i}</a></li>`
			else
				html += `<li><a data-page="${i}" href="#breadcrumb">${i}</a></li>`
		}
		if(i < number)
			html += `<li><a data-page="${number}" href="#breadcrumb"><span class="fa fa-angle-double-right"></span></a></li>`
		$(".store-pagination").html(html);
	}

	function hotDeal(){
		var date = new Date();
		var html = "";
		html += `<li>
					<div>
						<h3>${30-date.getDate()}</h3>
						<span>Days</span>
					</div>
				</li>
				<li>
					<div>
						<h3>${23-date.getHours()}</h3>
						<span>Hours</span>
					</div>
				</li>
				<li>
					<div>
						<h3>${59-date.getMinutes()}</h3>
						<span>Mins</span>
					</div>
				</li>
				<li>
					<div>
						<h3>${59-date.getSeconds()}</h3>
						<span>Secs</span>
					</div>
				</li>
				`
		$(".hot-deal-countdown").html(html)
		setTimeout(() => {
			hotDeal()
		}, 1000);
	}

	function addressCheck(field){
		let regex = /^([A-Z][a-z]+\s)+[0-9]+$/;
		if(regex.test($(field).val()))
			return true
		return false
	}
	function textCheck(field){
		let regex = /^([A-Z][a-z]+\s?)+$/;
		if(regex.test($(field).val()))
			return true
		return false
	}
	function numberCheck(field){
		let regex = /^\+?[0-9]+$/;
		if(regex.test($(field).val()))
			return true
		return false
	}
	function emailCheck(field){
		let regex = /^[^@]+@[^\.]+\..+$/;
		if(regex.test($(field).val()))
			return true
		return false
	}

	/////////////////////////////////////////
	setTimeout(() => {
				// Products Slick
		$('.products-slick').each(function() {
			var $this = $(this),
					$nav = $this.attr('data-nav');

			$this.slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				autoplay: true,
				infinite: true,
				speed: 300,
				dots: false,
				arrows: true,
				appendArrows: $nav ? $nav : false,
				responsive: [
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							}
					}
				]
			});
		});

		$('#product-imgs').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: true,
			centerMode: true,
			autoplay: true,
			speed: 400,
			focusOnSelect: true,
				centerPadding: 0,
				vertical: true,
			asNavFor: '#product-main-img',
				responsive: [{
					breakpoint: 765,
					settings: {
						vertical: false,
						arrows: false,
						dots: true,
					}
				},
			]
		});
		$('#product-main-img').slick({
			infinite: true,
			speed: 300,
			dots: false,
			arrows: false,
			fade: true,
			asNavFor: '#product-imgs',
		});
		$('.products-widget-slick').each(function() {
			var $this = $(this),
					$nav = $this.attr('data-nav');
			$this.slick({
				infinite: true,
				autoplay: true,
				speed: 300,
				dots: false,
				arrows: true,
				appendArrows: $nav ? $nav : false,
			});
		});
	}, 450);
	// Product img zoom
	var zoomMainProduct = document.getElementById('product-main-img');
	if (zoomMainProduct) {
		$('#product-main-img .product-preview').zoom();
	}

	/////////////////////////////////////////

	// Input number
	$('.input-number').each(function() {
		var $this = $(this),
		$input = $this.find('input[type="number"]'),
		up = $this.find('.qty-up'),
		down = $this.find('.qty-down');

		down.on('click', function () {
			var value = parseInt($input.val()) - 1;
			value = value < 1 ? 1 : value;
			$input.val(value);
			$input.change();
		})

		up.on('click', function () {
			var value = parseInt($input.val()) + 1;
			$input.val(value);
			$input.change();
		})
	});

	// var priceInputMax = document.getElementById('price-max'),
	// 	priceInputMin = document.getElementById('price-min');

	// priceInputMax.addEventListener('change', function(){
	// 	updatePrice($(this).parent() , this.value)
	// });

	// priceInputMin.addEventListener('change', function(){
	// 	updatePrice($(this).parent() , this.value)
	// });
})
