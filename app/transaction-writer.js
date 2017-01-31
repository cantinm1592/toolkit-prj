/* eslint-env browser, node */
(function() {
  
  var logger = typeof window !== 'undefined' ? window.log : require('loglevel');
  var eol = "\n";
  var delimiter = ";";
  
  var TransactionWriter = function(){};
  
  TransactionWriter.write = function write(transactions, headers, headersName) {
    
    var buffer = '';
    
    headers.forEach(function(header) {
      buffer += headersName[header];
      buffer += delimiter;
    });
    
    buffer = buffer.slice(0, -1);
    buffer += eol;
    
    transactions.forEach(function(transaction){
      headers.forEach(function(header) {
        buffer += transaction[header];
        buffer += delimiter;
      });
      buffer = buffer.slice(0, -1);
      buffer += eol;
    });
    
    buffer = buffer.trim();
    
    return buffer;
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = TransactionWriter;
  else
    window.TransactionWriter = TransactionWriter;
})();