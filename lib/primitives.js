
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