
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
var htmlParser = require("cloud/htmlparser.js");
var path = "http://m.dining.ucla.edu/menu/index.cfm?";


Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("populateHedrick", function(request,response){
	Parse.Cloud.httpRequest({
		url: "http://m.dining.ucla.edu/menu/nutritional.cfm?id=1420708590&r=Covel%20Dining"
	}).then(function(httpResponse) {
		//success
		var html = httpResponse.text;
		//to test if it worked
		var test = new Parse.Object("Cloudtest");
		test.add("test",httpResponse.text);
		console.log(httpResponse.text);
		test.save();

		//calorie
  		//var cal_re = new RegExp(/Calories:<\/strong>([^<]*)/);
  	  	var cal_re = new RegExp(/Calories:<\/strong>([^<]*)/); 
  	  	var calOut = cal_re.exec(httpResponse.text);
 	  	console.log(calOut[1]);
  	  	outputText = '{ "Calorie" :' + calOut[1];
  	  	//calorie from fat
  	  	var calfromfat_re = new RegExp(/Calories from Fat:([^<]*)/);
  	  	var calfromfatOut = calfromfat_re.exec(httpResponse.text);
  	  	console.log(calfromfatOut[1]);
  	  	outputText += ', "CalorieFromFat" : ' + calfromfatOut[1];

  		//Total fat

    	//saturated fat

   	 	//Trans fat

    	//cholesterol
    
  		 //sodium

    //Total Carbohydrate:

    //Dietary Fiber: 

    //sugar

    //protein



  	  	outputText += ' }';
    	var outputJSON = JSON.parse(outputText);
  		console.log(outputJSON);

	}, function(HttpResponse) {
		console.error('request failed dawg');
	});
});


