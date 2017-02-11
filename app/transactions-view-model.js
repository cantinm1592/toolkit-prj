/* eslint-env browser, node */
(function() {
  
  var ko = typeof window !== 'undefined' ? window.ko : require('knockout');

  var TransactionsViewModel = function(transactions) {
    
    this.selectedTransactions = ko.observableArray();
    this.transactions = ko.observableArray(transactions !== undefined ? transactions : null);
  };
  
  TransactionsViewModel.prototype.pushAll = function(transactions) {
    for(var i = 0; i < transactions.length; i++) {
      this.transactions.push(transactions[i]);
    }
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