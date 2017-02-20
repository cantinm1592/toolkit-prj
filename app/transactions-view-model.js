/* eslint-env browser, node */
(function() {
  
  var ko = typeof window !== 'undefined' ? window.ko : require('knockout');

  var TransactionsViewModel = function(transactions, patterns) {
    
    this.selectedTransactions = ko.observableArray();
    this.transactions = ko.observableArray(transactions !== undefined ? transactions : null);
    this.patterns = ko.observableArray(patterns !== undefined ? patterns : null);
    
    this.uncategorizedCount = ko.computed(function() {
      var count = 0;
      for(var i = 0; i < this.transactions().length; i++) {
        if(this.transactions()[i].budgetItem() === '') {
          count++;
        }
      }
      return count;
    }, this);
  };
  
  TransactionsViewModel.prototype.addTransaction = function(transaction) {
    this.transactions.push(transaction);
  };
  
  TransactionsViewModel.prototype.removeTransactions = function() {
    var transaction = null;
    while((transaction = this.selectedTransactions().shift()) !== undefined) { 
      console.log("removing");
      this.transactions.remove(transaction);
    }
  };
  
  TransactionsViewModel.prototype.addPattern = function(pattern, budgetItem) {
    this.patterns.unshift({"pattern": pattern, "budgetItem": budgetItem});
    this.applyPatterns();
  };
  
  TransactionsViewModel.prototype.applyPatterns = function() {
    console.log("applyPatterns!");
    
    var patterns = this.patterns();
    ko.utils.arrayForEach(this.transactions(), function(transaction){
      for(var i = 0; i < patterns.length; i++) {
        //logger.info("testing pattern '", patterns[i].pattern, "' on", transaction.description);
        if(transaction.description().includes(patterns[i].pattern)) {
          transaction.budgetItem(patterns[i].budgetItem);
          console.log("pattern found!");
          break;
        }
      }
    });
    
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = TransactionsViewModel;
  else
    window.TransactionsViewModel = TransactionsViewModel;
})();