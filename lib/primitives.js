
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