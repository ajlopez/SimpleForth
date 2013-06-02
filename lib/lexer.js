
var TokenType = { Word: 1, Integer: 2, String: 3 }

function Lexer(text) {
    var position = 0;
    var length = text ? text.length : 0;
    
    this.nextToken = function() {
        var value = '';
        var ch;
        
        while (position < length && isWhiteSpace(text[position]))
            position++;
        
        while (position < length) {
            var ch = text[position++];
            
            if (isWhiteSpace(ch))
                break;
            
            value += ch;
        }
        
        if (value === '')
            return null;
        
        return { type: TokenType.Word, value: value };
    };
    
    function isWhiteSpace(ch) {
        return ch <= ' ';
    };
};

module.exports = {
    createLexer: function (text) { return new Lexer(text); },
    TokenType: TokenType
};

