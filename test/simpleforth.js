
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



