# Реалізація інформаційного та програмного забезпечення

## SQL-скрипт для створення на початкового наповнення бази даних
    
```sql

    -- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS mydb DEFAULT CHARACTER SET utf8 ;
USE mydb ;

-- -----------------------------------------------------
-- Table mydb.User
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS mydb.User (
  id INT NOT NULL,
  firstname MEDIUMTEXT NULL,
  lastname MEDIUMTEXT NULL,
  nickname MEDIUMTEXT NULL,
  email MEDIUMTEXT NULL,
  password MEDIUMTEXT NULL,
  Role_id INT NOT NULL,
  PRIMARY KEY (id, Role_id),
  INDEX fk_User_Role1_idx (Role_id ASC) VISIBLE,
  CONSTRAINT fk_User_Role1
    FOREIGN KEY (Role_id)
    REFERENCES mydb.Role (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table mydb.Role
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS mydb.Role (
  id INT NOT NULL,
  name TINYTEXT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table mydb.User
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS mydb.User (
  id INT NOT NULL,
  firstname MEDIUMTEXT NULL,
  lastname MEDIUMTEXT NULL,
  nickname MEDIUMTEXT NULL,
  email MEDIUMTEXT NULL,
  password MEDIUMTEXT NULL,
  Role_id INT NOT NULL,
  PRIMARY KEY (id, Role_id),
  INDEX fk_User_Role1_idx (Role_id ASC) VISIBLE,
  CONSTRAINT fk_User_Role1
    FOREIGN KEY (Role_id)
    REFERENCES mydb.Role (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table mydb.Survey
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS mydb.Survey (
  id INT NOT NULL,
  title MEDIUMTEXT NULL,
  description LONGTEXT NULL,
  created DATE NULL,
  User_id INT NOT NULL,
  PRIMARY KEY (id, User_id),
  INDEX fk_Survey_User1_idx (User_id ASC) VISIBLE,
  CONSTRAINT fk_Survey_User1
    FOREIGN KEY (User_id)
    REFERENCES mydb.User (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table mydb.Question
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS mydb.Question (
  id INT NOT NULL,
  text MEDIUMTEXT NULL,
  type TINYTEXT NULL,
  Survey_id INT NOT NULL,
  PRIMARY KEY (id, Survey_id),
  INDEX fk_Question_Survey1_idx (Survey_id ASC) VISIBLE,
  CONSTRAINT fk_Question_Survey1
    FOREIGN KEY (Survey_id)
    REFERENCES mydb.Survey (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table mydb.Answer
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS mydb.Answer (
  id INT NOT NULL,
  text MEDIUMTEXT NULL,
  User_id INT NOT NULL,
  Question_id INT NOT NULL,
  PRIMARY KEY (id, User_id, Question_id),
  INDEX fk_Answer_User_idx (User_id ASC) VISIBLE,
  INDEX fk_Answer_Question1_idx (Question_id ASC) VISIBLE,
  CONSTRAINT fk_Answer_User
    FOREIGN KEY (User_id)
    REFERENCES mydb.User (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Answer_Question1
    FOREIGN KEY (Question_id)
    REFERENCES mydb.Question (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table mydb.Permission
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS mydb.Permission (
  id INT NOT NULL,
  name TINYTEXT NOT NULL,
  PRIMARY KEY (id, name))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table mydb.Grant
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS mydb.Grant (
  id INT NOT NULL,
  appointed DATE NULL,
  Role_id INT NOT NULL,
  Permission_id INT NOT NULL,
  PRIMARY KEY (id, Role_id, Permission_id),
  INDEX fk_Grant_Role1_idx (Role_id ASC) VISIBLE,
  INDEX fk_Grant_Permission1_idx (Permission_id ASC) VISIBLE,
  CONSTRAINT fk_Grant_Role1
    FOREIGN KEY (Role_id)
    REFERENCES mydb.Role (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Grant_Permission1
    FOREIGN KEY (Permission_id)
    REFERENCES mydb.Permission (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table mydb.State
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS mydb.State (
  id INT NOT NULL,
  name TINYTEXT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table mydb.Action
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS mydb.Action (
  id INT NOT NULL,
  date DATE NULL,
  Survey_id INT NOT NULL,
  State_id INT NOT NULL,
  Role_id INT NOT NULL,
  PRIMARY KEY (id, Survey_id, State_id, Role_id),
  INDEX fk_Action_Survey1_idx (Survey_id ASC) VISIBLE,
  INDEX fk_Action_State1_idx (State_id ASC) VISIBLE,
  INDEX fk_Action_Role1_idx (Role_id ASC) VISIBLE,
  CONSTRAINT fk_Action_Survey1
    FOREIGN KEY (Survey_id)
    REFERENCES mydb.Survey (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Action_State1
    FOREIGN KEY (State_id)
    REFERENCES mydb.State (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Action_Role1
    FOREIGN KEY (Role_id)
    REFERENCES mydb.Role (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
INSERT INTO mydb.Role(id, name) VALUES (1, "Expert");
INSERT INTO mydb.User (id, firstname, lastname, nickname,email,  Role_id ) VALUES (1, "xastia", "nastia", "xxx", "nastia@.com", 1);
INSERT INTO mydb.Survey (id, title, created, User_id) VALUES (1, "test", NOW(), 1);
INSERT INTO Survey (id, title, created, User_id) VALUES (2, "Survey Title", NOW(), 1);



```

## RESTfull сервіс для управління даними

RESTfull API для управління даними таблиці Question створеної в MySQL 
було створено за допомогою фреймворку Express на мові JavaScript. 
RESTfull API представляє собою CRUD застосунок. 

### Файл index.js

```
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

```

