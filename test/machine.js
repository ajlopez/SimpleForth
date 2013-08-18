
var sfm = require('../lib/machine.js');
    
exports['Creates machine'] = function (test) {
    var machine = sfm.createMachine();
    test.ok(machine);
}

exports['Length'] = function (test) {
    var machine = sfm.createMachine();
    test.equal(machine.length(), 0);
}

exports['Machine push pop'] = function (test) {
    var machine = sfm.createMachine();
    machine.push(1);
    test.equal(machine.length(), 1);
    test.equal(machine.pop(), 1);
}

exports['Machine push push top pop pop'] = function (test) {
    var machine = sfm.createMachine();

    machine.push(1);
    machine.push(3);
    test.equal(machine.top(), 3);
    test.equal(machine.length(), 2);
    test.equal(machine.pop(), 3);
    test.equal(machine.pop(), 1);
}
  
exports['Initial dup'] = function (test) {
    var machine = sfm.createMachine();

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
    var machine = sfm.createMachine();

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
    var machine = sfm.createMachine();

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
    var machine = sfm.createMachine();

    test.ok(machine.isNative('+'));
    test.equal(machine.getNativeArity('+'), 2);
    test.equal(machine.isNative('spam'), false);
}

exports['Comment'] = function (test) {
    var machine = sfm.createMachine();

    test.equal(machine.defined('('), true);
    test.equal(machine.isImmediate('('), true);
}
