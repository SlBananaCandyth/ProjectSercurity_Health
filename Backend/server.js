//SSL Certificate
const fs = require("fs");
const key = fs.readFileSync("./localhost/localhost.decrypted.key");
const cert = fs.readFileSync("./localhost/localhost.crt");

const express = require("express");
const app = express();
require("dotenv").config();

const port = 3000;

const https = require("https");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

//JWT
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const server = https.createServer({ key, cert }, app);

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Database connection
const password = "";
const database = "";
const table_name = "";

var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: password,
  insecureAuth: true,
  database: database,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!!!");
  var sql = "select * from" + table_name;
  con.query(sql, function (err, results) {
    if (err) throw err;
    console.log(results);
  });
});

//WebAPI
app.get("/users", (req, res) => {
  var sql = "SELECT * FROM users";
  con.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/users/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    var sql = "INSERT INTO users (name, email, password) VALUES ?";
    var values = [[req.body.name, req.body.email, hashedPassword]];

    con.query(sql, [values], function (err, results) {
      if (err) throw err;
      res.send(results);
    });
  } catch {
    res.status(500).send();
  }
});

server.listen(port, () => {
  console.log(`Server is listening on https://localhost:${port}`);
});
