/* eslint-env node, mocha */

var chai = require('chai');
var expect = chai.expect;

var path = require('path');
var fs = require('fs');

var logger = require('loglevel-message-prefix')(require('loglevel'), {
    prefixes: ['level'],
    prefixFormat: "    [%p]",
});

var CSVParser = require('../app/csv-parser.js');
var MasterCardFilter = require('../app/mastercard-filter.js');
var TransactionWriter= require('../app/transaction-writer.js');

var headers = ['date', 'description', 'amount', 'account', 'person'];
var headersName = {'date':'Date', 'description':'Description', 'amount':'Montant', 'account':'Compte', 'person':'Par'};

logger.setLevel('info');

describe("TransactionWriter", function() {
  
  describe("#write(transactions, headers, headersName)", function() {
  
    var buffer = fs.readFileSync(path.join(__dirname, 'csv-parser.csv'), "utf8");
    var lines = CSVParser.parse(buffer);
    var transactions = MasterCardFilter.filter(lines);
    var output = TransactionWriter.write(transactions, headers, headersName);
    
    it('should return a string', function() {
      expect(output).to.be.a('string');
    });
    
    it('should return a string of "transactions.length + 1" lines', function() {
      expect(output.split("\n").length).to.equal(transactions.length + 1);
    });

  });
});