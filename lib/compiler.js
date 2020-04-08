
const sfl = require('./lexer.js');

const TokenType = sfl.TokenType;

function Compiler(forth) {
    this.compile = function (text, indef) {
        let result = '';
        const lexer = sfl.isLexer(text) ? text : sfl.lexer(text);
        
        const queue = [];
        
        function appendToResult(code) {
            if (!code || code.length === 0)
                return;
            
            if (!result || result.length === 0) {
                result = code;
                return;
            }
            
            result += ' ' + code;
        }
        
        for (let token = lexer.nextToken(); token; token = lexer.nextToken()) {
            if (token.type !== TokenType.Word) {
                queue.push(token.value);
                continue;
            }
            
            if (token.value === ';' && indef)
                break;

            if (token.value === 'if') {
                const value = queue.pop();
                force();
                appendToResult('if (' + value + ') {');
                continue;
            }
            
            if (token.value === 'else') {
                force();
                appendToResult('} else {');
                continue;
            }
            
            if (token.value === 'then') {
                force();
                appendToResult('}');
                continue;
            }
            
            if (forth.isNative(token.value)) {
                const arity = forth.getNativeArity(token.value);
                
                if (queue.length >= arity) {
                    if (arity === 2) {
                        const op2 = queue.pop();
                        const op1 = queue.pop();
                        queue.push("(" + op1 + " " + token.value + " " + op2 + ")");
                    }
                    else if (arity === 1) {
                        const op = queue.pop();
                        const oper = forth.getNativeOperation(token.value);
                        
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
                const varname = token.value.substring(0, token.value.length - 1);
                
                if (queue.length)
                    appendToResult('let ' + varname + ' = ' + queue.pop() + ';');
                else
                    appendToResult('let ' + varname + " = forth.pop();");
                
                continue;
            }
            
            if (forth.isImmediate(token.value)) {
                const data = forth.immediate(token.value, lexer);
                
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
        
        force();
        
        return result;
        
        function force() {
            while (queue.length) {
                let value = queue.shift();
                
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

