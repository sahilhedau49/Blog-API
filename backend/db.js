const mysql = require("mysql");
const dbConfig = require("./dbConfig.json");

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

module.exports = db;
