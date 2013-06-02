
var sfl = require('../lib/lexer.js'),
    assert = require('assert');
    
// TokenType

var TokenType = sfl.TokenType;

assert.ok(TokenType);
assert.ok(TokenType.Word);

// Create lexer

var lexer = sfl.createLexer('dup');

assert.ok(lexer);

// Next token

var token = lexer.nextToken();

assert.ok(token);
assert.equal(token.type, TokenType.Word);
assert.equal(token.value, 'dup');

token = lexer.nextToken();

assert.equal(token, null);

// Skip spaces

var lexer = sfl.createLexer('  dup   ');

assert.ok(lexer);

var token = lexer.nextToken();

assert.ok(token);
assert.equal(token.type, TokenType.Word);
assert.equal(token.value, 'dup');

token = lexer.nextToken();

assert.equal(token, null);

// Get integer

var lexer = sfl.createLexer('123');
var token = lexer.nextToken();

assert.ok(token);
assert.equal(token.type, TokenType.Integer);
assert.equal(token.value, '123');

// Get negative integer

var lexer = sfl.createLexer(' -123 ');
var token = lexer.nextToken();

assert.ok(token);
assert.equal(token.type, TokenType.Integer);
assert.equal(token.value, '-123');
