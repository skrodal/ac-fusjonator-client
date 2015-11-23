//
var ajaxSpinner = '<p><span class="badge bg-yellow"><i class="fa fa-refresh fa-spin"></i>&nbsp;&nbsp;Nå snakker jeg med Adobe Connect.</span></p><p>Dette kan ta litt tid, bare vent til jeg er ferdig du.</p>';
// Used for both error info and CSV table preview
var $infoModalTitle = $('#csvPreviewModal').find('h4.modal-title');
var $infoModalBody = $('#csvPreviewModal').find('div.modal-body');

/**
 * 1.
 *
 * Check user supplied CSV. If all good, generateTableFromCSV() will process the data
 * further.
 */
$('#btnCheckCSV').on('click', function () {
	if ($('#txtCSV').val().length < 1) {
		UTILS.alertError('Tomt?', 'Lim inn CSV i tekstfeltet f&oslash;rst.');
		return false;
	}
	$infoModalTitle.html('CSV Sjekk');
	$infoModalBody.html('');

	try {
		// Using jquery-csv library; populate CSVData obj on success
		$.csv.toArrays($('#txtCSV').val().trim(), {}, function (err, CSVData) {
			// Make sure there is enough data
			if (CSVData.length < 2) {
				$infoModalBody.html(
					'<div class="alert alert-warning">' +
					'<h4><i class="icon fa fa-warning"></i> Lite innhold...</h4>' +
					'<p>For at dette skal v&aelig;re verdt innsatsen kunne du lagt til minst to rader da!</p>' +
					'</div>');
				return false;
			}
			// CSV found, generate preview table (and check for further errors)
			generateTableFromCSV(CSVData);
		});
	} catch (err) {
		// jquery-csv found issues with the CSV that does not adhere to the standard
		$infoModalBody.html(
			'<div class="alert alert-warning">' +
			'<h4><i class="icon fa fa-warning"></i> Feil i CSV!</h4>' +
			'<p>' + err.message + '</p>' +
			'</div>');
		UTILS.alertError('CSV Feil', err.message);
		return false;
	}
});

/**
 * 2.
 *
 * Check the passed CSV array for any issues. If OK;
 *
 *  - store the array with ADOBECONNECT (setCSVData(CSVData))
 *  - create a preview table with all usernames (old->new) sorted for final inspection
 *
 * If any issues with the CSV (e.g. not exactly two columns), display a warning instead and reset
 * CSV Data and UI.
 *
 * @param CSVData
 */
function generateTableFromCSV(CSVData) {
	// Preview table
	var $tableClone = $('#csvTableTemplate').clone();
	//
	var usernameOld, usernameNew;
	// Sort
	/*
	 CSVData.sort(function (a, b) {
	 return a[0] > b[0] ? 1 : -1;
	 });
	 */
	//
	var errorInCSV = false;
	//
	$infoModalTitle.html('CSV Sjekk');
	$infoModalBody.html('');
	// Expected CSV is an array with [0] usernameOld, [1] usernameNew
	$.each(CSVData, function (index, csv) {
		// We want two columns only, break otherwise.
		if (csv.length !== 2) {
			$tableClone.empty();
			$infoModalBody.html(
				'<div class="alert alert-warning">' +
				'<h4><i class="icon fa fa-warning"></i> Feil format i CSV!</h4>' +
				'<p>Jeg forventer to (2) kolonner per rad, hverken mer eller mindre!</p>' +
				'</div>');
			errorInCSV = true;
			return false;
		}
		//
		usernameOld = CSVData[index][0] = csv[0].trim();
		usernameNew = CSVData[index][1] = csv[1].trim();

		if (usernameOld.length == 0 || usernameNew.length == 0) {
			$tableClone.empty();
			$infoModalBody.html(
				'<div class="alert alert-warning">' +
				'<h4><i class="icon fa fa-warning"></i> Tomme felter</h4>' +
				'<p>En eller flere felter i CSVen din mangler verdi.</p>' +
				'</div>');
			errorInCSV = true;
			return false;
		}
		$tableClone.find('tbody').append('<tr><td>' + usernameOld + '</td><td>' + usernameNew + '</td></tr>');
	});

	// As long as no errors were caught in the $.each loop...
	if (!errorInCSV) {
		$infoModalBody.html('<p>Bra jobba! CSV ser grei ut! Ta en titt selv i tabellen under: </p>');
		$infoModalBody.append($tableClone.html());
		$infoModalBody.append(
			'<p><span class="badge bg-aqua">' + CSVData.length + '</span> brukere i tabellen</p>'
		);
		ADOBECONNECT.setCSVData(CSVData);
		$("div#csvStatusMsg").removeClass("hidden");
	} else {
		ADOBECONNECT.setCSVData(false);
		$("div#csvStatusMsg").addClass("hidden");
		$("#preMigrationStatusMsg").html('<p>Gjør unna steg #1 først...</p>');
	}
}


/**
 * 3.
 *
 * POST the CSV array to the API for inspection (checks if logins exist etc.)
 */
$('#submitCSVForInspection').on('click', function () {
	var bodyHtml = '';
	var migrationData = [];
	// Reset
	ADOBECONNECT.setMigrationData(false);
	$("#preMigrationStatusMsg").html('<p>Gjør unna steg #1 først...</p>');

	$infoModalTitle.html('Status brukerkontoer');
	$infoModalBody.html(ajaxSpinner);

	console.info('Sender følgende CSV til ConnectFusjonator API for inspeksjon:');
	console.info(ADOBECONNECT.getCSVData());

	$.when(ADOBECONNECT.verifyAccountListXHR()).done(function (response) {
		// Called function will handle error msgs, only react to good news here...
		if (response !== false) {
			bodyHtml += '<p>Alle brukernavn har nå blitt sjekket i Adobe Connect. Oversikt ser du nedenfor.</p>';
			console.info('ConnectFusjonator API har sjekket brukerliste:');
			console.info(response);
			// List all users that can be migrated
			if (!jQuery.isEmptyObject(response.ok)) {
				var $tblUserOK = $('#csvTableTemplate').clone();
				// Users to be migrated
				$.each(response.ok, function (userName, userInfo) {
					$tblUserOK.find('tbody').append('<tr><td class="text-blue">' + userInfo.account_info_current.username + '</td><td class="text-green">' + userInfo.account_info_new.username + '</td></tr>');
					// Array with user objects currentUserId, newUsername
					migrationData.push({
						principal_id: userInfo.account_info_current.principal_id,
						new_username: userInfo.account_info_new.username,
						current_username: userInfo.account_info_current.username
					});
				})
				bodyHtml += '<h4><span class="text-green icon ion-checkmark-circled"></span> Følgende <span class="badge bg-aqua">' + migrationData.length + '</span> brukerkontoer kan fusjoneres: </h4>';
				bodyHtml += $tblUserOK.html();
				// THIS is the array that will be sent to Adobe Connect for actual renaming of usernames!
				ADOBECONNECT.setMigrationData(migrationData);
				// Display users that can be migrated and show button:
				$('#preMigrationStatusMsg').html(
					'<p>Følgende <span class="badge bg-aqua">' + migrationData.length + '</span> brukerkontoer vil fusjoneres fra gammelt brukernavn til nytt brukernavn: </p>' +
					$tblUserOK.html() + '<br>' +
					'<p>Klikk på knappen under for å kjøre fusjonering. Gamle brukernavn i tabellen over vil da endres til nye brukernavn i Adobe Connect.</p>' +
					'<p class="clearfix"><button id="btnMigrateUsers" data-toggle="modal" data-target="#csvPreviewModal" class="btn btn-success pull-right icon ion-checkmark"> Fusjonér!</button></p>'
				);
			}

			// List users that CANNOT be migrated
			if (!jQuery.isEmptyObject(response.problem)) {
				bodyHtml += '<h4><span class="text-red icon ion-minus-circled"></span> Følgende brukerkontoer kan IKKE fusjoneres</h4> <p>Nytt brukernavn er allerede registrert i Adobe Connect. </p>';
				var $tblUserPROBLEM = $('#csvTableTemplate').clone();
				// Users with problem
				$.each(response.problem, function (userName, userInfo) {
					$tblUserPROBLEM.find('tbody').append('<tr><td class="text-muted">' + userInfo.account_info_current.username + '</td><td class="text-red">' + userInfo.account_info_new.username + '</td></tr>');
				})
				bodyHtml += $tblUserPROBLEM.html();
			}

			// List users that don't have an account
			if (!jQuery.isEmptyObject(response.ignore)) {
				bodyHtml += '<h4><span class="text-gray icon ion-information-circled"></span> Følgende brukernavn har ingen konto</h4><p>Disse vil ignoreres</p>';
				var $tblUserIGNORE = $('#csvTableTemplate').clone();
				// Users to be ignored
				$.each(response.ignore, function (userName, userInfo) {
					$tblUserIGNORE.find('tbody').append('<tr><td class="text-muted">' + userInfo.account_info_current.username + '</td><td class="text-muted">' + userInfo.account_info_new.username + '</td></tr>');
				})
				bodyHtml += $tblUserIGNORE.html();
			}
			$infoModalBody.html(bodyHtml);
			// $infoModalBody.html('<pre>' + JSON.stringify(response, null, 4) + '</pre>');
		}
	});

});


/**
 * 4.
 *
 * POST the list of users to migrate to the API for actual migration.
 */
$('div#preMigrationStatusMsg').on('click', 'button#btnMigrateUsers',function () {
	var bodyHtml = '';
	console.info('Sender følgende brukere til ConnectFusjonator API for endelig migrering:');
	console.info(ADOBECONNECT.getMigrationData());
	//
	$("#postMigrationStatusMsg").html('<p>Gjør unna steg #1 og #2 først...</p>');

	$infoModalTitle.html('Status fusjonering');
	$infoModalBody.html(ajaxSpinner);

	$.when(ADOBECONNECT.migrateUserAccountsXHR()).done(function (response) {
		console.info('Status fra ConnectFusjonator API etter gjennomført migrering:');
		console.info(response);
		$infoModalBody.html('<h4>Ferdig! Vis status her, oppdater siste box, nullstill alt annet (tekstbokser, CSVDATA, MIGRATIONDATA).</h4>');
	});

});




