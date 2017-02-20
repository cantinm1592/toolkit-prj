/* eslint-env browser, jquery */';';

var FileHelper = window.FileHelper;
var CSVParser = window.CSVParser;
var TransactionFilter = window.TransactionFilter;
var TransactionViewModel = window.TransactionViewModel;
var TransactionsViewModel = window.TransactionsViewModel;

var ko = window.ko;
var logger = window.log;
var patterns = null;
var transactionsViewModel = null;

var initialTransactions = [];
/*
initialTransactions.push(new TransactionViewModel("2017-01-01", "IGA LACOSTE", "25.00", "MASTERCARD", "Maxime", "Épicerie"));
initialTransactions.push(new TransactionViewModel("2017-01-01", "TAIPHON", "17.00", "MASTERCARD", "Maxime", "Lunch"));
initialTransactions.push(new TransactionViewModel("2017-01-01", "RETRAIT AU GA", "100.00", "EOP", "Maxime", "Argent comptant"));
*/

FileHelper.parseJSON("GET", "patterns.json", function(jsonObject) {
  patterns = jsonObject;
  transactionsViewModel = new TransactionsViewModel(initialTransactions, patterns);
  ko.applyBindings(transactionsViewModel);
});

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
      var transactions = new TransactionFilter().process(lines);
      
      transactions.forEach(function(transaction) {
        transactionsViewModel.addTransaction(TransactionViewModel.createFromTransaction(transaction));
      });
      
      transactionsViewModel.applyPatterns();
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