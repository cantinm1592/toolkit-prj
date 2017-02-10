/* eslint-env browser, node */
(function() {

  var logger = typeof window !== 'undefined' ? window.log : require('loglevel');

  var Transaction = function(date, description, amount, account, person, budgetItem) {
    this.date = date !== undefined ? date : "";
    this.description = description !== undefined ? description : "";
    this.amount = amount !== undefined ? amount : "";
    this.account = account !== undefined ? account : "";
    this.person = person !== undefined ? person : "";
    this.budgetItem = budgetItem !== undefined ? budgetItem : "";
    this.category = "";
    this.reserve = "";
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Transaction;
  else
    window.Transaction = Transaction;
})();