/* eslint-env browser, node */
(function() {
  
  var ko = typeof window !== 'undefined' ? window.ko : require('knockout');

  var RuleViewModel = function(descriptionPattern, budgetItem, amountPattern) {
    
    if(amountPattern === undefined || amountPattern === '') {
      amountPattern = "*";
    }
    
    this.descriptionPattern = ko.observable(descriptionPattern);
    this.amountPattern = ko.observable(amountPattern);
    this.budgetItem = ko.observable(budgetItem);
  };
  
  RuleViewModel.createFromRule = function(rule) {
    
    return new RuleViewModel(
      rule.descriptionPattern,
      rule.budgetItem,
      rule.amountPattern
    );
    
  };
  
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = RuleViewModel;
  else
    window.RuleViewModel = RuleViewModel;
})();