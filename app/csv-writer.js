/* eslint-env browser, node */
(function() {
  
  // var logger = typeof window !== 'undefined' ? window.log : require('loglevel');
  var delimiter = ";";
  var eol = "\n";
  
  var CSVWriter = function(){};
  
  CSVWriter.write = function write(lines) {
    var buffer = "";
    for(var i = 0; i < lines.length; i++) {
      for(var j = 0; j < lines[i].length; j++) {
        buffer += lines[i][j];
        buffer += delimiter;
      }
      buffer += eol;
    }
    return buffer;
  };
  
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = CSVWriter;
  else
    window.CSVWriter = CSVWriter;
})();