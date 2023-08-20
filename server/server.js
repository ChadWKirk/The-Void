const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});
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

server.listen(port, () => console.log(`Listening on port ${port}`));

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});

app.get("/", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.post("/api/checkUser", (req, res) => {
  var sql = `SELECT name FROM Users WHERE id=${req.body.id}`;
  db.query(sql, function (err, result) {
    if (err) console.log(err);
    res.send(result);
  });
});

app.post("/api/addUser", (req, res) => {
  console.log(req.body);
  var sql = `INSERT INTO Users (name) VALUES ('${req.body.name}')`;
  db.query(sql, function (err, result) {
    if (err) console.log(err);
    console.log(`1 record inserted with name of ${req.body.name}`);
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
