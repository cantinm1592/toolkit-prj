/* eslint-env browser, jquery */';';

var FileHelper = window.FileHelper;
var Transaction = window.Transaction;
var CSVParser = window.CSVParser;
var TransactionFilter = window.TransactionFilter;
var BudgetItemFilter = window.BudgetItemFilter;
var TransactionsViewModel = window.TransactionsViewModel;
var PatternsViewModel = window.PatternsViewModel;

var ko = window.ko;
var logger = window.log;
var budgetItemRules = null;
var transactionsViewModel = null;
var patternsViewModel = null;

FileHelper.parseJSON("GET", "budget-item-rules.json", function(jsonObject) {
  budgetItemRules = jsonObject;
  patternsViewModel = new PatternsViewModel(budgetItemRules.patterns);
  ko.applyBindings(patternsViewModel, document.getElementById("patterns-panel"));
});

var transactions = [];
transactions.push(new Transaction("2017-01-01", "IGA LACOSTE", "25.00", "MASTERCARD", "Maxime", "Épicerie"));
transactions.push(new Transaction("2017-01-01", "TAIPHON", "17.00", "MASTERCARD", "Maxime", "Lunch"));
transactions.push(new Transaction("2017-01-01", "RETRAIT AU GA", "100.00", "EOP", "Maxime", "Argent comptant"));
transactionsViewModel = new TransactionsViewModel(transactions);
ko.applyBindings(transactionsViewModel, document.getElementById("transactions-panel"));

var dropZone = document.getElementById('drop-zone');

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
      
      transactionsViewModel.addTransactions(transactionsToAdd);
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