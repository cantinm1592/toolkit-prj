/* eslint-env browser */

var FileHelper = window.FileHelper;
var CSVParser = window.CSVParser;
var CSVWriter = window.CSVWriter;

var logger = window.log;
var dropZone = document.getElementById('drop-zone');

dropZone.ondrop = function(e) {
  
  logger.debug("ondrop() : begin");
  
  e.preventDefault();
  this.className = 'drop-zone';
  
  var files = e.dataTransfer.files;
  
  for(var i = 0; i < files.length; ++i) {
    logger.info("ondrop() : processing file \'" + files[i].name + "' file");
    FileHelper.processAsText(files[i], function(text) {
      var lines = CSVParser.parse(text);
      logger.info(CSVWriter.write(lines));
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

