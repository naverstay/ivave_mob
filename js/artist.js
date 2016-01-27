$(window).on('load', function(){
	var tabBlock = $('.tabBlock'), tabsSwiper = new Swiper('.filterListScroller', {
		setWrapperSize     : true,
		slidesPerView      : 'auto',
		paginationClickable: true,
		spaceBetween       : 0,
		freeMode           : true,
		wrapperClass       : 'filter_list',
		slideClass         : 'filter_item',
		onInit             : function(swiper){
			tabs = tabBlock.tabs({
				active    : 0,
				tabContext: tabBlock.data('tab-context'),
				activate  : function(e, u){
					windowScroll();
				}
			});
		}
	});
});

$(function($){

	var toddler, toddlerEl = $('.Toddler'), min = 1998, max = 2015,
			pips = toddlerEl.data('pips') || false;

	if(!toddlerEl.hasClass('ui-slider')){
		if(pips){
			toddler = toddlerEl.slider({
				range    : true,
				min      : min,
				max      : max,
				//step  : steps,
				value_box: '<span class="fz_12 toddler_value"></span>',
				values   : [min, max],
				change   : function(event, ui){
					ui_slider_change(event, ui);
				},
				slide    : function(event, ui){
					ui_slider_change(event, ui);
				}
			}).slider('pips');
		} else{
			toddler = toddlerEl.slider({
				range    : true,
				min      : min,
				max      : max,
				value_box: '<span class="toddler_value"></span>',
				//step  : steps,
				values   : [min, max],
				change   : function(event, ui){
					ui_slider_change(event, ui);
				},
				slide    : function(event, ui){
					ui_slider_change(event, ui);
				}
			});
		}

		var handlers = toddler.find('.ui-slider-handle');

		$(handlers[0]).find('.toddler_value').text(min);
		$(handlers[1]).find('.toddler_value').text(max);
	}

});

function ui_slider_change(event, ui){

	var handlers = $(ui.handle).closest('.Toddler').find('.ui-slider-handle');

	$(handlers[0]).find('.toddler_value').text(ui.values[0]);
	$(handlers[1]).find('.toddler_value').text(ui.values[1]);

	//console.log(ui.values);
}
