
const sfl = require('../lib/lexer.js');
    
// TokenType

const TokenType = sfl.TokenType;

exports['Token type'] = function (test) {
    test.ok(TokenType);
    test.ok(TokenType.Word);
}

exports['Create lexer'] = function (test) {
    const lexer = sfl.lexer('dup');
    
    test.ok(lexer);
}

exports['Next token'] = function (test) {
    const lexer = sfl.lexer('dup');
    
    const token = lexer.nextToken();

    test.ok(token);
    test.equal(token.type, TokenType.Word);
    test.equal(token.value, 'dup');

    test.equal(lexer.nextToken(), null);
}

exports['Operator 0= as word'] = function (test) {
    const lexer = sfl.lexer('0=');
    
    const token = lexer.nextToken();

    test.ok(token);
    test.equal(token.type, TokenType.Word);
    test.equal(token.value, '0=');

    test.equal(lexer.nextToken(), null);
}

exports['Operator 1+ as word'] = function (test) {
    const lexer = sfl.lexer('1+');
    
    const token = lexer.nextToken();

    test.ok(token);
    test.equal(token.type, TokenType.Word);
    test.equal(token.value, '1+');

    test.equal(lexer.nextToken(), null);
}

exports['Operator 1- as word'] = function (test) {
    const lexer = sfl.lexer('1-');
    
    const token = lexer.nextToken();

    test.ok(token);
    test.equal(token.type, TokenType.Word);
    test.equal(token.value, '1-');

    test.equal(lexer.nextToken(), null);
}

exports['Skip spaces'] = function (test) {
    const lexer = sfl.lexer('  dup   ');

    const token = lexer.nextToken();

    test.ok(token);
    test.equal(token.type, TokenType.Word);
    test.equal(token.value, 'dup');

    test.equal(lexer.nextToken(), null);
}

exports['Get integer'] = function (test) {
    const lexer = sfl.lexer('123');
    
    const token = lexer.nextToken();

    test.ok(token);
    test.equal(token.type, TokenType.Integer);
    test.equal(token.value, '123');

    test.equal(lexer.nextToken(), null);
}

exports['Get negative integer'] = function (test) {
    const lexer = sfl.lexer(' -123 ');
    
    const token = lexer.nextToken();

    test.ok(token);
    test.equal(token.type, TokenType.Integer);
    test.equal(token.value, '-123');

    test.equal(lexer.nextToken(), null);
}
