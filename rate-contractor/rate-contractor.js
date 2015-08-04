// Rate contractor utility
// Usage example:
// node rate-contractor.js contractor.db joe 5

var Database = require('contractor-db');

var database = new Database(process.argv[2]);
database.rateContractor(process.argv[3], process.argv[4]);

