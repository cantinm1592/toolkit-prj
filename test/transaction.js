/* eslint-env node, mocha */

var chai = require('chai');
var expect = chai.expect;

var logger = require('loglevel-message-prefix')(require('loglevel'), {
    prefixes: ['level'],
    prefixFormat: "    [%p]",
});

logger.setLevel('info');

var Transaction = require('../app/transaction.js');

describe("Transaction", function() {
  
  var transaction = new Transaction();
  
  it('is an object', function() {
    expect(transaction).to.be.an('object');
  });
  
  var properties = ['date', 'description', 'amount', 'account', 'person', 'budgetItem', 'category', 'reserve'];
  
  properties.forEach(function(property) {
    var a = property.startsWith('a') ? 'an' : 'a';
    it('should have ' + a + ' ' + property + ' property', function() {
      expect(transaction).to.have.property(property);
    });
  });
});