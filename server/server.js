const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
require("dotenv").config({ path: "./config.env" });
const cors = require("cors");
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "the-void.cluster-coxkoizjkqbn.us-east-2.rds.amazonaws.com",
  port: "3306",
  user: process.env.AWS_USER,
  password: process.env.AWS_PASSWORD,
  database: "thevoid",
});

db.connect((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("Database connected.");
});

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.get("/api/test", (req, res) => {
  console.log("testing 1 2 3");
  // var sql = "INSERT INTO Users (name) VALUES ('Chad')";
  // db.query(sql, function (err, result) {
  //   if (err) console.log(err);
  //   console.log("1 record inserted");
  // });
});

app.post("/api/addUser", (req, res) => {
  console.log(req.body);
  var sql = `INSERT INTO Users (name) VALUES ('${req.body.name}')`;
  db.query(sql, function (err, result) {
    if (err) console.log(err);
    console.log(`1 record inserted with name of ${req.body.name}`);
    console.log(result);
    res.send(result);
  });
});

app.post("/api/removeUser", (req, res) => {
  console.log(req.body);
  var sql = `DELETE FROM Users WHERE id=${req.body.id}`;
  db.query(sql, function (err, result) {
    if (err) console.log(err);
    console.log(`1 record deleted with id of ${req.body.id}`);
    res.send(result);
  });
});
