
exports['dup'] = function (forth) {
    var value = forth.pop();
    forth.push(value);
    forth.push(value);
};