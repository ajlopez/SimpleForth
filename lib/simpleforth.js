
// SimpleForth module

var compiler = require('./compiler');
var machine = require('./machine');

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

module.exports = {
    compile: compile,
    execute: execute,
    forth: function ()  { return machine.machine(); }
};