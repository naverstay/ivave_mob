var html_var,
		body_var,
		doc_var,
		global_window_Height,
		popupOrderItem,
		controlPanelBtn,
		popupBtn,
		browserWindow,
		baseWindowWidth = 1024,
		baseM = 0.0714286666666667,
		baseFZ = 1.4,
		maxFZ = 1.5,
		scrollBars,
		devPopups = [],
		menuToggleBtn,
		windowScrollTimeout = 100,
		windowScrollHendler = 0,
		windowResizeTimeout = 100,
		windowResizeHendler = 0,
		$completed_orders_form,
		searchInput,
		volumeSlider,
		$add_to_playlist,
		$send_confirmation,
		$send_to_client,
		$cart_orders_form,
		$postpone_orders_form,
		$contacts_form;

$(function($){

	html_var = $('html'),
			doc_var = $(document),
			body_var = $('body'),
			scrollBars = $('.scrollBar'),
			menuToggleBtn = $('.menuToggleBtn'),
			volumeSlider = $('.volumeControl'),
			global_window_Height = $(window).height(),
			popupOrderItem = $('.popup_order_item'),
			controlPanelBtn = $('.controlPanelBtn'),
			searchInput = $('#search_input'),
			popupBtn = $('.popupBtn');

	var header = $('.header'),
			searchToggleForm = $('.searchToggleForm'),
			searchToggleBtn = $('.searchToggleBtn')
			;

	browserWindow = $(window);

	var myNav = navigator.userAgent.toLowerCase();

	html_var.toggleClass('ie_gt8', ((myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : 0) > 8);

	/*	browserWindow.on('scroll', function(){
	 var scrollLeft = doc.scrollLeft();
	 header.css('marginLeft', (scrollLeft > 0 ? -scrollLeft : 0));
	 });*/

	volumeSlider.find('.volumeSlider').slider({
		orientation: "vertical",
		range      : "min",
		min        : 0,
		max        : 100,
		value      : 60,
		slide      : function(event, ui){

			var volLevel = ui.value;

			volumeSlider.toggleClass('vol_low', !volLevel);
			volumeSlider.toggleClass('vol_high', volLevel > 80);

		}
	}).on('mousedown', function(){
		$(this).closest('.hoverHolder').addClass('control_active');
	});

	$('.closeUnregBanner').on('click', function(){
		var unregBanner = $('.unregBanner');
		unregBanner.animate({'margin-top': -unregBanner.outerHeight()}, 600, function(){
			unregBanner.hide();
		});

		return false;
	});

	doc_var.on('mouseup', function(){
		setTimeout(function(){
			$('.hoverHolder').removeClass('control_active');
		}, 800);
	});

	menuToggleBtn.on('click', function(){
		closeLeftMenu();
		return false;
	});

	$('.hoverControl').on('mouseenter', function(){
		//$(this).closest('.hoverHolder').addClass('btn_hovered');
	}).on('mouseleave', function(){
		var firedEl = $(this);
		setTimeout(function(){
			firedEl.closest('.hoverHolder').removeClass('btn_hovered');
		}, 1);
	}).on('click', function(){
		var cl = $(this).closest('.hoverHolder');
		if(/btn_hovered|hovered/ig.test(cl.attr('class'))){
			cl.removeClass('btn_hovered hovered');
		} else{
			cl.addClass('btn_hovered hovered');
		}
	});

	$('.hoverHolder').on('mouseenter', function(){
		//$(this).addClass('hovered mouseenter');
	}).on('mouseleave', function(){
		var firedEl = $(this);
		firedEl.removeClass('mouseenter');
		setTimeout(function(){
			if(!firedEl.hasClass('mouseenter')) firedEl.removeClass('hovered');
		}, 1);

	});

	if($('.chosen-select').length){
		$('.chosen-select').chosen({width: "100%", className: "form_o_b_item form_o_b_value_edit_mode"});
	}

	if($("#confirm_download_3").length){
		$completed_orders_form = new dialog('#confirm_download_3', 'dialog_global dialog_g_size_2 noSwipe dialog_close_butt_mod_1', '.albumDownloadBtn', false, 330 * baseM + 'em', false, true);
	}

	searchToggleBtn.on('click', function(){
		body_var.toggleClass('search_form_opened');
		if(searchToggleForm.hasClass('search_form_opened')){
			searchInput.focus();
		} else{
			searchInput.blur();
		}

		return false;
	});

	$('.newPlaylist').on('focus', function(){
		$(this).closest('.player_row').removeClass('new_playlist');
	}).on('blur', function(){
		$(this).closest('.player_row').addClass('new_playlist');
	});

	$add_to_playlist = $("#add_to_playlist").dialog({
		autoOpen     : false,
		modal        : true,
		closeOnEscape: true,
		closeText    : '',
		show         : "fade",
		position     : {my: "left center", at: "center center", of: this},
		draggable    : true,
		dialogClass  : 'dialog_global dialog_g_size_2 noSwipe dialog_close_butt_mod_1',
		width        : 278 * baseM + 'em',
		open         : function(event, ui){
			body_var.addClass('blur_content');
		},
		close        : function(event, ui){
			body_var.removeClass('blur_content');
			$('.btn_active_dialog').removeClass('btn_active_dialog');
		}
	});

	$('.plBtn').on('click', function(){

		var firedEl = $(this).addClass('btn_active_dialog');

		$add_to_playlist.dialog("option", "position", {
			my: 'right center',
			at: "left-10 center",
			of: firedEl
		}).dialog("open");

		return false;
	});

	$('.filterToggleBtn').on('click', function(){
		closeRightMenu();
		return false;
	});

	$('.trackInfoToggle').on('click', function(){
		$(this).closest('.album_row').removeClass('open_check').toggleClass('open_controls');
		return false;
	});

	$('.toPlayListCheck').on('click', function(){
		$(this).closest('.album_row').toggleClass('open_check');
	});

	$('.devPopupBtn').each(function(ind){
		var firedEl = $(this), formId = firedEl.attr('href');

		if($(formId).length){

			var form_el = $(formId), dlg = new dialog(formId, form_el.data('dialog-class') || 'dialog_global dialog_g_size_2 noSwipe dialog_close_butt_mod_2', 'popupForm',
					false, (form_el.data('popup-width') || 320) * baseM + 'em', false, true);

			devPopups.push(dlg);

			firedEl.on('click', function(){
				devPopups[$(this).parent().index()].openDialog();
				return false;
			});
		}
	});

	$('.playerClearBtn').on('click', function(){
		$(this).closest('.hoverHolder').removeClass('btn_hovered hovered');
		return false;
	});

	$('.playerCloseBtn').on('click', function(){
		console.log('playerCloseBtn');
		html_var.toggleClass('player_hidden');
		return false;
	});

	initSearchAutoComplite();

	initScrollBars();

	initSliders();

	initSwipe();

	all_dialog_close();

	windowRisize();

});

function showTrackControls(albumRow){

	//console.log(albumRow.length);

	if(albumRow.length){

		if(albumRow.hasClass('open_check')){
			albumRow.removeClass('open_check');
			setTimeout(function(){
				albumRow.find('.toPlayListCheck').prop('checked', false);
			}, 100);
		} else{
			albumRow.addClass('open_controls');
			return true;
		}
	}
}

function showCheck(albumRow){


	//console.log(albumRow.length);

	if(albumRow.length){

		if(albumRow.hasClass('open_controls')){
			albumRow.removeClass('open_controls'); //.css('marginRight', -1.05 * albumRow.find('.track_controls').width());
		} else{
			albumRow.addClass('open_check').find('.toPlayListCheck').prop('checked', true);
		}
	}
}

function closeLeftMenu(){
	if(!html_var.hasClass('mob_aside_close')){
		html_var.addClass('mob_aside_close');
	} else{
		html_var.removeClass('mob_menu_close');
	}
}

function closeRightMenu(){

	if($('.aside_right_menu').length){
		if(!html_var.hasClass('mob_menu_close')){
			html_var.addClass('mob_menu_close');
		} else{
			html_var.removeClass('mob_aside_close');
		}
	}

}

function swipeLeftFunc(e, distance){
	var noSwipe = $(e.target).closest('.noSwipe');

	if(!noSwipe.length){
		console.log('left swipe');

		if(!html_var.hasClass('mob_menu_close')){
			html_var.addClass('mob_menu_close');
			return;
		}

		var albumRow = $(e.target).closest('.album_row'),
				globalRightTrack = $(e.target).closest('.globalLeftTrack'),
				genreSwitchBtn = $(e.target).closest('.genreSwitchBtn'),
				playlistControlRow = $(e.target).closest('.playlistControlRow');

		//console.log(event, direction, distance, duration, fingerCount);

		if(genreSwitchBtn.length){
			body_var.addClass('show_subgenres');
		} else if(playlistControlRow.length){
			if((html_var.hasClass('portrait') || html_var.hasClass('mobile'))) playlistControlRow.addClass('open_controls');
		} else if(albumRow.length){
			if((html_var.hasClass('portrait') || html_var.hasClass('mobile'))) showTrackControls(albumRow);
		} else if(globalRightTrack.length){
			closeRightMenu();
		} else{
			closeRightMenu();
		}
	} else{
		console.log('left swipe skipped');
	}
}

function swipeRightFunc(e, distance){

	var noSwipe = $(e.target).closest('.noSwipe');

	if(!noSwipe.length){
		console.log('right swipe');

		var albumRow = $(e.target).closest('.album_row'),
				globalLeftTrack = $(e.target).closest('.globalLeftTrack'),
				subgenreSwitcher = $(e.target).closest('.subgenreSwitcher'),
				playlistControlRow = $(e.target).closest('.playlistControlRow');

		//console.log(event, direction, distance, duration, fingerCount);
		//$(event.target).css('background', 'red');

		if(subgenreSwitcher.length){
			body_var.removeClass('show_subgenres');
		} else if(playlistControlRow.length){
			if((html_var.hasClass('portrait') || html_var.hasClass('mobile'))) playlistControlRow.removeClass('open_controls');
		} else if(albumRow.length){
			if((html_var.hasClass('portrait') || html_var.hasClass('mobile'))) showCheck(albumRow);
		} else if(globalLeftTrack.length){
			closeLeftMenu();
		} else{
			closeLeftMenu();
		}
	} else{
		console.log('right swipe skipped');
	}

}

function swipeUpFunc(e){
	if($(e.target).hasClass('.wrapper_overlay')) return false;
}

function swipeDownFunc(e){
	if($(e.target).hasClass('.wrapper_overlay')) return false;

	var noSwipe = $(e.target).closest('.noSwipe');

	if(!noSwipe.length){
		/*	var playerQueueBlock = $(e.target).closest('.player_queue_block');

		 if(playerQueueBlock.length){
		 playerQueueBlock.closest('.hoverHolder').removeClass('btn_hovered hovered');
		 }*/
	}
}

function initSwipe(){

	document.addEventListener('touchstart', handleTouchStart, true);
	document.addEventListener('touchmove', handleTouchMove, true);

	var xDown = null;
	var yDown = null;

	function handleTouchStart(evt){
		xDown = evt.touches[0].clientX;
		yDown = evt.touches[0].clientY;
	}

	function handleTouchMove(evt){
		if(!xDown || !yDown){
			return;
		}

		var xUp = evt.touches[0].clientX;
		var yUp = evt.touches[0].clientY;

		var xDiff = xDown - xUp;
		var yDiff = yDown - yUp;

		if(Math.abs(xDiff) > Math.abs(yDiff)){/*most significant*/
			if(xDiff > 0){
				swipeLeftFunc(evt, Math.abs(xDiff));
				/* left swipe */
			} else{
				swipeRightFunc(evt, Math.abs(xDiff));

				/* right swipe */
			}
		} else{
			if(yDiff > 0){
				console.log('up swipe');

				swipeUpFunc(evt);

				/* up swipe */
			} else{
				console.log('down swipe');

				swipeDownFunc(evt);

				/* down swipe */
			}
		}
		/* reset values */
		xDown = null;
		yDown = null;
	}

	/*	body_var.swipe({
	 excludedElements: "label, button, input, select, textarea, .noSwipe",
	 swipeLeft       : function(event, direction, distance, duration, fingerCount){
	 var albumRow = $(event.target).closest('.album_row');

	 //console.log(event, direction, distance, duration, fingerCount);

	 if(albumRow.length){
	 showTrackControls(albumRow);

	 } else{
	 html_var.addClass('mob_menu_close');
	 }

	 },
	 swipeUp         : function(event, direction, distance, duration, fingerCount){

	 //if($(event.target).hasClass('.wrapper_overlay')) return false;

	 },
	 swipeDown       : function(event, direction, distance, duration, fingerCount){

	 //if($(event.target).hasClass('.wrapper_overlay')) return false;

	 },
	 swipeRight      : function(event, direction, distance, duration, fingerCount){
	 var albumRow = $(event.target).closest('.album_row'),
	 globalLeftTrack = $(event.target).closest('.globalLeftTrack');

	 //console.log(event, direction, distance, duration, fingerCount);
	 //$(event.target).css('background', 'red');
	 if(albumRow.length){
	 showCheck(albumRow);
	 } else if(globalLeftTrack.length){
	 html_var.removeClass('mob_menu_close');
	 console.log('left tracker');
	 } else{
	 html_var.removeClass('mob_menu_close');
	 }

	 }
	 });*/
}

function swipe2(){
	window.onload = function(){
		(function(d){
			var
					ce = function(e, n){
						var a = document.createEvent("CustomEvent");
						a.initCustomEvent(n, true, true, e.target);
						e.target.dispatchEvent(a);
						a = null;
						return false
					},
					nm = true, sp = {x: 0, y: 0}, ep = {x: 0, y: 0},
					touch = {
						touchstart : function(e){
							sp = {x: e.touches[0].pageX, y: e.touches[0].pageY}
						},
						touchmove  : function(e){
							nm = false;
							ep = {x: e.touches[0].pageX, y: e.touches[0].pageY}
						},
						touchend   : function(e){
							if(nm){
								ce(e, 'fc')
							} else{
								var x = ep.x - sp.x, xr = Math.abs(x), y = ep.y - sp.y, yr = Math.abs(y);
								if(Math.max(xr, yr) > 20){
									ce(e, (xr > yr ? (x < 0 ? 'swl' : 'swr') : (y < 0 ? 'swu' : 'swd')))
								}
							}
							;
							nm = true
						},
						touchcancel: function(e){
							nm = false
						}
					};
			for(var a in touch){
				d.addEventListener(a, touch[a], false);
			}
		})(document);
//EXAMPLE OF USE
		var h = function(e){
			console.log(e.type, e)
		};
		document.body.addEventListener('fc', h, false);// 0-50ms vs 500ms with normal click
		document.body.addEventListener('swl', h, false);
		document.body.addEventListener('swr', h, false);
		document.body.addEventListener('swu', h, false);
		document.body.addEventListener('swd', h, false);
	}
}

function initSliders(){

	var swiper = new Swiper('.swiper-container', {
		setWrapperSize     : true,
		slidesPerView      : 'auto',
		paginationClickable: true,
		spaceBetween       : 0,
		freeMode           : true
	});

	/*	$('.slickSlider').slick({
	 lazyLoad      : 'ondemand',
	 dots          : false,
	 infinite      : false,
	 arrows        : false,
	 useCSS        : true,
	 //slidesToScroll: 1,
	 centerMode    : false,
	 //centerPadding : '140px',
	 variableWidth : true,
	 speed         : 600
	 });*/
}

function initScrollBars(){

	if(device.tablet() || device.mobile()){
		html_var.addClass('mobile_mode');

		scrollBars.each(function(){
			var firedEl = $(this);
			firedEl.addClass(firedEl.data('scroller-class'));
		});

	} else{
		
	}

}

function initSearchAutoComplite(){

	var linesForAutocomplete = [
		{label: 'Mickey', artist: 'Artist', url: '#'},
		{label: 'Mickey Graham', artist: 'Artist', url: '#'},
		{label: 'Mick Mill I Be On That', artist: 'Artist', url: '#'},
		{label: 'Mickey Alavon Stroke Me', artist: 'Artist', url: '#'},
		{label: 'Micklemore White Walls', artist: 'Artist', url: '#'},
		{label: 'mick instinctuary', artist: 'Artist', url: '#'},
		{label: 'mick', artist: 'Artist', url: '#'}
	];

	searchInput.autocomplete({
		source  : linesForAutocomplete,
		appendTo: $('.autocomplete_holder'),
		open    : function(e, i){
			//console.log('autocomplete open ');
		},
		close   : function(){
			//console.log('autocomplete close ');
		},
		select  : function(data, value){
			//console.log('autocomplete select ');
		},
		search  : function(data, value){
			//console.log('autocomplete search ');
		}

	}).autocomplete("instance")._renderItem = function(ul, item){
		return $("<li class='search_result player_btn_white'>")
				.append("<div class='fl'><div class='middle_block'><a class='player_btn icon-player_play' href='" + item.url + "'></a></div></div>"
				+ "<div class='fl'><div class='middle_block'><div class='search_result_track'>" + item.label + "</div></div></div>"
				+ "<div class='fr'><div class='middle_block'><div class='search_result_artist'>" + item.artist + "</div></div></div>")
				.appendTo(ul);
	};

}

function windowRisize(){

	/*	$('.track_controls').each(function(ind){
	 var firedEl = $(this);
	 firedEl.closest('.album_row').css('marginRight', -1.2 * firedEl.width());
	 });*/

	var newFZ = browserWindow.width() / baseWindowWidth * baseFZ;

	//body_var.css('font-size', (newFZ > maxFZ ? maxFZ : newFZ) + 'em');

}

function windowScroll(){

	body_var.toggleClass('footer_float_up', browserWindow.scrollTop() == doc_var.height() - browserWindow.height());

	/*	$('.scrollBar').each(function(){
	 var firedEl = $(this), maxHeight = firedEl.data('max_screen_height');

	 if(maxHeight.length){

	 var newHeight = (/%/.test(maxHeight) ? browserWindow.height() * maxHeight.replace('%', '') / 100 : maxHeight ), curHeight = firedEl.css('height').replace('px', '') * 1;

	 console.log(newHeight, curHeight);

	 firedEl.css('height', newHeight + 'px');
	 }

	 });*/

}

$(window).on('resize', function(){

	clearTimeout(windowResizeHendler);

	global_window_Height = browserWindow.height();

	windowResizeHendler = setTimeout(function(){
		windowRisize();
	}, windowResizeTimeout);

}).on('scroll', function(){

	windowScrollHendler = setTimeout(function(){
		windowScroll();
	}, windowScrollTimeout);

}).on('load', function(){

});

function all_dialog_close(){
	body_var.on('click', '.ui-widget-overlay', all_dialog_close_gl);
}

function all_dialog_close_gl(){
	$(".ui-dialog-content").each(function(){
		var $this = $(this);
		if(!$this.parent().hasClass('always_open')){
			$this.dialog("close");
		}
	});
}