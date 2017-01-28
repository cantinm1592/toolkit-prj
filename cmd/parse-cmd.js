/* eslint-env node */

var CSVParser = require('../app/csv-parser.js');
var CSVWriter = require('../app/csv-writer.js');

var path = require('path');
var fs = require('fs');

var logger = require('loglevel-message-prefix')(require('loglevel'), {
    prefixes: ['level'],
    prefixFormat: "    [%p]",
});

logger.setLevel('debug');

var buffer = fs.readFileSync(path.join(__dirname, 'mastercard_20161123.csv'), "utf8");
var lines = CSVParser.parse(buffer);

process.stdout.write(CSVWriter.write(lines));