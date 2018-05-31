const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const dbFile = './shop.sqlite';

module.exports = { // This uses chaining instead of serializing

    add: function(item, cost, description) {

        const getInfo = new Promise((resolve,error) => {

			var db 
			var response;
			var log = false;

            function createDb() { // Root
                if (log) console.log('Creating Database Chain to store the userID money');
                db = new sqlite3.Database(dbFile, createTable);
            }

            function createTable() { // Extends createDb
                db.run("CREATE TABLE IF NOT EXISTS shop (item TEXT, cost TEXT, description TEXT)", checkIfCreated);
            }

            function checkIfCreated() {
                if (log) console.log('Creating Table');
                db.get(`SELECT * FROM shop WHERE item = '${item}'`, function(err, row) {
                    if (!row) {
                        insertRows();
                    }
                    else {
                       response = row;
                       returnDb();
                    }
                })
            }

            function insertRows() { // Extends createTable
                var stmt = db.prepare("INSERT INTO shop (item,cost,description) VALUES (?,?,?)");

                stmt.run(item, cost, description);

                stmt.finalize(readAllRows);
            }

            function readAllRows() { // Extends insertRows

                /**db.all("SELECT rowid AS id, userID, money, lastDaily FROM moneyset", function(err, rows) { // This shows ALL rows
                    rows.forEach(function(row) {
                        console.log(row);
                    });
                    closeDb();
                });**/

                db.get(`SELECT * FROM shop WHERE item = '${item}'`, function(err, row) {
                    closeDb()
                })

            }

            function closeDb() { // Extends readAllRows
                checkIfCreated()
                db.close();
            }

            function returnDb() {
                return resolve(response)
            }

            function runChain() {
                createDb();
            }

            runChain();

        });

        return getInfo;

    },

    info: function() {
        const getInfo = new Promise((resolve) => {
            // Variables
            var db;
            var response = "";
            let log = false; // TRUE or FALSE for logging what is happening in this file.
            
            function checkExist()
            {
            	fs.access(dbFile);
            }
            
            

            function readAllRows() { // Extends insertRows
                if (log) console.log('Display New Row');
                db = new sqlite3.Database(dbFile);

                db.all("SELECT item, cost, description FROM shop", function(err, rows) { // This shows ALL rows
                    rows.forEach(function(row) {
                        response += "Name **" + row.item + "**\n" + row.description + "\nCost **" + row.cost + "**\n\n";
                    });
                    closeDb();
                });

                /**db.get(`SELECT item FROM shop`, function(err, row) {
                    response = row;
                    closeDb();
                });**/

            }

            function closeDb() { // Extends readAllRows
                if (log) console.log("Closing Database");
                db.close();
                returnDb();
            }

            function returnDb() {
                if (log) console.log(response);
                return resolve(response);
            }

            function runChain() {
                readAllRows();
            }

            runChain();

        });
        return getInfo;
    }

}
