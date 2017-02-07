/* eslint-env node, mocha */

var chai = require('chai');
var expect = chai.expect;

var path = require('path');
var fs = require('fs');

var logger = require('loglevel-message-prefix')(require('loglevel'), {
    prefixes: ['level'],
    prefixFormat: "    [%p]",
});

var Transaction = require('../app/transaction.js');
var CSVParser = require('../app/csv-parser.js');
var TransactionFilter = require('../app/transaction-filter.js');

var filter = new TransactionFilter();

logger.setLevel('info');

describe("TransactionFilter", function() {
  
  describe("#process(lines)", function() {
    context("when passed lines from a credit card CSV", function() {
    
      var buffer = fs.readFileSync(path.join(__dirname, 'mastercard_20161123.csv'), "utf8");
      var lines = new CSVParser().parse(buffer);
      var transactions = filter.process(lines);
    
      it("should return an array of Transaction objects with account property that equals 'MASTERCARD'", function() {
        expect(transactions).to.be.an('array');
        transactions.forEach(function(transaction) {
          expect(transaction).to.be.an.instanceof(Transaction);
          expect(transaction.account).to.equal('MASTERCARD');
        });
      });
    });
  });
  
  describe("#process(lines)", function() {
    context("when passed lines from a bank account CSV", function() {
      
      var buffer = fs.readFileSync(path.join(__dirname, 'eop_20161222.csv'), "utf8");
      var lines = new CSVParser().parse(buffer);
      var transactions = filter.process(lines);
      
      it("should return an array of Transaction objects with account property that equals 'EOP'", function() {
        expect(transactions).to.be.an('array');
        transactions.forEach(function(transaction) {
          expect(transaction).to.be.an.instanceof(Transaction);
          expect(transaction.account).to.equal('EOP');
        });
      });
    });
  });
  
  describe("#process(lines)", function() {
    context("when passed lines from a unknown format CSV", function() {
      
      var buffer = fs.readFileSync(path.join(__dirname, 'eop_20161222.csv'), "utf8");
      var lines = new CSVParser().parse(buffer);
      lines[0][0] = "Unknown format first column value";
      
      it("should throw an error", function() {
        expect(function process() { filter.process(lines); }).to.throw(Error);
      });
    });
  });
  
});