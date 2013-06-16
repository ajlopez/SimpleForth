
var sfl = require('./lexer.js');

var TokenType = sfl.TokenType;

function Compiler(forth) {
    this.compile = function (text) {
        var result = '';
        var lexer = sfl.createLexer(text);
        var queue = [];
        
        for (var token = lexer.nextToken(); token; token = lexer.nextToken()) {
            if (token.type === TokenType.Word) {
                if (isAssignment(token.value)) {
                    var varname = token.value.substring(0, token.value.length - 1);
                    
                    if (queue.length) {
                        result += 'var ' + varname + ' = ' + queue.pop() + ';';
                    }
                    else {
                        result += 'var ' + varname + " = forth.pop();";
                    }
                    
                    continue;
                }
                
                if (forth.isNative(token.value)) {
                    var arity = forth.getNativeArity(token.value);
                    
                    if (queue.length >= arity) {
                        if (arity === 2) {
                            var op2 = queue.pop();
                            var op1 = queue.pop();
                            queue.push("(" + op1 + " " + token.value + " " + op2 + ")");
                        }
                        else if (arity === 1) {
                            var op = queue.pop();
                            queue.push("(" + token.value + op + ")");
                        }
                        else
                            throw "invalid arity";
                    }
                    else {
                        force();
                        result += "forth.apply('" + token.value + "');";
                    }
                    
                    continue;
                }
                
                if (forth.isImmediate(token.value)) {
                    forth.immediate(token.value, lexer);
                    continue;
                }
                
                if (forth.defined(token.value)) {
                    force();
                    result += "forth.apply('" + token.value + "');";
                    continue;
                }
                
                queue.push(token.value);
            }
            else
                queue.push(token.value);
        }
        
        force();
        
        return result;
        
        function force() {
            while (queue.length) {
                var value = queue.shift();
                if (value && value[0] === '(' && value[value.length-1] === ')')
                    value = value.substring(1, value.length - 1);
                result += "forth.push(" + value + ");";
            }
        }
        
        function isAssignment(word) {
            return word[word.length - 1] === '=';
        }
    }
}

module.exports = {
    createCompiler: function (forth) { return new Compiler(forth); }
}

