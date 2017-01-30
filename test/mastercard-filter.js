/* eslint-env node, mocha */

var chai = require('chai');
var expect = chai.expect;

var path = require('path');
var fs = require('fs');

var logger = require('loglevel-message-prefix')(require('loglevel'), {
    prefixes: ['level'],
    prefixFormat: "    [%p]",
});

logger.setLevel('info');

var CSVParser = require('../app/csv-parser.js');
var MasterCardFilter = require('../app/mastercard-filter.js');

var buffer = fs.readFileSync(path.join(__dirname, 'csv-parser.csv'), "utf8");
var linesIn = CSVParser.parse(buffer);
var linesOut = MasterCardFilter.filter(linesIn);

describe("MasterCardFilter", function() {
  
  describe("#filter()", function() {
    
    it('should return an array (CSV lines)', function() {
      expect(linesOut).to.be.an('array');
    });
    
    it('should return an array of "linesIn.length + 1" (header line added)', function() {
      expect(linesOut.length).to.equal(linesIn.length + 1);
    });
    
    it('linesOut[i][0] should be string and match the pattern /\d{4}-\d{2}-\d{2}/', function() {
      for(var i = 1; i < linesOut.length; i++) {
        expect(linesOut[i][0],'linesOut[' + i + '].columns[0]').to.be.a('string');
        expect(linesOut[i][0],'linesOut[' + i + '].columns[0]').to.match(/\d{4}-\d{2}-\d{2}/);
      }
    });
  });
  
});