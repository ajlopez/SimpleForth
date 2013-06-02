
// SimpleForth Machine

function Machine() {
    this.stack = [];
}

Machine.prototype.push = function (value) {
    this.stack.push(value);
};

Machine.prototype.pop = function () {
    return this.stack.pop();
};

exports.createMachine = function () { return new Machine(); }

