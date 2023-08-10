const express = require("express");
const app = express();
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

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.get("/api/test", (req, res) => {
  console.log("testing 1 2 3");
});
