$(function($){

	$('.faqQuestion').on('click', function(){
		$(this).next('.faqAnswer').slideToggle(500);
		return false;
	});

});