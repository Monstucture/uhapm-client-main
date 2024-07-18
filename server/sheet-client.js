const googleapis = require('googleapis');
const { google } = googleapis;

const fs = require('fs'); // File system module to read JSON
// Assuming the JSON file is valid
const key = JSON.parse(fs.readFileSync('../server/apm-member-form-key.json', 'utf-8'));

const client = new google.auth.JWT(key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/spreadsheets']);

const sheets = google.sheets({ version: 'v4', auth: client });

// Assign the sheets object to a module property (assuming a module)
module.exports = sheets;
