
var MENU = (function () {
	// The menu
	var $sidebarMenu = $('#sidebarMenu');

	function init() {
		$('li#menuDashboard').removeClass('hidden').fadeIn();
		$('li#menuService').removeClass('hidden').fadeIn();
	}

	$sidebarMenu.on('click', 'li', function () {
		// Make clicked li style active
		$(this).addClass('active').siblings().removeClass("active");
		// Hide all pages
		$('section.app_page').addClass('hidden');
		// Show selected page
		$('section#' + $(this).data('page')).fadeIn().removeClass('hidden');
	});

	return {
		init: function () {
			init();
		}
	}
})();


