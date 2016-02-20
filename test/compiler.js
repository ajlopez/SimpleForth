
var sfc = require('../lib/compiler'),
    sfm = require('../lib/machine');

// Create machine

var machine = sfm.machine();

// Create compiler

var compiler = sfc.compiler(machine);

exports['Compile integer'] = function (test) {
    var result = compiler.compile('123');

    test.ok(result);
    test.equal(result, "forth.push(123);");
}

exports['Compile undefined word'] = function (test) {
    var result = compiler.compile('Math');

    test.ok(result);
    test.equal(result, "forth.push(Math);");
}

exports['Compile defined word'] = function (test) {
    var result = compiler.compile('dup');
    test.ok(result);
    test.equal(result, "forth.apply('dup');");
}

exports['Compile two words'] = function (test) {
    var result = compiler.compile('1 dup');
    test.ok(result);
    test.equal(result, "forth.push(1);forth.apply('dup');");
}

exports['Compile three words'] = function (test) {
    var result = compiler.compile('1 Math dup');
    test.ok(result);
    test.equal(result, "forth.push(1);forth.push(Math);forth.apply('dup');");
}

exports['Compile native operator'] = function (test) {
    var result = compiler.compile('1 2 + dup');
    test.ok(result);
    test.equal(result, "forth.push(1 + 2);forth.apply('dup');");
}

exports['Compile native operator without enough arguments'] = function (test) {
    var result = compiler.compile('1 + dup');
    test.ok(result);
    test.equal(result, "forth.push(1);forth.apply('+');forth.apply('dup');");
}

exports['Compile simple assigment'] = function (test) {
    var result = compiler.compile('1 x=');
    test.ok(result);
    test.equal(result, "var x = 1;");
}

exports['Compile assigment'] = function (test) {
    var result = compiler.compile('1 dup x=');
    test.ok(result);
    test.equal(result, "forth.push(1);forth.apply('dup');var x = forth.pop();");
}

exports['Compile unary operator'] = function (test) {
    var result = compiler.compile('1 2 + !');
    test.ok(result);
    test.equal(result, "forth.push(!(1 + 2));");
}

exports['Compile string'] = function (test) {
    var result = compiler.compile('." Hello world"');

    test.ok(result);
    test.equal(result, 'forth.push("Hello world");');
}

exports['Compile integer skipping comment'] = function (test) {
    var result = compiler.compile('( it is an integer) 123');

    test.ok(result);
    test.equal(result, "forth.push(123);");
}

exports['Compile variable'] = function (test) {
    var result = compiler.compile('variable x');

    test.ok(result);
    test.equal(result, "var x;");
}