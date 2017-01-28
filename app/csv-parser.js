/* eslint-env browser, node */
(function() {
  
  var logger = typeof window !== 'undefined' ? window.log : require('loglevel');
  var eol = "\r\n";
  var delimiter = ",";
  
  var CSVParser = function(){};

  CSVParser.parse = function parse(buffer) {
    
    logger.debug('CSVParser.parse() : begin');
    
    var linesAsArray = new Array();
    var linesAsString = buffer.split(eol);
    
    for(var i = 0; i < linesAsString.length; i++) {

      // Split line string in an array that represents columns
      linesAsArray[i] = linesAsString[i].split(delimiter);
      
      // Remove double quote around column values of this line
      for(var j = 0; j < linesAsArray[i].length; j++) {
        var columnValue = linesAsArray[i][j];
        if(typeof columnValue === 'string') {
          linesAsArray[i][j] = columnValue.toString().replace(/(^"|"$)/g, '');
        }
        
        if(i === 0) {
          logger.trace("trimValue = %" + linesAsArray[i][j] + "%");
        }
      }
    }
    
    logger.trace(linesAsArray);
    logger.debug('CSVParser.parse() : end');
    
    return linesAsArray;
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = CSVParser;
  else
    window.CSVParser = CSVParser;
})();