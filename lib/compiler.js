
var sfl = require('./lexer.js');

var TokenType = sfl.TokenType;

function Compiler(forth) {
    this.compile = function (text) {
        var result = '';
        var lexer = sfl.createLexer(text);
        
        for (var token = lexer.nextToken(); token; token = lexer.nextToken()) {
            if (token.type === TokenType.Word) {
                if (forth.defined(token.value))
                    result += "forth.apply('" + token.value + "');";
                else
                    result += "forth.push(" + token.value + ");";
            }
            else
                result += "forth.push(" + token.value + ");";
        }
        
        return result;
    }
}

module.exports = {
    createCompiler: function (forth) { return new Compiler(forth); }
}