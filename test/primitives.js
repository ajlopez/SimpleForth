
var primitives = require('../lib/primitives.js'),
    assert = require('assert');

// First primitive

assert.ok(primitives.dup);
assert.equal(typeof primitives.dup, "function");

