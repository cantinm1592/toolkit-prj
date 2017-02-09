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
  
  FileHelper.parseJSON = function(method, url, processor) {
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(this.responseText);
        if(processor !== undefined) {
          processor(jsonObject);
        }
      }
    };
    
    request.open(method, url, true);
    request.send();
  };  
  
  window.FileHelper = FileHelper;
  
})();