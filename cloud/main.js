// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
var path = "http://m.dining.ucla.edu/menu/index.cfm?";

Parse.Cloud.define("populateDiningHallMenus", function(request,response){
  Parse.Cloud.httpRequest({
    url: "http://m.dining.ucla.edu/menu/index.cfm?restaurantType=Residential"
  }).then(function(httpResponse) {
    var html = httpResponse.text;
    //to test if it works?
    var test = new Parse.Object("CloudTest");
    test.add("test", httpResponse.text);
    console.log(httpResponse.text);
    test.save();

    //de neve
    var deneve_re = new RegExp(/"visitorHeadings"\>\<a\shref="([^"]*)"\>De\sNeve/);
    var deneveOut = deneve_re.exec(xhr.responseText);
    if( deveneOut != null){
      //follow html here
      var denevePath = path + deneveOut[1];
      denevePath = path + denevePath;
    }
    console.log(deneveOut);
    //covel
    var bfast_re = new RegExp(/"visitorHeadings"\>\<a\shref="([^"]*)"\>Covel\sDining/);
    var bfastOut = bfast_re.exec(xhr.responseText);
    console.log(bfastOut);
    //feast
    var feast_re = new RegExp(/"visitorHeadings"\>\<a\shref="([^"]*)"\>FEAST\sAt\sRieber/)
    var feastOut = feast_re.exec(xhr.responseText);
    console.log(feastOut);
      
  }, function(HttpResponse) {
    console.error('request failed dawg');
  });
});
//git commit -a
//:wq
//git push origin master
function getNutrients(http){
  Parse.Cloud.httpRequest({
    url: http
  }).then(function(httpResponse) {
    //success
    var html = httpResponse.text;
    //to test if it worked
    /*
    var test = new Parse.Object("Cloudtest");
    test.add("test",httpResponse.text);
    console.log(httpResponse.text);
    test.save();
    */ //test not needed for now

     //calorie

        var cal_re = new RegExp(/Calories:<\/strong>([^<]*)/); 
        var calOut = cal_re.exec(httpResponse.text);
        var outputText = '{ "Calorie" :' + calOut[1];
        //calorie from fat
        var calFromFat_re = new RegExp(/Calories from Fat:([^<]*)/);
        var calFromFatOut = calFromFat_re.exec(httpResponse.text);
        outputText += ', "Calorie From Fat" : ' + calFromFatOut[1];

      //Total fat
        var totFat_re = new RegExp(/Total Fat:<\/strong>([^<]*)/);
        var totFatOut = totFat_re.exec(httpResponse.text);
        outputText += ', "Fat" :' + totFatOut[1];
      
      //saturated fat
        var satFat_re = new RegExp(/Saturated Fat:([^<]*)/);
        var satFatOut = satFat_re.exec(httpResponse.text);
        outputText += ', "Saturated Fat" :' + satFatOut[1];

      //Trans fat
        var transFat_re = new RegExp(/Trans Fat:([^<]*)/);
        var transFatOut = transFat_re.exec(httpResponse.text);
        outputText += ', "Trans Fat" :' + transFatOut[1];

      //cholesterol
        var chol_re = new RegExp(/Cholesterol:<\/strong>([^<]*)/);
        var cholOut = chol_re.exec(httpResponse.text);
        outputText += ', "Cholesterol" :' + cholOut[1];

      //sodium
        var sod_re = new RegExp(/Sodium:<\/strong>([^<]*)/);
        var sodOut = sod_re.exec(httpResponse.text);
        outputText += ', "Sodium" :' + sodOut[1];

      //Total Carbohydrate:
        var totCarb_re = new RegExp(/Total Carbohydrate:<\/strong>([^<]*)/);
        var totCarbOut = totCarb_re.exec(httpResponse.text);
        outputText += ', "Total Carbohydrate" :' + totCarbOut[1];

      //Dietary Fiber: 
        var fib_re = new RegExp(/Dietary Fiber:([^<]*)/);
        var fibOut = fib_re.exec(httpResponse.text);
        outputText += ', "Dietary Fiber" :' + fibOut[1];

      //sugar
        var sug_re = new RegExp(/Sugars:([^<]*)/);
        var sugOut = sug_re.exec(httpResponse.text);
        outputText += ', "Sugars" :' + sugOut[1];

      //protein
        var prot_re = new RegExp(/Protein:<\/strong>([^<]*)/);
        var protOut = prot_re.exec(httpResponse.text);
        outputText += ', "Protein" :' + protOut[1];


      //end of nutrition facts

      outputText += ' }';
      var outputJSON = JSON.parse(outputText);
     

      //save JSON
      var nutrients = new Parse.Object('Nutrients');
      nutrients.save(outputJSON, {success: function(a) {
        //success handling
        console.log("Success!!\n");
        console.log(outputJSON);
      }, 
      error: function(a,b){
        //error handling
      }
    });

  }, function(HttpResponse) {
    console.error('request failed dawg');
  });
};

