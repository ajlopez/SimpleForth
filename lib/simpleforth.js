
// SimpleForth module

const compiler = require('./compiler');
const machine = require('./machine');
const fs = require('fs');

function compile(text, forth) {
    if (!forth)
        forth = machine.machine();
    
    const code = compiler.compiler(forth).compile(text);
    
    return new Function("forth", code);
}

function execute(text, forth) {
    if (!forth)
        forth = machine.machine();
    
    const fn = compile(text, forth);
    
    fn(forth);
}

function evaluate(text, forth) {
    if (!forth)
        forth = machine.machine();
    
    const fn = compile(text, forth);
    
    fn(forth);
    
    return forth.top();
}

function evaluateFile(filename, forth) {
    const text = fs.readFileSync(filename).toString();
    
    return evaluate(text, forth);
}

function executeFile(filename, forth) {
    const text = fs.readFileSync(filename).toString();
    
    execute(text, forth);
}

module.exports = {
    compile: compile,
    execute: execute,
    executeFile: executeFile,
    evaluate: evaluate,
    evaluateFile: evaluateFile,
    forth: function ()  { return machine.machine(); }
};

