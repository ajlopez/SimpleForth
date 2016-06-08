
var sfc = require('../lib/compiler');
var sfm = require('../lib/machine');
var sfl = require('../lib/lexer');

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
    test.equal(result, "forth.push(1); forth.apply('dup');");
}

exports['Compile three words'] = function (test) {
    var result = compiler.compile('1 Math dup');
    test.ok(result);
    test.equal(result, "forth.push(1); forth.push(Math); forth.apply('dup');");
}

exports['Compile native operator'] = function (test) {
    var result = compiler.compile('1 2 + dup');
    test.ok(result);
    test.equal(result, "forth.push(1 + 2); forth.apply('dup');");
}

exports['Compile 1+ as native operation'] = function (test) {
    var result = compiler.compile('2 1+');
    test.ok(result);
    test.equal(result, "forth.push(2 + 1);");
}

exports['Compile 1- as native operation'] = function (test) {
    var result = compiler.compile('2 1-');
    test.ok(result);
    test.equal(result, "forth.push(2 - 1);");
}

exports['Compile 2+ as native operation'] = function (test) {
    var result = compiler.compile('3 2+');
    test.ok(result);
    test.equal(result, "forth.push(3 + 2);");
}

exports['Compile 2- as native operation'] = function (test) {
    var result = compiler.compile('3 2-');
    test.ok(result);
    test.equal(result, "forth.push(3 - 2);");
}

exports['Compile 2* as native operation'] = function (test) {
    var result = compiler.compile('3 2*');
    test.ok(result);
    test.equal(result, "forth.push(3 * 2);");
}

exports['Compile 2/ as native operation'] = function (test) {
    var result = compiler.compile('3 2/');
    test.ok(result);
    test.equal(result, "forth.push(3 / 2);");
}

exports['Compile 2/ without enough arguments'] = function (test) {
    var result = compiler.compile('2/');
    test.ok(result);
    test.equal(result, "forth.apply('2/');");
}

exports['Compile 0= as native operation'] = function (test) {
    var result = compiler.compile('3 0=');
    test.ok(result);
    test.equal(result, "forth.push(3 === 0);");
}

exports['Compile 0= without enough arguments'] = function (test) {
    var result = compiler.compile('0=');
    test.ok(result);
    test.equal(result, "forth.apply('0=');");
}

exports['Compile native operator without enough arguments'] = function (test) {
    var result = compiler.compile('1 + dup');
    test.ok(result);
    test.equal(result, "forth.push(1); forth.apply('+'); forth.apply('dup');");
}

exports['Compile simple assigment'] = function (test) {
    var result = compiler.compile('1 x=');
    test.ok(result);
    test.equal(result, "var x = 1;");
}

exports['Compile assigment'] = function (test) {
    var result = compiler.compile('1 dup x=');
    test.ok(result);
    test.equal(result, "forth.push(1); forth.apply('dup'); var x = forth.pop();");
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

exports['Compile integer skipping line comment'] = function (test) {
    var result = compiler.compile('\\ it is an integer\n 123');

    test.ok(result);
    test.equal(result, "forth.push(123);");
}

exports['Compile integer skipping line comment with carriage return'] = function (test) {
    var result = compiler.compile('\\ it is an integer\r 123');

    test.ok(result);
    test.equal(result, "forth.push(123);");
}

exports['Compile variable'] = function (test) {
    var result = compiler.compile('variable x');

    test.ok(result);
    test.equal(result, "var x;");
}

exports['Compile variable using lexer'] = function (test) {
    var lexer = sfl.lexer('variable x');
    var result = compiler.compile(lexer);

    test.ok(result);
    test.equal(result, "var x;");
}

exports['Compile if then'] = function (test) {
    var result = compiler.compile('1 if 2 then');

    test.ok(result);
    test.equal(result, "if (1) { forth.push(2); }");
}

exports['Compile if else then'] = function (test) {
    var result = compiler.compile('1 if 2 else 3 then');

    test.ok(result);
    test.equal(result, "if (1) { forth.push(2); } else { forth.push(3); }");
}

