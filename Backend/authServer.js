//SSL Certificate
const fs = require("fs");
const key = fs.readFileSync("./SSL/localhost/localhost.decrypted.key");
const cert = fs.readFileSync("./SSL/localhost/localhost.crt");
const rsa_private_key = fs.readFileSync("./SSL/jwt/jwtRS256.key");

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

const server = https.createServer({ key, cert}, app);

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Database connection
const password = "danghomp69";
const database = "health_user_db";
const table_name = "user";

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
  // var sql = "select * from " + table_name;
  // con.query(sql, function (err, results) {
  //   if (err) throw err;
  //   console.log(results);
  // });
});

//WebAPI
let refreshTokens = [];

app.post("/users/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ email: user.email });
    res.json({ accessToken: accessToken });
  });
});

app.get("/users", (req, res) => {
  var sql = "SELECT * FROM user";
  con.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

// app.get("/users", authenticateToken, (req, res) => {
//   var sql = "SELECT * FROM user";
//   con.query(sql, function (err, results) {
//     if (err) throw err;
//     res.send(results);
//   });
// });

app.post("/users/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    var sql = "INSERT INTO users (email, password) VALUES ?";
    var values = [[req.body.email, hashedPassword]];

    con.query(sql, [values], function (err, results) {
      if (err) throw err;
      res.send(results);
    });
  } catch {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  var sql = "SELECT * FROM users WHERE email = ?";
  con.query(sql, [req.body.email], async function (err, results) {
    if (err) throw err;
    if (results.length == 0) {
      return res.status(400).send("Cannot find user");
    }
    try {
      if (await bcrypt.compare(req.body.password, results[0].password)) {
        const accessToken = generateAccessToken({ email: results[0].password });
        const refreshToken = jwt.sign(
          { email: results[0].password },
          process.env.REFRESH_TOKEN_SECRET,
          rsa_private_key,
          { algorithm: "RS256" }
        );
        refreshTokens.push(refreshToken);

        res.json({ accessToken: accessToken, refreshToken: refreshToken });
        res.send("Logged In");
      } else {
        res.send("Not Allowed");
      }
    } catch {
      res.status(500).send();
    }
  });
});

app.delete("/users/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, rsa_private_key, {
    expiresIn: "120s",
    algorithm: "RS256",
  });
}

server.listen(port, () => {
  console.log(`Server is listening on https://localhost:${port}`);
});
