
var sf = require('..');
var path = require('path');

exports['Simple compile and run'] = function (test) {   
    var forth = sf.forth();
    var func = sf.compile("1 2 +", forth);

    func(forth);

    test.equal(forth.pop(), 3);
}

exports['Execute'] = function (test) {   
    var forth = sf.forth();
    sf.execute("1 2 +", forth);
    test.equal(forth.pop(), 3);
}

exports['Execute File'] = function (test) {   
    var forth = sf.forth();
    sf.executeFile(path.join(__dirname, "add.fth"), forth);
    test.equal(forth.pop(), 3);
}

exports['Evaluate text using machine'] = function (test) {   
    var forth = sf.forth();
    test.equal(sf.evaluate("1 2 +", forth), 3);
}

exports['Evaluate defined word'] = function (test) {   
    var forth = sf.forth();
    test.equal(sf.evaluate(": inc 1+ ; 2 inc", forth), 3);
}

exports['Evaluate defined word'] = function (test) {   
    var forth = sf.forth();
    test.equal(sf.evaluateFile(path.join(__dirname, "inc.fth")), 3);
}

exports['Evaluate text'] = function (test) {   
    test.equal(sf.evaluate("1 2 +"), 3);
}

exports['Evaluate text with newline'] = function (test) {   
    test.equal(sf.evaluate("1 \n2 +"), 3);
}

exports['Evaluate text with carriage return'] = function (test) {   
    test.equal(sf.evaluate("1 \r2 +"), 3);
}

exports['Evaluate text with carriage return new line'] = function (test) {   
    test.equal(sf.evaluate("1 \r\n2 +"), 3);
}

exports['Evaluate primitives'] = function (test) {   
    test.equal(sf.evaluate("1 1+"), 2);
    test.equal(sf.evaluate("1 1+ 1+"), 3);
    test.equal(sf.evaluate("1 2+"), 3);
    test.equal(sf.evaluate("1 2+ 2*"), 6);
    test.equal(sf.evaluate("1 1+ 2/"), 1);
    
    test.equal(sf.evaluate("3 1-"), 2);
}


