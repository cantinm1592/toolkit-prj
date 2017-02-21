/* eslint-env browser, node */
(function() {
  
  var PatternViewModel = typeof window !== 'undefined' ? window.PatternViewModel : require("./pattern-view-model.js");
  var ko = typeof window !== 'undefined' ? window.ko : require('knockout');

  var ToolkitViewModel = function(transactions, patterns) {
    
    this.selectedTransactions = ko.observableArray();
    this.transactions = ko.observableArray(transactions !== undefined ? transactions : null);
    this.patterns = ko.observableArray();
    
    if(patterns !== undefined) {
      var patternsObservableArray = this.patterns;
      patterns.forEach(function(pattern) {
        patternsObservableArray().push(PatternViewModel.createFromPattern(pattern));
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
  
  ToolkitViewModel.prototype.addPattern = function(pattern, budgetItem) {
    this.patterns.unshift(new PatternViewModel(pattern, budgetItem));
    this.applyPatterns();
  };
  
  ToolkitViewModel.prototype.applyPatterns = function() {
    var patterns = this.patterns();
    ko.utils.arrayForEach(this.transactions(), function(transaction){
      for(var i = 0; i < patterns.length; i++) {
        if(transaction.description().includes(patterns[i].pattern())) {
          var patternAmount = patterns[i].amount();
          if(patternAmount === undefined || patternAmount === '' || patternAmount === '*' || transaction.amount() === patternAmount) {
            transaction.budgetItem(patterns[i].budgetItem());
          }
          break;
        }
      }
    });
  };
  
  ToolkitViewModel.prototype.sortPatterns = function() {
    this.patterns.sort(function(left, right) {
      if(left.pattern() === right.pattern()) {
        return left.amount() === right.amount() ? 0 : left.amount() < right.amount() ? -1 : 1;
      }
      return left.pattern() < right.pattern() ? -1 : 1;
    });
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = ToolkitViewModel;
  else
    window.ToolkitViewModel = ToolkitViewModel;
})();