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
var CSVWriter = require('../app/csv-writer.js');

describe("CSVWriter", function() {
  
  describe("#write(lines)", function() {
    var buffer = fs.readFileSync(path.join(__dirname, 'mastercard_20161123.csv'), "utf8");
    var lines = new CSVParser().parse(buffer);
    var output = new CSVWriter().write(lines);
    
    it('should return a string', function() {
      expect(output).to.be.a('string');
    });
  });
  
});