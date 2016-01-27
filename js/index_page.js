var svg_favorite_database,
		svg_joystick,
		svg_network_web,
		svg_radio,
		svg_sync_database;

$(function($){

	var mainSlider = new Swiper('.mainSlider', {
		//preventClicks           : false,
		//preventClicksPropagation: false,
		setWrapperSize     : true,
		loop               : true,
		slidesPerView      : 1,
		paginationClickable: true,
		//freeMode           : false,
		//wrapperClass: '.slider_pagination',
		//DOMAnimation            : false,
		nextButton         : '.slide_next',
		prevButton         : '.slide_prev',
		pagination         : '.slider_pagination',
		spaceBetween       : 0
	});

	//jQuery(".mainSlider").slick({
	//	slidesToShow  : 1,
	//	slidesToScroll: 1,
	//	setWrapperSize: true,
	//	useCSS        : !html_var.hasClass('ie_8'),
	//	slide         : '.slide',
	//	nextArrow     : '.slide_next',
	//	prevArrow     : '.slide_prev',
	//	appendDots    : '.slider_pagination',
	//	dots          : true,
	//	arrows        : true
	//});

});
