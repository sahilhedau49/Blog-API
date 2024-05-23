const express = require("express");
const mysql = require("mysql");
const dbConfig = require("./dbConfig.json");

const app = express();

const db = mysql.createConnection(dbConfig);

app.get("/", (req, res) => {
  res.json("Hello friends...");
});

app.get("/blogs", (req, res) => {
  const q = "SELECT * FROM blogs";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/blog", (req, res) => {
  const q = "INSERT INTO blogs (`title`, `content`, `coverImg`) VALUES (?)";
  const values = [
    "title from backend",
    "content from backend",
    "backendimg.png",
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8000, () => {
  console.log("Connected to backend");
});
