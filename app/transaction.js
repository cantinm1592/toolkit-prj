/* eslint-env browser, node */
(function() {

  var Transaction = function(date, description, amount, account, person, budgetItem, category, reserve) {
    //console.log("Transaction.new() : description =", description);
    this.date = date !== undefined ? date : "";
    this.description = description !== undefined ? description : "";
    this.amount = amount !== undefined ? amount : "";
    this.account = account !== undefined ? account : "";
    this.person = person !== undefined ? person : "";
    this.budgetItem = budgetItem !== undefined ? budgetItem : "";
    this.category = category !== undefined ? category : "";
    this.reserve = reserve !== undefined ? reserve : "";
    //console.log("Transaction.new() : this.description =", this.description);
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Transaction;
  else
    window.Transaction = Transaction;
})();