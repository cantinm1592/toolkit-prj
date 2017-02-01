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
var CreditCardFilter = require('../app/credit-card-filter.js');

var buffer = fs.readFileSync(path.join(__dirname, 'csv-parser.csv'), "utf8");
var lines = CSVParser.parse(buffer);
var transactions = CreditCardFilter.filter(lines);

logger.setLevel('info');

describe("CreditCardFilter", function() {
  
  describe("#filter(lines)", function() {
    
    it('should return an array of Transaction objects', function() {
      expect(transactions).to.be.an('array');
      transactions.forEach(function(transaction) {
        expect(transaction).to.be.an.instanceof(Transaction);
      });
    });
    
    it('should return an array of the same length minus 1 than the lines parameter (exclude monthly payment line)', function() {
      expect(transactions.length).to.equal(lines.length -1);
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
    
    it('should return objects with amount property that matches the pattern /\d*,\d*/', function() {
      transactions.forEach(function(transaction) {
        expect(transaction.amount, transaction.description).to.be.a('string');
        expect(transaction.amount, transaction.description).to.match(/\d*,\d*/);
      });
    });
    
    it('should return objects with account property that have the following value : MASTERCARD, EOP', function() {
      transactions.forEach(function(transaction) {
        expect(transaction.account, transaction.description).to.be.a('string');
        expect(transaction.account, transaction.description).to.be.oneOf(['MASTERCARD', 'EOP']);
      });
    });
    
    it('should return objects with person property that have the following value : Maxime, Julie', function() {
      transactions.forEach(function(transaction) {
        expect(transaction.person, transaction.description).to.be.a('string');
        expect(transaction.person, transaction.description).to.be.oneOf(['Maxime', 'Julie']);
      });
    }); 
    
  });
  
});