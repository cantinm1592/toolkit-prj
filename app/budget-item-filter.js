/* eslint-env browser, node */
(function() {
  
  var logger = typeof window !== 'undefined' ? window.log : require('loglevel');

  
  var BudgetItemFilter = function() {
    this.budgetItemsByPattern = typeof window !== 'undefined' ? window.budgetItemsByPattern : require('./budget-item-patterns.json');
  };
  
  BudgetItemFilter.prototype.process = function(transactions) {
    
    var budgetItemsByPattern = this.budgetItemsByPattern;
    
    logger.debug("budgetItemsByPattern =", budgetItemsByPattern);
    logger.debug("Object.keys(budgetItemsByPattern) =", Object.keys(budgetItemsByPattern));

    var patterns = Object.keys(this.budgetItemsByPattern);
    
    transactions.forEach(function(transaction){
      for(var i = 0; i < patterns.length; i++) {
        logger.debug("testing pattern '", patterns[i], "' on", transaction.description);
        if(transaction.description.includes(patterns[i])) {
          transaction.budgetItem = budgetItemsByPattern[patterns[i]];
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