/* eslint-env node */

var CSVParser = require('../app/csv-parser.js');
var CreditCardFilter = require('../app/credit-card-filter.js');
var TransactionWriter = require('../app/transaction-writer.js');

var path = require('path');
var fs = require('fs');

var logger = require('loglevel-message-prefix')(require('loglevel'), {
    prefixes: ['level'],
    prefixFormat: "    [%p]",
});

logger.setLevel('info');

var buffer = fs.readFileSync(path.join(__dirname, 'mastercard_20161123.csv'), "utf8");
var lines = CSVParser.parse(buffer);

var headers = ['date', 'description', 'amount', 'account', 'person'];
var headersName = {'date':'Date', 'description':'Description', 'amount':'Montant', 'account':'Compte', 'person':'Par'};

process.stdout.write(TransactionWriter.write(CreditCardFilter.filter(lines), headers, headersName));