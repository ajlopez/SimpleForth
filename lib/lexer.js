
var TokenType = { Word: 1, Integer: 2, Real: 3 }

function Lexer(text) {
    var position = 0;
    var length = text ? text.length : 0;
    
    this.nextToken = function() {
        var value = '';
        var ch;
        var ndigits = 0;
        
        while (position < length && isWhiteSpace(text[position]))
            position++;
        
        while (position < length) {
            var ch = text[position++];
            
            if (isWhiteSpace(ch))
                break;
                
            if (isDigit(ch))
                ndigits++;
            
            value += ch;
        }
        
        if (value === '')
            return null;
            
        if (value.length === ndigits || (value[0] === '-' && value.length === ndigits + 1))
            return { type: TokenType.Integer, value: value };
        
        return { type: TokenType.Word, value: value };
    };
    
    function isWhiteSpace(ch) {
        return ch <= ' ';
    }
    
    function isDigit(ch) {
        return '0123456789'.indexOf(ch) >= 0;
    }
};

module.exports = {
    createLexer: function (text) { return new Lexer(text); },
    TokenType: TokenType
};

