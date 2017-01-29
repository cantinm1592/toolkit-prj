/* eslint-env browser, node */
(function() {
  
  var logger = typeof window !== 'undefined' ? window.log : require('loglevel');
  logger.setLevel('debug');
  
  var accountName = "MASTERCARD";
  var personByCardLastNumber = {
  }
  
  var MasterCardFilter = function(){};

  MasterCardFilter.filter = function filter(lines) {
    
    logger.debug('MasterCardFilter.parse() : begin');
    
    var linesIn = lines;
    var linesOut = new Array();
    
    linesOut[0] = ['Date', 'Description', 'Montant', 'Compte', 'Par', 'Poste', 'Catégorie', 'Réserve'];
    
    for(var i = 0; i < lines.length; i++) {
      var lineOut = new Array();
      lineOut[0] = linesIn[i][3].replace(/\//g, '-');
      lineOut[1] = linesIn[i][5];
      lineOut[2] = linesIn[i][11]; //.replace('.', ',');
      lineOut[3] = accountName;
      linesOut[i + 1] = lineOut;
    }
    
    logger.debug('linesOut =', linesOut);
    
    logger.debug('MasterCardFilter.parse() : end');
    
    return linesOut;
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = MasterCardFilter;
  else
    window.MasterCardFilter = MasterCardFilter;
})();