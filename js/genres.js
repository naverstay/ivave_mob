$(function($){

	$('.selectAllGenres').on('click', function(){
		var genre = $(this).closest('.chartAlbumItem');

		genre.toggleClass('select_all');

		if(genre.hasClass('select_all')){
			genre.find('.hidden_check').prop('checked', true);
			genre.find('.styleCounter').text('All');
		} else{
			genre.find('.hidden_check').prop('checked', false);
			genre.find('.styleCounter').text('0');
		}

		return false;
	});

	$('.genreCheck').on('change', function(){

		var checkBlock = $(this).closest('.subgenreToggleBlock'),
				genreCheckbox = checkBlock.find('.genreCheck'),
				checkedStyles = 0;

		genreCheckbox.each(function(ind){
			checkedStyles += this.checked ? 1 : 0;
		});

		checkedStyles = ( checkedStyles == genreCheckbox.length ? 'All' : checkedStyles);

		checkBlock.closest('.chartAlbumItem').find('.styleCounter').text(checkedStyles);

	});

	$('.genreSwitchBtn, .genreSwitchBackBtn').on('click', function(){
		body_var.toggleClass('show_subgenres');

		return false;
	});

	$('.subgenreToggleBtn').on('click', function(){
		$(this).next('.subgenreToggleBlock').slideToggle();

		return false;
	});

});
