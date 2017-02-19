/* eslint-env node, mocha */

var chai = require('chai');
var expect = chai.expect;

var logger = require('loglevel-message-prefix')(require('loglevel'), {
    prefixes: ['level'],
    prefixFormat: "    [%p]",
});

logger.setLevel('info');

var Transaction = require('../app/transaction.js');
var TransactionViewModel = require('../app/transaction-view-model.js');

describe("TransactionViewModel", function() {

  describe("#empty constructor", function() {
    
    var viewModel = new TransactionViewModel();
    
    it('returns an object', function() {
      expect(viewModel).to.be.an('object');
    });
  });
  
  describe("#createFromTransaction", function() {
    
    var date = "2017-01-01";
    var description = "IGA LACOSTE";
    var amount = "25,00";
    var account = "MASTERCARD";
    var person = "Maxime";
    var budgetItem = "Épicerie";
    
    var transaction = new Transaction(date, description, amount, account, person, budgetItem);

    var viewModel = TransactionViewModel.createFromTransaction(transaction);
    
    it('returns an object', function() {
      expect(viewModel).to.be.an('object');
    });
    
    it('sets all the properties based on the transaction parameter', function() {
      expect(viewModel.date()).to.equal(date);
      expect(viewModel.description()).to.equal(description);
      expect(viewModel.amount()).to.equal(amount);
      expect(viewModel.account()).to.equal(account);
      expect(viewModel.person()).to.equal(person);
      expect(viewModel.budgetItem()).to.equal(budgetItem);
      expect(viewModel.category()).to.equal("");
      expect(viewModel.reserve()).to.equal("");
    });
    
  });
});