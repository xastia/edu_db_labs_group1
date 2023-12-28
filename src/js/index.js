const express = require("express");
const mysql = require('mysql2');

const app = express();
const jsonParse = express.json();

const connectionOptions = {
  host: "localhost",
  user: "root",
  password: "112358",
  database: "mydb"
};


const pool = mysql.createPool(connectionOptions);

app.get("/api/getquestion/:questionid", function (req, res) {
  const sql = `SELECT * FROM Question WHERE id = ${req.params.questionid}`;

 
  pool.getConnection(function (err, connection) {
    if (err) throw err;

    connection.query(sql, (err, result, fields) => {
      connection.release(); 

      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404);
    });
  });
});

app.get("/api/getquestions", function (req, res) {

  pool.getConnection(function (err, connection) {
    if (err) throw err;

    connection.query(`SELECT * from Question`, (err, result, fields) => {
      connection.release(); 

      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404)
    });
  });
});

app.post("/api/addquestion/", jsonParse, function (req, res) {
  if (!req.body)
    return res.sendStatus(400);
  
  const sql = `INSERT INTO Question (id, type, text, survey_id) VALUES (${req.body.id},"${req.body.type}", "${req.body.text}", ${req.body.survey_id})`;

  // Use the pool to get a connection
  pool.getConnection(function (err, connection) {
    if (err) throw err;

    connection.query(sql, (err, result, fields) => {
      connection.release(); 
      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404);
    });
  });
});

app.delete("/api/deletequestion/:questionid", function (req, res) {
  const sql = `DELETE FROM Question WHERE id = ${req.params.questionid}`;


  pool.getConnection(function (err, connection) {
    if (err) throw err;

    connection.query(sql, (err, result, fields) => {
      connection.release(); 

      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404);
    });
  });
});

app.put("/api/updatequestion/:questionid", jsonParse, function (req, res) {
  if (!req.body)
    return res.sendStatus(400);

  
  pool.getConnection(function (err, connection) {
    if (err) throw err;

    const sql = `UPDATE Question SET type = "${req.body.type}", text = "${req.body.text}", survey_id = "${req.body.survey_id}" WHERE id = ${req.params.questionid}`;
    connection.query(sql, (err, result, fields) => {
      connection.release(); 

      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404);
    });
  });
});


const port = 2222;
app.listen(port, () => {
    console.log(`Server starts on http://localhost:${port}`);
});

