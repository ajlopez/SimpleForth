
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