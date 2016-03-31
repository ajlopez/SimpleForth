
var sfl = require('../lib/lexer.js');
    
// TokenType

var TokenType = sfl.TokenType;

exports['Token type'] = function (test) {
    test.ok(TokenType);
    test.ok(TokenType.Word);
}

exports['Create lexer'] = function (test) {
    var lexer = sfl.lexer('dup');
    test.ok(lexer);
}

exports['Next token'] = function (test) {
    var lexer = sfl.lexer('dup');
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.type, TokenType.Word);
    test.equal(token.value, 'dup');

    token = lexer.nextToken();

    test.equal(token, null);
}

exports['Next token skipping comment'] = function (test) {
    var lexer = sfl.lexer('( a comment ) dup');
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.type, TokenType.Word);
    test.equal(token.value, 'dup');

    token = lexer.nextToken();

    test.equal(token, null);
}

exports['Operator 1+ as word'] = function (test) {
    var lexer = sfl.lexer('1+');
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.type, TokenType.Word);
    test.equal(token.value, '1+');

    token = lexer.nextToken();

    test.equal(token, null);
}

exports['Operator 1- as word'] = function (test) {
    var lexer = sfl.lexer('1-');
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.type, TokenType.Word);
    test.equal(token.value, '1-');

    token = lexer.nextToken();

    test.equal(token, null);
}

exports['Skip spaces'] = function (test) {
    var lexer = sfl.lexer('  dup   ');

    test.ok(lexer);

    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.type, TokenType.Word);
    test.equal(token.value, 'dup');

    token = lexer.nextToken();

    test.equal(token, null);
}

exports['Get integer'] = function (test) {
    var lexer = sfl.lexer('123');
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.type, TokenType.Integer);
    test.equal(token.value, '123');
}

exports['Get negative integer'] = function (test) {
    var lexer = sfl.lexer(' -123 ');
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.type, TokenType.Integer);
    test.equal(token.value, '-123');
}
