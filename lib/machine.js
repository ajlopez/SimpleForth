
// SimpleForth Machine

var primitives = require('./primitives');

function Machine() {
    this.stack = [];
    this.values = {};
    
    for (var n in primitives)
        this.values[n] = primitives[n];
}

Machine.prototype.push = function (value) {
    if (value && value.apply && value.forth)
        value(this);
    else
        this.stack.push(value);
};

Machine.prototype.pop = function () {
    return this.stack.pop();
};

Machine.prototype.top = function () {
    return this.stack[this.stack.length - 1];
};

Machine.prototype.subtop = function () {
    return this.stack[this.stack.length - 2];
};

Machine.prototype.nth = function (n) {
    return this.stack[this.stack.length - 1 - n];
};

Machine.prototype.length = function () {
    return this.stack.length;
};

Machine.prototype.define = function (name, value) {
    this.values[name] = value;
};

Machine.prototype.defined = function (name) {
    return this.values[name] !== undefined;
};

Machine.prototype.isImmediate = function (name) {
    if (!this.defined(name))
        return false;
        
    return this.values[name].forth && this.values[name].forth.immediate;
};

Machine.prototype.immediate = function (name, lexer) {
    return this.values[name](this, lexer);
};

Machine.prototype.isNative = function (name, arity) {
    return typeof this.values[name] === 'object';
};

Machine.prototype.getNativeArity = function (name) {
    return this.values[name].arity;
};

Machine.prototype.apply = function (name) {
    if (typeof this.values[name] === 'object')
        this.values[name].apply(this);
    else
        this.values[name](this);
};

exports.machine = function () { return new Machine(); }

