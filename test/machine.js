
var sfm = require('../lib/machine.js'),
    assert = require('assert');
    
// Creates machine

var machine = sfm.createMachine();

assert.ok(machine);

// Machine push pop

machine.push(1);
assert.equal(machine.pop(), 1);

// Machine push push pop pop

machine.push(1);
machine.push(2);
assert.equal(machine.pop(), 2);
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







