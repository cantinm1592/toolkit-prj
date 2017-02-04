/* eslint-env browser, node */
(function() {
  
  var Transaction = typeof window !== 'undefined' ? window.Transaction : require('./transaction.js');
  
  var logger = typeof window !== 'undefined' ? window.log : require('loglevel');
  logger.setLevel('info');
  
  var account = "EOP";
  var person= "Maxime";
  
  var BankAccountFilter = function(){};

  BankAccountFilter.prototype.process = function(lines) {
    
    logger.debug('BankAccountFilter.process() : begin');
    
    var transactions = new Array();
    
    lines.forEach(function(line) {
      var type = line[7] !== '' ?'debit' : 'credit';
      if(type === 'debit') {
        var transaction = new Transaction();
        transaction.date = line[3].replace(/\//g, '-');
        transaction.description = line[5];
        transaction.amount = line[7].replace('.', ',');
        transaction.account = account;
        transaction.person = person;
        transactions.push(transaction);
      }
    });
    
    logger.debug('BankAccountFilter.process() : end');
    
    return transactions;
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = BankAccountFilter;
  else
    window.BankAccountFilter = BankAccountFilter;
})();