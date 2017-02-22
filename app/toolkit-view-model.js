/* eslint-env browser, node */
(function() {
  
  var RuleViewModel = typeof window !== 'undefined' ? window.RuleViewModel : require("./rule-view-model.js");
  var ko = typeof window !== 'undefined' ? window.ko : require('knockout');

  var ToolkitViewModel = function(transactions, rules) {
    
    this.selectedTransactions = ko.observableArray();
    this.transactions = ko.observableArray(transactions !== undefined ? transactions : null);
    this.rules = ko.observableArray();
    
    if(rules !== undefined) {
      var rulesObservableArray = this.rules;
      rules.forEach(function(rule) {
        rulesObservableArray().push(RuleViewModel.createFromRule(rule));
      });
    }
    
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
  
  ToolkitViewModel.prototype.addTransaction = function(transaction) {
    this.transactions.push(transaction);
  };
  
  ToolkitViewModel.prototype.removeTransactions = function() {
    var transaction = null;
    while((transaction = this.selectedTransactions().shift()) !== undefined) { 
      console.log("removing");
      this.transactions.remove(transaction);
    }
  };
  
  ToolkitViewModel.prototype.addRule = function(descriptionPattern, budgetItem) {
    this.rules.unshift(new RuleViewModel(descriptionPattern, budgetItem));
    this.applyRules();
  };
  
  ToolkitViewModel.prototype.applyRules = function() {
    var rules = this.rules();
    ko.utils.arrayForEach(this.transactions(), function(transaction){
      for(var i = 0; i < rules.length; i++) {
        if(transaction.description().includes(rules[i].descriptionPattern())) {
          var amountPattern = rules[i].amountPattern();
          if(amountPattern === undefined || amountPattern === '' || amountPattern === '*' || transaction.amount() === amountPattern) {
            transaction.budgetItem(rules[i].budgetItem());
          }
          break;
        }
      }
    });
  };
  
  ToolkitViewModel.prototype.sortRules = function() {
    this.rules.sort(function(left, right) {
      if(left.descriptionPattern() === right.descriptionPattern()) {
        return left.amountPattern() === right.amountPattern() ? 0 : left.amountPattern() < right.amountPattern() ? -1 : 1;
      }
      return left.descriptionPattern() < right.descriptionPattern() ? -1 : 1;
    });
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = ToolkitViewModel;
  else
    window.ToolkitViewModel = ToolkitViewModel;
})();