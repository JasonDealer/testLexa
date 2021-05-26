$(document).ready(function(){

//slider

    $('.slider__inner').slick({
    	infinite: true,
        speed: 600,
        //adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 4000,
       	// fade: true,
       	// cssEase: 'linear'
    	prevArrow: '<button type="button" class="slick-prev"><img src="./icons/left.svg"></button>',
    	nextArrow: '<button type="button" class="slick-next"><img src="./icons/right.svg"></button>',
    	responsive: [
    		{
			breakpoint: 992,
			settings: {
				dots: true
				}
    		},
    	]
	});
	
//tabs

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').		removeClass('catalog__content_active').eq($(this).index()).		addClass('catalog__content_active');
		});

      	/*$('.catalog__link').each(function(i) {
        	$(this).on('click', function(e) {
            	e.preventDefault();
            	$('.catalog__change').eq(i).toggleClass('catalog__change_active');
            	$('.catalog__list').eq(i).toggleClass('catalog__list_active');
            })     
		})

		$('.catalog__back').each(function(i) {
        	$(this).on('click', function(e) {
            	e.preventDefault();
            	$('.catalog__change').eq(i).toggleClass('catalog__change_active');
            	$('.catalog__list').eq(i).toggleClass('catalog__list_active');
            })     
		});*/
		
/* 		function toggleSlide(item) {
			$(item).each(function(i) {
				$(this).on('click', function(e) {
					e.preventDefault();
					$('.catalog__change').eq(i).toggleClass('catalog__change_active');
					$('.catalog__list').eq(i).toggleClass('catalog__list_active');
				})  
			});
		};

		toggleSlide('.catalog__link');
		toggleSlide('.catalog__back'); */



//modal windows

	$('[data-modal=consultation]').on('click', function(){
		$('.overlay, #consultation').fadeIn();
	});

	/*$('.button_submit').on('click', function(){
		$('.overlay, #consultation, #order, #confirm').fadeOut();
		$('.overlay, #confirm').fadeIn();
	});*/

	$('.catalog__btn').each(function(i){
		$(this).on('click', function(){
			$('#order .modal__descr').text($('.catalog__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn();
		});
	});

//forms

	function validateForms(form) {
		$(form).validate({
			rules: {
				name: "required",
				phone: "required",
				email: {
				  required: true,
				  email: true
				}
			},
			messages: {
				name: "Пожалуйста введите своё имя",
				phone: "Пожалуйста введите свой номер",
				email: {
				  required: "Введите действующий e-mail",
				  email: "Введите достоверный e-mail"
				}
			  }
		});
	}

	validateForms('#promo-consult');
	validateForms('#consultation form');
	validateForms('#order form');

//masked input

	$("input[name=phone]").mask("+375 (99) 999-99-99");

//backend

	$('form').submit(function(e){
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).fail(function(){
			$(this).find("input").val("");
			$('.overlay, #consultation, #order, #confirm').fadeOut();
			$('.overlay, #confirm').fadeIn();
			$('form').trigger('reset');
		});
		return false;
	});

//scroll

	$(window).scroll(function(){
		if ($(this).scrollTop() > 1600) {
			$('.pageupwrapper').fadeIn();
		} else {
			$('.pageupwrapper').fadeOut();
		}
	});

	$("a[href=#up]").click(function(){
		const _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	});

//catalog_items

	$('.electronic_catt').on('click', function(){
		$('.cat_electronic').removeClass('hide');
		$('.cat_furniture, .cat_summer, .wpp, .filter').addClass('hide');
		$('.ffff').removeClass('filter_opened');
		$('.f_t').removeClass('hide');
		$('.ffff').addClass('filter');
		$('.list_goods').html('');
	});

	$('.furniture_catt').on('click', function(){
		$('.cat_furniture').removeClass('hide');
		$('.cat_electronic, .wpp, .filter, .cat_summer').addClass('hide');
		$('.ffff').removeClass('filter_opened');
		$('.f_t').removeClass('hide');
		$('.ffff').addClass('filter');
		$('.list_goods').html('');
	});

	$('.summer_catt').on('click', function(){
		$('.cat_summer').removeClass('hide');
		$('.cat_furniture, .cat_electronic, .wpp, .filter').addClass('hide');
		$('.ffff').removeClass('filter_opened');
		$('.f_t').removeClass('hide');
		$('.ffff').addClass('filter');
		$('.list_goods').html('');
	});

	$('.category__item').on('click', function(){
		for(let i = 0; i < 32; i++) {
			let item = `
				<div class="catalog__item">
				<div class="catalog__wrapper">
					<div class="catalog__change catalog__change_active">
						<img src="img/PulseOnSale.jpg" alt="puls" class="catalog__img" />
						<div class="catalog__subtitle">Пульсометр Polar FT1</div>
						<div class="catalog__descr">Для первых шагов в тренировках, основанных на сердечном ритме</div>
						<a data-modal="desu" class="catalog__link">ПОДРОБНЕЕ</a>
					</div>
					<div class="catalog__list">
						<ul class="catalog__list_items">
							<li>Классный</li>
							<li>Очень классный</li>
							<li>Берите</li>
							<li>Не пожалеете</li>
						</ul>
						<a class="catalog__back">назад</a>
					</div>
				</div>
				<hr />
				<div class="catalog__footer">
					<div class="catalog__prices">
						<div class="catalog__old">200 руб.</div>
						<div class="catalog__new">140 руб.</div>
					</div>
					<a class="btn-ens-action btn-ens-style" data-rel="72a3d5a1254871">Купить</a>
				</div>
				</div>
			`
			$('.list_goods').append(item);
			$('.catalog__link').on('click', function() {
				$('.overlay').fadeIn();
				$('.good_desc').removeClass('hide');
			});
		}
		$('.wpp, .filter').removeClass('hide');
		$('.cat_furniture, .cat_electronic, .cat_summer').addClass('hide');
	});

	$('.ffff').on('click', function(){
		$('.ffff').removeClass('filter');
		$('.ffff').addClass('filter_opened');
		$('.f_t').addClass('hide');
	});

/* 	$('.modal__close').on('click', function(){
		$('.overlay, #consultation, #order, #confirm').fadeOut()
	}); */
	$('.catalog__link').on('click', function() {
		$('.overlay').fadeIn();
		$('.good_desc').removeClass('hide');
	});

	$('.modal__close').on('click', function(){
		$('.overlay, #consultation, #order, #confirm').fadeOut();
		$('.good_desc').addClass('hide');
	});

	/*Dropdown Menu*/
	$('.dropdown').click(function () {
		$(this).attr('tabindex', 1).focus();
		$(this).toggleClass('active');
		$(this).find('.dropdown-menu').slideToggle(300);
	});
	$('.dropdown').focusout(function () {
		$(this).removeClass('active');
		$(this).find('.dropdown-menu').slideUp(300);
	});
	$('.dropdown .dropdown-menu li').click(function () {
		$(this).parents('.dropdown').find('span').text($(this).text());
		$(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
	});
	/*End Dropdown Menu*/


	$('.dropdown-menu li').click(function () {
	var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
	msg = '<span class="msg">Hidden input value: ';
	$('.msg').html(msg + input + '</span>');
	}); 
});    