/* eslint-env browser, jquery */';';

var budgetItemRules = null;

var FileHelper = window.FileHelper;
var Transaction = window.Transaction;
var CSVParser = window.CSVParser;
var TransactionFilter = window.TransactionFilter;
var BudgetItemFilter = window.BudgetItemFilter;
var TransactionsViewModel = window.TransactionsViewModel;

FileHelper.parseJSON("GET", "budget-item-rules.json", function(jsonObject) {
  budgetItemRules = jsonObject;
});

var ko = window.ko;
var logger = window.log;
var dropZone = document.getElementById('drop-zone');

var transactions = [];
transactions.push(new Transaction("2017-01-01", "IGA LACOSTE", "25.00", "MASTERCARD", "Maxime", "Épicerie"));
transactions.push(new Transaction("2017-01-01", "TAIPHON", "17.00", "MASTERCARD", "Maxime", "Lunch"));
transactions.push(new Transaction("2017-01-01", "RETRAIT AU GA", "100.00", "EOP", "Maxime", "Argent comptant"));

var viewModel = new TransactionsViewModel(transactions);
ko.applyBindings(viewModel);

dropZone.ondrop = function(e) {
  
  logger.debug("ondrop() : begin");
  
  e.preventDefault();
  this.className = 'drop-zone';
  
  var files = e.dataTransfer.files;
  
  for(var i = 0; i < files.length; ++i) {
    
    logger.info("ondrop() : processing file \'" + files[i].name + "' file");
    
    FileHelper.processAsText(files[i], function(text) {
      
      var lines = new CSVParser().parse(text);
      var transactionsToAdd = new BudgetItemFilter().process(new TransactionFilter().process(lines));
      
      viewModel.addTransactions(transactionsToAdd);
    });
  }
  
  $('#transactions-nav').click();

  logger.debug("ondrop() : end");
};

dropZone.ondragover = function() {
  this.className = 'drop-zone on-drop';
  return false;
};

dropZone.ondragleave = function() {
  this.className = 'drop-zone';
  return false;
};