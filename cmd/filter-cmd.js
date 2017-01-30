/* eslint-env node */

var CSVParser = require('../app/csv-parser.js');
var MasterCardFilter = require('../app/mastercard-filter.js');

var path = require('path');
var fs = require('fs');

var logger = require('loglevel-message-prefix')(require('loglevel'), {
    prefixes: ['level'],
    prefixFormat: "    [%p]",
});

logger.setLevel('info');

var buffer = fs.readFileSync(path.join(__dirname, 'mastercard_20161123.csv'), "utf8");
var lines = CSVParser.parse(buffer);

console.log(MasterCardFilter.filter(lines));