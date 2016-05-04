/**
 * Dataporten JSO kickoff for this client.
 *
 * Auth and collection of user/group info, all combined in a USER object.
 *
 */

// Global vars
var DEV = !true;

// Settings pertaining to this client.
var jso = new JSO({
	providerID: "DP-ac-fusjonator",
	client_id: "CHANGEME TO: CLIENT_ID IN DASHBOARD",
	redirect_uri: "CHANGEME TO: REDIRECT URI IN DASHBOARD",
	authorization: "https://auth.dataporten.no/oauth/authorization",
	scopes: {
		request: ["email", "userid-feide", "userinfo", "gk_ac-fusjonator", "gk_ac-fusjonator_admin", "profile"],
		require: ["email", "userid-feide", "userinfo", "gk_ac-fusjonator", "gk_ac-fusjonator_admin", "profile"]
	},
	endpoints: {
		userinfo: "https://auth.dataporten.no/userinfo",
		photo: "https://auth.dataporten.no/user/media/",
		adobeconnect: "CHANGEME TO: ac-fusjonator in DASHBOARD"
	}
});

jso.callback();
// Catch response
jso.getToken(function (token) {
	// console.log('Authorization: Bearer ' + token.access_token);
	// console.log(JSON.stringify(token, undefined, 2));
});


