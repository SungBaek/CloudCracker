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
    
    /*
    var MyClass = Parse.Object.extend("Cloudd");
    var test = new MyClass();
    test.add("test", "arrrr");
    console.log(test.toJSON());
    test.save(null,
      {success:function (a) {
        console.log("worked!");
        options.success();
      },
      error:function(a, e) {
        console.log("didn't work" + e.message);
        options.error(e.message);
      }
    });*/
   

      //calorie

        var obj = new Parse.Object("Nutrients");
        var cal_re = new RegExp(/Calories:\<\/strong\>\s([0-9\.]*)/); 
        var calOut = cal_re.exec(html);
        var outputText = '{ "Calorie : " '+ calOut[1];
        obj.add("calorie", calOut[1]);
        //name
        var name_re = new RegExp(/Nutritional information<br\/>$\s*(.*)$/m);
        var nameOut = name_re.exec(html);
        var outputText = ', "Name" : ' + nameOut[1];
        obj.add("name", nameOut[1]);
        //calorie from fat
        var calFromFat_re = new RegExp(/Calories\sfrom\sFat:\s([0-9\.]*)/);
        var calFromFatOut = calFromFat_re.exec(html);
        outputText += ', "Calorie From Fat" : ' + calFromFatOut[1];
        obj.add("fatCalorie", calFromFatOut[1]);

      //Total fat
        var totFat_re = new RegExp(/Total\sFat:\<\/strong\>\s([0-9\.]*)/);
        var totFatOut = totFat_re.exec(html);
        outputText += ', "Fat" :' + totFatOut[1];
        obj.add("totFat", totFatOut[1]);
      
      //saturated fat
        var satFat_re = new RegExp(/Saturated\sFat:\s([0-9\.]*)/);
        var satFatOut = satFat_re.exec(html);
        outputText += ', "Saturated Fat" :' + satFatOut[1];
        obj.add("satFat", satFatOut[1]);

      //Trans fat
        var transFat_re = new RegExp(/Trans\sFat:\s([0-9\.]*)/);
        var transFatOut = transFat_re.exec(html);
        outputText += ', "Trans Fat" :' + transFatOut[1];
        obj.add("transFat", transFatOut[1]);

      //cholesterol
        var chol_re = new RegExp(/Cholesterol:\<\/strong\>\s([0-9\.]*)/);
        var cholOut = chol_re.exec(html);
        outputText += ', "Cholesterol" :' + cholOut[1];
        obj.add("chol", cholOut[1]);

      //sodium
        var sod_re = new RegExp(/Sodium:\<\/strong\>\s([0-9\.]*)/);
        var sodOut = sod_re.exec(html);
        outputText += ', "Sodium" :' + sodOut[1];
        obj.add("sod", sodOut[1]);

      //Total Carbohydrate:
        var totCarb_re = new RegExp(/Total\sCarbohydrate:\<\/strong\>\s([0-9\.]*)/);
        var totCarbOut = totCarb_re.exec(html);
        outputText += ', "Total Carbohydrate" :' + totCarbOut[1];
        obj.add("carb", totCarbOut[1]);

      //Dietary Fiber: 
        var fib_re = new RegExp(/Dietary\sFiber:\s([0-9\.]*)/);
        var fibOut = fib_re.exec(html);
        outputText += ', "Dietary Fiber" :' + fibOut[1];
        obj.add("fiber", fibOut[1]);

      //sugar
        var sug_re = new RegExp(/Sugars:\s([0-9\.]*)/);
        var sugOut = sug_re.exec(html);
        outputText += ', "Sugars" :' + sugOut[1]; //
        obj.add("sugar", sugOut[1]);

      //protein
        var prot_re = new RegExp(/Protein:\<\/strong\>\s([0-9\.]*)/);
        var protOut = prot_re.exec(html);
        outputText += ', "Protein" :' + protOut[1];
        obj.add("protein", protOut[1]);



      //end of nutrition facts


      outputText += ' }';
      //var outputJSON = JSON.parse(outputText);
      console.log("Got this nutrient: " + outputText);

      //save here
      obj.save(null,
      {success:function (a) {
        console.log("worked!");
        options.success();
      },
      error:function(a, e) {
        console.log("didn't work" + e.message);
        options.error(e.message);
      }
    }); //lol
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
  Parse.Cloud.httpRequest({
    url: http
  }).then(function(httpResponse){
    var re = new RegExp(/nutritional\.cfm\?[^"]*/g);
    var output = re.exec(httpResponse.text);
    
    while (output != null){
        //got the url here call the function here and do it again
        var outputPath = mealPath + output;
        console.log("Extra meal output : " + outputPath); //use this to test output.
        setTimeOut(getNutrients(outputPath), 200);
        output = re.exec(httpResponse.text);
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
    //cloud test
  
    //de neve
    var deneve_re = new RegExp(/"visitorHeadings"\>\<a\shref="([^"]*)"\>De\sNeve/);
    var deneveOut = deneve_re.exec(httpResponse.text);
    if( deneveOut !== null){
      //follow html here
      var denevePath = path + deneveOut[1];
      denevePath = path + denevePath;
      console.log("Deneve Output: " + deneveOut);
      //extractMeal(denevePath);
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
      extractMeal( covelPath );
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
Parse.Cloud.define("flushNutrients", function(request,response){
  var query = new Parse.Query("Nutrients");
  query.each(function(obj){
    obj.destroy();
  });
});

//test for schudule/background job

Parse.Cloud.run('sendScheduledMessages', {
    success: function() {
        status.success();
    },
    error: function(error) {
        status.error(error);
    }
});
});
