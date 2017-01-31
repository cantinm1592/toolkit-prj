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
    
    linesAsString.forEach(function(lineAsString) {
      
      // Split line string in an array that represents columns
      var lineAsArray = lineAsString.split(delimiter);
      
      if(lineAsArray.length > 1) {
        
        logger.debug("lineAsArray.length =", lineAsArray.length);
        if(lineAsArray.length === 1) {  
          logger.debug("lineAsArray =", linesAsArray);
        }
  
        // Remove double quote around column values of this line      
        lineAsArray.forEach(function(column, index, lineAsArray) {
          if(typeof column === 'string') {
            lineAsArray[index] = column.toString().replace(/(^"|"$)/g, '');
          }
        });
        
        linesAsArray.push(lineAsArray);
      }
    });
    
    logger.debug("linesAsArray =", linesAsArray);
    logger.debug('CSVParser.parse() : end');
    
    return linesAsArray;
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = CSVParser;
  else
    window.CSVParser = CSVParser;
})();