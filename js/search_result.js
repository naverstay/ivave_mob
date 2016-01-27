var tabIndex = 0,
		tabBlock,
		tabs;

$(function($){

	tabBlock = $('.tabBlock');

	tabs = tabBlock.tabs({
		active    : tabIndex,
		tabContext: tabBlock.data('tab-context'),
		activate  : function(e, u){
			windowScroll();
		}
	});

	
	$('.favToggleBtn').on ('click', function () {
		var firedEl = $(this);
		
		firedEl.toggleClass('fav_toggle_add fav_toggle_rm');
		
		$('.favSwitcherHolder').toggle();
		$('.favHolder').toggle();
	
		return false;
	});
	
});
