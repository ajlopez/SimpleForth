
exports.dup = function (forth) {
    var value = forth.top();
    forth.push(value);
};

exports['?dup'] = function (forth) {
    var value = forth.top();
    
    if (value !== 0)
        forth.push(value);
};

exports.drop = function (forth) {
    forth.pop();
};

exports.swap = function (forth) {
    var value1 = forth.pop();
    var value2 = forth.pop();
    
    forth.push(value1);
    forth.push(value2);
};

exports.over = function (forth) {
    var value = forth.subtop();
    
    forth.push(value);
};

exports.nip = function (forth) {
    var value = forth.pop();
    
    forth.pop();
    forth.push(value);    
};

exports.tuck = function (forth) {
    var value1 = forth.pop();
    var value2 = forth.pop();
    
    forth.push(value1);
    forth.push(value2);
    forth.push(value1);
};

exports.rot = function (forth) {
    var value1 = forth.pop();
    var value2 = forth.pop();
    var value3 = forth.pop();
    
    forth.push(value2);
    forth.push(value1);
    forth.push(value3);
};

exports['-rot'] = function (forth) {
    var value1 = forth.pop();
    var value2 = forth.pop();
    var value3 = forth.pop();
    
    forth.push(value1);
    forth.push(value3);
    forth.push(value2);
};

exports.pick = function (forth) {
    var n = forth.pop();
    var value = forth.nth(n);
    
    forth.push(value);
};

exports['2dup'] = function (forth) {
    var value1 = forth.top();
    var value2 = forth.subtop();
    
    forth.push(value2);
    forth.push(value1);
};

exports['2drop'] = function (forth) {
    forth.pop();
    forth.pop();
};

exports['2swap'] = function (forth) {
    var value1 = forth.pop();
    var value2 = forth.pop();
    var value3 = forth.pop();
    var value4 = forth.pop();
    
    forth.push(value2);
    forth.push(value1);
    forth.push(value4);
    forth.push(value3);
};

exports['2over'] = function (forth) {
    forth.push(forth.nth(3));
    forth.push(forth.nth(3));
};

exports.min = function (forth) {
    forth.push(Math.min(forth.pop(), forth.pop()));
};

exports.max = function (forth) {
    forth.push(Math.max(forth.pop(), forth.pop()));
};

exports.abs = function (forth) {
    forth.push(Math.abs(forth.pop()));
};

exports.negate = function (forth) {
    forth.push(-forth.pop());
};

exports['+'] = {
    apply: function (forth) {
        var value2 = forth.pop();
        var value1 = forth.pop();
        forth.push(value1 + value2);
    },
    arity: 2
};

exports['-'] = {
    apply: function (forth) {
        var value2 = forth.pop();
        var value1 = forth.pop();
        forth.push(value1 - value2);
    },
    arity: 2
};

exports['*'] = {
    apply: function (forth) {
        var value2 = forth.pop();
        var value1 = forth.pop();
        forth.push(value1 * value2);
    },
    arity: 2
};

exports['/'] = {
    apply: function (forth) {
        var value2 = forth.pop();
        var value1 = forth.pop();
        forth.push(value1 / value2);
    },
    arity: 2
};

exports['>'] = {
    apply: function (forth) {
        var value2 = forth.pop();
        var value1 = forth.pop();
        forth.push(value1 > value2);
    },
    arity: 2
};

exports['<'] = {
    apply: function (forth) {
        var value2 = forth.pop();
        var value1 = forth.pop();
        forth.push(value1 < value2);
    },
    arity: 2
};

exports['<='] = {
    apply: function (forth) {
        var value2 = forth.pop();
        var value1 = forth.pop();
        forth.push(value1 <= value2);
    },
    arity: 2
};

exports['>='] = {
    apply: function (forth) {
        var value2 = forth.pop();
        var value1 = forth.pop();
        forth.push(value1 >= value2);
    },
    arity: 2
};

exports['=='] = {
    apply: function (forth) {
        var value2 = forth.pop();
        var value1 = forth.pop();
        forth.push(value1 == value2);
    },
    arity: 2
};

exports['!='] = {
    apply: function (forth) {
        var value2 = forth.pop();
        var value1 = forth.pop();
        forth.push(value1 != value2);
    },
    arity: 2
};

exports['==='] = {
    apply: function (forth) {
        var value2 = forth.pop();
        var value1 = forth.pop();
        forth.push(value1 === value2);
    },
    arity: 2
};

exports['!=='] = {
    apply: function (forth) {
        var value2 = forth.pop();
        var value1 = forth.pop();
        forth.push(value1 !== value2);
    },
    arity: 2
};

exports['!'] = {
    apply: function (forth) {
        forth.push(!forth.pop());
    },
    arity: 1
};