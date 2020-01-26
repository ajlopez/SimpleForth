
exports['('] = function (forth, lexer) {
    lexer.upTo(')');
};

exports['('].forth = { immediate: true };

exports['\\'] = function (forth, lexer) {
    lexer.upTo('\n', '\r');
};

exports['\\'].forth = { immediate: true };

exports['."'] = function (forth, lexer) {
    return '"' + lexer.upTo('"') + '"';
};

exports['."'].forth = { immediate: true };

exports['.'] = function (forth) {
    forth.output.write(forth.pop());
}

exports.variable = function (forth, lexer) {
    return { append: "let " + lexer.nextToken().value + ";" };
};

exports.variable.forth = { immediate: true };

exports.constant = function (forth, lexer) {
    return { append: "const " + lexer.nextToken().value + " = forth.pop();" };
};

exports.constant.forth = { immediate: true };

exports.emit = function (forth) {
    const value = forth.pop();
    const ch = String.fromCharCode(value);
    
    forth.write(ch);
}

exports.cr = function (forth) {
    forth.write('\r');
}

exports.spaces = function (forth) {
    const value = forth.pop();
    
    for (let k = 0; k < value; k++)
        forth.write(' ');
}

exports.dup = function (forth) {
    const value = forth.top();
    
    forth.push(value);
};

exports['?dup'] = function (forth) {
    const value = forth.top();
    
    if (value !== 0)
        forth.push(value);
};

exports['r>'] = function (forth) {
    const value = forth.rpop();
    
    forth.push(value);
};

exports['>r'] = function (forth) {
    const value = forth.pop();
    
    forth.rpush(value);
};

exports.drop = function (forth) {
    forth.pop();
};

exports.swap = function (forth) {
    const value1 = forth.pop();
    const value2 = forth.pop();
    
    forth.push(value1);
    forth.push(value2);
};

exports.over = function (forth) {
    const value = forth.subtop();
    
    forth.push(value);
};

exports.nip = function (forth) {
    const value = forth.pop();
    
    forth.pop();
    forth.push(value);    
};

exports.tuck = function (forth) {
    const value1 = forth.pop();
    const value2 = forth.pop();
    
    forth.push(value1);
    forth.push(value2);
    forth.push(value1);
};

exports.rot = function (forth) {
    const value1 = forth.pop();
    const value2 = forth.pop();
    const value3 = forth.pop();
    
    forth.push(value2);
    forth.push(value1);
    forth.push(value3);
};

exports['-rot'] = function (forth) {
    const value1 = forth.pop();
    const value2 = forth.pop();
    const value3 = forth.pop();
    
    forth.push(value1);
    forth.push(value3);
    forth.push(value2);
};

exports.pick = function (forth) {
    const n = forth.pop();
    const value = forth.nth(n);
    
    forth.push(value);
};

exports['2dup'] = function (forth) {
    const value1 = forth.top();
    const value2 = forth.subtop();
    
    forth.push(value2);
    forth.push(value1);
};

exports['2drop'] = function (forth) {
    forth.pop();
    forth.pop();
};

exports['2swap'] = function (forth) {
    const value1 = forth.pop();
    const value2 = forth.pop();
    const value3 = forth.pop();
    const value4 = forth.pop();
    
    forth.push(value2);
    forth.push(value1);
    forth.push(value4);
    forth.push(value3);
};

exports['2over'] = function (forth) {
    forth.push(forth.nth(3));
    forth.push(forth.nth(3));
};

exports['2rot'] = function (forth) {
    const value1 = forth.pop();
    const value2 = forth.pop();
    const value3 = forth.pop();
    const value4 = forth.pop();
    const value5 = forth.pop();
    const value6 = forth.pop();
    
    forth.push(value4);
    forth.push(value3);
    forth.push(value2);
    forth.push(value1);
    forth.push(value6);
    forth.push(value5);
};

exports.min = function (forth) {
    forth.push(Math.min(forth.pop(), forth.pop()));
};

exports.max = function (forth) {
    forth.push(Math.max(forth.pop(), forth.pop()));
};

exports.abs = function (forth) {
    forth.push(Math.abs(forth.pop()));
};

exports.negate = function (forth) {
    forth.push(-forth.pop());
};

exports.mod = {
    apply: new Function("forth", 
       "const value1 = forth.pop();\
        const value2 = forth.pop();\
        \
        forth.push(value2 % value1);"),
    arity: 2
};

exports['/mod'] = {
    apply: new Function("forth", 
       "const value1 = forth.pop();\
        const value2 = forth.pop();\
        \
        forth.push(value2 % value1);\
        forth.push(Math.floor(value2 / value1));"),
    arity: 2
};

exports['*/mod'] = {
    apply: new Function("forth", 
       "const value1 = forth.pop();\
        const value2 = forth.pop();\
        const value3 = forth.pop();\
        \
        const value4 = value2 * value3;\
        \
        forth.push(value4 % value1);\
        forth.push(Math.floor(value4 / value1));"),
    arity: 2
};

function makeBinaryOperator(name) {
    exports[name] = {
        apply: new Function("forth", 
           "const value2 = forth.pop();\
            const value1 = forth.pop();\
            \
            forth.push(value1 " + name + " value2);"),
        arity: 2
    };
};

exports['!'] = {
    apply: function (forth) {
        forth.push(!forth.pop());
    },
    arity: 1
};

exports['~'] = {
    apply: function (forth) {
        forth.push(~forth.pop());
    },
    arity: 1
};

exports['0='] = {
    apply: function (forth) {
        forth.push(forth.pop() === 0);
    },
    arity: 1,
    oper: '=== 0'
};

exports['0<'] = {
    apply: function (forth) {
        forth.push(forth.pop() < 0);
    },
    arity: 1,
    oper: '< 0'
};

exports['0>'] = {
    apply: function (forth) {
        forth.push(forth.pop() > 0);
    },
    arity: 1,
    oper: '> 0'
};

exports['1+'] = {
    arity: 1,
    oper: '+ 1',
    apply: function (forth) {
        forth.push(forth.pop() + 1);
    }
};

exports['1-'] =  {
    arity: 1,
    oper: '- 1',
    apply: function (forth) {
        forth.push(forth.pop() - 1);
    }
};

exports['2+'] = {
    arity: 1,
    oper: '+ 2',
    apply: function (forth) {
        forth.push(forth.pop() + 2);
    }
};

exports['2-'] = {
    arity: 1,
    oper: '- 2',
    apply: function (forth) {
        forth.push(forth.pop() - 2);
    }
};

exports['2*'] = {
    arity: 1,
    oper: '* 2',
    apply: function (forth) {
        forth.push(forth.pop() * 2);
    }
};

exports['2/'] = {
    arity: 1,
    oper: '/ 2',
    apply: function (forth) {
        forth.push(forth.pop() / 2);
    }
};

exports[':'] = function (forth, lexer) {
    const name = lexer.nextToken().value;
    const code = forth.compile(lexer, true);
    
    forth.define(name, new Function('forth', code));
};

exports[':'].forth = { immediate: true };

exports.and = function (forth, lexer) {
    const value1 = forth.pop();
    const value2 = forth.pop();
    
    if (value1 && value2)
        forth.push(true);
    else
        forth.push(false);
};

exports.or = function (forth, lexer) {
    const value1 = forth.pop();
    const value2 = forth.pop();
    
    if (value1 || value2)
        forth.push(true);
    else
        forth.push(false);
};

['+', '-', '*', '/', '%', 
'>', '>=', '<', '<=', '==', '!=', '===', '!==', 
'<<', '>>', '>>>',
'&', '|', '^'].forEach(function (name) { makeBinaryOperator(name); });

