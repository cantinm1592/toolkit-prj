/* eslint-env browser, node */
(function() {
  
  var BankAccountFilter = typeof window !== 'undefined' ? window.BankAccountFilter : require('./bank-account-filter.js');
  var CreditCardFilter = typeof window !== 'undefined' ? window.CreditCardFilter : require('./credit-card-filter.js');
  
  var logger = typeof window !== 'undefined' ? window.log : require('loglevel');
  logger.setLevel('info');
  
  var TransactionFilter = function() {
    this.bankAccountFilter = new BankAccountFilter();
    this.creditCardFilter = new CreditCardFilter();
  };

  TransactionFilter.prototype.process = function(lines) {
    
    var transactions;
    
    logger.debug('TransactionFilter.process() : begin');
    
    if(lines[0][0].startsWith("CD ")) {
      transactions = this.bankAccountFilter.process(lines);
    }
    else if(lines[0][0].startsWith("VISA")) {
      transactions = this.creditCardFilter.process(lines);
    }
    else {
      throw Error("Unknown CSV format : no transaction filter implementation found.");
    }
    
    logger.debug('TransactionFilter.process() : end');
    
    return transactions;
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = TransactionFilter;
  else
    window.TransactionFilter = TransactionFilter;
})();