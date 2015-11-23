/* global saveTextAsFile */
/* global FEIDE_CONNECT */
/* global $ */
/* global jso */
/* global UTILS */
/**
 * Speaks with Adobe Connect proxy API behind Feide Connect gatekeeper.
 */

var ADOBECONNECT = (function () {
	var CSV_DATA = false;
	var MIGRATION_DATA = false;
	var breezeToken = null;

	// Mainly for testing/dev
	function _getAPIRoutesXHR() {
		return jso.ajax({
				url: jso.config.get("endpoints").adobeconnect,
				dataType: 'json'
			})
			.done(function (response) {
				console.log(response);
			})
			.fail(function (jqXHR, textStatus, error) {
				UTILS.alertError("Adobe Connect", "<p>En feil oppstod i samtale med Adobe Connect API:</p><p><code>" + jqXHR.responseJSON.message + "</code></p>");
				return false;
			});
	}

	function _getACVersionXHR() {
		return jso.ajax({
				url: jso.config.get("endpoints").adobeconnect + 'version/',
				dataType: 'json'
			})
			.pipe(function (response) {
				return response.data;
			})
			.fail(function (jqXHR, textStatus, error) {
				var message = jqXHR.responseJSON && jqXHR.responseJSON.message || 'Fikk ingen respons fra tjener. Timeout?';
				UTILS.alertError("Adobe Connect", "<p>En feil oppstod i samtale med Adobe Connect API:</p><p><code>" + message + "</code></p>");
				return false;
			});
	};


	/**
	 * 1.
	 *
	 * POST array with the user accounts to the API for further checks. If OK, the API will return an
	 * object with user accounts that exist in Adobe Connect, both those that can and cannot be migrated.
	 * Usernames that do not exist in the service are will not be returned and ignored from here on in.
	 *
	 * Store the returned object for the migration call.
	 *
	 * @returns false if no users were returned, object otherwise
	 * @private
	 */
	function _verifyAccountListXHR() {
		var new_csv_arr = [];
		// Stupid csv.toArrays actually extracts to an object type... Fix this before submitting
		if (CSV_DATA) {
			$.each(CSV_DATA, function (index, csv) {
				new_csv_arr.push(csv);
			});
			return jso.ajax({
					// Fusjonator endpoint that takes a POSTed array of user CSV (oldLogin, newLogin)
					url: jso.config.get("endpoints").adobeconnect + 'users/verify/',
					method: 'POST',
					data: {
						user_list: new_csv_arr
						// token : breezeToken
					},
					dataType: 'json'
				})
				// Pipe the response so we can preprocess a little bit..
				.pipe(function (response) {
					if (!jQuery.isEmptyObject(response.data)) {
						return response.data;
					} else {
						UTILS.alertError("Fusjonator API", "<p>Fikk tom liste i svar fra Adobe Connect. Kan virke som om ingen av brukernavnene i lista di finnes i Adobe Connect.</p>");
						return false;
					}
				})
				.fail(function (jqXHR, textStatus, error) {
					var message = jqXHR.responseJSON && jqXHR.responseJSON.message || 'Fikk ingen respons fra tjener. Timeout?';
					return false;
				});
		} else {
			UTILS.alertError("Adobe Connect", "<p>Mangler CSV data!</p>");
			return false;
		}
	}

	/**
	 *
	 *
	 *
	 * @returns {*}
	 * @private
	 */
	function _migrateUserAccountsXHR() {
		if (MIGRATION_DATA) {
			return jso.ajax({
					// Fusjonator endpoint that takes a POSTed object of users to be migrated (oldLogin, newLogin)
					url: jso.config.get("endpoints").adobeconnect + 'users/migrate/',
					method: 'POST',
					data: {
						user_list: MIGRATION_DATA
						// token : breezeToken
					},
					dataType: 'json'
				})
				// Pipe the response so we can preprocess a little bit..
				.pipe(function (response) {
					return response.data;
				})
				.fail(function (jqXHR, textStatus, error) {
					var message = jqXHR.responseJSON && jqXHR.responseJSON.message || 'Fikk ingen respons fra tjener. Timeout?';
					UTILS.alertError("Adobe Connect", "<p>En feil oppstod i samtale med Adobe Connect API: </p><p><code>" + message + "</code></p>");
					return false;
				});
		} else {
			UTILS.alertError("Adobe Connect", "<p>'Mangler migreringsdata!'</p>");
			return false;
		}
	}


	// ----------- SETTERS ----------- //

	function _setCSVData(csvData) {
		CSV_DATA = csvData;
		// If CSV is invalid, also set any cleared migration data to false.
		if (!CSV_DATA) {
			MIGRATION_DATA = false;
		}
	}

	function _setMigrationData(migrationData) {
		MIGRATION_DATA = migrationData;
	}

	// ----------- ./SETTERS ----------- //

	return {
		verifyAccountListXHR: function () {
			return _verifyAccountListXHR();
		},
		migrateUserAccountsXHR: function () {
			return _migrateUserAccountsXHR();
		},


		setCSVData: function (csvData) {
			_setCSVData(csvData);
		},
		setMigrationData: function (migrationData) {
			_setMigrationData(migrationData);
		},
		getCSVData: function () {
			return CSV_DATA;
		},
		getMigrationData: function () {
			return MIGRATION_DATA;
		},
		getAPIRoutesXHR: function () {
			return _getAPIRoutesXHR();
		},
		getVersionXHR: function () {
			return _getACVersionXHR();
		}
	}
})(); // Self-invoking






