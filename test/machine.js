
var sfm = require('../lib/machine.js');
    
exports['Creates machine'] = function (test) {
    var machine = sfm.machine();
    test.ok(machine);
}

exports['Length'] = function (test) {
    var machine = sfm.machine();
    test.equal(machine.length(), 0);
}

exports['Machine push pop'] = function (test) {
    var machine = sfm.machine();
    machine.push(1);
    test.equal(machine.length(), 1);
    test.equal(machine.pop(), 1);
}

exports['Machine return push pop'] = function (test) {
    var machine = sfm.machine();
    machine.rpush(42);
    test.equal(machine.length(), 0);
    test.equal(machine.rlength(), 1);
    test.equal(machine.rpop(), 42);
}

exports['Machine push push top pop pop'] = function (test) {
    var machine = sfm.machine();

    machine.push(1);
    machine.push(3);
    test.equal(machine.top(), 3);
    test.equal(machine.length(), 2);
    test.equal(machine.pop(), 3);
    test.equal(machine.pop(), 1);
}
  
exports['Initial dup'] = function (test) {
    var machine = sfm.machine();

    function dup(forth) {
        var value = machine.pop();
        machine.push(value);
        machine.push(value);
    }

    dup.forth = true;

    machine.push(1);
    machine.push(dup);
    test.equal(machine.pop(), 1);
    test.equal(machine.pop(), 1);
}

exports['Define and apply dup'] = function (test) {
    var machine = sfm.machine();

    function dup(forth) {
        var value = machine.pop();
        machine.push(value);
        machine.push(value);
    }

    dup.forth = true;

    machine.define('dup', dup);
    machine.push(2);
    machine.apply('dup');
    test.equal(machine.pop(), 2);
    test.equal(machine.pop(), 2);
}

exports['Defined'] = function (test) {
    var machine = sfm.machine();

    function dup(forth) {
        var value = machine.pop();
        machine.push(value);
        machine.push(value);
    }

    dup.forth = true;

    test.equal(machine.defined('dup'), true);
    test.equal(machine.defined('spam'), false);
}

exports['Binary native operator'] = function (test) {
    var machine = sfm.machine();

    test.ok(machine.isNative('+'));
    test.equal(machine.getNativeArity('+'), 2);
    test.equal(machine.isNative('spam'), false);
}

exports['Comment'] = function (test) {
    var machine = sfm.machine();

    test.equal(machine.defined('('), true);
    test.equal(machine.isImmediate('('), true);
}

exports['Output with write'] = function (test) {
    var machine = sfm.machine();
    
    test.ok(machine.output);
    test.equal(typeof machine.output, 'object');
    test.ok(machine.output.write);
    test.equal(typeof machine.output.write, 'function');
}

exports['Machine write'] = function (test) {
    var machine = sfm.machine();
    
    var result = '';
    
    machine.output.write = function (data) {
        result += data.toString();
    }
    
    machine.write(42);
    test.equal('42', result);
    machine.write('ok');
    test.equal('42ok', result);
}

exports['Compile from machine'] = function (test) {
    var machine = sfm.machine();
    
    var result = machine.compile('123');
    test.ok(result);
    test.equal(result, "forth.push(123);");
}