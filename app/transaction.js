/* eslint-env browser, node */
(function() {
  
  var logger = typeof window !== 'undefined' ? window.log : require('loglevel');
  
  var Transaction = function() {
    this.date = "";
    this.description = "";
    this.amount = "";
    this.account = "";
    this.person = "";
    this.budgetItem = "";
    this.category = "";
    this.reserve = "";
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Transaction;
  else
    window.Transaction = Transaction;
})();