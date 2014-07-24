var fs = require("fs");
var util = require("util");

var esprima = require("esprima");
var estraverse = require("estraverse");
var escodegen = require("escodegen");

var _ = require("lodash-node");


var EXTENDED_KEYWORDS = [
    // extended keywords as defined in rhino / yuicompressor
    // which are *not* in the ECMA5 spec
    "abstract",
    "boolean",
    "byte",
    "char",
    "double",
    "final",
    "float",
    "goto",
    "int",
    "long",
    "native",
    "short",
    "synchronized",
    "throws",
    "transient",
    "volatile",
    "yield",
    "default",
    "typeof",
    "switch"

//    // extended in rhino, marked as "future keywords" in ECMA spec
//    "class",
//    "enum",
//    "extends",
//    "super",
//    "const",
//    "import",
//
//    // extended keywords in rhino, marked as "future keywords in strict"
//    "implements",
//    "private",
//    "public",
//    "interface",
//    "package",
//    "protected",
//    "static"
];


var extendedReserved = {};
var l = ["_*("];
EXTENDED_KEYWORDS.forEach(function (v, index)
{
    extendedReserved[v] = true;

    if (index > 0)
    {
        l.push("|");
    }

    l.push(v);

});
l.push(")");

var identifierRegExp = l.join("");

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

//    console.log(JSON.stringify(tree, null, "    "));

    estraverse.replace(tree, {
        enter: function (node, parent) {
            //console.log(node.type);

            var newNode;
            if (node.type === "Property" && extendedReserved[node.key.name])
            {
                newNode = _.cloneDeep(node);

                node.key = {
                    "type": "Literal",
                    "value": node.key.name,
                    "raw": '"' + node.key.name + "'"
                };

                return node;
            }
            else if (node.type === "MemberExpression" && extendedReserved[node.property.name] )
            {
                newNode = _.cloneDeep(node);

                node.computed = true;
                node.property = {
                    "type": "Literal",
                    "value": node.property.name,
                    "raw": '"' + node.property.name + "'"
                };
            }
            else if (node.type === "Identifier")
            {

                var m = new RegExp(identifierRegExp, "g").exec(node.name);
                if (m)
                {
                    newNode = {
                        type: "Identifier",
                        name: "_" + node.name
                    };

                    return  newNode;
                }
            }

            return node;
        }
    });


    console.log(escodegen.generate(tree));
});
