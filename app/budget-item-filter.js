/* eslint-env browser, node */
(function() {
  
  var logger = typeof window !== 'undefined' ? window.log : require('loglevel');
  var budgetItemsByPattern = typeof window !== 'undefined' ? window.budgetItemsByPattern : require('./budget-item-patterns.js');
  
  var BudgetItemFilter = function(){};
  
  BudgetItemFilter.prototype.process = function(transactions) {
    
    logger.info("budgetItemsByPattern =", budgetItemsByPattern);
    logger.info("Object.keys(budgetItemsByPattern) =", Object.keys(budgetItemsByPattern));

    var patterns = Object.keys(budgetItemsByPattern);
    
    transactions.forEach(function(transaction){
      for(var i = 0; i < patterns.length; i++) {
        logger.info("testing pattern '", patterns[i], "' on", transaction.description);
        if(transaction.description.includes(patterns[i])) {
          transaction.budgetItem = budgetItemsByPattern[patterns[i]];
          logger.info("FOUND!");
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