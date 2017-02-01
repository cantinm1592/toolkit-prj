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

logger.setLevel('info');

describe("CSVParser", function() {
  
  describe("#parse()", function() {
    
    var buffer = fs.readFileSync(path.join(__dirname, 'csv-parser.csv'), "utf8");
    var lines = CSVParser.parse(buffer);
    
    it('should return an array (CSV lines)', function() {
      expect(lines).to.be.an('array');
    });
    
    it('should return an array of 106 CSV lines (file = csv-parser.csv)', function() {
      expect(lines.length).to.equal(106);
    });    
    
    it('should skip empty lines and do not add them to the array', function() {
      var lastLines = lines[lines.length - 1];
      logger.debug("lastLine =", lastLines);
      var empty = true;
      lastLines.forEach(function(column) {
        if(column !== '') {
          empty = false;
        }
      });
      expect(empty).to.be.false;
    });    
    
    it('should return CSV lines that are array (CSV columns)', function() {
      for(var i = 0; i < lines.length; i++) {
        expect(lines[i]).to.be.an('array');      
      }
    });
    
    it('should return CSV lines of 14 columns (file = csv-parser.csv)', function() {
      for(var i = 0; i < lines.length; i++) {
        expect(lines[i].length).to.equal(14);      
      }
    });
    
    it('should return CSV columns that are string', function() {
      for(var i = 0; i < lines.length; i++) {
        for(var j = 0; j < lines[i].length; j++) {  
          expect(lines[i][j], 'lines[' + i + '].columns[' + j + ']').to.be.a('string');      
        }
      }
    });
    
    it('should trim double quotes from the CSV column value', function() {
      for(var i = 0; i < lines.length; i++) {
        var columns = lines[i];
        for(var j = 0; j < columns.length; j++) {
          expect(columns[j].startsWith('"'), 'lines[' + i + '].columns[' + j + '].startsWith(\'"\')').to.not.be.true;
          expect(columns[j].endsWith('"'),   'lines[' + i + '].columns[' + j + '].endsWith(\'"\')'  ).to.not.be.true;
        }
      }
    });
    
  });
});