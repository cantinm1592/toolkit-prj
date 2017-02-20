/* eslint-env node, mocha */

var chai = require('chai');
var expect = chai.expect;

var path = require('path');
var fs = require('fs');
var ko = require('knockout');

var logger = require('loglevel-message-prefix')(require('loglevel'), {
    prefixes: ['level'],
    prefixFormat: "    [%p]",
});

logger.setLevel('info');

var CSVParser = require('../app/csv-parser.js');
var TransactionFilter = require('../app/transaction-filter.js');
var TransactionViewModel = require('../app/transaction-view-model.js');
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
    transactions.push(new TransactionViewModel("2017-01-01", "IGA LACOSTE", "25.00", "MASTERCARD", "Maxime", "Épicerie"));
    transactions.push(new TransactionViewModel("2017-01-01", "TAIPHON", "17.00", "MASTERCARD", "Maxime", "Lunch"));
    transactions.push(new TransactionViewModel("2017-01-01", "RETRAIT AU GA", "100.00", "EOP", "Maxime", "Argent comptant"));

    var viewModel = new TransactionsViewModel(transactions);
    
    it('return an object', function() {
      expect(viewModel).to.be.an('object');
    });
    
    it('should have a transactions property that have a length of 3', function() {
      expect(viewModel.transactions()).to.have.a.lengthOf(3);
    });

  });
  
  describe("#applyPattern()", function() {
    
    var patterns = require('../app/patterns.json');
    var viewModel = new TransactionsViewModel([], patterns);
    
    var buffer = fs.readFileSync(path.join(__dirname, 'mastercard_20161123.csv'), "utf8");
    var lines = new CSVParser().parse(buffer);
    var transactions = new TransactionFilter().process(lines);
    
    transactions.forEach(function(transaction) {
      viewModel.addTransaction(TransactionViewModel.createFromTransaction(transaction));
    });
    
    
    viewModel.applyPatterns();
    
    it("should return at least one TransactionViewModel object with a non-empty budgetItem property", function() {
      var budgetItemNonEmpty = 0;
      ko.utils.arrayForEach(viewModel.transactions(), function(transaction) {
        //console.log(transaction.budgetItem());
        if(transaction.budgetItem() !== '') {
          budgetItemNonEmpty++;
        }
      });
      expect(budgetItemNonEmpty).to.be.above(0);
    });      
  });
});