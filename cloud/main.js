
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
var htmlParser = require("cloud/htmlparser.js");

Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("populateHedrick", function(request,response){
	Parse.Cloud.httpRequest({
		url: "http://menu.ha.ucla.edu/foodpro/"
	}).then(function(httpResponse) {
		//success
		console.log(httpResponse.text);
	}, function(HttpResponse) {
		console.error('request failed dawg');
	});
});

