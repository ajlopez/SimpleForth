
var sf = require('..');

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

exports['Evaluate text using machine'] = function (test) {   
    var forth = sf.forth();
    test.equal(sf.evaluate("1 2 +", forth), 3);
}

exports['Evaluate text'] = function (test) {   
    test.equal(sf.evaluate("1 2 +"), 3);
}

exports['Evaluate primitives'] = function (test) {   
    test.equal(sf.evaluate("1 1+"), 2);
    test.equal(sf.evaluate("3 1-"), 1);
}


