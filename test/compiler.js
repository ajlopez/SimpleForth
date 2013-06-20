
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

var result = compiler.compile('dup');
assert.ok(result);
assert.equal(result, "forth.apply('dup');");

// Compile two words

var result = compiler.compile('1 dup');
assert.ok(result);
assert.equal(result, "forth.push(1);forth.apply('dup');");

// Compile three words

var result = compiler.compile('1 Math dup');
assert.ok(result);
assert.equal(result, "forth.push(1);forth.push(Math);forth.apply('dup');");

// Compile native operator

var result = compiler.compile('1 2 + dup');
assert.ok(result);
assert.equal(result, "forth.push(1 + 2);forth.apply('dup');");

// Compile native operator without enough arguments

var result = compiler.compile('1 + dup');
assert.ok(result);
assert.equal(result, "forth.push(1);forth.apply('+');forth.apply('dup');");

// Compile simple assigment

var result = compiler.compile('1 x=');
assert.ok(result);
assert.equal(result, "var x = 1;");

// Compile assigment

var result = compiler.compile('1 dup x=');
assert.ok(result);
assert.equal(result, "forth.push(1);forth.apply('dup');var x = forth.pop();");

// Compile unary operator

var result = compiler.compile('1 2 + !');
assert.ok(result);
assert.equal(result, "forth.push(!(1 + 2));");

// Compile string

var result = compiler.compile('." Hello world"');

assert.ok(result);
assert.equal(result, 'forth.push("Hello world");');

// Compile integer skipping comment

var result = compiler.compile('( it is an integer) 123');

assert.ok(result);
assert.equal(result, "forth.push(123);");

// Compile variable

var result = compiler.compile('variable x');

assert.ok(result);
assert.equal(result, "var x;");
