/* eslint-env browser */

var Transaction = window.Transaction;

var ko = window.ko;
var logger = window.log;

var transactions = [];
transactions.push(new Transaction("2017-01-01", "IGA LACOSTE", "25.00", "MASTERCARD", "Maxime", "Épicerie"));
transactions.push(new Transaction("2017-01-01", "TAIPHON", "17.00", "MASTERCARD", "Maxime", "Lunch"));
transactions.push(new Transaction("2017-01-01", "RETRAIT AU GA", "100.00", "EOP", "Maxime", "Argent comptant"));
transactions.forEach(function(transaction, index, array) {
  array[index].selected = false;
});

var tableViewModel = {
    transactions: ko.observableArray(transactions),
    deleteSelected: function() {
      console.log("deleteSelected!");
      this.transactions().splice(0, 1);
      console.log(this.transactions());
      return false;
    }
};

ko.applyBindings(tableViewModel);