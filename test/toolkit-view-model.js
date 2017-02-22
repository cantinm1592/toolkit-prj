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
var RuleViewModel = require('../app/rule-view-model.js');
var ToolkitViewModel = require('../app/toolkit-view-model.js');

describe("ToolkitViewModel", function() {

  describe("#empty constructor", function() {
    
    var viewModel = new ToolkitViewModel();
    
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

    var viewModel = new ToolkitViewModel(transactions);
    
    it('return an object', function() {
      expect(viewModel).to.be.an('object');
    });
    
    it('should have a transactions property that have a length of 3', function() {
      expect(viewModel.transactions()).to.have.a.lengthOf(3);
    });

  });
  
  describe("#addRule()", function() {
    
    var transactions = [];
    transactions.push(new TransactionViewModel("2017-01-01", "IGA LACOSTE", "25.00", "MASTERCARD", "Maxime"));
    transactions.push(new TransactionViewModel("2017-01-01", "TAIPHON", "17.00", "MASTERCARD", "Maxime"));
    transactions.push(new TransactionViewModel("2017-01-01", "RETRAIT AU GA", "100.00", "EOP", "Maxime", "Argent comptant"));
    
    var viewModel = new ToolkitViewModel(transactions, [{"descriptionPattern": "TAIPHON", "budgetItem": "Lunch"}]);
    
    viewModel.addRule("IGA", "Épicerie");
    
    it("should add the rule at the beginning of the rules array", function() {
      expect(viewModel.rules()[0].descriptionPattern()).to.equal("IGA");
    });
    
    it("should reapply the rules to the transactions", function() {
      expect(viewModel.transactions()[0].budgetItem()).to.equal("Épicerie");
    });
    
  });
  
  describe("#applyRules()", function() {
    
    context("when the descriptionPattern is : descriptionPattern='PATTERN', amountPattern='*'", function() {
      
      it("shoud set the budgetItem of transactions that have a description that matches the descriptionPattern", function() {
        
        var rules = [{"descriptionPattern": "IGA", "amountPattern": "*", "budgetItem": "Épicerie"}];
        var viewModel = new ToolkitViewModel([], rules);
        
        var buffer = fs.readFileSync(path.join(__dirname, 'mastercard_20161123.csv'), "utf8");
        var lines = new CSVParser().parse(buffer);
        var transactions = new TransactionFilter().process(lines);
        
        transactions.forEach(function(transaction) {
          viewModel.addTransaction(TransactionViewModel.createFromTransaction(transaction));
        });
        
        viewModel.applyRules();
        
        var budgetItemFound = 0;
        ko.utils.arrayForEach(viewModel.transactions(), function(transaction) {
          if(transaction.budgetItem() === 'Épicerie') {
            budgetItemFound++;
          }
        });
        
        expect(budgetItemFound).to.equal(6);
      });
    });
    
    context("when the descriptionPattern is : descriptionPattern='PATTERN', amountPattern='9,99'", function() {
      
      it("shoud set the budgetItem of transactions that have a description that matches the descriptionPattern and that have the exact amountPattern", function() {
        
        var rules = [{"descriptionPattern": "ITUNES", "amountPattern": "1,48", "budgetItem": "iCloud Storage"}];
        var viewModel = new ToolkitViewModel([], rules);
        
        var buffer = fs.readFileSync(path.join(__dirname, 'mastercard_20161123.csv'), "utf8");
        var lines = new CSVParser().parse(buffer);
        var transactions = new TransactionFilter().process(lines);
        
        transactions.forEach(function(transaction) {
          viewModel.addTransaction(TransactionViewModel.createFromTransaction(transaction));
        });
        
        viewModel.applyRules();
        
        var budgetItemFound = 0;
        ko.utils.arrayForEach(viewModel.transactions(), function(transaction) {
          if(transaction.budgetItem() === 'iCloud Storage') {
            budgetItemFound++;
          }
        });
        
        expect(budgetItemFound).to.equal(2);
      });
    });

    

  });
  
  describe("#sortRules()", function() {
      
    var rules = [ { "descriptionPattern": "VALENTINE", "amountPattern": "*", "budgetItem": "Restaurants" },
                     { "descriptionPattern": "ITUNES", "amountPattern": "14,99", "budgetItem": "Apple Music" },
                     { "descriptionPattern": "ITUNES", "amountPattern": "1,48", "budgetItem": "iCloud Storage" },
                     { "descriptionPattern": "PROVIGO", "amountPattern": "*", "budgetItem": "Épicerie" } ];
                     
    var viewModel = new ToolkitViewModel([], rules);
    
    viewModel.sortRules();
    
    it("should return the rules sorted by 'descriptionPattern' property, then by 'amountPattern' property", function() {
      expect(viewModel.rules()[0].descriptionPattern()).to.equal("ITUNES");
      expect(viewModel.rules()[0].amountPattern()).to.equal("1,48");
      
      expect(viewModel.rules()[1].descriptionPattern()).to.equal("ITUNES");
      expect(viewModel.rules()[1].amountPattern()).to.equal("14,99");
      
      expect(viewModel.rules()[2].descriptionPattern()).to.equal("PROVIGO");
      expect(viewModel.rules()[2].amountPattern()).to.equal("*");
      
      expect(viewModel.rules()[3].descriptionPattern()).to.equal("VALENTINE");
      expect(viewModel.rules()[3].amountPattern()).to.equal("*");
    });
                       
  });
    
});