
var sfl = require('../lib/lexer.js');
    
// TokenType

var TokenType = sfl.TokenType;

exports['Token type'] = function (test) {
    test.ok(TokenType);
    test.ok(TokenType.Word);
}

exports['Create lexer'] = function (test) {
    var lexer = sfl.createLexer('dup');
    test.ok(lexer);
}

exports['Next token'] = function (test) {
    var lexer = sfl.createLexer('dup');
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.type, TokenType.Word);
    test.equal(token.value, 'dup');

    token = lexer.nextToken();

    test.equal(token, null);
}

exports['Skip spaces'] = function (test) {
    var lexer = sfl.createLexer('  dup   ');

    test.ok(lexer);

    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.type, TokenType.Word);
    test.equal(token.value, 'dup');

    token = lexer.nextToken();

    test.equal(token, null);
}

exports['Get integer'] = function (test) {
    var lexer = sfl.createLexer('123');
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.type, TokenType.Integer);
    test.equal(token.value, '123');
}

exports['Get negative integer'] = function (test) {
    var lexer = sfl.createLexer(' -123 ');
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.type, TokenType.Integer);
    test.equal(token.value, '-123');
}
