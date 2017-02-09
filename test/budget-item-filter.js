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
var TransactionWriter = require('../app/transaction-writer.js');
var TransactionFilter = require('../app/transaction-filter.js');
var BudgetItemFilter = require('../app/budget-item-filter.js');

logger.setLevel('info');

describe("BudgetItemFilter", function() {
  
  describe("#process(transactions)", function() {
    
      var buffer = fs.readFileSync(path.join(__dirname, 'mastercard_20161123.csv'), "utf8");
      var lines = new CSVParser().parse(buffer);
      var transactions = new TransactionFilter().process(lines);
      transactions = new BudgetItemFilter().process(transactions);
      
      var headers = ['date', 'description', 'amount', 'account', 'person', 'budgetItem'];
      logger.debug(new TransactionWriter().write(transactions, headers));
    
      it("should return an array of Transaction objects", function() {
        expect(transactions).to.be.an('array');
        transactions.forEach(function(transaction) {
          expect(transaction).to.be.an.instanceof(Transaction);
        });
      });
    
      it("should return at least one Transaction object with a non-empty budgetItem property", function() {
        var budgetItemNonEmpty = 0;
        transactions.forEach(function(transaction) {
          if(transaction.budgetItem !== '') {
            budgetItemNonEmpty++;
          }
        });
        expect(budgetItemNonEmpty).to.be.above(0);
      });      
  });
});
  