/* global MENU */
var APP = (function () {
	var success = '<i class="icon ion-checkmark-circled"></i>';
	var error = '<i class="icon ion-minus-circled"></i>';

	// Bootstrapping after all necessary AJAX calls have been completed
	$(document).ready(function () {
		$.when(DATAPORTEN.readyUser()).done(function (user) {
			updateUserUI();
			MENU.init();
		});

		$.when(ADOBECONNECT.getVersionXHR()).done(function (version){
			console.log(version);
		});

	});

	function updateUserUI() {
		// User-specific
		$('.userFirstName').html(' ' + DATAPORTEN.user().name.first);
		$('.userFullName').html(' ' + DATAPORTEN.user().name.full);
		$('.feideOrg').html(' ' + DATAPORTEN.user().org.id);
		$('.feideOrgShortname').html(' ' + DATAPORTEN.user().org.shortname);

		$('.feideAffiliation').html(' admin');
		$('.userImage').attr('src', DATAPORTEN.user().photo);
		// Dev
		$('#dataportenSessionInfo').text(JSON.stringify(DATAPORTEN.user(), undefined, 2));
		// Show top logout dropdown
		$('#userMenu').fadeIn().removeClass('hidden');
		//
	}

})();