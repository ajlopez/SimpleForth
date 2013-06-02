
// SimpleForth Machine

function Machine() {
    this.stack = [];
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

exports.createMachine = function () { return new Machine(); }

