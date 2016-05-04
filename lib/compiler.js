
var sfl = require('./lexer.js');

var TokenType = sfl.TokenType;

function Compiler(forth) {
    this.compile = function (text, indef) {
        var result = '';
        var lexer;
        
        if (sfl.isLexer(text))
            lexer = text;
        else
            lexer = sfl.lexer(text);
        
        var queue = [];
        
        function appendToResult(code) {
            if (!code || code.length == 0)
                return;
            
            if (result == null || result.length === 0) {
                result = code;
                return;
            }
            
            result += ' ' + code;
        }
        
        for (var token = lexer.nextToken(); token; token = lexer.nextToken()) {
            if (token.type === TokenType.Word) {
                if (token.value === ';' && indef)
                    break;
                
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
                            var oper = forth.values[token.value].oper;
                            
                            if (oper)
                                queue.push("(" + op + " " + oper + ")");
                            else
                                queue.push("(" + token.value + op + ")");
                        }
                        else
                            throw "invalid arity";
                    }
                    else {
                        force();
                        appendToResult("forth.apply('" + token.value + "');");
                    }
                    
                    continue;
                }
                
                if (isAssignment(token.value)) {
                    var varname = token.value.substring(0, token.value.length - 1);
                    
                    if (queue.length)
                        appendToResult('var ' + varname + ' = ' + queue.pop() + ';');
                    else
                        appendToResult('var ' + varname + " = forth.pop();");
                    
                    continue;
                }
                
                if (forth.isImmediate(token.value)) {
                    var data = forth.immediate(token.value, lexer);
                    
                    if (data)
                        if (data.append)
                            appendToResult(data.append);
                        else
                            queue.push(data);
                        
                    continue;
                }
                
                if (forth.defined(token.value)) {
                    force();
                    appendToResult("forth.apply('" + token.value + "');");
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
                appendToResult("forth.push(" + value + ");");
            }
        }
        
        function isAssignment(word) {
            return word[word.length - 1] === '=';
        }
    }
}

module.exports = {
    compiler: function (forth) { return new Compiler(forth); }
}

