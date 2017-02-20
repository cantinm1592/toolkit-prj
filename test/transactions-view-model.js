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
  
  describe("#applyPatterns()", function() {
    
    context("when the pattern is : pattern='PATTERN', amount='*'", function() {
      
      it("shoud set the budgetItem of transactions that have a description that matches the pattern", function() {
        
        var patterns = [{"pattern": "IGA", "amount": "*", "budgetItem": "Épicerie"}];
        var viewModel = new TransactionsViewModel([], patterns);
        
        var buffer = fs.readFileSync(path.join(__dirname, 'mastercard_20161123.csv'), "utf8");
        var lines = new CSVParser().parse(buffer);
        var transactions = new TransactionFilter().process(lines);
        
        transactions.forEach(function(transaction) {
          viewModel.addTransaction(TransactionViewModel.createFromTransaction(transaction));
        });
        
        viewModel.applyPatterns();
        
        var budgetItemFound = 0;
        ko.utils.arrayForEach(viewModel.transactions(), function(transaction) {
          //console.log(transaction.budgetItem());
          if(transaction.budgetItem() === 'Épicerie') {
            budgetItemFound++;
          }
        });
        
        expect(budgetItemFound).to.equal(6);
      });
    });
    
    context("when the pattern is : pattern='PATTERN', amount='9,99'", function() {
      
      it("shoud set the budgetItem of transactions that have a description that matches the pattern and that have the exact amount", function() {
        
        var patterns = [{"pattern": "ITUNES", "amount": "1,48", "budgetItem": "iCloud Storage"}];
        var viewModel = new TransactionsViewModel([], patterns);
        
        var buffer = fs.readFileSync(path.join(__dirname, 'mastercard_20161123.csv'), "utf8");
        var lines = new CSVParser().parse(buffer);
        var transactions = new TransactionFilter().process(lines);
        
        transactions.forEach(function(transaction) {
          viewModel.addTransaction(TransactionViewModel.createFromTransaction(transaction));
        });
        
        viewModel.applyPatterns();
        
        var budgetItemFound = 0;
        ko.utils.arrayForEach(viewModel.transactions(), function(transaction) {
          //console.log(transaction.budgetItem());
          if(transaction.budgetItem() === 'iCloud Storage') {
            budgetItemFound++;
          }
        });
        
        expect(budgetItemFound).to.equal(2);
      });
    });

    describe("#sortPatterns()", function() {
      
      var patterns = [ { "pattern": "VALENTINE", "amount": "*", "budgetItem": "Restaurants" },
                       { "pattern": "ITUNES", "amount": "14,99", "budgetItem": "Apple Music" },
                       { "pattern": "ITUNES", "amount": "1,48", "budgetItem": "iCloud Storage" },
                       { "pattern": "PROVIGO", "amount": "*", "budgetItem": "Épicerie" } ];
                       
      var viewModel = new TransactionsViewModel([], patterns);
      viewModel.sortPatterns();
      
      it("should return the patterns sorted by 'pattern' property, then by 'amount' property", function() {
        expect(viewModel.patterns()[0].pattern()).to.equal("ITUNES");
        expect(viewModel.patterns()[0].amount()).to.equal("1,48");
        
        expect(viewModel.patterns()[1].pattern()).to.equal("ITUNES");
        expect(viewModel.patterns()[1].amount()).to.equal("14,99");
        
        expect(viewModel.patterns()[2].pattern()).to.equal("PROVIGO");
        expect(viewModel.patterns()[3].pattern()).to.equal("VALENTINE");
      });
                       
    });

  });
  
    
});