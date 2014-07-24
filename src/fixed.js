
var assert = {
    "public": "value"
};

assert["throws"] = function()
{
    return "bla";
};

assert["int"] = 12;

console.log(assert["throws"]());
console.log(assert["int"]);
console.log(assert["public"]);