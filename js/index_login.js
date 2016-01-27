$(function($){

	$('.tableCollapseBtn').on('click', function(){
		var firedEl = $(this).closest('.collapseRowMain');

		firedEl.toggleClass('open_row').nextAll('tr[data-collapse=' + firedEl.data('collapse') + ']').toggle();
		return false;
	});

	$('.showMoreBtn').on('click', function(){

		console.log('showMoreBtn');
		var firedEl = $(this).closest('.showMoreHolder');

		firedEl.find('.showMoreBlock').show();
		firedEl.find('.showMoreHide').hide();

		return false;
	});

});
