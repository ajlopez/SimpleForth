
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

// ?dup

assert.ok(primitives['?dup']);
assert.equal(typeof primitives['?dup'], "function");

machine.push(1);
primitives['?dup'](machine);
assert.equal(machine.length(), 2);
assert.equal(machine.pop(), 1);
assert.equal(machine.pop(), 1);

machine.push(0);
primitives['?dup'](machine);
assert.equal(machine.length(), 1);
assert.equal(machine.pop(), 0);

// drop

assert.ok(primitives.drop);
assert.equal(typeof primitives.drop, "function");

machine.push(1);
primitives.drop(machine);
assert.equal(machine.length(), 0);

// swap

assert.ok(primitives.swap);
assert.equal(typeof primitives.swap, "function");

machine.push(1);
machine.push(2);
primitives.swap(machine);
assert.equal(machine.length(), 2);
assert.equal(machine.pop(), 1);
assert.equal(machine.pop(), 2);

// over

assert.ok(primitives.over);
assert.equal(typeof primitives.over, "function");

machine.push(1);
machine.push(2);
primitives.over(machine);
assert.equal(machine.length(), 3);
assert.equal(machine.pop(), 1);
assert.equal(machine.pop(), 2);
assert.equal(machine.pop(), 1);

// nip

assert.ok(primitives.nip);
assert.equal(typeof primitives.nip, "function");

machine.push(1);
machine.push(2);
primitives.nip(machine);
assert.equal(machine.length(), 1);
assert.equal(machine.pop(), 2);

// tuck

assert.ok(primitives.tuck);
assert.equal(typeof primitives.tuck, "function");

machine.push(1);
machine.push(2);
primitives.tuck(machine);
assert.equal(machine.length(), 3);
assert.equal(machine.pop(), 2);
assert.equal(machine.pop(), 1);
assert.equal(machine.pop(), 2);

// rot

assert.ok(primitives.rot);
assert.equal(typeof primitives.rot, "function");

machine.push(1);
machine.push(2);
machine.push(3);
primitives.rot(machine);
assert.equal(machine.length(), 3);
assert.equal(machine.pop(), 1);
assert.equal(machine.pop(), 3);
assert.equal(machine.pop(), 2);

// -rot

assert.ok(primitives['-rot']);
assert.equal(typeof primitives['-rot'], "function");

machine.push(1);
machine.push(2);
machine.push(3);
primitives['-rot'](machine);
assert.equal(machine.length(), 3);
assert.equal(machine.pop(), 2);
assert.equal(machine.pop(), 1);
assert.equal(machine.pop(), 3);

// pick

assert.ok(primitives.pick);
assert.equal(typeof primitives.pick, "function");

machine.push(1);
machine.push(2);
machine.push(3);
machine.push(2);
primitives.pick(machine);
assert.equal(machine.length(), 4);
assert.equal(machine.pop(), 1);
assert.equal(machine.pop(), 3);
assert.equal(machine.pop(), 2);
assert.equal(machine.pop(), 1);

// 2dup

assert.ok(primitives['2dup']);
assert.equal(typeof primitives['2dup'], "function");

machine.push(1);
machine.push(2);
primitives['2dup'](machine);
assert.equal(machine.length(), 4);
assert.equal(machine.pop(), 2);
assert.equal(machine.pop(), 1);
assert.equal(machine.pop(), 2);
assert.equal(machine.pop(), 1);

// 2drop

assert.ok(primitives['2drop']);
assert.equal(typeof primitives['2drop'], "function");

machine.push(1);
machine.push(2);
primitives['2drop'](machine);
assert.equal(machine.length(), 0);

