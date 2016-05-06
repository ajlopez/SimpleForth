
// SimpleForth Machine

var primitives = require('./primitives');
var sfc = require('../lib/compiler');

function Machine() {
    var stack = [];
    
    this.rstack = [];
    this.values = {};
    this.output = {
        write: function (value) { console.log(value); }
    }
    
    for (var n in primitives)
        this.values[n] = primitives[n];
    
    this.push = function (value) {
        if (value && value.apply && value.forth)
            value(this);
        else
            stack.push(value);
    };
    
    this.pop = function () {
        return stack.pop();
    };
    
    this.top = function () {
        return stack[stack.length - 1];
    };

    this.subtop = function () {
        return stack[stack.length - 2];
    };

    this.nth = function (n) {
        return stack[stack.length - 1 - n];
    };

    this.length = function () {
        return stack.length;
    };
}

Machine.prototype.rpush = function (value) {
    this.rstack.push(value);
};

Machine.prototype.rpop = function () {
    return this.rstack.pop();
};


Machine.prototype.rlength = function () {
    return this.rstack.length;
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

Machine.prototype.write = function (value) {
    this.output.write(value);
};

Machine.prototype.compile = function (text, indef) {
    var compiler = sfc.compiler(this);
    
    return compiler.compile(text, indef);
}

exports.machine = function () { return new Machine(); }

