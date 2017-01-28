/* eslint-env browser */

(function() {
  
  var logger = window.log;

  var FileHelper = function(){};
  
  FileHelper.processAsText = function(file, processor) {
    
    var reader = new FileReader();
    
    reader.onload = function() {
      logger.debug("onload() file reader event handler");
      logger.trace(reader.result.substring(0, 100));
      if(processor !== undefined) {
        processor(reader.result);
      }
    };
    
    reader.onerror = function(e) {
      logger.error("onerror() file reader event handler");
      logger.error(e.toString());
    };
    
    reader.readAsText(file);
  };
  
  window.FileHelper = FileHelper;
  
})();