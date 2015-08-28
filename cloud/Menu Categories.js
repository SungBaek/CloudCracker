
//soups
var soupMeat_re = new new RegExp(/<li class="level4"><a class="itemlink" href="recipedetail.asp?RecipeNumber=977\d{3}&PortionSize=6" onmouseover="SetRecDesc('977\d{3}');">[(A-za-z)\.]*/);
var soupMeatOut = soupMeat_re.exec(html);
outputText += ', "Soup" :' + soupMeatOut[1];
obj.add("Soup", soupMeatOut[1]);

var soupVeg_re = new RegExp(/<li class="level4"><a class="itemlinkt" href="recipedetail.asp?RecipeNumber=977\d{3}&PortionSize=6" onmouseover="SetRecDesc('977\d{3}');">[(A-za-z)\.]*/);
var soupVegOut = soupVeg_re.exec(html);
outputText += ', "Soup" :' + soupVegOut[1];
obj.add("Soup", soupVegOut[1]);
