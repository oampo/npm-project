// Add contractor utility
// Usage example:
// node add-contractor.js contractor.db joe

var Database = require('contractor-db');

// Utilities
var database = new Database(process.argv[2]);
database.addContractor(process.argv[3], 0);

