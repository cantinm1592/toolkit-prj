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
  
  describe("#write()", function() {
    var buffer = fs.readFileSync(path.join(__dirname, 'csv-parser.csv'), "utf8");
    var lines = CSVParser.parse(buffer);
    var output = CSVWriter.write(lines);
    
    it('should return a string', function() {
      expect(output).to.be.a('string');
    });
  });
  
});