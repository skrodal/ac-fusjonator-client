/**
 * Feide Connect JSO kickoff for this client.
 *
 * Auth and collection of user/group info, all combined in a USER object.
 *
 */

// Global vars
var DEV = !true;

// Settings pertaining to this client.
var jso = new JSO({
	providerID: "FC-ac-fusjonator",
	client_id: "CHANGEME TO: CLIENT_ID IN DASHBOARD",
	redirect_uri: "CHANGEME TO: REDIRECT URI IN DASHBOARD",
	authorization: "https://auth.feideconnect.no/oauth/authorization",
	scopes: {
		request: ["email", "userid-feide", "userinfo", "gk_ac-fusjonator", "gk_ac-fusjonator_admin", "profile"],
		require: ["email", "userid-feide", "userinfo", "gk_ac-fusjonator", "gk_ac-fusjonator_admin", "profile"]
	},
	endpoints: {
		userinfo: "https://auth.feideconnect.no/userinfo",
		photo: "https://auth.feideconnect.no/user/media/",
		adobeconnect: "https://ac-fusjonator.gk.feideconnect.no/api/ac-fusjonator/"
	}
});

jso.callback();
// Catch response
jso.getToken(function (token) {
	// console.log('Authorization: Bearer ' + token.access_token);
	// console.log(JSON.stringify(token, undefined, 2));
});


