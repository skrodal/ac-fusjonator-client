var UTILS = (function() {

	/**** AUTH CYCLE ****/
	  
	 
	 
	function _updateAuthProgress(msg) {
		var w = parseInt($('#authProgressBar')[0].style.width.slice(0, -1));
		// This one here is a bit dumb, but basically change the number so that 
		// x number of checks adds up to just over 100% when completed..
		$('#authProgressBar').width(w + 100 + '%');
		$('#authProgressBar').text(msg);

		if ($('#authProgressBar')[0].style.width.slice(0, -1) >= 100) {
			$('#pageLoading').fadeOut(function(){
				$('#pageDashboard').fadeIn().removeClass('hidden');
			});
		}
	}

	function _showAuthError(funcname, msg) {
		$('#authError').fadeIn().removeClass('hidden');
		$('#authError').append("<p><code>" + funcname + ": " + JSON.stringify(msg, undefined, 2) + "</code></p>");
	}

	function _alertError(title, message) {
		$('#error_modal').find('#title').html(title);
		$('#error_modal').find('#message').html(message);
		$('#error_modal').modal('show');
	}

	function _isAlphaNumeric(input){
		var validChars = /^[a-zA-Z0-9]+[a-zA-Z0-9-_]+[a-zA-Z0-9]$/;
		if(!(validChars.test(input))){
			return false
		}
		return true;
	}

	function _isset(variable){
		return typeof(variable) != "undefined" && variable !== null;
	}


	/*** Expose public functions ***/
	return {
		isAlphaNumeric: function(input){
			return _isAlphaNumeric(input);
		},
		updateAuthProgress: function(msg) {
			_updateAuthProgress(msg);
		},
		showAuthError: function(funcname, msg) {
			_showAuthError(funcname, msg);
		},
		alertError : function(title, message) {
			_alertError(title, message);
		},
		isset : function(variable){
			return _isset(variable);
		}

	}
})();

