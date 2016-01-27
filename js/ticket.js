$(function($){

	$('.newTicketBtn').on('click', function(){

		$(this).toggleClass('fav_toggle_add fav_toggle_rm');
		$('.oldTickets').toggle();
		$('.newTicket').toggle();

		return false;
	});

});
