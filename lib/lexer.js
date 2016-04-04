
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

        if (!token || token.type !== TokenType.Word)
            return token;
            
        if (token.value === '(') {
            var p = text.indexOf(')', position);
            
            if (p < 0) {
                position = length;
                return null;
            }
            
            position = p + 1;

            return this.nextToken();
        }
            
        if (token.value === '\\') {
            var p1 = text.indexOf('\n', position);
            var p2 = text.indexOf('\r', position);
            
            if (p1 < 0)
                p1 = p2;
                
            if (p1 >= 0 && p2 >= 0)
                p1 = Math.min(p1, p2);
                
            if (p1 < 0 ) {
                position = length;
                return null;
            }
            
            position = p1 + 1;

            return this.nextToken();
        }
        
        return token;
    }
    
    this.upTo = function (delimiter, delimiter2) {
        var initial = position;
        
        while (position < length && text[position] !== delimiter && text[position] !== delimiter2)
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

