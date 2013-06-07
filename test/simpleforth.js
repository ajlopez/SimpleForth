
var sf = require('..'),
    assert = require('assert');

// Simple compile and run
    
var forth = sf.createForth();
var func = sf.compile("1 2 +", forth);

func(forth);

assert.equal(forth.pop(), 3);

