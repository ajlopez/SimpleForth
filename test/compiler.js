
var sfc = require('../lib/compiler'),
    sfm = require('../lib/machine'),
    assert = require('assert');

// Create machine

var machine = sfm.createMachine();

// Create compiler

var compiler = sfc.createCompiler(machine);

assert.ok(compiler);

// Compile integer

var result = compiler.compile('123');

assert.ok(result);
assert.equal(result, "forth.push(123);");

// Compile undefined word

var result = compiler.compile('Math');

assert.ok(result);
assert.equal(result, "forth.push(Math);");

// Compile defined word

machine.define('mydup', function () {});
var result = compiler.compile('mydup');
assert.ok(result);
assert.equal(result, "forth.apply('mydup');");

