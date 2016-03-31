
var TokenType = { Word: 1, Integer: 2, Real: 3 }

function Lexer(text) {
    var position = 0;
    var length = text ? text.length : 0;
    
    function nextToken() {
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
    
    this.nextToken = function () {
        var token = nextToken();
        
        if (!token || token.type !== TokenType.Word || token.value !== '(')
            return token;
        
        for (token = nextToken(); token; token = nextToken())
            if (token.type === TokenType.Word && token.value === ')')
                return this.nextToken();
            
        return token;
    }
    
    this.upTo = function (delimiter) {
        var initial = position;
        
        while (position < length && text[position] !== delimiter)
            position++;
            
        return text.substring(initial, position++);
    };
    
    function isWhiteSpace(ch) {
        return ch <= ' ';
    }
    
    function isDigit(ch) {
        return '0123456789'.indexOf(ch) >= 0;
    }
};

module.exports = {
    lexer: function (text) { return new Lexer(text); },
    TokenType: TokenType
};

