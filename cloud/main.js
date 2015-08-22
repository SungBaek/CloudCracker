// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
var path = "http://m.dining.ucla.edu/menu/index.cfm?";
var mealPath = "http://m.dining.ucla.edu/menu/";


function getNutrients(http){
  Parse.Cloud.httpRequest({
    url: http
  }).then(function(httpResponse) {
    //success
    var html = httpResponse.text;
    console.log("Inside get Nutrients");

    //to test if it worked
    
      var test = new Parse.Object("CloudTest");
      test.add("test", "arrrr");
      test.save();
   

      //calorie
        var obj = new Parse.Object("Nutrients");

        var cal_re = new RegExp(/Calories:<\/strong>([^<]*)/); 
        var calOut = cal_re.exec(html);
        var outputText = '{ "Calorie" :' + calOut[1];
        obj.add("calorie", calOut[1]);
        obj.save();
        //calorie from fat
        var calFromFat_re = new RegExp(/Calories from Fat:([^<]*)/);
        var calFromFatOut = calFromFat_re.exec(html);
        outputText += ', "Calorie From Fat" : ' + calFromFatOut[1];

      //Total fat
        var totFat_re = new RegExp(/Total Fat:<\/strong>([^g]*)/);
        var totFatOut = totFat_re.exec(html);
        outputText += ', "Fat" :' + totFatOut[1];
      
      //saturated fat
        var satFat_re = new RegExp(/Saturated Fat:([^g]*)/);
        var satFatOut = satFat_re.exec(html);
        outputText += ', "Saturated Fat" :' + satFatOut[1];

      //Trans fat
        var transFat_re = new RegExp(/Trans Fat:([^g]*)/);
        var transFatOut = transFat_re.exec(html);
        outputText += ', "Trans Fat" :' + transFatOut[1];

      //cholesterol
        var chol_re = new RegExp(/Cholesterol:<\/strong>([^m]*)/);
        var cholOut = chol_re.exec(html);
        outputText += ', "Cholesterol" :' + cholOut[1];

      //sodium
        var sod_re = new RegExp(/Sodium:<\/strong>([^m]*)/);
        var sodOut = sod_re.exec(html);
        outputText += ', "Sodium" :' + sodOut[1];

      //Total Carbohydrate:
        var totCarb_re = new RegExp(/Total Carbohydrate:<\/strong>([^g]*)/);
        var totCarbOut = totCarb_re.exec(html);
        outputText += ', "Total Carbohydrate" :' + totCarbOut[1];

      //Dietary Fiber: 
        var fib_re = new RegExp(/Dietary Fiber:([^g]*)/);
        var fibOut = fib_re.exec(html);
        outputText += ', "Dietary Fiber" :' + fibOut[1];

      //sugar
        var sug_re = new RegExp(/Sugars:([^g]*)/);
        var sugOut = sug_re.exec(html);
        outputText += ', "Sugars" :' + sugOut[1];

      //protein
        var prot_re = new RegExp(/Protein:<\/strong>([^g]*)/);
        var protOut = prot_re.exec(html);
        outputText += ', "Protein" :' + protOut[1];



      //end of nutrition facts


      outputText += ' }';
      var outputJSON = JSON.parse(outputText);
      console.log("Got this nutrient: " + outputText);

      //save JSON
      

      /*
      nutrients.save(outputJSON, {success: function(a) {
        //success handling
        console.log("Success!!\n");
        console.log(outputJSON);
      }, 
      error: function(a,b){
        console.log("Couldn't save\n");
      }
      });*/
    }, function(HttpResponse) {
    console.error('request failed dawg');
  });
}


function extractMeal(http){
  console.log("Inside extract Meal!");
  Parse.Cloud.httpRequest({
    url: http
  }).then(function(httpResponse){
    var re = new RegExp(/nutritional\.cfm\?[^"]*/g);
    
    var output = re.exec(httpResponse.text);
    
    while (output != null){
        //got the url here call the function here and do it again

        output = re.exec(httpResponse.text);
        var outputPath = mealPath + output;
       // console.log("Extra meal output : " + outputPath); //use this to test output.
        getNutrients(outputPath);
    }
  }, function(HttpResponse) {
    console.error('request failed dawg');
  });  
}

Parse.Cloud.define("populateDiningHallMenus", function(request,response){
  Parse.Cloud.httpRequest({
    url: "http://m.dining.ucla.edu/menu/index.cfm?restaurantType=Residential"
  }).then(function(httpResponse) {
    var html = httpResponse.text;
    //to test if it works?

    console.log("Success in connecting to dining halls!");

  
    //de neve
    var deneve_re = new RegExp(/"visitorHeadings"\>\<a\shref="([^"]*)"\>De\sNeve/);
    var deneveOut = deneve_re.exec(httpResponse.text);
    if( deneveOut !== null){
      //follow html here
      var denevePath = path + deneveOut[1];
      denevePath = path + denevePath;
      console.log("Deneve Output: " + deneveOut);
    }
    else{
      console.log("no deneve :(");
    }

    //covel
    var covel_re = new RegExp(/"visitorHeadings"\>\<a\shref="([^"]*)"\>Covel\sDining/);
    var covelOut = covel_re.exec(httpResponse.text);
    if( covelOut !== null){
      var covelPath = path + covelOut[1];
      console.log("covel output: " + covelPath);
      extractMeal(covelPath);
    }
    else{
      console.log("no covel :(");
    }
    //feast
    var feast_re = new RegExp(/"visitorHeadings"\>\<a\shref="([^"]*)"\>FEAST\sAt\sRieber/);
    var feastOut = feast_re.exec(httpResponse.text);
      
  }, function(HttpResponse) {
    console.error('request failed dawg');
  });
});
//git commit -a
//:wq
//git push origin master
