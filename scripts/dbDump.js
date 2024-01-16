// scripts/dbDump.js

const { MongoClient } = require('mongodb');
const { exec } = require('child_process');

// MongoDB connection URI
const mongoURI = process.env.MONGO_URI; // Update this with your MongoDB URI

async function dumpDatabase(exportFlag, importFlag, dbName) {
	try {
		if (!exportFlag && !importFlag) {
			console.error('Please specify either --export or --import.');
			return;
		}

		if (exportFlag && importFlag) {
			console.error('Please specify only one operation: --export or --import.');
			return;
		}

		if (!dbName) {
			console.error('Please provide the database name using --db flag.');
			return;
		}

		if (exportFlag) {
			// Export data
			const exportCommand = `mongodump --uri="${mongoURI}/${dbName}" --out="./dump/${dbName}"`;
			exec(exportCommand, handleCommandResult('Exported', dbName));
		} else if (importFlag) {
			// Import data
			const importCommand = `mongorestore --uri="${mongoURI}/${dbName}" "./dump/${dbName}"`;
			exec(importCommand, handleCommandResult('Imported', dbName));
		}
	} catch (err) {
		console.error('Error performing database operation:', err);
	}
}

function handleCommandResult(operation, dbName) {
  return (error, stdout, stderr) => {
    if (error) {
      console.error(`Error ${operation.toLowerCase()} ${dbName}: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`${operation} ${dbName} successfully.`);
  };
}

// Read command-line arguments
const args = process.argv.slice(2);
const exportFlag = args.includes('--export');
const importFlag = args.includes('--import');
const dbIndex = args.indexOf('--db');
const dbName = dbIndex !== -1 ? args[dbIndex + 1] : process.env.DB_NAME;

// Execute dumpDatabase function with provided parameters
dumpDatabase(exportFlag, importFlag, dbName);
