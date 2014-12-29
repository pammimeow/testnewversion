var fs = require('fs');
exports.data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));
