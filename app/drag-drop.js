/* eslint-env browser */';';

var budgetItemsByPattern = null;

var FileHelper = window.FileHelper;
var CSVParser = window.CSVParser;
var TransactionFilter = window.TransactionFilter;
var TransactionWriter = window.TransactionWriter;
var BudgetItemFilter = window.BudgetItemFilter;

FileHelper.parseJSON("GET", "budget-item-patterns.json", function(jsonObject) {
  budgetItemsByPattern = jsonObject;
  console.log("budgetItemsByPattern =", budgetItemsByPattern);
});

var logger = window.log;
var dropZone = document.getElementById('drop-zone');
var outputZone = document.getElementById('output-zone');

dropZone.ondrop = function(e) {
  
  logger.debug("ondrop() : begin");
  
  e.preventDefault();
  this.className = 'drop-zone';
  
  var files = e.dataTransfer.files;
  
  for(var i = 0; i < files.length; ++i) {
    
    outputZone.innerHTML = "";
    logger.info("ondrop() : processing file \'" + files[i].name + "' file");
    
    FileHelper.processAsText(files[i], function(text) {
      
      var lines = new CSVParser().parse(text);
      var transactions = new BudgetItemFilter().process(new TransactionFilter().process(lines));
      
      var output = "";
      
      transactions.forEach(function(transaction) {
        output += "<tr class='";
        output += transaction.budgetItem !== '' ? "" : "danger";
        output += "'><td>";
        output += "<input type='checkbox' value=''>"
        output += "</td><td>";        
        output += transaction.date;
        output += "</td><td>";
        output += transaction.description;
        output += "</td><td>";
        output += transaction.amount;
        output += "</td><td>";
        output += transaction.account;
        output += "</td><td>";
        output += transaction.person;
        output += "</td><td>";
        output += transaction.budgetItem;
        // output += "</td><td>";
        // output += '<div class="dropdown">';
        // output += '<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">';
        // output += 'Actions';
        // output += '<span class="caret"></span>';
        // output += '</button>';
        // output += '<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">';
        // output += '<li><a href="#">Delete</a></li>';
        // output += '</ul>';
        // output += '</div>';
        output += "</td></tr>";
      });
      
      outputZone.innerHTML += output;
      
    });
  }

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

