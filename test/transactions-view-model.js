/* eslint-env node, mocha */

var chai = require('chai');
var expect = chai.expect;

var logger = require('loglevel-message-prefix')(require('loglevel'), {
    prefixes: ['level'],
    prefixFormat: "    [%p]",
});

logger.setLevel('info');

var Transaction = require('../app/transaction.js');
var TransactionsViewModel = require('../app/transactions-view-model.js');

describe("TransactionsViewModel", function() {

  describe("#empty constructor", function() {
    
    var viewModel = new TransactionsViewModel();
    
    it('return an object', function() {
      expect(viewModel).to.be.an('object');
    });
    
    it('should have a transactions property that is empty', function() {
      expect(viewModel.transactions()).to.have.a.lengthOf(0);
    });
    
  });
  
  describe("#constructor with 1 parameter", function() {
    
    var transactions = [];
    transactions.push(new Transaction("2017-01-01", "IGA LACOSTE", "25.00", "MASTERCARD", "Maxime", "Épicerie"));
    transactions.push(new Transaction("2017-01-01", "TAIPHON", "17.00", "MASTERCARD", "Maxime", "Lunch"));
    transactions.push(new Transaction("2017-01-01", "RETRAIT AU GA", "100.00", "EOP", "Maxime", "Argent comptant"));

    var viewModel = new TransactionsViewModel(transactions);
    
    it('return an object', function() {
      expect(viewModel).to.be.an('object');
    });
    
    it('should have a transactions property that have a length of 3', function() {
      expect(viewModel.transactions()).to.have.a.lengthOf(3);
    });

  });
});