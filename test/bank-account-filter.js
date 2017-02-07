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
var BankAccountFilter = require('../app/bank-account-filter.js');

var buffer = fs.readFileSync(path.join(__dirname, 'eop_20161222.csv'), "utf8");
var lines = new CSVParser().parse(buffer);
var filter = new BankAccountFilter();
var transactions = filter.process(lines);

logger.setLevel('info');

logger.debug("transactions =", transactions);

describe("BankAccountFilter", function() {
  
  describe("#process(lines)", function() {
    
    it('should return an array of Transaction objects', function() {
      expect(transactions).to.be.an('array');
      transactions.forEach(function(transaction) {
        expect(transaction).to.be.an.instanceof(Transaction);
      });
    });
    
    it('should return objects with date property that matches the pattern /\d{4}-\d{2}-\d{2}/', function() {
      transactions.forEach(function(transaction) {
        expect(transaction.date, transaction.description).to.be.a('string');
        expect(transaction.date, transaction.description).to.match(/\d{4}-\d{2}-\d{2}/);
      });
    });
    
    it('should return objects with description property that are non-empty string', function() {
      transactions.forEach(function(transaction) {
        expect(transaction.description).to.be.a('string');
        expect(transaction.description).to.be.not.empty;
      });
    });    
    
    var keywordBlocked = ['Allocation', 'Depot', 'Interet', 'Paie /'];
    keywordBlocked.forEach(function(keyword) {
      it("should return objects with description property that does not contain the value '" + keyword + "'", function() {  
        transactions.forEach(function(transaction) {
          expect(transaction.description).to.not.have.string(keyword);
        });
      });
    });
    
    it('should return objects with amount property that matches the pattern /\d*,\d*/', function() {
      transactions.forEach(function(transaction) {
        expect(transaction.amount, transaction.description).to.be.a('string');
        expect(transaction.amount, transaction.description).to.match(/\d*,\d*/);
      });
    });
    
    it("should return objects with account property that has the following value 'EOP'", function() {
      transactions.forEach(function(transaction) {
        expect(transaction.account, transaction.description).to.be.a('string');
        expect(transaction.account, transaction.description).to.be.oneOf(['EOP']);
      });
    });
    
    it("should return objects with person property that has the following value 'Maxime'", function() {
      transactions.forEach(function(transaction) {
        expect(transaction.person, transaction.description).to.be.a('string');
        expect(transaction.person, transaction.description).to.be.oneOf(['Maxime']);
      });
    }); 
    
  });
  
});