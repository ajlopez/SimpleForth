
// SimpleForth Machine

var primitives = require('./primitives');
var sfc = require('../lib/compiler');

function Machine() {
    var stack = [];
    var values = {};
    var rstack = [];
    
    this.output = {
        write: function (value) { console.log(value); }
    }
    
    for (var n in primitives)
        values[n] = primitives[n];
    
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
    
    this.define = function (name, value) {
        values[name] = value;
    };

    this.defined = function (name) {
        return values[name] !== undefined;
    };

    this.isImmediate = function (name) {
        if (!this.defined(name))
            return false;
            
        return values[name].forth && values[name].forth.immediate;
    };

    this.immediate = function (name, lexer) {
        return values[name](this, lexer);
    };

    this.isNative = function (name, arity) {
        return typeof values[name] === 'object';
    };

    this.getNativeArity = function (name) {
        return values[name].arity;
    };
    
    this.getNativeOperation = function (name) {
        return values[name].oper;
    };

    this.apply = function (name) {
        if (typeof values[name] === 'object')
            values[name].apply(this);
        else
            values[name](this);
    };

    this.rpush = function (value) {
        rstack.push(value);
    };

    this.rpop = function () {
        return rstack.pop();
    };

    this.rlength = function () {
        return rstack.length;
    };
    
    this.compile = function (text, indef) {
        var compiler = sfc.compiler(this);
        
        return compiler.compile(text, indef);
    }
}

Machine.prototype.write = function (value) {
    this.output.write(value);
};

exports.machine = function () { return new Machine(); }

