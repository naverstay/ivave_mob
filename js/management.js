$(function($){

	$(".editableBlock").editable("<?php print $url ?>save.php", {
		//type      : 'input',
		submitdata: {_method: "put"},
		select    : true,
		submit    : 'OK',
		cancel    : 'Cancel',
		cssclass  : "editable"
	});

	$('.newPlaylistBtn').on('click', function(){

		$('.newPlaylist').show();

		return false;
	});

	$('.renameBtn').on('click', function(){

		var pl = $(this).closest('.playlistControlRow');

		if(pl.hasClass('open_controls')){
			pl.removeClass('open_controls');

			setTimeout(function(){
				pl.find('.editableBlock').click();
			}, 400);
		} else{
			pl.find('.editableBlock').click();
		}

		return false;
	});

	$('.playlistCollapseBtn').on('click', function(){
		$(this).closest('.albumWrapper').toggleClass('open_row').find('.playlistRow').toggle();

		return false;
	});

});
