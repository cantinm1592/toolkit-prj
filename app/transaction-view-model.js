/* eslint-env browser, node */
(function() {
  
  var ko = typeof window !== 'undefined' ? window.ko : require('knockout');

  var TransactionViewModel = function(date, description, amount, account, person, budgetItem, category, reserve) {
    
    this.date = ko.observable(date);
    //console.log("TransactionViewModel.new() : description =", description);
    this.description = ko.observable(description);
    this.amount = ko.observable(amount);
    this.account = ko.observable(account);
    this.person = ko.observable(person);
    this.budgetItem = ko.observable(budgetItem);
    this.category = ko.observable(category);
    this.reserve = ko.observable(reserve);
  };
  
  TransactionViewModel.createFromTransaction = function(transaction) {
    
    //console.log("TransactionViewModel.createFromTransaction() : transaction.description =", transaction.description);
    
    return new TransactionViewModel(
      transaction.date,
      transaction.description,
      transaction.amount,
      transaction.account,
      transaction.person,
      transaction.budgetItem,
      transaction.category,
      transaction.reserve
    );
    
  };
  
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = TransactionViewModel;
  else
    window.TransactionViewModel = TransactionViewModel;
})();