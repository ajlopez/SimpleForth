
// SimpleForth module

var compiler = require('./compiler');
var machine = require('./machine');

function compile(text, forth) {
    var code = compiler.createCompiler(forth).compile(text);
    return new Function("forth", code);
}

module.exports = {
    compile: compile,
    createForth: function ()  { return machine.machine(); }
};