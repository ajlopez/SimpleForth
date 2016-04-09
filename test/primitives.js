
var primitives = require('../lib/primitives.js'),
    sfl = require('../lib/lexer.js'),
    machine = require('../lib/machine.js').machine();

// TokenType

var TokenType = sfl.TokenType;
    
exports['First primitive'] = function (test) {
    test.ok(primitives.dup);
    test.equal(typeof primitives.dup, "function");
}

exports['Apply dup'] = function (test) {
    machine.push(1);
    primitives.dup(machine);
    test.equal(machine.length(), 2);
    test.equal(machine.pop(), 1);
    test.equal(machine.pop(), 1);
}

exports['?dup'] = function (test) {
    test.ok(primitives['?dup']);
    test.equal(typeof primitives['?dup'], "function");

    machine.push(1);
    primitives['?dup'](machine);
    test.equal(machine.length(), 2);
    test.equal(machine.pop(), 1);
    test.equal(machine.pop(), 1);

    machine.push(0);
    primitives['?dup'](machine);
    test.equal(machine.length(), 1);
    test.equal(machine.pop(), 0);
}

exports['drop'] = function (test) {
    test.ok(primitives.drop);
    test.equal(typeof primitives.drop, "function");

    machine.push(1);
    primitives.drop(machine);
    test.equal(machine.length(), 0);
}

exports['swap'] = function (test) {
    test.ok(primitives.swap);
    test.equal(typeof primitives.swap, "function");

    machine.push(1);
    machine.push(2);
    primitives.swap(machine);
    test.equal(machine.length(), 2);
    test.equal(machine.pop(), 1);
    test.equal(machine.pop(), 2);
}

exports['over'] = function (test) {
    test.ok(primitives.over);
    test.equal(typeof primitives.over, "function");

    machine.push(1);
    machine.push(2);
    primitives.over(machine);
    test.equal(machine.length(), 3);
    test.equal(machine.pop(), 1);
    test.equal(machine.pop(), 2);
    test.equal(machine.pop(), 1);
}

exports['nip'] = function (test) {
    test.ok(primitives.nip);
    test.equal(typeof primitives.nip, "function");

    machine.push(1);
    machine.push(2);
    primitives.nip(machine);
    test.equal(machine.length(), 1);
    test.equal(machine.pop(), 2);
}

exports['tuck'] = function (test) {
    test.ok(primitives.tuck);
    test.equal(typeof primitives.tuck, "function");

    machine.push(1);
    machine.push(2);
    primitives.tuck(machine);
    test.equal(machine.length(), 3);
    test.equal(machine.pop(), 2);
    test.equal(machine.pop(), 1);
    test.equal(machine.pop(), 2);
}

exports['rot'] = function (test) {
    test.ok(primitives.rot);
    test.equal(typeof primitives.rot, "function");

    machine.push(1);
    machine.push(2);
    machine.push(3);
    primitives.rot(machine);
    test.equal(machine.length(), 3);
    test.equal(machine.pop(), 1);
    test.equal(machine.pop(), 3);
    test.equal(machine.pop(), 2);
}

exports['-rot'] = function (test) {
    test.ok(primitives['-rot']);
    test.equal(typeof primitives['-rot'], "function");

    machine.push(1);
    machine.push(2);
    machine.push(3);
    primitives['-rot'](machine);
    test.equal(machine.length(), 3);
    test.equal(machine.pop(), 2);
    test.equal(machine.pop(), 1);
    test.equal(machine.pop(), 3);
}

exports['pick'] = function (test) {
    test.ok(primitives.pick);
    test.equal(typeof primitives.pick, "function");

    machine.push(1);
    machine.push(2);
    machine.push(3);
    machine.push(2);
    primitives.pick(machine);
    test.equal(machine.length(), 4);
    test.equal(machine.pop(), 1);
    test.equal(machine.pop(), 3);
    test.equal(machine.pop(), 2);
    test.equal(machine.pop(), 1);
}

exports['2dup'] = function (test) {
    test.ok(primitives['2dup']);
    test.equal(typeof primitives['2dup'], "function");

    machine.push(1);
    machine.push(2);
    primitives['2dup'](machine);
    test.equal(machine.length(), 4);
    test.equal(machine.pop(), 2);
    test.equal(machine.pop(), 1);
    test.equal(machine.pop(), 2);
    test.equal(machine.pop(), 1);
}

exports['2drop'] = function (test) {
    test.ok(primitives['2drop']);
    test.equal(typeof primitives['2drop'], "function");

    machine.push(1);
    machine.push(2);
    primitives['2drop'](machine);
    test.equal(machine.length(), 0);
}

exports['2swap'] = function (test) {
    test.ok(primitives['2swap']);
    test.equal(typeof primitives['2swap'], "function");

    machine.push(1);
    machine.push(2);
    machine.push(3);
    machine.push(4);
    primitives['2swap'](machine);
    test.equal(machine.length(), 4);
    test.equal(machine.pop(), 2);
    test.equal(machine.pop(), 1);
    test.equal(machine.pop(), 4);
    test.equal(machine.pop(), 3);
}

exports['2over'] = function (test) {
    test.ok(primitives['2over']);
    test.equal(typeof primitives['2over'], "function");

    machine.push(1);
    machine.push(2);
    machine.push(3);
    machine.push(4);
    primitives['2over'](machine);
    test.equal(machine.length(), 6);
    test.equal(machine.pop(), 2);
    test.equal(machine.pop(), 1);
    test.equal(machine.pop(), 4);
    test.equal(machine.pop(), 3);
    test.equal(machine.pop(), 2);
    test.equal(machine.pop(), 1);
}

exports['min'] = function (test) {
    test.ok(primitives.min);
    test.equal(typeof primitives.min, "function");

    machine.push(1);
    machine.push(2);
    primitives.min(machine);
    test.equal(machine.length(), 1);
    test.equal(machine.pop(), 1);
}

exports['max'] = function (test) {
    test.ok(primitives.max);
    test.equal(typeof primitives.max, "function");

    machine.push(1);
    machine.push(2);
    primitives.max(machine);
    test.equal(machine.length(), 1);
    test.equal(machine.pop(), 2);
}

exports['abs'] = function (test) {
    test.ok(primitives.abs);
    test.equal(typeof primitives.abs, "function");

    machine.push(1);
    machine.push(-2);
    primitives.abs(machine);
    test.equal(machine.length(), 2);
    test.equal(machine.pop(), 2);
    primitives.abs(machine);
    test.equal(machine.length(), 1);
    test.equal(machine.pop(), 1);
}

exports['negate'] = function (test) {
    test.ok(primitives.negate);
    test.equal(typeof primitives.negate, "function");

    machine.push(1);
    machine.push(-2);
    primitives.negate(machine);
    test.equal(machine.length(), 2);
    test.equal(machine.pop(), 2);
    primitives.negate(machine);
    test.equal(machine.length(), 1);
    test.equal(machine.pop(), -1);
}

exports['('] = function (test) {
    test.ok(primitives['(']);
    test.equal(typeof primitives['('], "function");
    test.ok(primitives['('].forth);
    test.ok(primitives['('].forth.immediate);
    var lexer = sfl.lexer("( a comment) dup");
    primitives['('](machine, lexer);
    test.equal(machine.length(), 0);
    var token = lexer.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Word);
    test.equal(token.value, 'dup');
    token = lexer.nextToken();
    test.equal(token, null);
}

exports['\\'] = function (test) {
    test.ok(primitives['\\']);
    test.equal(typeof primitives['\\'], "function");
    test.ok(primitives['\\'].forth);
    test.ok(primitives['\\'].forth.immediate);
    
    var lexer = sfl.lexer("\\ a line comment\n dup");
    primitives['\\'](machine, lexer);
    test.equal(machine.length(), 0);
    var token = lexer.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Word);
    test.equal(token.value, 'dup');
    token = lexer.nextToken();
    test.equal(token, null);
    
    var lexer = sfl.lexer("\\ a line comment\r dup");
    primitives['\\'](machine, lexer);
    test.equal(machine.length(), 0);
    var token = lexer.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Word);
    test.equal(token.value, 'dup');
    token = lexer.nextToken();
    test.equal(token, null);
}

exports['."'] = function (test) {
    test.ok(primitives['."']);
    test.equal(typeof primitives['."'], "function");
    test.ok(primitives['."'].forth);
    test.ok(primitives['."'].forth.immediate);
    var lexer = sfl.lexer('a string"');
    var result = primitives['."'](machine, lexer);
    test.equal(machine.length(), 0);
    test.equal(result, '"a string"');
    var token = lexer.nextToken();
    test.equal(token, null);
}

exports['variable'] = function (test) {
    test.ok(primitives.variable);
    test.equal(typeof primitives.variable, "function");
    test.ok(primitives.variable.forth);
    test.ok(primitives.variable.forth.immediate);
    var lexer = sfl.lexer('x');
    var result = primitives.variable(machine, lexer);
    test.equal(machine.length(), 0);
    test.ok(result);
    test.ok(result.append);
    test.equal(result.append, "var x;");
    var token = lexer.nextToken();
    test.equal(token, null);
}

exports['+'] = function (test) {
    test.ok(primitives['+']);
    test.equal(typeof primitives['+'], "object");
    test.equal(primitives['+'].arity, 2);
    test.ok(primitives['+'].apply);
    test.equal(typeof primitives['+'].apply, "function");

    machine.push(1);
    machine.push(2);
    primitives['+'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), 3);
}

exports['-'] = function (test) {
    test.ok(primitives['-']);
    test.equal(typeof primitives['-'], "object");
    test.equal(primitives['-'].arity, 2);
    test.ok(primitives['-'].apply);
    test.equal(typeof primitives['-'].apply, "function");

    machine.push(1);
    machine.push(2);
    primitives['-'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), -1);
}

exports['*'] = function (test) {
    test.ok(primitives['*']);
    test.equal(typeof primitives['*'], "object");
    test.equal(primitives['*'].arity, 2);
    test.ok(primitives['*'].apply);
    test.equal(typeof primitives['*'].apply, "function");

    machine.push(3);
    machine.push(2);
    primitives['*'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), 6);
}

exports['/'] = function (test) {
    test.ok(primitives['/']);
    test.equal(typeof primitives['/'], "object");
    test.equal(primitives['/'].arity, 2);
    test.ok(primitives['/'].apply);
    test.equal(typeof primitives['/'].apply, "function");

    machine.push(3);
    machine.push(2);
    primitives['/'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), 1.5);
}

exports['%'] = function (test) {
    test.ok(primitives['%']);
    test.equal(typeof primitives['%'], "object");
    test.equal(primitives['%'].arity, 2);
    test.ok(primitives['%'].apply);
    test.equal(typeof primitives['%'].apply, "function");

    machine.push(3);
    machine.push(2);
    primitives['%'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), 1);
}

exports['>'] = function (test) {
    test.ok(primitives['>']);
    test.equal(typeof primitives['>'], "object");
    test.equal(primitives['>'].arity, 2);
    test.ok(primitives['>'].apply);
    test.equal(typeof primitives['>'].apply, "function");

    machine.push(3);
    machine.push(2);
    primitives['>'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), true);

    machine.push(3);
    machine.push(4);
    primitives['>'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), false);
}

exports['<'] = function (test) {
    test.ok(primitives['<']);
    test.equal(typeof primitives['<'], "object");
    test.equal(primitives['<'].arity, 2);
    test.ok(primitives['<'].apply);
    test.equal(typeof primitives['<'].apply, "function");

    machine.push(3);
    machine.push(2);
    primitives['<'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), false);

    machine.push(3);
    machine.push(4);
    primitives['<'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), true);
}

exports['<='] = function (test) {
    test.ok(primitives['<=']);
    test.equal(typeof primitives['<='], "object");
    test.equal(primitives['<='].arity, 2);
    test.ok(primitives['<='].apply);
    test.equal(typeof primitives['<='].apply, "function");

    machine.push(3);
    machine.push(2);
    primitives['<='].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), false);

    machine.push(3);
    machine.push(3);
    primitives['<='].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), true);
}

exports['>='] = function (test) {
    test.ok(primitives['>=']);
    test.equal(typeof primitives['>='], "object");
    test.equal(primitives['>='].arity, 2);
    test.ok(primitives['>='].apply);
    test.equal(typeof primitives['>='].apply, "function");

    machine.push(3);
    machine.push(2);
    primitives['>='].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), true);

    machine.push(3);
    machine.push(3);
    primitives['>='].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), true);
}

exports['=='] = function (test) {
    test.ok(primitives['==']);
    test.equal(typeof primitives['=='], "object");
    test.equal(primitives['=='].arity, 2);
    test.ok(primitives['=='].apply);
    test.equal(typeof primitives['=='].apply, "function");

    machine.push(3);
    machine.push("3");
    primitives['=='].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), true);

    machine.push(3);
    machine.push(3);
    primitives['=='].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), true);

    machine.push(2);
    machine.push(3);
    primitives['=='].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), false);
}

exports['!='] = function (test) {
    test.ok(primitives['!=']);
    test.equal(typeof primitives['!='], "object");
    test.equal(primitives['!='].arity, 2);
    test.ok(primitives['!='].apply);
    test.equal(typeof primitives['!='].apply, "function");

    machine.push(3);
    machine.push("3");
    primitives['!='].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), false);

    machine.push(3);
    machine.push(3);
    primitives['!='].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), false);

    machine.push(2);
    machine.push(3);
    primitives['!='].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), true);
}

exports['==='] = function (test) {
    test.ok(primitives['===']);
    test.equal(typeof primitives['==='], "object");
    test.equal(primitives['==='].arity, 2);
    test.ok(primitives['==='].apply);
    test.equal(typeof primitives['==='].apply, "function");

    machine.push(3);
    machine.push("3");
    primitives['==='].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), false);

    machine.push(3);
    machine.push(3);
    primitives['==='].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), true);

    machine.push(2);
    machine.push(3);
    primitives['==='].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), false);
}

exports['!=='] = function (test) {
    test.ok(primitives['!==']);
    test.equal(typeof primitives['!=='], "object");
    test.equal(primitives['!=='].arity, 2);
    test.ok(primitives['!=='].apply);
    test.equal(typeof primitives['!=='].apply, "function");

    machine.push(3);
    machine.push("3");
    primitives['!=='].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), true);

    machine.push(3);
    machine.push(3);
    primitives['!=='].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), false);

    machine.push(2);
    machine.push(3);
    primitives['!=='].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), true);
}

exports['!'] = function (test) {
    test.ok(primitives['!']);
    test.equal(typeof primitives['!'], "object");
    test.equal(primitives['!'].arity, 1);
    test.ok(primitives['!'].apply);
    test.equal(typeof primitives['!'].apply, "function");

    machine.push(true);
    primitives['!'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), false);

    machine.push(10);
    primitives['!'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), !10);
}

exports['~'] = function (test) {
    test.ok(primitives['~']);
    test.equal(typeof primitives['~'], "object");
    test.equal(primitives['~'].arity, 1);
    test.ok(primitives['~'].apply);
    test.equal(typeof primitives['~'].apply, "function");

    machine.push(123);
    primitives['~'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), ~123);
}

exports['<<'] = function (test) {
    test.ok(primitives['<<']);
    test.equal(typeof primitives['<<'], "object");
    test.equal(primitives['<<'].arity, 2);
    test.ok(primitives['<<'].apply);
    test.equal(typeof primitives['<<'].apply, "function");

    machine.push(1);
    machine.push(2);
    primitives['<<'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), 4);

    machine.push(256);
    machine.push(2);
    primitives['<<'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), 256 << 2);
}

exports['>>'] = function (test) {
    test.ok(primitives['>>']);
    test.equal(typeof primitives['>>'], "object");
    test.equal(primitives['>>'].arity, 2);
    test.ok(primitives['>>'].apply);
    test.equal(typeof primitives['>>'].apply, "function");

    machine.push(4);
    machine.push(2);
    primitives['>>'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), 1);

    machine.push(256);
    machine.push(2);
    primitives['>>'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), 256 >> 2);
}

exports['>>>'] = function (test) {
    test.ok(primitives['>>>']);
    test.equal(typeof primitives['>>>'], "object");
    test.equal(primitives['>>>'].arity, 2);
    test.ok(primitives['>>>'].apply);
    test.equal(typeof primitives['>>>'].apply, "function");

    machine.push(1);
    machine.push(2);
    primitives['>>>'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), 1 >>> 2);

    machine.push(256);
    machine.push(2);
    primitives['>>>'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), 256 >>> 2);
}

exports['&'] = function (test) {
    test.ok(primitives['&']);
    test.equal(typeof primitives['&'], "object");
    test.equal(primitives['&'].arity, 2);
    test.ok(primitives['&'].apply);
    test.equal(typeof primitives['&'].apply, "function");

    machine.push(3);
    machine.push(2);
    primitives['&'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), 2);

    machine.push(256);
    machine.push(2);
    primitives['&'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), 0);
}

exports['|'] = function (test) {
    test.ok(primitives['|']);
    test.equal(typeof primitives['|'], "object");
    test.equal(primitives['|'].arity, 2);
    test.ok(primitives['|'].apply);
    test.equal(typeof primitives['|'].apply, "function");

    machine.push(3);
    machine.push(2);
    primitives['|'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), 3);

    machine.push(256);
    machine.push(2);
    primitives['|'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), 258);
}

exports['^'] = function (test) {
    test.ok(primitives['^']);
    test.equal(typeof primitives['^'], "object");
    test.equal(primitives['^'].arity, 2);
    test.ok(primitives['^'].apply);
    test.equal(typeof primitives['^'].apply, "function");

    machine.push(3);
    machine.push(2);
    primitives['^'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), 3 ^ 2);

    machine.push(256);
    machine.push(2);
    primitives['^'].apply(machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), 256 ^ 2);
}

exports['1+'] = function (test) {
    test.ok(primitives['1+']);
    test.equal(typeof primitives['1+'], "function");

    machine.push(3);
    primitives['1+'](machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), 4);
}

exports['1-'] = function (test) {
    test.ok(primitives['1-']);
    test.equal(typeof primitives['1-'], "function");

    machine.push(3);
    primitives['1-'](machine);
    test.ok(machine.length(), 1);
    test.equal(machine.pop(), 2);
}

exports['.'] = function (test) {
    var val = null;
    
    machine.output = {
        write: function (value) {
            test.ok(value);
            test.equal(1, value);
            val = value;
        }
    }
    
    test.ok(primitives['.']);
    test.equal(typeof primitives['.'], "function");
    
    machine.push(1);
    
    primitives['.'](machine);
    
    test.ok(val);
    test.equal(1, val);
    test.equal(0, machine.length());
}

exports[':'] = function (test) {
    test.ok(primitives[':']);
    test.equal(typeof primitives[':'], "function");
    test.ok(primitives[':'].forth);
    test.ok(primitives[':'].forth.immediate);
    var lexer = sfl.lexer("inc 1+ ;");
    primitives[':'](machine, lexer);
    token = lexer.nextToken();
    test.equal(token, null);
}
