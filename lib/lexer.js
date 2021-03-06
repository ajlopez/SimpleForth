
const TokenType = { Word: 1, Integer: 2, Real: 3 }

function Lexer(text) {
    let position = 0;
    const length = text ? text.length : 0;
    
    this.nextToken = function() {
        let value = '';
        let ndigits = 0;
        
        while (position < length && isWhiteSpace(text[position]))
            position++;
        
        while (position < length) {
            const ch = text[position++];
            
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
    
    this.upTo = function (delimiter, delimiter2) {
        const initial = position;
        
        while (position < length && text[position] !== delimiter && text[position] !== delimiter2)
            position++;
            
        return text.substring(initial, position++);
    };
    
    function isWhiteSpace(ch) {
        return ch <= ' ';
    }
    
    function isDigit(ch) {
		return ch >= '0' && ch <= '9';
    }
};

module.exports = {
    lexer: function (text) { return new Lexer(text); },
    isLexer: function (obj) { return obj instanceof Lexer; },
    TokenType: TokenType
};

