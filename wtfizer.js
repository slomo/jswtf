
Sorry, just trying github edit UI

var bool = function bool(value) {
  if (value) {
    return "!![]";
  } else {
    return "![]";
  }
};

var digit = function digit(value) {
  if (value === 0) {
    return "+[]";
  } else {
    oneStr = "+" + bool(true);
    str = "";
    for (i=0; i < value; i ++) {
      str += oneStr;
    }
    return str;
  }
}

var unumber = function  unumber(value) {

  digits = [];
  
  do {
    var d = digit(value % 10);
    digits.push("(" + d + ")" );
    value = Math.floor(value / 10);
  } while ( value > 0 )
  
  return "+([]+" + digits.reverse().join("+") + ")";
}

var specialChar = function specialchar(value) {

  words = {
    "undefined" : "{}[" + bool(false) + "]",
    "NaN" : "+{}+[]",
    "false" : bool(false) + "+[]",
    "true" : bool(true) + "+[]",
    "[object Object]" : "{}+[]"
  }

  for (word in words) {
    index = word.indexOf(value);

    if (index != -1) {
      return "(" + words[word] + ")[" + unumber(index) + "]";
    } 
  } 
}

var string = function string(value, translator) {

  var list = [];

  for (i in value) {
    list.push(translator(value[i])) 
  }

  return "(" + list.join("+") + ")" ;
};

console.log(specialChar("b"));

assert.equal(eval(bool(true)), true );
assert.equal(eval(bool(false)), false);

assert.equal(eval(digit(8)), 8);
assert.equal(eval(unumber(430)), 430);

assert.equal(eval(specialChar("b")),"b");
assert.equal(eval(string("blablabla",specialChar)), "blablabla");

