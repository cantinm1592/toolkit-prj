/* eslint-env browser, node */
(function() {
  
  var Transaction = typeof window !== 'undefined' ? window.Transaction : require('./transaction.js');
  
  var logger = typeof window !== 'undefined' ? window.log : require('loglevel');
  logger.setLevel('info');
  
  var account = "MASTERCARD";
  var cardLastNumberToExclude = 8;
  var personByCardLastNumber = {4: "Julie", 6: "Maxime"};
  
  var CreditCardFilter = function(){};

  CreditCardFilter.prototype.process = function(lines) {
    
    logger.debug('CreditCardFilter.process() : begin');
    
    var transactions = new Array();
    
    lines.forEach(function(line) {
      if(!line[0].endsWith(cardLastNumberToExclude)) {
        var transaction = new Transaction();
        transaction.date = line[3].replace(/\//g, '-');
        transaction.description = line[5];
        transaction.amount = (line[11] !== '' ? line[11] : '-' + line[12]).replace('.', ',');
        transaction.account = account;
        logger.trace("line[0].slice(-1) = ", line[0].slice(-1));
        transaction.person = personByCardLastNumber[line[0].slice(-1)];
        transactions.push(transaction);
      }
    });
    
    logger.debug('CreditCardFilter.process() : end');
    
    return transactions;
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = CreditCardFilter;
  else
    window.CreditCardFilter = CreditCardFilter;
})();