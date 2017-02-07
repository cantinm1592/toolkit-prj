/* eslint-env browser */

var FileHelper = window.FileHelper;
var CSVParser = window.CSVParser;
var TransactionFilter = window.TransactionFilter;
var TransactionWriter = window.TransactionWriter;

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
      var headers = ['date', 'description', 'amount', 'account', 'person'];
      var output = new TransactionWriter().write(new TransactionFilter().process(lines), headers);
      output = output.replace(/\n/g, "\n<br/>");
      outputZone.innerHTML += output;
      outputZone.innerHTML += '<br/>';
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

