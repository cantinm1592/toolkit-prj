/* eslint-env browser, node */
(function() {
  
  var ko = typeof window !== 'undefined' ? window.ko : require('knockout');

  var PatternViewModel = function(pattern, budgetItem, amount) {
    
    if(amount === undefined || amount === '') {
      amount = "*";
    }
    
    this.pattern = ko.observable(pattern);
    this.amount = ko.observable(amount);
    this.budgetItem = ko.observable(budgetItem);
  };
  
  PatternViewModel.createFromPattern = function(pattern) {
    
    return new PatternViewModel(
      pattern.pattern,
      pattern.budgetItem,
      pattern.amount
    );
    
  };
  
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = PatternViewModel;
  else
    window.PatternViewModel = PatternViewModel;
})();