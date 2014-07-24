
// (int|throws|public|enum|byte)

var assert = {
    public: "value",
    mid: {

    },
    enum: {

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
assert.enum.end = "foo";


console.log(assert.throws());
console.log(assert.mid.int);
console.log(assert.enum.end);
console.log(assert.public);
console.log(byte);
console.log(_byte);
