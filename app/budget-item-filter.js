/* eslint-env browser, node */
(function() {
  
  var logger = typeof window !== 'undefined' ? window.log : require('loglevel');
  
  var BudgetItemFilter = function() {
    this.patterns = typeof window !== 'undefined' ? window.patterns : require('./patterns.json');
  };
  
  BudgetItemFilter.prototype.process = function(transactions) {
    
    var patterns = this.patterns;
    
    transactions.forEach(function(transaction){
      for(var i = 0; i < patterns.length; i++) {
        //logger.info("testing pattern '", patterns[i].pattern, "' on", transaction.description);
        if(transaction.description.includes(patterns[i].pattern)) {
          transaction.budgetItem = patterns[i].budgetItem;
          logger.debug("pattern found!");
          break;
        }
      }
    });
    
    return transactions;
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = BudgetItemFilter;
  else
    window.BudgetItemFilter = BudgetItemFilter;
})();