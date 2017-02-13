/* eslint-env browser, node */
(function() {
  
  var ko = typeof window !== 'undefined' ? window.ko : require('knockout');

  var PatternsViewModel = function(patterns) {
    this.patterns = ko.observableArray(patterns !== undefined ? patterns : null);
  };
  
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = PatternsViewModel;
  else
    window.PatternsViewModel = PatternsViewModel;
})();