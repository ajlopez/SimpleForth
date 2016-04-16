
// SimpleForth module

var compiler = require('./compiler');
var machine = require('./machine');
var fs = require('fs');

function compile(text, forth) {
    var code = compiler.compiler(forth).compile(text);
    return new Function("forth", code);
}

function execute(text, forth) {
    if (!forth)
        forth = machine.machine();
    
    var fn = compile(text, forth);
    
    fn(forth);
}

function evaluate(text, forth) {
    if (!forth)
        forth = machine.machine();
    
    var fn = compile(text, forth);
    
    fn(forth);
    
    return forth.top();
}

function evaluateFile(filename, forth) {
    var text = fs.readFileSync(filename).toString();
    
    return evaluate(text, forth);
}

module.exports = {
    compile: compile,
    execute: execute,
    evaluate: evaluate,
    evaluateFile: evaluateFile,
    forth: function ()  { return machine.machine(); }
};

