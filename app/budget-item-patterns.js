/* eslint-env browser, node */
(function() {
  
  var budgetItemsByPattern = {
    "IGA ": "Épicerie",
    "VAN HOUTTE": "Cafés"
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = budgetItemsByPattern;
  else
    window.budgetItemsByPattern = budgetItemsByPattern;
})();