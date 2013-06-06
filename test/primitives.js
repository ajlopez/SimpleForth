
var primitives = require('../lib/primitives.js'),
    machine = require('../lib/machine.js').createMachine(),
    assert = require('assert');

// First primitive

assert.ok(primitives.dup);
assert.equal(typeof primitives.dup, "function");

// Apply dup

machine.push(1);
primitives.dup(machine);
assert.equal(machine.length(), 2);
assert.equal(machine.pop(), 1);
assert.equal(machine.pop(), 1);