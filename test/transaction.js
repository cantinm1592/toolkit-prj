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

  describe("#empty constructor", function() {
    
    var transaction = new Transaction();
    
    it('return an object', function() {
      expect(transaction).to.be.an('object');
    });
    
    var properties = ['date', 'description', 'amount', 'account', 'person', 'budgetItem', 'category', 'reserve'];
    
    properties.forEach(function(property) {
      var a = property.startsWith('a') ? 'an' : 'a';
      it('should have ' + a + ' ' + property + ' property equals to ""', function() {
        expect(transaction).to.have.property(property);
        expect(transaction[property]).to.equals("");
      });
    });
  });
  
  describe("#constructor with 8 parameters", function() {
    
    var date = "2017-01-01";
    var description = "APPLE STORE";
    var amount = "1895.00";
    var account = "MASTERCARD";
    var person = "Maxime";
    var budgetItem = "Macbook Julie";
    var category = "RESERVE";
    var reserve = "PIGES";
    
    var transaction = new Transaction(date, description, amount, account, person, budgetItem, category, reserve);
    
    it('return an object', function() {
      expect(transaction).to.be.an('object');
    });
    
    it('should have a date property equals to "' + date + '"', function() {
      expect(transaction.date).to.equals(date);
    });
    
    it('should have a date property equals to "' + description + '"', function() {
      expect(transaction.description).to.equals(description);
    });
    
    it('should have a date property equals to "' + amount + '"', function() {
      expect(transaction.amount).to.equals(amount);
    });

    it('should have a date property equals to "' + account + '"', function() {
      expect(transaction.account).to.equals(account);
    });

    it('should have a date property equals to "' + person + '"', function() {
      expect(transaction.person).to.equals(person);
    });
    
    it('should have a date property equals to "' + budgetItem + '"', function() {
      expect(transaction.budgetItem).to.equals(budgetItem);
    });

    it('should have a date property equals to "' + category + '"', function() {
      expect(transaction.category).to.equals(category);
    });

    it('should have a date property equals to "' + reserve + '"', function() {
      expect(transaction.reserve).to.equals(reserve);
    });

  });
});