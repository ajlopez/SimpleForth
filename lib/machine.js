
// SimpleForth Machine

function Machine() {
    this.stack = [];
    this.values = {};
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

Machine.prototype.define = function (name, value) {
    this.values[name] = value;
};

Machine.prototype.apply = function (name) {
    this.values[name](this);
};

exports.createMachine = function () { return new Machine(); }

