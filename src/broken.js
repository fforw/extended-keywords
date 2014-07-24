
// (int|throws|public|enum|byte)

var assert = {
    short: "value",
    mid: {

    },
    float: {

    }
};

var byte = "initial";
byte = "changed";

var _byte = "not shadowed";
assert.throws = function()
{
    return "bla";
};

assert.mid.int = 12;
assert.float.end = "foo";


console.log(assert.throws());
console.log(assert.mid.int);
console.log(assert.float.end);
console.log(assert.short);
console.log(byte);
console.log(_byte);
