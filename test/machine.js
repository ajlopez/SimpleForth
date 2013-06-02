
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


