
var sfm = require('../lib/machine.js'),
    assert = require('assert');
    
// Creates machine

var machine = sfm.createMachine();

assert.ok(machine);

// Length

assert.equal(machine.length(), 0);

// Machine push pop

machine.push(1);
assert.equal(machine.length(), 1);
assert.equal(machine.pop(), 1);

// Machine push push top pop pop

machine.push(1);
machine.push(3);
assert.equal(machine.top(), 3);
assert.equal(machine.length(), 2);
assert.equal(machine.pop(), 3);
assert.equal(machine.pop(), 1);

// Initial dup

function dup(forth) {
    var value = machine.pop();
    machine.push(value);
    machine.push(value);
}

dup.forth = true;

machine.push(1);
machine.push(dup);
assert.equal(machine.pop(), 1);
assert.equal(machine.pop(), 1);

// Define and apply dup

machine.define('dup', dup);
machine.push(2);
machine.apply('dup');
assert.equal(machine.pop(), 2);
assert.equal(machine.pop(), 2);

// Defined

assert.equal(machine.defined('dup'), true);
assert.equal(machine.defined('spam'), false);

// Define binary native operator

machine.defineNative('+', 2);
assert.ok(machine.isNative('+'));
assert.equal(machine.getNativeArity('+'), 2);
assert.equal(machine.isNative('spam'), false);







