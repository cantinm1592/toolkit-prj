/* eslint-env browser, node */
(function() {
  
  var ko = typeof window !== 'undefined' ? window.ko : require('knockout');

  var TransactionsViewModel = function(transactions) {
    
    this.selectedTransactions = ko.observableArray();
    this.transactions = ko.observableArray(transactions !== undefined ? transactions : null);
    
    this.uncategorizedCount = ko.computed(function() {
      var count = 0;
      for(var i = 0; i < this.transactions().length; i++) {
        if(this.transactions()[i].budgetItem === '') {
          count++;
        }
      }
      return count;
    }, this);
  };
  
  TransactionsViewModel.prototype.addTransactions = function(transactions) {
    for(var i = 0; i < transactions.length; i++) {
      this.transactions.push(transactions[i]);
    }
    
    //this.uncategorizedCount();
  };
  
  TransactionsViewModel.prototype.removeTransactions = function() {
    var transaction = null;
    while((transaction = this.selectedTransactions().shift()) !== undefined) { 
      console.log("removing");
      this.transactions.remove(transaction);
    }
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = TransactionsViewModel;
  else
    window.TransactionsViewModel = TransactionsViewModel;
})();