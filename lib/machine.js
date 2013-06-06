
// SimpleForth Machine

function Machine() {
    this.stack = [];
    this.values = {};
    this.arities = {};
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

Machine.prototype.length = function () {
    return this.stack.length;
};

Machine.prototype.define = function (name, value) {
    this.values[name] = value;
};

Machine.prototype.defined = function (name) {
    return this.values[name] !== undefined;
};

Machine.prototype.defineNative = function (name, arity) {
    this.arities[name] = arity;
};

Machine.prototype.isNative = function (name, arity) {
    return this.arities[name] !== undefined;
};

Machine.prototype.getNativeArity = function (name) {
    return this.arities[name];
};

Machine.prototype.apply = function (name) {
    this.values[name](this);
};

exports.createMachine = function () { return new Machine(); }

