/* eslint-env browser */

var FileHelper = window.FileHelper;
var CSVParser = window.CSVParser;
var CSVWriter = window.CSVWriter;

var dropZone = document.getElementById('drop-zone');

dropZone.ondrop = function(e) {
  
  console.log("ondrop() : begin");
  
  e.preventDefault();
  this.className = 'drop-zone';
  
  var files = e.dataTransfer.files;
  
  for(var i = 0; i < files.length; ++i) {
    console.log("ondrop() : processing file \'" + files[i].name + "' file");
    FileHelper.processAsText(files[i], function(text) {
      var lines = CSVParser.parse(text);
      console.log(CSVWriter.write(lines));
    });
  }

  console.log("ondrop() : end");
};

dropZone.ondragover = function() {
  this.className = 'drop-zone on-drop';
  return false;
};

dropZone.ondragleave = function() {
  this.className = 'drop-zone';
  return false;
};

