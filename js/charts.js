$(window).on('load', function(e){

	var tabBlock = $('.tabBlock'), tabs, tabsSwiper = new Swiper('.filterListScroller', {
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
