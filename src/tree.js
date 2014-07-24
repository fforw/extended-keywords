var fs = require("fs");
var util = require("util");

var esprima = require("esprima");
var estraverse = require("estraverse");

if (!process.argv.length)
{
    util.print("ERROR: Need file argument");
    process.exit(1);
}

var file = process.argv[2];

fs.readFile(file, function(err, data){
    if (err)
    {
        throw err;
    }

    var tree = esprima.parse(data);

    console.log(JSON.stringify(tree, null, "    "));
});
